import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">My Profile</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="updateProfile()">
                <!-- Profile Picture -->
                <div class="text-center mb-4">
                  <div class="profile-picture-container">
                    <img [src]="user.profileImagePath || 'assets/images/default-avatar.jpg'" 
                         [alt]="user.username" 
                         class="profile-picture">
                    <button type="button" class="btn btn-sm btn-outline-primary change-photo-btn">
                      <i class="fas fa-camera"></i>
                    </button>
                  </div>
                </div>

                <!-- Username (Read-only) -->
                <div class="mb-3">
                  <label class="form-label">Username</label>
                  <input type="text" 
                         class="form-control" 
                         [value]="user.username" 
                         readonly>
                  <small class="text-muted">Username cannot be changed</small>
                </div>

                <!-- Email -->
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" 
                         class="form-control" 
                         [(ngModel)]="user.email" 
                         name="email"
                         required>
                </div>

                <!-- Phone -->
                <div class="mb-3">
                  <label class="form-label">Phone</label>
                  <input type="tel" 
                         class="form-control" 
                         [(ngModel)]="user.phone" 
                         name="phone"
                         required>
                </div>

                <!-- Role (Read-only) -->
                <div class="mb-3">
                  <label class="form-label">Role</label>
                  <input type="text" 
                         class="form-control" 
                         [value]="user.role" 
                         readonly>
                </div>

                <!-- Member Since -->
                <div class="mb-3">
                  <label class="form-label">Member Since</label>
                  <input type="text" 
                         class="form-control" 
                         [value]="user.createdAt | date:'longDate'" 
                         readonly>
                </div>

                <!-- Submit Button -->
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-2"></i>Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Change Password Section -->
          <div class="card mt-4">
            <div class="card-header">
              <h5 class="mb-0">Change Password</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="changePassword()">
                <div class="mb-3">
                  <label class="form-label">Current Password</label>
                  <input type="password" 
                         class="form-control" 
                         [(ngModel)]="passwordData.currentPassword" 
                         name="currentPassword"
                         required>
                </div>
                <div class="mb-3">
                  <label class="form-label">New Password</label>
                  <input type="password" 
                         class="form-control" 
                         [(ngModel)]="passwordData.newPassword" 
                         name="newPassword"
                         required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Confirm New Password</label>
                  <input type="password" 
                         class="form-control" 
                         [(ngModel)]="passwordData.confirmPassword" 
                         name="confirmPassword"
                         required>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-outline-primary">
                    <i class="fas fa-key me-2"></i>Change Password
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
    .profile-picture-container {
      position: relative;
      display: inline-block;
    }
    
    .profile-picture {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #667eea;
    }
    
    .change-photo-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
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
    
    .form-control[readonly] {
      background-color: #f8f9fa;
    }
  `]
})
export class ProfileComponent {
  user = {
    username: 'john_doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    role: 'User',
    createdAt: new Date('2024-01-01'),
    profileImagePath: null
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  updateProfile() {
    // Implement profile update logic here
    console.log('Updating profile:', this.user);
    alert('Profile updated successfully!');
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    // Implement password change logic here
    console.log('Changing password:', this.passwordData);
    alert('Password changed successfully!');
    
    // Reset form
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}
