package com.PlanItRight.EventManagementService.service;

import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Task;
import com.PlanItRight.EventManagementService.repository.EventRepository;
import com.PlanItRight.EventManagementService.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;


@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Event> getAllEvents() throws DatabaseException {
        try {
            return eventRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseException("An error occurred while retrieving all events.", e);
        }
    }

    public Event addEvent(Event event) throws DatabaseException {
        try {
            return eventRepository.save(event);
        } catch (Exception e) {
            throw new DatabaseException("An error occurred while adding the event.", e);
        }
    }

    public void deleteEvent(Long id) throws ResourceNotFoundException, DatabaseException {
        try {
            if (!eventRepository.existsById(id)) {
                throw new ResourceNotFoundException("Event not found with id: " + id);
            }
            eventRepository.deleteById(id);
        } catch (ResourceNotFoundException e) {
            throw e; // Let the global handler manage this
        } catch (Exception e) {
            throw new DatabaseException("An error occurred while deleting the event.", e);
        }
    }

    public Event getEventById(Long id) throws ResourceNotFoundException {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

//    public List<Event> getAllEventsByUsername(String username) {
//
//        return eventRepository.findAllByUsername(username);
//    }

    public List<Event> getAllEventsByEmail(String email){
        return eventRepository.findAllByEmail(email);

    }




}
