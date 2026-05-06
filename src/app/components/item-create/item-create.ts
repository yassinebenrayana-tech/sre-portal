import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InfrastructureService } from '../../services/infrastructure.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './item-create.html',
  styleUrl: './item-create.scss'
})
export class ItemCreate {
  private fb = inject(FormBuilder);
  private infrastructureService = inject(InfrastructureService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  types = ['Kubernetes Cluster', 'PostgreSQL', 'Virtual Machine'];
  locations = ['AWS-Paris', 'Azure-London', 'GCP-Frankfurt', 'On-Premise'];

  provisionForm = this.fb.group({
    name:     ['', [Validators.required, this.namingConventionValidator]],
    type:     ['Kubernetes Cluster', Validators.required],
    location: ['AWS-Paris', Validators.required],
    size:     ['small', Validators.required]
  });

  namingConventionValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;
    const regex = /^(prod|dev|test)-[a-z0-9-]+$/;
    return regex.test(value) ? null : { invalidNaming: true };
  }

  onSubmit() {
    if (this.provisionForm.valid) {
      const formValue = this.provisionForm.value;
      this.infrastructureService.addResource({
        name:        formValue.name!,
        type:        formValue.type as any,
        location:    formValue.location!,
        status:      'Deploying',
        cpuUsage:    0,
        memoryUsage: 0
      });
      this.snackBar.open('🚀 Resource deployment started!', 'View Inventory', { duration: 4000 })
        .onAction().subscribe(() => this.router.navigate(['/inventory']));
      this.router.navigate(['/inventory']);
    } else {
      this.provisionForm.markAllAsTouched();
    }
  }
}
