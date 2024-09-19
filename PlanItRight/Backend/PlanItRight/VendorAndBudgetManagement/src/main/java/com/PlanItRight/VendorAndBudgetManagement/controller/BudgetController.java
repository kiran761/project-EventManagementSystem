package com.PlanItRight.VendorAndBudgetManagement.controller;


import com.PlanItRight.VendorAndBudgetManagement.exception.EventNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.model.Budget;
import com.PlanItRight.VendorAndBudgetManagement.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/events/{eventId}")
    public ResponseEntity<Budget> setEventBudget(@PathVariable Long eventId, @RequestBody Budget budget) throws EventNotFoundException {
        Budget createdBudget = budgetService.setEventBudget(eventId, budget);
        return ResponseEntity.ok(createdBudget);
    }

    @GetMapping("/events/{eventId}")
    public ResponseEntity<Budget> getBudgetByEventId(@PathVariable Long eventId) throws EventNotFoundException {
        Optional<Budget> budget = budgetService.getBudgetByEventId(eventId);
        return budget.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



}

