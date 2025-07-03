import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service'; // Adjust the path to your AuthService

@Component({
  selector: 'app-dashboard-redirect',
  standalone: true, // Mark this component as standalone
  template: `
    <p>Redirecting...</p>
  ` // This won't be visible as the redirection happens immediately
})
export class DashboardRedirectComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userType = this.authService.getUserType(); // Fetch user type from AuthService
    if (userType === 'patient') {
      this.router.navigate(['/patient-dashboard']);
    } else if (userType === 'doctor') {
      this.router.navigate(['/doctor-dashboard']);
    } else {
      this.router.navigate(['/login']); // Redirect to login if user type is unknown
    }
  }
}