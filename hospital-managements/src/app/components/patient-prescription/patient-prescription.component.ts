import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrl: './patient-prescription.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class PatientPrescriptionComponent implements OnInit {
  prescriptions: any[] = [];
  doctor: any = null;
  patient: any = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const appointmentId = history.state.appointmentId;
    if (appointmentId) {
      this.http.get(`http://localhost:5100/api/appointment/prescriptions/${appointmentId}`)
        .subscribe({
          next: (data: any) => {
            this.prescriptions = Array.isArray(data) ? data : [data];
            // Fetch appointment to get doctorUsername and patientUsername
            this.http.get(`http://localhost:5100/api/appointment/${appointmentId}`)
              .subscribe({
                next: (appt: any) => {
                  // Fetch doctor info
                  this.http.get(`http://localhost:5100/api/doctor/${appt.doctorUsername}`)
                    .subscribe({ next: (doc: any) => this.doctor = doc });
                  // Fetch patient info
                  this.http.get(`http://localhost:5100/api/patient/${appt.patientUsername}`)
                    .subscribe({ next: (pat: any) => this.patient = pat });
                }
              });
          },
          error: () => {
            this.error = 'No prescription found for this appointment.';
          }
        });
    } else {
      this.error = 'No appointment selected.';
    }
  }
}
