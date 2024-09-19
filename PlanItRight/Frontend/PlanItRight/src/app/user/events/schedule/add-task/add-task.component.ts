import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../../TaskService/task.service';
import { Task } from '../../../../Models/TaskModel';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<void>();
  @Output() closePopup = new EventEmitter<void>();

  eventIdget = localStorage.getItem('eventId');
  eventId = Number(this.eventIdget);

  taskName: string = '';
  dueDate: string = '';
  dueTime: string = '';
  taskDescription: string = '';

  constructor(private taskService: TaskService) { }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.taskName && this.dueDate && this.dueTime) {
      const taskData: Task = {
        id: 0,
        name: this.taskName,
        description: this.taskDescription,
        dueDate: this.dueDate,
        dueTime: this.dueTime + ":00",
        status: "pending",
        eventId: this.eventId
      };

      this.taskService.addTask(this.eventId, taskData).subscribe(
        response => {
          console.log('Task added successfully:', response);
          this.taskAdded.emit();
          this.onClose();
        },
        error => {
          console.error('Error adding task:', error);
          console.log('Error details:', error.error); // This might give more details
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }
}
