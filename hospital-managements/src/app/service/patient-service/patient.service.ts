import { Appointment } from './../../store/appointment/appointment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface Doctor {
//   id: string;
//   name: string;
//   phone: string;
//   address: string;
//   photo: string;
//   specialization?: string;
//   experience?: number;
// }

export interface PatientProfile {
  username: string;
  name: string;
  phoneNumber: string;
  address: string;
  // Add photo if you store it in DB, otherwise remove from HTML
}

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient) {}

  getPatientProfile(username: string): Observable<PatientProfile> {
    return this.http.get<PatientProfile>(`${this.baseUrl}/patient/${username}`);
  }

  getUpcomingAppointments(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointment/patient/${username}`);
  }

  updatePatientProfile(username: string, profile: Partial<PatientProfile>): Observable<any> {
    return this.http.put(`${this.baseUrl}/patient/${username}`, profile);
  }
}