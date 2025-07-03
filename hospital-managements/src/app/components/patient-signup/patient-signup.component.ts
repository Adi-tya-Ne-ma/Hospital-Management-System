import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css']
})
export class PatientSignupComponent {
  constructor(private router: Router) {}

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        console.log('Image uploaded:', base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  signup() {
    this.router.navigate(['/patient-dashboard']);
  }
}