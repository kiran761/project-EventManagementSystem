package com.PlanItRight.EventManagementService.controller;


import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Guest;
import com.PlanItRight.EventManagementService.model.Task;
import com.PlanItRight.EventManagementService.service.EventService;
import com.PlanItRight.EventManagementService.service.GuestService;
import com.PlanItRight.EventManagementService.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;



   @GetMapping("/all")
    public List<Event> getAllEvents() throws DatabaseException {
       return eventService.getAllEvents();
   }

   @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event event) throws DatabaseException {
       return eventService.addEvent(event);
   }

   @GetMapping("/{eventId}")
   public Event getEventById(@PathVariable Long eventId) throws ResourceNotFoundException {
       return eventService.getEventById(eventId);
   }

   @DeleteMapping("/deleteEvent/{id}")
    public void deleteEvent(@PathVariable Long id) throws ResourceNotFoundException, DatabaseException {
        eventService.deleteEvent(id);
   }

//    @GetMapping("/{username}/all")
//    public List<Event> getAllEventsByUsername(@PathVariable String username) {
//        return eventService.getAllEventsByUsername(username);
//    }

    @GetMapping("/{email}/all")
    public List<Event> getAllEventsByEmail(@PathVariable String email) {
        return eventService.getAllEventsByEmail(email);
    }
}