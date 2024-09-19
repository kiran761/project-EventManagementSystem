import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GuestModel } from '../../../../Models/GuestModel';
import { GuestService } from '../../../../GuestService/guest.service';

@Component({
  selector: 'app-guestlist-sub',
  standalone: true,
  imports: [NgFor],
  templateUrl: './guestlist-sub.component.html',
  styleUrl: './guestlist-sub.component.css'
})
export class GuestlistSubComponent {
  guests: GuestModel[] = [];
  acceptedGuests: GuestModel[] = [];
  rejectedGuests: GuestModel[] = [];
  currentAcceptedIndex: number = 0;
  currentRejectedIndex: number = 0;
  intervalId: any;
  @Input() eventId!: number;

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    console.log('Event ID:', this.eventId);
    this.fetchGuests();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchGuests(): void {
    this.guestService.getGuestsByEventId(this.eventId).subscribe((guests: GuestModel[]) => {
      this.guests = guests;
      this.acceptedGuests = this.guests.filter(guest => guest.rsvpStatus === 'accepted');
      this.rejectedGuests = this.guests.filter(guest => guest.rsvpStatus === 'rejected');

      // Start the interval to automatically iterate through the data
      this.intervalId = setInterval(() => {
        this.nextSet();
      }, 3000); // Change rows every 3 seconds
    }, error => {
      console.error('Failed to fetch guests:', error);
    });
  }

  nextSet(): void {
    // Move to the next set of 5 accepted guests
    this.currentAcceptedIndex += 1;
    if (this.currentAcceptedIndex + 5 > this.acceptedGuests.length) {
      this.currentAcceptedIndex = 0; // Loop back to the beginning
    }

    // Move to the next set of 5 rejected guests
    this.currentRejectedIndex += 1;
    if (this.currentRejectedIndex + 5 > this.rejectedGuests.length) {
      this.currentRejectedIndex = 0; // Loop back to the beginning
    }
  }

  getAcceptedGuests(): GuestModel[] {
    return this.acceptedGuests.slice(this.currentAcceptedIndex, this.currentAcceptedIndex + 5);
  }

  getRejectedGuests(): GuestModel[] {
    return this.rejectedGuests.slice(this.currentRejectedIndex, this.currentRejectedIndex + 5);
  }
}
