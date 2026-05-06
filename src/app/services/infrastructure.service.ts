import { Injectable, signal } from '@angular/core';
import { Resource } from '../models/resource.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  resources = signal<Resource[]>([
    { id: 1, name: 'prod-cluster-01',   type: 'Kubernetes Cluster', status: 'Online',  cpuUsage: 45, memoryUsage: 12, location: 'AWS-Paris' },
    { id: 2, name: 'db-orders-psql',    type: 'PostgreSQL',          status: 'Online',  cpuUsage: 10, memoryUsage: 4,  location: 'Azure-Frankfurt' },
    { id: 3, name: 'test-vm-jenkins',   type: 'Virtual Machine',     status: 'Offline', cpuUsage: 0,  memoryUsage: 0,  location: 'On-Premise' },
    { id: 4, name: 'prod-api-gateway',  type: 'Kubernetes Cluster',  status: 'Online',  cpuUsage: 72, memoryUsage: 9,  location: 'GCP-Frankfurt' },
    { id: 5, name: 'staging-db-mysql',  type: 'PostgreSQL',          status: 'Error',   cpuUsage: 98, memoryUsage: 16, location: 'AWS-Paris' },
    { id: 6, name: 'dev-vm-build',      type: 'Virtual Machine',     status: 'Online',  cpuUsage: 23, memoryUsage: 6,  location: 'Azure-London' },
  ]);

  private metricsInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Simulate live metric fluctuations every 5 s
    this.metricsInterval = setInterval(() => this.fluctuateMetrics(), 5000);
  }

  private fluctuateMetrics() {
    this.resources.update(res =>
      res.map(r => {
        if (r.status !== 'Online') return r;
        const cpu = Math.max(5, Math.min(99, r.cpuUsage + (Math.random() * 10 - 5)));
        const mem = Math.max(1, Math.min(32,  r.memoryUsage + (Math.random() * 2  - 1)));
        return { ...r, cpuUsage: Math.round(cpu), memoryUsage: Math.round(mem * 10) / 10 };
      })
    );
  }

  getResources(): Observable<Resource[]> {
    return of(this.resources()).pipe(delay(500));
  }

  startResource(id: number): void {
    this.updateResourceStatus(id, 'Starting');
    setTimeout(() => {
      this.updateResourceStatus(id, 'Online');
      this.updateResourceMetrics(id, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 12) + 4);
    }, 2000);
  }

  stopResource(id: number): void {
    this.updateResourceStatus(id, 'Stopping');
    setTimeout(() => {
      this.updateResourceStatus(id, 'Offline');
      this.updateResourceMetrics(id, 0, 0);
    }, 2000);
  }

  deleteResource(id: number): void {
    setTimeout(() => {
      this.resources.update(res => res.filter(r => r.id !== id));
    }, 800);
  }

  addResource(resource: Omit<Resource, 'id'>): void {
    setTimeout(() => {
      const newId = Math.max(...this.resources().map(r => r.id), 0) + 1;
      const newResource: Resource = { ...resource, id: newId };
      this.resources.update(res => [...res, newResource]);
    }, 1000);
  }

  private updateResourceStatus(id: number, status: Resource['status']) {
    this.resources.update(res =>
      res.map(r => r.id === id ? { ...r, status } : r)
    );
  }

  private updateResourceMetrics(id: number, cpuUsage: number, memoryUsage: number) {
    this.resources.update(res =>
      res.map(r => r.id === id ? { ...r, cpuUsage, memoryUsage } : r)
    );
  }
}
