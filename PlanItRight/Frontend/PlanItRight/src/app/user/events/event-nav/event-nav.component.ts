import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-nav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './event-nav.component.html',
  styleUrl: './event-nav.component.css'
})
export class EventNavComponent{
  isNavbarExpanded: boolean = false;

  // @Input() eventId!: number;  // The event ID to be passed to each route
  eventIdget=localStorage.getItem('eventId');
  eventId = Number(this.eventIdget);

  toggleNavbarVisibility(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  logout(){
    console.log("Successfully Logged Out")
  }
}
