import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow">
      <div class="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 class="m-0 font-weight-bold text-primary">User Management</h6>
        <button class="btn btn-primary" (click)="showAddUserModal = true">
          <i class="fas fa-plus me-2"></i>Add New User
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>
                  <span class="badge" [ngClass]="getRoleClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td>{{ user.createdAt | date:'shortDate' }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" (click)="editUser(user)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteUser(user.userId)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div class="modal fade" [class.show]="showAddUserModal" [style.display]="showAddUserModal ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingUser ? 'Edit User' : 'Add New User' }}</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="saveUser()">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" [(ngModel)]="userForm.username" name="username" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" [(ngModel)]="userForm.email" name="email" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control" [(ngModel)]="userForm.phone" name="phone" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select class="form-select" [(ngModel)]="userForm.role" name="role" required>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div class="mb-3" *ngIf="!editingUser">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" [(ngModel)]="userForm.password" name="password" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="button" class="btn btn-primary" (click)="saveUser()">Save</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
    }
    
    .badge.admin {
      background-color: #dc3545;
    }
    
    .badge.user {
      background-color: #28a745;
    }
    
    .modal {
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .modal.show {
      display: block;
    }
  `]
})
export class UsersComponent {
  showAddUserModal = false;
  editingUser: any = null;
  
  userForm = {
    username: '',
    email: '',
    phone: '',
    role: 'User',
    password: ''
  };

  users = [
    {
      userId: 1,
      username: 'admin',
      email: 'admin@fracto.com',
      phone: '+1 (555) 123-4567',
      role: 'Admin',
      createdAt: new Date('2024-01-01')
    },
    {
      userId: 2,
      username: 'john_doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 234-5678',
      role: 'User',
      createdAt: new Date('2024-01-15')
    }
  ];

  getRoleClass(role: string): string {
    return role === 'Admin' ? 'admin' : 'user';
  }

  editUser(user: any) {
    this.editingUser = user;
    this.userForm = { ...user, password: '' };
    this.showAddUserModal = true;
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      // Implement delete logic here
      console.log('Deleting user:', userId);
    }
  }

  saveUser() {
    // Implement save logic here
    console.log('Saving user:', this.userForm);
    this.closeModal();
  }

  closeModal() {
    this.showAddUserModal = false;
    this.editingUser = null;
    this.userForm = {
      username: '',
      email: '',
      phone: '',
      role: 'User',
      password: ''
    };
  }
}
