import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {
  private baseURL = 'https://bot.dialogflow.com/a05f33c6-7f29-4afe-8dcf-0e711e2f2377';
  
  constructor(private http: HttpClient) { }
  
  // Method to send a message to the Dialogflow chatbot
  public sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // The Dialogflow webhook typically expects a specific format
    const body = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'en'
        }
      }
    };
    
    // Make sure we have the correct endpoint for the REST API
    // Note: This is where your issue might be - the URL format might need adjustment
    return this.http.post(`${this.baseURL}/query`, body, { headers });
  }
}