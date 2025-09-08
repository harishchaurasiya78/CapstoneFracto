import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Login</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onLogin()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" name="username" [(ngModel)]="loginData.username" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" name="password" [(ngModel)]="loginData.password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
              <div class="text-center mt-3">
                <a routerLink="/register">Don't have an account? Register here</a>
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
export class LoginComponent {
  
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    const apiUrl = 'http://localhost:5000/api/auth/login';

    this.http.post(apiUrl, this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful!', response);
        this.router.navigate(['/admin/dashboard']);
      },
      (error: any) => {
        console.error('Login failed!', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}