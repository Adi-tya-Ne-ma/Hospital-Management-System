import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service'; // Add this import

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern(/^[a-zA-Z0-9_]+$/),
          ],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        userType: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        // image: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
      const passwordField = document.getElementById(
        'password'
      ) as HTMLInputElement;
      passwordField.type = this.passwordVisible ? 'text' : 'password';
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
      const confirmPasswordField = document.getElementById(
        'confirm-password'
      ) as HTMLInputElement;
      confirmPasswordField.type = this.confirmPasswordVisible
        ? 'text'
        : 'password';
    }
  }

  onImageUpload(event: any): void {
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

  signup(): void {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      if (formValue.password !== formValue.confirmPassword) {
        this.signupForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return;
      }

      const signupData = {
        name: formValue.name,
        username: formValue.username,
        phoneNumber: String(formValue.phoneNumber),
        password: formValue.password,
        role: formValue.userType
      };

      this.authService.signup(signupData, formValue.userType).subscribe({
        next: () => {
          // Redirect to login with username and role pre-filled
          this.router.navigate(['/login'], {
            state: {
              username: formValue.username,
              userType: formValue.userType
            }
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      Object.keys(this.signupForm.controls).forEach((key) => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
