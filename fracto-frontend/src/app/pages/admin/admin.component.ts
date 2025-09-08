import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/dashboard" routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-2"></i>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/users" routerLinkActive="active">
                  <i class="fas fa-users me-2"></i>
                  Users
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/doctors" routerLinkActive="active">
                  <i class="fas fa-user-md me-2"></i>
                  Doctors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/admin/appointments" routerLinkActive="active">
                  <i class="fas fa-calendar-check me-2"></i>
                  Appointments
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Admin Panel</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Print</button>
              </div>
            </div>
          </div>
          
          <!-- Router outlet for child routes -->
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      min-height: calc(100vh - 56px);
      box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }
    
    .sidebar .nav-link {
      color: #333;
      font-weight: 500;
      padding: 0.75rem 1rem;
      border-radius: 0.375rem;
      margin: 0.25rem 0.5rem;
    }
    
    .sidebar .nav-link:hover {
      background-color: #e9ecef;
    }
    
    .sidebar .nav-link.active {
      background-color: #667eea;
      color: white;
    }
    
    .sidebar .nav-link i {
      width: 20px;
    }
    
    main {
      background-color: #f8f9fa;
      min-height: calc(100vh - 56px);
    }
  `]
})
export class AdminComponent {}
