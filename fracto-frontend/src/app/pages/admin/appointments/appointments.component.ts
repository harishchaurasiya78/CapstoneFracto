import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Appointment Management</h6>
      </div>
      <div class="card-body">
        <!-- Filters -->
        <div class="row mb-3">
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select class="form-select" [(ngModel)]="statusFilter">
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Date Range</label>
            <input type="date" class="form-control" [(ngModel)]="dateFilter">
          </div>
          <div class="col-md-3">
            <label class="form-label">Doctor</label>
            <select class="form-select" [(ngModel)]="doctorFilter">
              <option value="">All Doctors</option>
              <option *ngFor="let doctor of doctors" [value]="doctor.doctorId">
                {{ doctor.name }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">&nbsp;</label>
            <button class="btn btn-primary w-100" (click)="applyFilters()">
              <i class="fas fa-filter me-2"></i>Apply Filters
            </button>
          </div>
        </div>

        <!-- Appointments Table -->
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let appointment of filteredAppointments">
                <td>{{ appointment.patientName }}</td>
                <td>{{ appointment.doctorName }}</td>
                <td>{{ appointment.specializationName }}</td>
                <td>
                  {{ appointment.appointmentDate | date:'shortDate' }}<br>
                  <small class="text-muted">{{ appointment.timeSlot }}</small>
                </td>
                <td>
                  <span class="badge" [ngClass]="getStatusClass(appointment.status)">
                    {{ appointment.status }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" (click)="viewAppointment(appointment)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-success me-1" 
                          (click)="updateStatus(appointment, 'Confirmed')"
                          *ngIf="appointment.status === 'Pending'">
                    <i class="fas fa-check"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-warning me-1" 
                          (click)="updateStatus(appointment, 'Completed')"
                          *ngIf="appointment.status === 'Confirmed'">
                    <i class="fas fa-flag-checkered"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" 
                          (click)="updateStatus(appointment, 'Cancelled')"
                          *ngIf="appointment.status !== 'Cancelled' && appointment.status !== 'Completed'">
                    <i class="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <nav aria-label="Appointments pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item" [class.disabled]="currentPage === 1">
              <a class="page-link" href="#" (click)="changePage(currentPage - 1)">Previous</a>
            </li>
            <li class="page-item" *ngFor="let page of getPageNumbers()" [class.active]="page === currentPage">
              <a class="page-link" href="#" (click)="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" [class.disabled]="currentPage === totalPages">
              <a class="page-link" href="#" (click)="changePage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
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
    
    .pagination .page-link {
      color: #667eea;
    }
    
    .pagination .page-item.active .page-link {
      background-color: #667eea;
      border-color: #667eea;
    }
  `]
})
export class AdminAppointmentsComponent {
  statusFilter = '';
  dateFilter = '';
  doctorFilter = '';
  currentPage = 1;
  itemsPerPage = 10;

  doctors = [
    { doctorId: 1, name: 'Dr. Sarah Johnson' },
    { doctorId: 2, name: 'Dr. Michael Chen' }
  ];

  appointments = [
    {
      appointmentId: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      specializationName: 'Cardiology',
      appointmentDate: new Date('2024-02-15'),
      timeSlot: '10:00 AM',
      status: 'Confirmed'
    },
    {
      appointmentId: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Chen',
      specializationName: 'Dermatology',
      appointmentDate: new Date('2024-02-16'),
      timeSlot: '2:30 PM',
      status: 'Pending'
    }
  ];

  get filteredAppointments() {
    let filtered = this.appointments;
    
    if (this.statusFilter) {
      filtered = filtered.filter(a => a.status === this.statusFilter);
    }
    
    if (this.dateFilter) {
      filtered = filtered.filter(a => 
        a.appointmentDate.toDateString() === new Date(this.dateFilter).toDateString()
      );
    }
    
    if (this.doctorFilter) {
      filtered = filtered.filter(a => 
        this.doctors.find(d => d.doctorId.toString() === this.doctorFilter)?.name === a.doctorName
      );
    }
    
    return filtered;
  }

  get totalPages() {
    return Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  applyFilters() {
    this.currentPage = 1;
    // Additional filter logic can be implemented here
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Confirmed': 'confirmed',
      'Pending': 'pending',
      'Cancelled': 'cancelled',
      'Completed': 'completed'
    };
    return statusMap[status] || 'secondary';
  }

  viewAppointment(appointment: any) {
    // Implement view appointment logic here
    console.log('Viewing appointment:', appointment);
  }

  updateStatus(appointment: any, newStatus: string) {
    if (confirm(`Are you sure you want to change the status to ${newStatus}?`)) {
      appointment.status = newStatus;
      // Implement status update logic here
      console.log('Updating appointment status:', appointment.appointmentId, newStatus);
    }
  }
}
