import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Register</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onRegister()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" name="username" [(ngModel)]="registerData.username" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" name="email" [(ngModel)]="registerData.email" required>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone</label>
                  <input type="tel" class="form-control" id="phone" name="phone" [(ngModel)]="registerData.phone" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" name="password" [(ngModel)]="registerData.password" required>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" [(ngModel)]="registerData.confirmPassword" required>
                </div>
                <div *ngIf="passwordMismatch" class="alert alert-danger">Passwords do not match.</div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
              </form>
              <div class="text-center mt-3">
                <a routerLink="/login">Already have an account? Login here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: none;
    }
    
    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom: none;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      padding: 12px;
      font-weight: 600;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }
  `]
})
export class RegisterComponent {
  
  registerData = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  passwordMismatch = false;

  constructor(private http: HttpClient, private router: Router) { }

  onRegister() {
    this.passwordMismatch = false;
    
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.passwordMismatch = true;
      console.log('Passwords do not match!');
      return;
    }

    const apiUrl = 'http://localhost:5000/api/auth/register'; 

    this.http.post(apiUrl, this.registerData).subscribe(
      (response: any) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Registration failed!', error);
        alert('Registration failed. Please check the console for details.');
      }
    );
  }
}