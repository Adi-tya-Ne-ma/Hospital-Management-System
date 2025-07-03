import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-appoitment',
  templateUrl: './appoitment.component.html',
  styleUrls: ['./appoitment.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AppoitmentComponent {
  @Input() doctorUsername: string = ''; // Set this from the parent/card
  appointmentData = {
    date: '',
    time: ''
  };

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['doctorUsername']) {
      this.doctorUsername = nav.extras.state['doctorUsername'];
    } else if (history.state?.doctorUsername) {
      this.doctorUsername = history.state.doctorUsername;
    }
  }

  bookAppointment() {
    const user = this.authService.currentUserValue;
    if (!user || user.userType !== 'patient') {
      alert('You must be logged in as a patient to book an appointment.');
      return;
    }

    const appointmentPayload = {
      doctorUsername: this.doctorUsername,
      patientUsername: user.username,
      date: this.appointmentData.date,
      time: this.appointmentData.time,
      // status: 'pending'
    };

    console.log('Booking appointment with payload:', appointmentPayload);

    this.appointmentService.bookAppointment(appointmentPayload).subscribe({
      next: () => {
        alert("Your appointment has been booked successfully!");
        this.router.navigate(['/patient-dashboard']);
      }
    });
  }
}