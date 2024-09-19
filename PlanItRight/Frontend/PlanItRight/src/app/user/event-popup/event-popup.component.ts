import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../event.service';
import { EventModel } from '../../Models/EventModel';

@Component({
  selector: 'app-event-popup',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.css'
})
export class EventPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<void>(); // New EventEmitter

  eventName: string = '';
  eventDate: string = '';
  eventLocation: string = '';
  eventDescription: string = '';
  eventBudget: number = 0;
  eventType: string = '';
  email=localStorage.getItem('email');
  
  constructor(private eventService: EventService) {}

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.eventName && this.eventDate && this.eventLocation) {
      const eventData: EventModel = {
        name: this.eventName,
        date: new Date(this.eventDate),
        location: this.eventLocation,
        description: this.eventDescription,
        budget: this.eventBudget,
        type: this.eventType,
        email:this.email,
        eventId: 0,
        tasks: [],
        guests: []
      };

      // Send the event data to the server
      this.eventService.addEvent(eventData).subscribe(
        response => {
          console.log('Event added successfully:', response);
          this.eventCreated.emit(); // Emit eventCreated when the event is successfully added
          this.onClose(); // Close the popup after successful submission
        },
        error => {
          console.error('Error adding event:', error);
          // Optionally handle the error (e.g., show a notification)
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }
}
