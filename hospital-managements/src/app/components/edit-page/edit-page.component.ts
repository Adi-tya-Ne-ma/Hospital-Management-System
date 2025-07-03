import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../../service/doctor-service/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent {
  doctor = {
    username: '',
    name: '',
    phoneNumber: '',
    address: '',
    specialization: '',
    photo: '', 
  };

  constructor(private router: Router, private doctorService: DoctorService) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['doctor']) {
      this.doctor = { ...nav.extras.state['doctor'] };
    } else if (history.state?.doctor) {
      this.doctor = { ...history.state.doctor };
    }
  }

  save() {
    // Call backend to update doctor profile
    this.doctorService
      .updateDoctorProfile(this.doctor.username, {
        username: this.doctor.username,
        name: this.doctor.name,
        phoneNumber: this.doctor.phoneNumber,
        address: this.doctor.address,
        specialization: this.doctor.specialization,
        photo: this.doctor.photo // <-- Add this line
      })
      .subscribe({
        next: () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/doctor-dashboard']);
        },
      });
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.doctor.photo = reader.result as string; // base64 string
      };
      reader.readAsDataURL(file);
    }
  }
}
