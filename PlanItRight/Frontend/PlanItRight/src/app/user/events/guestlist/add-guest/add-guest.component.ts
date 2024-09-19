import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../../../../GuestService/guest.service';

@Component({
  selector: 'app-add-guest',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-guest.component.html',
  styleUrl: './add-guest.component.css'
})
export class AddGuestComponent {

  @Output() closePopup = new EventEmitter<void>();

  eventIdget = localStorage.getItem('eventId');
  eventId = Number(this.eventIdget);
  guestName: string = '';
  guestEmail: string = '';
  
  constructor(private guestService: GuestService) {}

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.guestName && this.guestEmail) {
      const newGuest = {
        name: this.guestName,
        email: this.guestEmail,
        rsvpStatus: '',
        eventId: this.eventId
      };

      this.guestService.addGuest(this.eventId, newGuest).subscribe(
        (response) => {
          console.log('Guest added successfully:', response);
          this.onClose(); 
        },
        (error) => {
          console.error('Error adding guest:', error);
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }

}
