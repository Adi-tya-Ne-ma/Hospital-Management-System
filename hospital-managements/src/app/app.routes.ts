import { Routes } from '@angular/router';
import { authGuard, patientGuard, doctorGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    loadComponent: () => import('./components/doctor-cards/doctor-cards.component').then(m => m.DoctorCardsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  // {
  //   path: 'patient-login',
  //   loadComponent: () => import('./components/patient-login/patient-login.component').then(m => m.PatientLoginComponent)
  // },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  // { path: 'patient-signup', loadComponent: () => import('./components/patient-signup/patient-signup.component').then(m => m.PatientSignupComponent) },

  // Protected patient routes
  {
    path: 'patient-dashboard',
    loadComponent: () => import('./components/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent),
    canActivate: [patientGuard]
  },
  {
    path: 'doctor-prescription',
    loadComponent: () => import('./components/doctor-prescription/doctor-prescription.component').then(m => m.DoctorPrescriptionComponent)
  },
  {
    path: 'patient-prescription',
    loadComponent: () => import('./components/patient-prescription/patient-prescription.component').then(m => m.PatientPrescriptionComponent)
  },

  // Protected doctor routes
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./components/Doctor-dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [doctorGuard]
  },
  {
    path: 'appointments',
    loadComponent: () => import('./components/appoitment/appoitment.component').then(m => m.AppoitmentComponent),
    canActivate: [patientGuard]
  },
  {
    path: 'edit-doctor-profile',
    loadComponent: () => import('./components/edit-page/edit-page.component').then(m => m.EditPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'edit-patient-profile',
    loadComponent: () => import('./components/patient-edit-page/patient-edit-page.component').then(m => m.PatientEditPageComponent)
  },

  // Shared protected routes

  // Lazy loading video chat component
  {
    path: 'video-chat',
    loadComponent: () => import('./components/video-chat/video-chat.component').then(m => m.VideoChatComponent),
    canActivate: [authGuard]
  },

  {
    path: 'edit-page-patient',
    loadComponent: () => import('./components/patient-edit-page/patient-edit-page.component').then(m => m.PatientEditPageComponent)
  },
  {
    path: 'doctor-search-results',
    loadComponent: () => import('./components/doctor-search-results/doctor-search-results.component').then(m => m.DoctorSearchResultsComponent)
  },

  // Fallback route
  { path: '**', redirectTo: '' }
];