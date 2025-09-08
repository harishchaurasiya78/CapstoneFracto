import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand" routerLink="/home">
          <i class="fas fa-heartbeat me-2"></i>
          Fracto
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/doctors" routerLinkActive="active">Find Doctors</a>
            </li>
            <li class="nav-item" *ngIf="authService.isAuthenticated$ | async">
              <a class="nav-link" routerLink="/appointments" routerLinkActive="active">My Appointments</a>
            </li>
            <li class="nav-item" *ngIf="(authService.isAuthenticated$ | async) && authService.isAdmin()">
              <a class="nav-link" routerLink="/admin" routerLinkActive="active">Admin</a>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <ng-container *ngIf="!(authService.isAuthenticated$ | async); else authenticatedUser">
              <li class="nav-item">
                <a class="nav-link" routerLink="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/register">Register</a>
              </li>
            </ng-container>
            
            <ng-template #authenticatedUser>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  {{ (authService.currentUser$ | async)?.username }}
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" routerLink="/profile">Profile</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" (click)="logout()">Logout</a></li>
                </ul>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .nav-link {
      font-weight: 500;
    }
    
    .nav-link.active {
      color: #007bff !important;
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
