import { Component, OnInit } from '@angular/core';
import { EventPopupComponent } from "../event-popup/event-popup.component";
import { NgFor, NgIf } from '@angular/common';
import { EventService } from '../../event.service';
import { FormsModule } from '@angular/forms';
import { EventModel } from '../../Models/EventModel';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventPopupComponent, NgIf, FormsModule, NgFor],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  email = localStorage.getItem('email');

  create_icon: string = '/assets/icons8-create-90.png';
  calender_icon: string = '/assets/icons8-calender-100.png';
  location_icon: string = '/assets/icons8-location-100.png';

  isPopupOpen = false;
  eventData: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  searchQuery: string = '';

  constructor(private eventService: EventService, private router: Router, private authService: AuthService,private route: ActivatedRoute) { }
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();  // Check initial state
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => this.isLoggedIn = loggedIn
    );
    this.load(); // Call load method on initialization
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  async load() {
    try {
      const data = await lastValueFrom(this.eventService.fetchEventsByEmail(this.email));
      this.eventData = data ?? [];
      console.log(data)
       // Default to an empty array if data is undefined
      this.filteredEvents = this.eventData; // Initially, display all events
      console.log(this.eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  openDashboard(event: EventModel): void {
    // Navigate to the DashboardComponent with the event ID as a route parameter
    this.router.navigate(['/dashboard', event.eventId]);
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ''); // Remove all spaces from the search query

    this.searchQuery = searchValue;

    if (this.searchQuery) {
      this.filteredEvents = this.eventData.filter(event =>
        event.name.toLowerCase().replace(/\s+/g, '').includes(this.searchQuery)
      );
    } else {
      this.filteredEvents = this.eventData; // Show all events if search query is empty
    }
  }

  // New method to handle event creation
  onEventCreated(): void {    
    this.load(); // Reload the event list after a new event is created
  }


  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
