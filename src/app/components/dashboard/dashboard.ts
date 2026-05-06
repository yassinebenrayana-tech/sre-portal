import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfrastructureService } from '../../services/infrastructure.service';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts'; // Combined imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, MatCardModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private infrastructureService = inject(InfrastructureService);

  // --- THE FIX ---
  // Expose the LegendPosition enum so the HTML can use its values
  public readonly LegendPosition = LegendPosition; 
  // ----------------

  resources      = this.infrastructureService.resources;
  totalResources = computed(() => this.resources().length);
  onlineResources= computed(() => this.resources().filter(r => r.status === 'Online').length);
  errorResources = computed(() => this.resources().filter(r => r.status === 'Error').length);
  offlineResources=computed(() => this.resources().filter(r => r.status === 'Offline').length);
  
  avgCpu         = computed(() => {
    const online = this.resources().filter(r => r.status === 'Online');
    if (!online.length) return 0;
    return Math.round(online.reduce((a,r) => a + r.cpuUsage, 0) / online.length);
  });

  cpuChartData = computed(() => this.resources()
    .filter(r => r.status === 'Online')
    .map(r => ({ name: r.name.split('-').slice(0,2).join('-'), value: r.cpuUsage })));

  memChartData = computed(() => this.resources()
    .filter(r => r.status === 'Online')
    .map(r => ({ name: r.name.split('-').slice(0,2).join('-'), value: r.memoryUsage })));

  statusPieData = computed(() => [
    { name: 'Online',  value: this.onlineResources()  },
    { name: 'Offline', value: this.offlineResources() },
    { name: 'Error',   value: this.errorResources()   },
  ].filter(s => s.value > 0));

  colorScheme: any = { domain: ['#00f2fe', '#4facfe', '#667eea', '#7c3aed', '#00e676', '#ff9800'] };
  pieColorScheme: any = { domain: ['#00e676', '#8b949e', '#ff1744'] };

  recentResources = computed(() => [...this.resources()].slice(0, 5));

  healthPercentage = computed(() =>
    this.totalResources() ? Math.round((this.onlineResources() / this.totalResources()) * 100) : 0
  );
}