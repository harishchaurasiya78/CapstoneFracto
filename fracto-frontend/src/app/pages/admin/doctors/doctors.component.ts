import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow">
      <div class="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 class="m-0 font-weight-bold text-primary">Doctor Management</h6>
        <button class="btn btn-primary" (click)="showAddDoctorModal = true">
          <i class="fas fa-plus me-2"></i>Add New Doctor
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>City</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let doctor of doctors">
                <td>{{ doctor.name }}</td>
                <td>{{ doctor.specializationName }}</td>
                <td>{{ doctor.city }}</td>
                <td>
                  <div class="rating">
                    <span *ngFor="let star of getStars(doctor.rating)" class="star">
                      <i class="fas fa-star"></i>
                    </span>
                    <span class="ms-2">{{ doctor.rating }}/5</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [ngClass]="doctor.isActive ? 'bg-success' : 'bg-danger'">
                    {{ doctor.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" (click)="editDoctor(doctor)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-warning me-1" (click)="toggleDoctorStatus(doctor)">
                    <i class="fas fa-power-off"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteDoctor(doctor.doctorId)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Doctor Modal -->
    <div class="modal fade" [class.show]="showAddDoctorModal" [style.display]="showAddDoctorModal ? 'block' : 'none'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingDoctor ? 'Edit Doctor' : 'Add New Doctor' }}</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="saveDoctor()">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" [(ngModel)]="doctorForm.name" name="name" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Specialization</label>
                    <select class="form-select" [(ngModel)]="doctorForm.specializationId" name="specializationId" required>
                      <option value="">Select Specialization</option>
                      <option *ngFor="let spec of specializations" [value]="spec.specializationId">
                        {{ spec.specializationName }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" [(ngModel)]="doctorForm.city" name="city" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" [(ngModel)]="doctorForm.email" name="email">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control" [(ngModel)]="doctorForm.phone" name="phone">
              </div>
              <div class="mb-3">
                <label class="form-label">Bio</label>
                <textarea class="form-control" rows="3" [(ngModel)]="doctorForm.bio" name="bio"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="button" class="btn btn-primary" (click)="saveDoctor()">Save</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
    }
    
    .rating .star {
      color: #ffc107;
      font-size: 0.9em;
    }
    
    .modal {
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .modal.show {
      display: block;
    }
  `]
})
export class AdminDoctorsComponent {
  showAddDoctorModal = false;
  editingDoctor: any = null;
  
  doctorForm = {
    name: '',
    specializationId: '',
    city: '',
    email: '',
    phone: '',
    bio: ''
  };

  specializations = [
    { specializationId: 1, specializationName: 'Cardiology' },
    { specializationId: 2, specializationName: 'Dermatology' },
    { specializationId: 3, specializationName: 'Neurology' },
    { specializationId: 4, specializationName: 'Orthopedics' }
  ];

  doctors = [
    {
      doctorId: 1,
      name: 'Dr. Sarah Johnson',
      specializationName: 'Cardiology',
      city: 'New York',
      rating: 4.8,
      isActive: true
    },
    {
      doctorId: 2,
      name: 'Dr. Michael Chen',
      specializationName: 'Dermatology',
      city: 'Los Angeles',
      rating: 4.6,
      isActive: true
    }
  ];

  getStars(rating: number): number[] {
    return Array.from({length: Math.floor(rating)}, (_, i) => i);
  }

  editDoctor(doctor: any) {
    this.editingDoctor = doctor;
    this.doctorForm = { ...doctor };
    this.showAddDoctorModal = true;
  }

  toggleDoctorStatus(doctor: any) {
    doctor.isActive = !doctor.isActive;
    // Implement status toggle logic here
    console.log('Toggling doctor status:', doctor.doctorId, doctor.isActive);
  }

  deleteDoctor(doctorId: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      // Implement delete logic here
      console.log('Deleting doctor:', doctorId);
    }
  }

  saveDoctor() {
    // Implement save logic here
    console.log('Saving doctor:', this.doctorForm);
    this.closeModal();
  }

  closeModal() {
    this.showAddDoctorModal = false;
    this.editingDoctor = null;
    this.doctorForm = {
      name: '',
      specializationId: '',
      city: '',
      email: '',
      phone: '',
      bio: ''
    };
  }
}
