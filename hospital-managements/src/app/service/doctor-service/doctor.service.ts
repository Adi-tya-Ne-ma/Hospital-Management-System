import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Doctor {
  username: string;
  name: string;
  phoneNumber: string;
  address: string;
  specialization?: string;
  photo?: string;
}

export interface Appointment {
  appointmentId?: string;
  doctorUsername: string;
  patientUsername: string;
  date: string;
  time: string;
  // status?: string;
  doctorName?: string;           // for display
  specialization?: string;       // for display
  phoneNumber?: string;          // for display
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly baseUrl = 'http://localhost:5100/api/doctor';

  constructor(private readonly http: HttpClient) {}

  // Fetch doctor profile by username
  getDoctorProfile(username: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${username}`);
  }

  // Update doctor profile
  updateDoctorProfile(username: string, doctor: Partial<Doctor>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${username}`, doctor);
  }

  // Fetch appointments for doctor
  getDoctorAppointments(username: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`http://localhost:5100/api/appointment/doctor/${username}`);
  }

  // Fetch all doctors (if needed)
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}`);
  }

  // Search doctors by specialization
  searchDoctors(specialization: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      `http://localhost:5100/api/doctor/search?specialization=${encodeURIComponent(specialization)}`
    );
  }
}