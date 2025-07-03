import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService, PatientProfile } from '../../service/patient-service/patient.service';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../service/doctor-service/doctor.service'; // import
import { AppointmentService } from '../../service/appointment/appointment.service'; // import
import { SignalingService } from '../../service/video-call/signaling.service'; // import

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PatientDashboardComponent implements OnInit {
  appointments: any[] = [];
  isLoading = false;
  error: string | null = null;

  patientProfile: PatientProfile | null = null;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService, // inject
    private appointmentService: AppointmentService, // inject
    private authService: AuthService,
    private signalingService: SignalingService // inject
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user && user.userType === 'patient') {
      this.isLoading = true;
      this.patientService.getPatientProfile(user.username).subscribe({
        next: (profile) => this.patientProfile = profile,
        error: () => this.error = 'Failed to load profile'
      });
      this.loadAppointments(user.username);

      this.signalingService.emit('register-patient', { patientUsername: user.username });
      this.signalingService.on('prescriptionWritten', (data: any) => {
        alert(`Dr. ${data.doctorUsername} has written a new prescription for your appointment on ${data.date} at ${data.time}.`);
      });
    }
  }

  loadAppointments(username: string) {
    this.isLoading = true;
    this.patientService.getUpcomingAppointments(username).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        // For each appointment, fetch doctor details
        this.appointments.forEach(appt => {
          this.doctorService.getDoctorProfile(appt.doctorUsername).subscribe({
            next: (doctor) => {
              appt.doctorName = doctor.name;
              appt.specialization = doctor.specialization;
              appt.phoneNumber = doctor.phoneNumber;
            }
          });
        });
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load appointments.';
        this.isLoading = false;
      }
    });
  }

  cancelAppointment(appointmentId: string) {
    const user = this.authService.currentUserValue;
    if (!user) {
      alert('You must be logged in to cancel an appointment.');
      return;
    }
    this.appointmentService.deleteAppointmentById(appointmentId).subscribe({
      next: () => {
        alert('Appointment cancelled successfully');
        this.loadAppointments(user.username);
      }
    });
  }

  joinVideoCall(appointment: any) {
    console.log('Navigating to video-chat with appointmentId:', appointment.appointmentId);
    this.router.navigate(['/video-chat'], { state: { 
      appointmentId: appointment.appointmentId,
      role: 'patient'
    }});
  }

  edit() {
    this.router.navigate(['/edit-patient-profile'], { state: { patient: this.patientProfile } });
  }

  readPrescription(appointment: any) {
    this.router.navigate(['/patient-prescription'], { state: { appointmentId: appointment.appointmentId } });
  }
}
