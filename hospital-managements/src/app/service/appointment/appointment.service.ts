import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly baseUrl = 'http://localhost:5100/api/appointment';

  constructor(private http: HttpClient) {}

  // Get all appointments for a doctor by username
  getDoctorAppointments(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctor/${username}`);
  }

  // Get all appointments for a patient by username
  getPatientAppointments(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/${username}`);
  }

  // Book an appointment (for patient)
  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/book`, appointmentData);
  }

  // Update an appointment (for patient)
  updateAppointment(appointmentId: string | number, appointment: any) {
    return this.http.put(`http://localhost:5100/api/appointment/${appointmentId}`, appointment);
  }

  // Delete an appointment (for patient)
  deleteAppointment(username: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/patient/${username}`);
  }

  // Delete an appointment by ID
  deleteAppointmentById(appointmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${appointmentId}`);
  }
}