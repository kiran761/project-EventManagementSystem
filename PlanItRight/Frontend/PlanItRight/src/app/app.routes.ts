import { Routes } from '@angular/router';
import { EventsComponent } from './user/events/events.component';
import { DashboardComponent } from './user/events/dashboard/dashboard.component';
import { GuestlistComponent } from './user/events/guestlist/guestlist.component';
import { ScheduleComponent } from './user/events/schedule/schedule.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { BudgetVendorsComponent } from './user/events/budget-vendors/budget-vendors.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RsvpComponent } from './rsvp/rsvp.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
    { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:eventId', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'guestlist', component: GuestlistComponent, canActivate: [AuthGuard] },
    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
    { path: 'budget', component: BudgetVendorsComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomepageComponent },
    { path: 'rsvp/:eventId', component: RsvpComponent },
    // { path: '**', redirectTo: '/home' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'rsvp', component: RsvpComponent },
    {path : 'signup',component:RegistrationComponent}
];
