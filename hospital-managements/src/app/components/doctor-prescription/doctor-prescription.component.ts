import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrl: './doctor-prescription.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class DoctorPrescriptionComponent implements OnInit {
  prescriptionForm!: FormGroup;
  appointmentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.appointmentId = history.state.appointmentId;
    this.prescriptionForm = this.fb.group({
      prescriptions: this.fb.array([this.createPrescriptionGroup()]),
    });
  }

  get prescriptions(): FormArray {
    return this.prescriptionForm.get('prescriptions') as FormArray;
  }

  createPrescriptionGroup(): FormGroup {
    return this.fb.group({
      medicine: ['', Validators.required],
      dosage: ['', Validators.required],
      schedule: ['', Validators.required],
      notes: [''],
    });
  }

  addPrescription() {
    this.prescriptions.push(this.createPrescriptionGroup());
  }

  removePrescription(index: number) {
    if (this.prescriptions.length > 1) {
      this.prescriptions.removeAt(index);
    }
  }

  submitPrescription() {
    if (!this.appointmentId) {
      alert('No appointment selected.');
      return;
    }
    if (this.prescriptionForm.invalid) {
      return;
    }
    // Add appointmentId to each prescription
    const prescriptionsWithId = this.prescriptions.value.map((p: any) => ({
      ...p,
      appointmentId: Number(this.appointmentId),
    }));

    this.http
      .post(
        `http://localhost:5100/api/appointment/prescription/bulk/${this.appointmentId}`,
        prescriptionsWithId
      )
      .subscribe({
        next: () => {
          alert('Prescriptions submitted successfully!');
          this.router.navigate(['/doctor-dashboard']);
        },
        error: () => {
          alert('Failed to submit prescriptions.');
        },
      });
  }
}
