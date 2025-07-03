import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { DoctorService, Doctor } from '../../service/doctor-service/doctor.service'; // import DoctorService and Doctor
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; // Start with false by default
  userType: 'patient' | 'doctor' | null = null;
  notificationCount = 0;
  isMenuOpen = false;
  activeDropdown: string | null = null;
  isMobile = window.innerWidth <= 768;
  searchTerm: string = '';
  searchResults: Doctor[] = [];
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService // import and inject
  ) {}
  
  ngOnInit() {
    // Check login status on init
    this.checkLoginStatus();
    
    // Subscribe to authentication changes
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userType = user?.userType || null;
      
      // Set notification count based on user type
      if (this.isLoggedIn) {
        this.notificationCount = this.userType === 'doctor' ? 5 : 2;
      } else {
        this.notificationCount = 0;
      }
    });
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    
    // Close dropdowns when window is resized
    if (!this.isMobile) {
      this.activeDropdown = null;
      this.removeActiveClasses();
    }
  }

  // Track clicks outside elements to close dropdowns
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.isMobile && this.activeDropdown) {
      const target = event.target as HTMLElement;
      
      // Check if click was outside of dropdown area
      const isDropdownClick = target.closest('.dropdown-toggle') || target.closest('.dropdown-menu');
      
      if (!isDropdownClick) {
        this.activeDropdown = null;
        this.removeActiveClasses();
      }
    }
  }
  
  checkLoginStatus() {
    // Use auth service to check login status
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userType = this.authService.getUserType();
    
    // Set notification count
    if (this.isLoggedIn) {
      this.notificationCount = this.userType === 'doctor' ? 5 : 2;
    }
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Reset dropdowns when closing menu
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
      this.removeActiveClasses();
    }
  }
  
  toggleDropdown(event: Event, dropdown: string) {
    event.preventDefault();
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
    this.updateDropdownClasses();
  }
  
  private updateDropdownClasses() {
    // Remove active class from all dropdowns
    this.removeActiveClasses();
    
    // Add active class to current dropdown
    if (this.activeDropdown) {
      const activeToggle = document.querySelector(`[data-dropdown="${this.activeDropdown}"]`);
      if (activeToggle) {
        activeToggle.classList.add('active');
      }
    }
  }
  
  private removeActiveClasses() {
    const allToggles = document.querySelectorAll('.dropdown-toggle');
    allToggles.forEach(toggle => toggle.classList.remove('active'));
  }
  
  logout() {
    this.authService.logout();
    
    // Close mobile menu if open
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  login(userType: 'doctor' | 'patient') {
    this.router.navigate(['/login'], { queryParams: { userType } });
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  onSearch() {
    console.log('Search button clicked, searchTerm:', this.searchTerm);
    if (this.searchTerm.trim()) {
      this.doctorService.searchDoctors(this.searchTerm).subscribe({
        next: (doctors) => {
          this.searchResults = doctors;
          // Optionally, navigate to a results page:
          this.router.navigate(['/doctor-search-results'], { state: { doctors: this.searchResults, query: this.searchTerm } });
        },
        error: () => {
          this.searchResults = [];
          alert('No doctors found or error occurred.');
        }
      });
    }
  }
  
  navigateToDashboard() {
    if (this.isLoggedIn) {
      const dashboardRoute = this.userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard';
      this.router.navigate([dashboardRoute]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}