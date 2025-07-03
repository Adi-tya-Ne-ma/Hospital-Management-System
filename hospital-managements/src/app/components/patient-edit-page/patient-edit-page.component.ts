import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../service/patient-service/patient.service';

@Component({
  selector: 'app-patient-edit-page',
  imports: [FormsModule],
  templateUrl: './patient-edit-page.component.html',
  styleUrl: './patient-edit-page.component.css'
})
export class PatientEditPageComponent {
  patient = {
    username: '',
    name: '',
    phoneNumber: '',
    address: ''
  };

  constructor(
    private router: Router,
    private patientService: PatientService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['patient']) {
      this.patient = { ...nav.extras.state['patient'] };
    } else if (history.state?.patient) {
      this.patient = { ...history.state.patient };
    }
  }

  save() {
    // Call backend to update patient profile
    this.patientService.updatePatientProfile(this.patient.username, {
      username: this.patient.username, // <-- Add this line!
      name: this.patient.name,
      phoneNumber: this.patient.phoneNumber,
      address: this.patient.address
    }).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/patient-dashboard']);
      }
    });
  }
}
