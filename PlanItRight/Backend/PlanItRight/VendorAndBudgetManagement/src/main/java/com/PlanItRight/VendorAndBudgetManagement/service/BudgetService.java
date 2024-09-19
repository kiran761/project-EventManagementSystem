package com.PlanItRight.VendorAndBudgetManagement.service;

import com.PlanItRight.VendorAndBudgetManagement.DTO.EventDTO;
import com.PlanItRight.VendorAndBudgetManagement.Feign.EventClient;
import com.PlanItRight.VendorAndBudgetManagement.exception.EventNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.model.Budget;
import com.PlanItRight.VendorAndBudgetManagement.repository.BudgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private EventClient eventClient;

    public Budget setEventBudget(Long eventId, Budget budget) throws EventNotFoundException {
        EventDTO event = eventClient.getEventById(eventId);

        if (event != null) {
            budget.setEventId(event.getEventId());
            return budgetRepository.save(budget);
        }

        throw new EventNotFoundException("Event with ID " + eventId + " not found.");
    }

    public Optional<Budget> getBudgetByEventId(Long eventId) throws EventNotFoundException {
        Optional<Budget> budget = budgetRepository.findByEventId(eventId);
        if (budget.isEmpty()) {
            throw new EventNotFoundException("Budget for Event ID " + eventId + " not found.");
        }
        return budget;
    }
}
