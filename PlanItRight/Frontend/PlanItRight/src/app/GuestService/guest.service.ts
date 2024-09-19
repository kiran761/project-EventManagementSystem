import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestModel } from '../Models/GuestModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private baseUrl = 'http://localhost:7001/api/guests'; // Adjust the base URL accordingly

  constructor(private http: HttpClient) { }

  getGuestsByEventId(eventId: number): Observable<GuestModel[]> {
    const url = `${this.baseUrl}/${eventId}/all`;
    return this.http.get<GuestModel[]>(url);
  }

  addGuest(eventId: number, guest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${eventId}/add`, guest);
  }
}
