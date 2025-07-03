import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  name: string;
  age: number;
  phoneNumber: string;
  username: string;
  userType: 'patient' | 'doctor';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly baseUrl = 'http://localhost:5100/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        localStorage.removeItem('currentUser');
      }
    }
    return null;
  }

  
  login(username: string, password: string, userType: 'patient' | 'doctor'): Observable<User> {
  const loginData = {
    username: username,
    password: password,
    role: userType
  };

  return this.http.post<any>(`${this.baseUrl}/auth/login`, loginData).pipe(
    tap(response => {
      const userWithToken = {
        ...response, // Assuming response contains { token, role }
        username,
        userType
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(userWithToken));
      this.currentUserSubject.next(userWithToken);

      this.router.navigate([this.getDashboardRoute(userType)]);
    }),
    catchError(error => {
      console.error('Login failed', error);
      return throwError(() => new Error('Login failed. Please check your credentials.'));
    })
  );
}

  signup(userData: any, userType: 'patient' | 'doctor'): Observable<User> {
    const signupData = {
      name: userData.name,
      username: userData.username,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      role: userType
    };
    return this.http.post<User>(`${this.baseUrl}/auth/signup`, signupData)
      .pipe(
        tap(user => {
          // Add user type to the response
          const userWithType = { ...user, type: userType };
          
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(userWithType));
          this.currentUserSubject.next(userWithType);
          
          // Navigate to appropriate dashboard
          this.router.navigate([this.getDashboardRoute(userType)]);
          return userWithType;
        }),
        catchError(error => {
          console.error('Signup error (status):', error.status);
          console.error('Signup error (body):', error.error);
          return throwError(() => new Error('Registration failed. Please try again.'));
        })
      );

  }


  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getUserType(): 'patient' | 'doctor' | null {
    return this.currentUserValue?.userType || null;
  }

  getDashboardRoute(userType: 'patient' | 'doctor'): string {
    return userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard';
  }

  // Guard function for route protection
  canAccessDashboard(requiredType: 'patient' | 'doctor'): boolean {
    const user = this.currentUserValue;
    return !!user && user.userType === requiredType;
  }

  
}