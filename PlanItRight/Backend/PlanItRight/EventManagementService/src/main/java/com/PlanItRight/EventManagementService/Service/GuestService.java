package com.PlanItRight.EventManagementService.service;

import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Guest;
import com.PlanItRight.EventManagementService.repository.EventRepository;
import com.PlanItRight.EventManagementService.repository.GuestRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GuestRepository guestRepository;

    public Guest addGuestToEvent(Long eventId, Guest guest) throws ResourceNotFoundException, DatabaseException {
        try {
            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

            event.getGuests().add(guest);
            guestRepository.save(guest);
            eventRepository.save(event);
            return guest;

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("An error occurred while saving the guest to the event.", e);
        }
    }

    public void deleteGuestFromEvent(Long eventId, Long guestId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with id: " + guestId));

        guestRepository.delete(guest);
    }

    public List<Guest> getAllGuestsFromEvent(Long eventId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return event.getGuests();
    }


//    @Transactional
//    public Guest updateRsvpStatus(Long eventId, String email, String rsvpStatus) throws ResourceNotFoundException {
//        // Custom query to find the guest based on eventId and email
//        Query query = entityManager.createQuery("SELECT g FROM guest g WHERE g.event_id = :eventId AND g.email = :email");
//        query.setParameter("eventId", eventId);
//        query.setParameter("email", email);
//
//        Optional<Guest> optionalGuest = query.getResultStream().findFirst();
//
//        if (optionalGuest.isPresent()) {
//            Guest guest = optionalGuest.get();
//            guest.setRsvpStatus(rsvpStatus);
//            return guestRepository.save(guest);
//        } else {
//            throw new ResourceNotFoundException("Guest not found with email " + email + " for event with id " + eventId);
//        }
//    }
}

