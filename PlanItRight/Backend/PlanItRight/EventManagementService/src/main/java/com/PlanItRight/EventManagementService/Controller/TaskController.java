package com.PlanItRight.EventManagementService.controller;


import com.PlanItRight.EventManagementService.repository.TaskProjection;
import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Task;
import com.PlanItRight.EventManagementService.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/{eventId}/add")
    public Task addTaskToEvent(@PathVariable Long eventId, @RequestBody Task task) throws ResourceNotFoundException, DatabaseException {
        Task createdTask = taskService.addTaskToEvent(eventId, task);
        return createdTask;
    }

    @DeleteMapping("/{eventId}/delete/{taskId}")
    public ResponseEntity<String> deleteTaskFromEvent(@PathVariable Long eventId, @PathVariable Long taskId) throws ResourceNotFoundException {
        taskService.deleteTaskFromEvent(eventId, taskId);
        return ResponseEntity.ok("Task deleted successfully from event");
    }


    @GetMapping("/event/{eventId}")
    public List<TaskProjection> getTasksByEventId(@PathVariable Long eventId) throws ResourceNotFoundException {
        List<TaskProjection> tasks = taskService.getTasksByEventId(eventId);

        if (tasks.isEmpty()) {
            throw new ResourceNotFoundException("No tasks found for event ID " + eventId);
        }

        return tasks;
    }

    @GetMapping("/all")
    public List<Task> getAllTasks() throws DatabaseException {
        return taskService.getAllTasks();
    }

}
