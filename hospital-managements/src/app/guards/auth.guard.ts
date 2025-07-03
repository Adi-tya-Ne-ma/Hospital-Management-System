import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

// Auth guard to check if user is logged in
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Store the attempted URL for redirecting
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Role-based guard for patient routes
export const patientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.canAccessDashboard('patient')) {
    return true;
  }

  if (authService.isLoggedIn()) {
    // Redirect to doctor dashboard if logged in as doctor
    //alert('You are logged in as a doctor.');
    router.navigate(['/doctor-dashboard']);
  } else {
    router.navigate(['/login']);
  }
  return false;
};

// Role-based guard for doctor routes
export const doctorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.canAccessDashboard('doctor')) {
    return true;
  }

  if (authService.isLoggedIn()) {
    // Redirect to patient dashboard if logged in as patient
    router.navigate(['/patient-dashboard']);
  } else {
    router.navigate(['/login']);
  }
  return false;
};