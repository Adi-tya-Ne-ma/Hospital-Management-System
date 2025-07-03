import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
//import { DoctorCardsComponent } from "./components/doctor-cards/doctor-cards.component";
// import { doctorReducer } from './store/doctor/doctor.reducer';
// import { DoctorEffects } from './store/doctor/doctor.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    //DoctorCardsComponent,
    // StoreModule and EffectsModule should be configured in the application bootstrap, not here
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})
export class AppComponent {
  title = 'hospital-management';
  isChatOpen = false;
  isChatBtnActive = false;
  userMessage: string = '';
  botMessages: string[] = ['Welcome to our hospital management system. How can I help you today?'];

  constructor() {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.isChatBtnActive = this.isChatOpen; // Toggle button active state when chat is opened/closed
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    
    // Add user message to chat
    this.botMessages.push(`You: ${this.userMessage}`);
    const messageToSend = this.userMessage;
    this.userMessage = '';
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'I received your message. How can I help you with hospital management?';
      if (messageToSend.toLowerCase().includes('appointment')) {
        botResponse = 'Would you like to schedule an appointment? Please provide your preferred date and time.';
      } else if (messageToSend.toLowerCase().includes('doctor')) {
        botResponse = 'We have several specialists available. What type of doctor would you like to see?';
      }
      this.botMessages.push(`Bot: ${botResponse}`);
    }, 500);
  }
}