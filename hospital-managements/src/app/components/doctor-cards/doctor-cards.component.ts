import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  DoctorService,
  Doctor,
} from '../../service/doctor-service/doctor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-cards.component.html',
  styleUrl: './doctor-cards.component.css',
})
export class DoctorCardsComponent implements OnInit {
  doctors$: Observable<Doctor[]>;
  loading = true;
  error: any = null;

  constructor(private router: Router, private doctorService: DoctorService) {
    this.doctors$ = new Observable<Doctor[]>();
  }

  ngOnInit(): void {
    
    this.doctors$ = this.doctorService.getAllDoctors();
    this.doctors$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.loading = false;
        this.error = err;
      },
    });
  }

  // In doctor-cards.component.ts
  goToBookings(doctorUsername: string): void {
    this.router.navigate(['/appointments'], { state: { doctorUsername } });
  }
}
