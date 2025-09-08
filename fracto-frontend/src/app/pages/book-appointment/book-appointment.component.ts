import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Book Appointment</h3>
            </div>
            <div class="card-body">
              <!-- Doctor Info -->
              <div class="row mb-4">
                <div class="col-md-3 text-center">
                  <img [src]="doctor.profileImagePath || 'assets/images/default-doctor.jpg'" 
                       [alt]="doctor.name" 
                       class="doctor-avatar">
                </div>
                <div class="col-md-9">
                  <h5>{{ doctor.name }}</h5>
                  <p class="text-muted mb-1">{{ doctor.specializationName }}</p>
                  <p class="mb-1">
                    <i class="fas fa-map-marker-alt me-2"></i>{{ doctor.city }}
                  </p>
                  <div class="rating">
                    <span *ngFor="let star of getStars(doctor.rating)" class="star">
                      <i class="fas fa-star"></i>
                    </span>
                    <span class="ms-2">{{ doctor.rating }}/5</span>
                  </div>
                </div>
              </div>

              <form (ngSubmit)="bookAppointment()">
                <!-- Date Selection -->
                <div class="mb-3">
                  <label class="form-label">Appointment Date</label>
                  <input type="date" 
                         class="form-control" 
                         [(ngModel)]="appointmentDate" 
                         name="appointmentDate"
                         [min]="minDate"
                         required>
                </div>

                <!-- Time Slot Selection -->
                <div class="mb-3">
                  <label class="form-label">Time Slot</label>
                  <div class="row g-2">
                    <div class="col-md-4" *ngFor="let slot of availableTimeSlots">
                      <button type="button" 
                              class="btn w-100" 
                              [ngClass]="selectedTimeSlot === slot.timeSlot ? 'btn-primary' : 'btn-outline-primary'"
                              (click)="selectTimeSlot(slot)"
                              [disabled]="!slot.isAvailable">
                        {{ slot.timeSlot }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div class="mb-3">
                  <label class="form-label">Notes (Optional)</label>
                  <textarea class="form-control" 
                            rows="3" 
                            [(ngModel)]="notes" 
                            name="notes"
                            placeholder="Any special requirements or notes for the doctor..."></textarea>
                </div>

                <!-- Submit Button -->
                <div class="d-grid">
                  <button type="submit" 
                          class="btn btn-primary btn-lg" 
                          [disabled]="!canBook()">
                    <i class="fas fa-calendar-check me-2"></i>
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doctor-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #667eea;
    }
    
    .rating .star {
      color: #ffc107;
      font-size: 1.1em;
    }
    
    .card {
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    
    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }
  `]
})
export class BookAppointmentComponent {
  appointmentDate = '';
  selectedTimeSlot = '';
  notes = '';
  
  doctor = {
    doctorId: 1,
    name: 'Dr. Sarah Johnson',
    specializationName: 'Cardiology',
    city: 'New York',
    rating: 4.8,
    profileImagePath: null
  };

  availableTimeSlots = [
    { timeSlot: '9:00 AM', isAvailable: true },
    { timeSlot: '10:00 AM', isAvailable: true },
    { timeSlot: '11:00 AM', isAvailable: false },
    { timeSlot: '2:00 PM', isAvailable: true },
    { timeSlot: '3:00 PM', isAvailable: true },
    { timeSlot: '4:00 PM', isAvailable: true }
  ];

  get minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  selectTimeSlot(slot: any) {
    if (slot.isAvailable) {
      this.selectedTimeSlot = slot.timeSlot;
    }
  }

  canBook(): boolean {
    return !!(this.appointmentDate && this.selectedTimeSlot);
  }

  bookAppointment() {
    if (this.canBook()) {
      // Implement booking logic here
      console.log('Booking appointment:', {
        doctorId: this.doctor.doctorId,
        date: this.appointmentDate,
        timeSlot: this.selectedTimeSlot,
        notes: this.notes
      });
      
      // Show success message and redirect
      alert('Appointment booked successfully!');
    }
  }

  getStars(rating: number): number[] {
    return Array.from({length: Math.floor(rating)}, (_, i) => i);
  }
}
