import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../Models/TaskModel';
import { TaskService } from '../../../../TaskService/task.service';


//model interface
interface Schedule {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
};


@Component({
  selector: 'app-schedule-sub',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './schedule-sub.component.html',
  styleUrl: './schedule-sub.component.css'
})





export class ScheduleSubComponent implements OnInit {
  schedules: Task[] = [];
  currentIndex: number = 0;
  intervalId: any;

  @Input() eventId!: number;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('Event ID:', this.eventId);
    this.fetchTasks();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchTasks(): void {
    this.taskService.getTasksByEventId(this.eventId).subscribe((tasks: Task[]) => {
      this.schedules = tasks;

      // Start the interval to automatically iterate through the data
      this.intervalId = setInterval(() => {
        this.nextSet();
      }, 3000); // Change rows every 3 seconds
    }, error => {
      console.error('Failed to fetch tasks:', error);
    });
  }

  nextSet(): void {
    // Move to the next set of 6 tasks
    this.currentIndex += 1;
    if (this.currentIndex + 6 > this.schedules.length) {
      this.currentIndex = 0; // Loop back to the beginning
    }
  }

  getVisibleSchedules(): Task[] {
    return this.schedules.slice(this.currentIndex, this.currentIndex + 6);
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'In Progress':
        return 'status-in-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  }
}
