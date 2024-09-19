package com.PlanItRight.EventManagementService.service;


import com.PlanItRight.EventManagementService.repository.TaskProjection;
import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Task;
import com.PlanItRight.EventManagementService.repository.EventRepository;
import com.PlanItRight.EventManagementService.repository.TaskProjection;
import com.PlanItRight.EventManagementService.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
     private TaskRepository taskRepository;

    @Autowired
    private EventRepository eventRepository;

    public Task addTaskToEvent(Long eventId, Task task) throws ResourceNotFoundException, DatabaseException {
        // Check if the event exists
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));

        try {
            // Associate the task with the event
            task.setEvent(event);
            return taskRepository.save(task);
        } catch (Exception e) {
            throw new DatabaseException("Failed to add task to event: " + e.getMessage());
        }
    }



    public void deleteTaskFromEvent(Long eventId, Long taskId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));


        taskRepository.delete(task);
    }


    public List<TaskProjection> getTasksByEventId(Long eventId) throws ResourceNotFoundException {
        List<TaskProjection> tasks = taskRepository.findAllByEventId(eventId);

        if (tasks.isEmpty()) {
            throw new ResourceNotFoundException("No tasks found for event ID " + eventId);
        }

        return tasks;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
