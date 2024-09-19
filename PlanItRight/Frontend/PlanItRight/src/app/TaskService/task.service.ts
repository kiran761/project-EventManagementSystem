import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/TaskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:7001/api/tasks'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getTasksByEventId(eventId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/event/${eventId}`);
  }


  addTask(eventId: number, task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${eventId}/add`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Adding task:', task);
    return this.http.post<Task>(url, task, { headers });
}
}
