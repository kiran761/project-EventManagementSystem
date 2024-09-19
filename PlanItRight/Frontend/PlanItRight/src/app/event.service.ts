import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from './Models/EventModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = "http://localhost:7000/api"
  constructor(private http : HttpClient) { }

  fetchAllEvents(){
    let url="http://localhost:7000/api/events/all"
    return this.http.get<EventModel[]>(url)
  }

  fetchEventsByUsername(username: string|null): Observable<EventModel[]> {
    let url = `${this.baseUrl}/events/${username}/all`;
    // console.log(url)
    return this.http.get<EventModel[]>(url);
  }

  fetchEventsByEmail(email : string|null): Observable<EventModel[]> {
    let url = `${this.baseUrl}/events/${email}/all`;
    return this.http.get<EventModel[]>(url);
  }

  addEvent(event: EventModel): Observable<EventModel> {
    // console.log(event)
    let url = `${this.baseUrl}/events/addEvent`;
    return this.http.post<EventModel>(url, event);
  }

  fetchEventById(eventId: number): Observable<EventModel> {
    let url = `${this.baseUrl}/events/${eventId}`;
    return this.http.get<EventModel>(url);
  }
}
