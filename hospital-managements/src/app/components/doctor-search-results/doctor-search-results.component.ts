import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../service/doctor-service/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-search-results',
  templateUrl: './doctor-search-results.component.html',
  styleUrls: ['./doctor-search-results.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DoctorSearchResultsComponent implements OnInit {
  doctors: Doctor[] = [];
  query: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.doctors = history.state['doctors'] || [];
    this.query = history.state['query'] || '';
  }

  book(username: string) {
    this.router.navigate(['/appointments'], { state: { doctorUsername: username } });
  }
}
