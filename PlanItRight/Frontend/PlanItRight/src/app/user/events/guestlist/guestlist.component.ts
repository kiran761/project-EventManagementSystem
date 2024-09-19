import { Component, Input, OnInit } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AddGuestComponent } from "./add-guest/add-guest.component";
import { GuestModel } from '../../../Models/GuestModel';
import { GuestService } from '../../../GuestService/guest.service';

@Component({
  selector: 'app-guestlist',
  standalone: true,
  imports: [EventNavComponent, NgFor, CommonModule, FormsModule, AddGuestComponent],
  templateUrl: './guestlist.component.html',
  styleUrl: './guestlist.component.css'
})
export class GuestlistComponent implements OnInit {

  eventIdget = localStorage.getItem('eventId');
  eventId = Number(this.eventIdget);

  guests: GuestModel[] = [];
  acceptedGuests: GuestModel[] = [];
  rejectedGuests: GuestModel[] = [];
  noreplyGuests: GuestModel[] = [];
  filteredAcceptedGuests: GuestModel[] = [];
  filteredRejectedGuests: GuestModel[] = [];
  filteredNoReplyGuests: GuestModel[] = [];
  searchTerm: string = '';

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    console.log('Event ID:', this.eventId);

    this.guestService.getGuestsByEventId(this.eventId).subscribe(
      (response: GuestModel[]) => {
        this.guests = response;

        this.acceptedGuests = this.guests.filter(guest => guest.rsvpStatus === 'accepted');
        this.rejectedGuests = this.guests.filter(guest => guest.rsvpStatus === 'rejected');
        this.noreplyGuests = this.guests.filter(guest => (guest.rsvpStatus === '' || guest.rsvpStatus === null || guest.rsvpStatus === 'noreply'));

        this.filterGuests(); // Initial filtering
      },
      error => {
        console.error('Error fetching guests:', error);
      }
    );
  }

  filterGuests(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    if (!this.searchTerm) {
      // If search term is empty, show all guests
      this.filteredAcceptedGuests = [...this.acceptedGuests];
      this.filteredRejectedGuests = [...this.rejectedGuests];
      this.filteredNoReplyGuests = [...this.noreplyGuests];
    } else {
      // Otherwise, filter based on the search term
      this.filteredAcceptedGuests = this.acceptedGuests.filter(guest =>
        guest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        guest.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.filteredRejectedGuests = this.rejectedGuests.filter(guest =>
        guest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        guest.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.filteredNoReplyGuests = this.noreplyGuests.filter(guest =>
        guest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        guest.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }

  isPopupOpen: boolean = false;

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }  
}
