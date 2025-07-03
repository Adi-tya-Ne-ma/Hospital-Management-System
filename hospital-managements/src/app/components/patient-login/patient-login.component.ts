import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  imports: [],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.css'
})
export class PatientLoginComponent {
  constructor(private router: Router) {}


  login(){
    this.router.navigate(['/patient-dashboard']);
  }
}
