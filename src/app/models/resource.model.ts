export interface Resource {
  id: number;
  name: string;
  type: 'Kubernetes Cluster' | 'PostgreSQL' | 'Virtual Machine';
  status: 'Online' | 'Offline' | 'Deploying' | 'Error' | 'Starting' | 'Stopping';
  cpuUsage: number; // en %
  memoryUsage: number; // en GB
  location: string; // ex: 'AWS-Paris', 'Azure-London'
}