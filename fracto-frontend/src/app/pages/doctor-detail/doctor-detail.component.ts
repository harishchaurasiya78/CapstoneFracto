import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <!-- Doctor Info -->
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 text-center">
                  <img [src]="doctor.profileImagePath || 'assets/images/default-doctor.jpg'" 
                       [alt]="doctor.name" 
                       class="doctor-profile-image">
                </div>
                <div class="col-md-8">
                  <h2 class="card-title">{{ doctor.name }}</h2>
                  <p class="text-muted mb-2">{{ doctor.specializationName }}</p>
                  <p class="mb-2">
                    <i class="fas fa-map-marker-alt me-2"></i>{{ doctor.city }}
                  </p>
                  <div class="rating mb-3">
                    <span *ngFor="let star of getStars(doctor.rating)" class="star">
                      <i class="fas fa-star"></i>
                    </span>
                    <span class="ms-2">{{ doctor.rating }}/5 ({{ totalRatings }} reviews)</span>
                  </div>
                  <p class="card-text">{{ doctor.bio }}</p>
                  <div class="d-flex gap-2">
                    <button class="btn btn-primary" [routerLink]="['/book-appointment', doctor.doctorId]">
                      Book Appointment
                    </button>
                    <button class="btn btn-outline-primary" (click)="showReviews = !showReviews">
                      {{ showReviews ? 'Hide' : 'Show' }} Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="card" *ngIf="showReviews">
            <div class="card-header">
              <h5 class="mb-0">Patient Reviews</h5>
            </div>
            <div class="card-body">
              <div class="review-item mb-3" *ngFor="let review of reviews">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{{ review.username }}</strong>
                    <div class="rating">
                      <span *ngFor="let star of getStars(review.rating)" class="star">
                        <i class="fas fa-star"></i>
                      </span>
                    </div>
                  </div>
                  <small class="text-muted">{{ review.createdAt | date }}</small>
                </div>
                <p class="mt-2 mb-0">{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Contact Info -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Contact Information</h6>
            </div>
            <div class="card-body">
              <p *ngIf="doctor.email">
                <i class="fas fa-envelope me-2"></i>{{ doctor.email }}
              </p>
              <p *ngIf="doctor.phone">
                <i class="fas fa-phone me-2"></i>{{ doctor.phone }}
              </p>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Quick Stats</h6>
            </div>
            <div class="card-body">
              <div class="row text-center">
                <div class="col-6">
                  <h4 class="text-primary">{{ doctor.rating }}</h4>
                  <small class="text-muted">Rating</small>
                </div>
                <div class="col-6">
                  <h4 class="text-success">{{ totalRatings }}</h4>
                  <small class="text-muted">Reviews</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doctor-profile-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #667eea;
    }
    
    .rating .star {
      color: #ffc107;
      font-size: 1.2em;
    }
    
    .review-item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
    }
    
    .review-item:last-child {
      border-bottom: none;
    }
    
    .card {
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
    }
    
    .btn-outline-primary {
      border-color: #667eea;
      color: #667eea;
    }
    
    .btn-outline-primary:hover {
      background-color: #667eea;
      border-color: #667eea;
    }
  `]
})
export class DoctorDetailComponent {
  showReviews = false;
  
  doctor = {
    doctorId: 1,
    name: 'Dr. Sarah Johnson',
    specializationName: 'Cardiology',
    city: 'New York',
    rating: 4.8,
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating cardiovascular diseases. She specializes in preventive cardiology, heart failure, and interventional cardiology procedures.',
    profileImagePath: null,
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567'
  };

  totalRatings = 127;

  reviews = [
    {
      username: 'John D.',
      rating: 5,
      comment: 'Excellent doctor! Very thorough and caring. Highly recommend.',
      createdAt: new Date('2024-01-15')
    },
    {
      username: 'Maria S.',
      rating: 5,
      comment: 'Dr. Johnson is amazing. She took the time to explain everything clearly.',
      createdAt: new Date('2024-01-10')
    }
  ];

  getStars(rating: number): number[] {
    return Array.from({length: Math.floor(rating)}, (_, i) => i);
  }
}
