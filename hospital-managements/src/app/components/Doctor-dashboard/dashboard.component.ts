import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoctorService, Appointment, Doctor } from '../../service/doctor-service/doctor.service';
import { AuthService } from '../../service/auth/auth.service';
import { SignalingService } from '../../service/video-call/signaling.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit {
  doctor: Doctor | null = null;
  appointments: Appointment[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private doctorService: DoctorService,
    private authService: AuthService,
    private signalingService: SignalingService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user && user.userType === 'doctor') {
      this.isLoading = true;

      // Fetch doctor profile
      this.doctorService.getDoctorProfile(user.username).subscribe({
        next: (profile) => {
          this.doctor = profile;
        },
        error: () => {
          this.error = 'Failed to load doctor profile';
        }
      });

      // Fetch appointments
      this.doctorService.getDoctorAppointments(user.username).subscribe({
        next: (data) => {
          this.appointments = data;
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Failed to load appointments';
          this.isLoading = false;
        }
      });

      // Join doctor's room for real-time notifications
      this.signalingService.emit('register-doctor', { doctorUsername: user.username });

      this.signalingService.on('appointmentBooked', (data: any) => {
        alert(`New appointment booked by ${data.patientUsername} on ${data.date} at ${data.time}`);

        this.doctorService.getDoctorAppointments(user.username).subscribe({
          next: (data) => {
            this.appointments = data;
            this.isLoading = false;
          },
          error: () => {
            this.error = 'Failed to load appointments';
            this.isLoading = false;
          }
        });
      });
    }
  }

  editpage() {
    if (this.doctor) {
      this.router.navigate(['/edit-doctor-profile'], { state: { doctor: this.doctor } });
    }
  }

  call(appointment: Appointment) {
    console.log('Navigating to video-chat with appointmentId:', appointment.appointmentId);
    this.router.navigate(['/video-chat'], { state: { 
      appointmentId: appointment.appointmentId,
      role: 'doctor'
    }});
  }

  writePrescription(appointment: Appointment) {
    this.router.navigate(['/doctor-prescription'], { state: { appointmentId: appointment.appointmentId } });
  }
}
