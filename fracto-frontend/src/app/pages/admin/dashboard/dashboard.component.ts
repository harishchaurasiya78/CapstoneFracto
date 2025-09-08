import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <!-- Statistics Cards -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Total Users
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ stats.totalUsers }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-users fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Total Doctors
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ stats.totalDoctors }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-user-md fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Total Appointments
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ stats.totalAppointments }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar-check fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Pending Appointments
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ stats.pendingAppointments }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-clock fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Recent Appointments -->
      <div class="col-lg-8">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Recent Appointments</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let appointment of recentAppointments">
                    <td>{{ appointment.patientName }}</td>
                    <td>{{ appointment.doctorName }}</td>
                    <td>{{ appointment.date | date:'shortDate' }}</td>
                    <td>
                      <span class="badge" [ngClass]="getStatusClass(appointment.status)">
                        {{ appointment.status }}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="col-lg-4">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quick Actions</h6>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <button class="btn btn-primary">
                <i class="fas fa-plus me-2"></i>Add New Doctor
              </button>
              <button class="btn btn-success">
                <i class="fas fa-user-plus me-2"></i>Add New User
              </button>
              <button class="btn btn-info">
                <i class="fas fa-chart-bar me-2"></i>Generate Report
              </button>
              <button class="btn btn-warning">
                <i class="fas fa-cog me-2"></i>System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .border-left-primary {
      border-left: 0.25rem solid #4e73df !important;
    }
    
    .border-left-success {
      border-left: 0.25rem solid #1cc88a !important;
    }
    
    .border-left-info {
      border-left: 0.25rem solid #36b9cc !important;
    }
    
    .border-left-warning {
      border-left: 0.25rem solid #f6c23e !important;
    }
    
    .text-primary {
      color: #4e73df !important;
    }
    
    .text-success {
      color: #1cc88a !important;
    }
    
    .text-info {
      color: #36b9cc !important;
    }
    
    .text-warning {
      color: #f6c23e !important;
    }
    
    .text-gray-800 {
      color: #5a5c69 !important;
    }
    
    .text-gray-300 {
      color: #dddfeb !important;
    }
    
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
  `]
})
export class DashboardComponent {
  stats = {
    totalUsers: 1250,
    totalDoctors: 89,
    totalAppointments: 3420,
    pendingAppointments: 156
  };

  recentAppointments = [
    {
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date('2024-02-15'),
      status: 'Confirmed'
    },
    {
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Chen',
      date: new Date('2024-02-16'),
      status: 'Pending'
    },
    {
      patientName: 'Bob Wilson',
      doctorName: 'Dr. Emily Davis',
      date: new Date('2024-02-17'),
      status: 'Confirmed'
    }
  ];

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Confirmed': 'confirmed',
      'Pending': 'pending',
      'Cancelled': 'cancelled'
    };
    return statusMap[status] || 'secondary';
  }
}
