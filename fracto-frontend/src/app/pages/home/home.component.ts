import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero-section text-white text-center py-5">
      <div class="container">
        <div class="row align-items-center min-vh-75">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">
              Book Your Doctor Appointment Online
            </h1>
            <p class="lead mb-4">
              Find and book appointments with the best doctors in your area. 
              Quick, easy, and convenient healthcare at your fingertips.
            </p>
            <div class="d-flex gap-3 justify-content-center justify-content-lg-start">
              <a routerLink="/doctors" class="btn btn-primary btn-lg">
                Find Doctors
              </a>
              <a routerLink="/register" class="btn btn-outline-light btn-lg">
                Get Started
              </a>
            </div>
          </div>
          <div class="col-lg-6">
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold">Why Choose Fracto?</h2>
          <p class="lead text-muted">We make healthcare accessible and convenient</p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon mb-3">
                  <i class="fas fa-search fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">Easy Search</h5>
                <p class="card-text">
                  Find doctors by specialization, location, and availability. 
                  Filter by ratings and reviews to make informed decisions.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon mb-3">
                  <i class="fas fa-calendar-check fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">Quick Booking</h5>
                <p class="card-text">
                  Book appointments in seconds with our streamlined process. 
                  Choose your preferred time slot and get instant confirmation.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon mb-3">
                  <i class="fas fa-star fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">Verified Doctors</h5>
                <p class="card-text">
                  All doctors are verified professionals with proper credentials. 
                  Read reviews and ratings from other patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold">How It Works</h2>
          <p class="lead text-muted">Simple steps to book your appointment</p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-3 text-center">
            <div class="step-number mb-3">1</div>
            <h5>Search Doctors</h5>
            <p class="text-muted">Find doctors by specialization and location</p>
          </div>
          
          <div class="col-md-3 text-center">
            <div class="step-number mb-3">2</div>
            <h5>Choose Time</h5>
            <p class="text-muted">Select your preferred appointment time</p>
          </div>
          
          <div class="col-md-3 text-center">
            <div class="step-number mb-3">3</div>
            <h5>Book Appointment</h5>
            <p class="text-muted">Confirm your booking instantly</p>
          </div>
          
          <div class="col-md-3 text-center">
            <div class="step-number mb-3">4</div>
            <h5>Get Confirmation</h5>
            <p class="text-muted">Receive confirmation and reminders</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white text-center">
      <div class="container">
        <h2 class="display-5 fw-bold mb-4">Ready to Get Started?</h2>
        <p class="lead mb-4">
          Join thousands of patients who trust Fracto for their healthcare needs
        </p>
        <a routerLink="/register" class="btn btn-light btn-lg">
          Sign Up Now
        </a>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 75vh;
      display: flex;
      align-items: center;
    }
    
    .min-vh-75 {
      min-height: 75vh;
    }
    
    .feature-icon {
      color: #007bff;
    }
    
    .step-number {
      width: 60px;
      height: 60px;
      background: #007bff;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto;
    }
    
    .card {
      transition: transform 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class HomeComponent {}
