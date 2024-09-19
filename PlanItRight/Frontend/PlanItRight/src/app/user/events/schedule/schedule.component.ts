import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from "./calendar/calendar.component";
import { EventNavComponent } from "../event-nav/event-nav.component";
import { NgFor, NgIf } from '@angular/common';
import { AddTaskComponent } from "./add-task/add-task.component";
import { TaskService } from '../../../TaskService/task.service';

interface Task {
  name: string;
  dueDate: string;
  dueTime: string;
  status: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CalendarComponent, EventNavComponent, NgFor, AddTaskComponent,NgIf],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {

  tasks: Task[] = [];

  eventIdget= localStorage.getItem('eventId');
  eventId=Number(this.eventIdget);

  filteredTasks: Task[] = [];
  displayedTasks: Task[] = [];
  tasksPerPage = 7;
  currentPage = 1;
  totalPages = 1;
  searchTerm: string = '';

  ngOnInit() {
    this.loadTasks();
    console.log('Event ID:', this.eventId);
    this.filteredTasks = [...this.tasks];
    this.updateDisplayedTasks();
  }

  constructor(private taskService: TaskService) {}

  loadTasks() {
    if (this.eventId) {
      this.taskService.getTasksByEventId(this.eventId).subscribe(
        (data: Task[]) => {
          this.tasks = data;
          this.filteredTasks = [...this.tasks];
          this.updateDisplayedTasks();
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  }

  updateDisplayedTasks() {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    this.displayedTasks = this.filteredTasks.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredTasks.length / this.tasksPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedTasks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedTasks();
    }
  }

  onSearch(event: Event) {
    // Remove spaces from the search term and convert it to lowercase
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase().replace(/\s+/g, '');

    this.filteredTasks = this.tasks.filter(task => {
      // Remove spaces from task properties and convert them to lowercase
      const name = task.name.toLowerCase().replace(/\s+/g, '');
      const status = task.status.toLowerCase().replace(/\s+/g, '');
      const dueDate = task.dueDate.replace(/\s+/g, '');
      const dueTime = task.dueTime.replace(/\s+/g, '');

      // Check if the search term is included in any of the task properties
      return name.includes(this.searchTerm) ||
        status.includes(this.searchTerm) ||
        dueDate.includes(this.searchTerm) ||
        dueTime.includes(this.searchTerm);
    });

    this.currentPage = 1;
    this.updateDisplayedTasks();
  }

  onTaskAdded(): void {
    this.loadTasks(); // Reload tasks when a new task is added
  }

  isPopupOpen = false;


  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

}
