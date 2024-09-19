import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./home/homepage/homepage.component";
import { EventsComponent } from "./user/events/events.component";
import { DashboardComponent } from "./user/events/dashboard/dashboard.component";
import { GuestlistComponent } from "./user/events/guestlist/guestlist.component";
import { BudgetVendorsComponent } from "./user/events/budget-vendors/budget-vendors.component";
import { ScheduleComponent } from "./user/events/schedule/schedule.component";
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
// import { RegistrationComponent } from './registration/registration.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, EventsComponent, DashboardComponent, GuestlistComponent, BudgetVendorsComponent, ScheduleComponent,LoginComponent, RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlanItRight';
}
