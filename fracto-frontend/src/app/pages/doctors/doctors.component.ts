import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <!-- Search Section -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Find Doctors</h4>
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label">City</label>
                  <select class="form-select" [(ngModel)]="selectedCity">
                    <option value="">All Cities</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Houston">Houston</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Specialization</label>
                  <select class="form-select" [(ngModel)]="selectedSpecialization">
                    <option value="">All Specializations</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Min Rating</label>
                  <select class="form-select" [(ngModel)]="minRating">
                    <option value="0">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">&nbsp;</label>
                  <button class="btn btn-primary w-100" (click)="searchDoctors()">
                    <i class="fas fa-search me-2"></i>Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let doctor of doctors">
          <div class="card doctor-card h-100">
            <div class="card-body">
              <div class="text-center mb-3">
                <img [src]="doctor.profileImagePath || 'assets/images/default-doctor.jpg'" 
                     [alt]="doctor.name" 
                     class="doctor-avatar">
              </div>
              <h5 class="card-title text-center">{{ doctor.name }}</h5>
              <p class="card-text text-muted text-center">{{ doctor.specializationName }}</p>
              <p class="card-text text-center">
                <i class="fas fa-map-marker-alt me-1"></i>{{ doctor.city }}
              </p>
              <div class="text-center mb-3">
                <div class="rating">
                  <span *ngFor="let star of getStars(doctor.rating)" class="star">
                    <i class="fas fa-star"></i>
                  </span>
                  <span class="ms-2">{{ doctor.rating }}/5</span>
                </div>
              </div>
              <p class="card-text">{{ doctor.bio || 'No bio available' }}</p>
              <div class="d-grid">
                <button class="btn btn-outline-primary" [routerLink]="['/doctor', doctor.doctorId]">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div class="text-center mt-5" *ngIf="doctors.length === 0">
        <i class="fas fa-search fa-3x text-muted mb-3"></i>
        <h5 class="text-muted">No doctors found</h5>
        <p class="text-muted">Try adjusting your search criteria</p>
      </div>
    </div>
  `,
  styles: [`
    .doctor-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
    
    .doctor-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #667eea;
    }
    
    .rating .star {
      color: #ffc107;
      font-size: 1.1em;
    }
    
    .btn-outline-primary {
      border-color: #667eea;
      color: #667eea;
    }
    
    .btn-outline-primary:hover {
      background-color: #667eea;
      border-color: #667eea;
    }
    
    .card {
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class DoctorsComponent {
  selectedCity = '';
  selectedSpecialization = '';
  minRating = 0;
  
  doctors = [
    {
      doctorId: 1,
      name: 'Dr. Sarah Johnson',
      specializationName: 'Cardiology',
      city: 'New York',
      rating: 4.8,
      bio: 'Experienced cardiologist with over 15 years of practice.',
      profileImagePath: null
    },
    {
      doctorId: 2,
      name: 'Dr. Michael Chen',
      specializationName: 'Dermatology',
      city: 'Los Angeles',
      rating: 4.6,
      bio: 'Board-certified dermatologist specializing in skin cancer prevention.',
      profileImagePath: null
    }
  ];

  searchDoctors() {
    // Implement search logic here
    console.log('Searching doctors with:', {
      city: this.selectedCity,
      specialization: this.selectedSpecialization,
      minRating: this.minRating
    });
  }

  getStars(rating: number): number[] {
    return Array.from({length: Math.floor(rating)}, (_, i) => i);
  }
}
