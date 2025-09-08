import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>My Appointments</h2>
            <button class="btn btn-primary" routerLink="/doctors">
              <i class="fas fa-plus me-2"></i>Book New Appointment
            </button>
          </div>

          <!-- Appointments List -->
          <div class="row g-4">
            <div class="col-md-6 col-lg-4" *ngFor="let appointment of appointments">
              <div class="card appointment-card h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start mb-3">
                    <h6 class="card-title mb-0">{{ appointment.doctorName }}</h6>
                    <span class="badge" [ngClass]="getStatusClass(appointment.status)">
                      {{ appointment.status }}
                    </span>
                  </div>
                  
                  <p class="text-muted mb-2">{{ appointment.specializationName }}</p>
                  <p class="mb-2">
                    <i class="fas fa-map-marker-alt me-2"></i>{{ appointment.city }}
                  </p>
                  
                  <div class="row mb-3">
                    <div class="col-6">
                      <small class="text-muted">Date</small>
                      <p class="mb-0 fw-bold">{{ appointment.appointmentDate | date:'shortDate' }}</p>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">Time</small>
                      <p class="mb-0 fw-bold">{{ appointment.timeSlot }}</p>
                    </div>
                  </div>
                  
                  <p class="card-text" *ngIf="appointment.notes">
                    <strong>Notes:</strong> {{ appointment.notes }}
                  </p>
                  
                  <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-sm btn-outline-danger" 
                            (click)="cancelAppointment(appointment.appointmentId)"
                            *ngIf="appointment.status === 'Confirmed' || appointment.status === 'Pending'">
                      Cancel
                    </button>
                    <button class="btn btn-sm btn-outline-primary" 
                            [routerLink]="['/doctor', appointment.doctorId]">
                      View Doctor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Appointments Message -->
          <div class="text-center mt-5" *ngIf="appointments.length === 0">
            <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No appointments yet</h5>
            <p class="text-muted">Book your first appointment with a doctor</p>
            <button class="btn btn-primary" routerLink="/doctors">
              Find Doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appointment-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .appointment-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
    
    .badge {
      font-size: 0.75rem;
      padding: 0.5em 0.75em;
    }
    
    .badge.confirmed {
      background-color: #28a745;
    }
    
    .badge.pending {
      background-color: #ffc107;
      color: #212529;
    }
    
    .badge.cancelled {
      background-color: #dc3545;
    }
    
    .badge.completed {
      background-color: #6c757d;
    }
    
    .card {
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
    }
  `]
})
export class AppointmentsComponent {
  appointments = [
    {
      appointmentId: 1,
      doctorName: 'Dr. Sarah Johnson',
      specializationName: 'Cardiology',
      city: 'New York',
      appointmentDate: new Date('2024-02-15'),
      timeSlot: '10:00 AM',
      status: 'Confirmed',
      notes: 'Annual checkup',
      doctorId: 1
    },
    {
      appointmentId: 2,
      doctorName: 'Dr. Michael Chen',
      specializationName: 'Dermatology',
      city: 'Los Angeles',
      appointmentDate: new Date('2024-02-20'),
      timeSlot: '2:30 PM',
      status: 'Pending',
      notes: 'Skin consultation',
      doctorId: 2
    }
  ];

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Confirmed': 'confirmed',
      'Pending': 'pending',
      'Cancelled': 'cancelled',
      'Completed': 'completed'
    };
    return statusMap[status] || 'secondary';
  }

  cancelAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      // Implement cancellation logic here
      console.log('Cancelling appointment:', appointmentId);
    }
  }
}
