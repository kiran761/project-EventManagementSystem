import { Component } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";
import { BudgetVendorsSubComponent } from "./budget-vendors-sub/budget-vendors-sub.component";
import { GuestlistSubComponent } from "./guestlist-sub/guestlist-sub.component";
import { ScheduleSubComponent } from "./schedule-sub/schedule-sub.component";
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../../../Models/EventModel';
import { EventService } from '../../../event.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EventNavComponent, BudgetVendorsSubComponent, GuestlistSubComponent, ScheduleSubComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  eventId!: number; // Event ID
  eventName: string = '';
  eventDate: string = '';
  eventLocation: string = '';
  eventDescription: string = '';
  totalBudget: number = 0;
  remainingBudget: number = 0;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    console.log('Event ID:', this.eventId);
    localStorage.setItem('eventId', this.eventId.toString());
    // localStorage.setItem('eventId')

    // Fetch event details using the event ID
    this.fetchEventDetails();
  }

  fetchEventDetails(): void {
    this.eventService.fetchEventById(this.eventId).subscribe(event => {
      if (event) {
        this.eventName = event.name;
        this.eventDate = event.date.toString();
        this.eventLocation = event.location;
        this.eventDescription = event.description;
        this.totalBudget = event.budget;
        // this.remainingBudget = this.calculateRemainingBudget(event.budget, event); // Assuming there's a logic for this
      } else {
        console.error('Event not found');
      }
    }, error => {
      console.error('Error fetching event details:', error);
    });
  }

  calculateRemainingBudget(totalBudget: number, event: EventModel): number {
    // Implement logic to calculate remaining budget, if needed
    // For example, subtract total expenses from the total budget
    return totalBudget - 0; // Replace 0 with actual expense calculation
  }

}
