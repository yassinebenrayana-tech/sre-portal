import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfrastructureService } from '../../services/infrastructure.service';
import { AuthService } from '../../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss'
})
export class ItemList {
  private infrastructureService = inject(InfrastructureService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['name', 'type', 'location', 'status', 'metrics', 'actions'];

  searchQuery = signal('');
  allResources = this.infrastructureService.resources;

  filteredResources = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allResources();
    return this.allResources().filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  isAdmin = computed(() => this.authService.hasRole('SRE Admin'));

  onSearch(q: string) { this.searchQuery.set(q); }

  start(id: number) {
    this.infrastructureService.startResource(id);
    this.snackBar.open('⚡ Starting resource...', 'OK', { duration: 2000 });
  }

  stop(id: number) {
    this.infrastructureService.stopResource(id);
    this.snackBar.open('⏹ Stopping resource...', 'OK', { duration: 2000 });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to permanently delete this resource?')) {
      this.infrastructureService.deleteResource(id);
      this.snackBar.open('🗑 Resource deleted', 'Undo', { duration: 3000 });
    }
  }
}
