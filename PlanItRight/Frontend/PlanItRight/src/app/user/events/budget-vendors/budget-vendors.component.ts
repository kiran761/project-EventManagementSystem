import { Component, Input, OnInit } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";
import { BudgetChartComponent } from "./budget-chart/budget-chart.component";

@Component({
  selector: 'app-budget-vendors',
  standalone: true,
  imports: [EventNavComponent, BudgetChartComponent],
  templateUrl: './budget-vendors.component.html',
  styleUrl: './budget-vendors.component.css'
})
export class BudgetVendorsComponent implements OnInit{

  eventId= localStorage.getItem('eventId');


  ngOnInit(): void {
    console.log('Event ID:', this.eventId);
  }
}