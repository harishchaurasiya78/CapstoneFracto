import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserLogin, UserRegistration, UserUpdate } from '../models/user.model';

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  register(userData: UserRegistration): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/User/register`, userData);
  }

  login(credentials: UserLogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/User/login`, credentials)
      .pipe(
        tap(response => {
          this.setAuth(response.token, response.user);
        })
      );
  }

  logout(): void {
    this.clearAuth();
  }

  updateProfile(userId: number, userData: UserUpdate): Observable<any> {
    return this.http.put(`${environment.apiUrl}/User/${userId}`, userData);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Admin';
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
