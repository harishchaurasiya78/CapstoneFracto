import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
  { 
    path: 'doctors', 
    loadComponent: () => import('./pages/doctors/doctors.component').then(m => m.DoctorsComponent) 
  },
  { 
    path: 'doctor/:id', 
    loadComponent: () => import('./pages/doctor-detail/doctor-detail.component').then(m => m.DoctorDetailComponent) 
  },
  { 
    path: 'appointments', 
    loadComponent: () => import('./pages/appointments/appointments.component').then(m => m.AppointmentsComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'book-appointment/:doctorId', 
    loadComponent: () => import('./pages/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent) },
      { path: 'doctors', loadComponent: () => import('./pages/admin/doctors/doctors.component').then(m => m.AdminDoctorsComponent) },
      { path: 'appointments', loadComponent: () => import('./pages/admin/appointments/appointments.component').then(m => m.AdminAppointmentsComponent) }
    ]
  },
  { path: '**', redirectTo: '/home' }
];
