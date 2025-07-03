import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userName = '';
  password = '';
  userType: 'doctor' | 'patient' | '' = '';
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      const userType = this.authService.getUserType();
      if (userType) {
        this.router.navigate([this.authService.getDashboardRoute(userType)]);
      }
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userType']) {
        this.userType = params['userType'];
      }
    });

    // Pre-fill username and userType if passed from signup
    const navState = history.state;
    if (navState && navState.username) {
      this.userName = navState.username;
      this.userType = navState.userType;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.errorMessage = '';

    // Validate form inputs
    if (!this.userName || !this.password || !this.userType) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;

    // Call auth service with credentials
    this.authService.login(
      this.userName, 
      this.password, 
      this.userType as 'patient' | 'doctor'
    ).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        // Navigate to appropriate dashboard based on user type
        this.router.navigate([this.authService.getDashboardRoute(user.userType)]);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = err.message || 'Invalid username or password';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}