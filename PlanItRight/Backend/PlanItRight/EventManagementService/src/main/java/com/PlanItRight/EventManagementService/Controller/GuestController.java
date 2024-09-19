package com.PlanItRight.EventManagementService.controller;


import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Guest;
import com.PlanItRight.EventManagementService.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
@CrossOrigin(origins = "http://localhost:4200",
        methods = {RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST})
public class GuestController {
    @Autowired
    private GuestService guestService;


    @PostMapping("/{eventId}/add")
    public Guest addGuestToEvent(@PathVariable Long eventId, @RequestBody Guest guest) throws ResourceNotFoundException, DatabaseException {
        return guestService.addGuestToEvent(eventId, guest);
    }

    @DeleteMapping("/{eventId}/delete/{guestId}")
    public ResponseEntity<String> deleteGuestFromEvent(@PathVariable Long eventId, @PathVariable Long guestId) throws ResourceNotFoundException {
        guestService.deleteGuestFromEvent(eventId, guestId);
        return ResponseEntity.ok("Guest deleted successfully from event");
    }

    @GetMapping("/{eventId}/all")
    public List<Guest> getAllGuestsFromEvent(@PathVariable Long eventId) throws ResourceNotFoundException {
        return guestService.getAllGuestsFromEvent(eventId);
    }

//    @PutMapping("/{eventId}/{email}")
//    public ResponseEntity<Guest> updateGuestRsvpStatus(@PathVariable Long eventId, @PathVariable String email, @RequestBody String rsvpStatus) throws ResourceNotFoundException {
//        Guest updatedGuest = guestService.updateRsvpStatus(eventId, email, rsvpStatus);
//        return ResponseEntity.ok(updatedGuest);
//    }
}
