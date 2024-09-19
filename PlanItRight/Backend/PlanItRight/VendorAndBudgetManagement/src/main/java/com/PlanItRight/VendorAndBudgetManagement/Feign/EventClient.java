package com.PlanItRight.VendorAndBudgetManagement.Feign;

import com.PlanItRight.VendorAndBudgetManagement.DTO.EventDTO;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "EventManagementService", url = "http://localhost:7001")
public interface EventClient {

    @GetMapping("/api/events/{eventId}")
    EventDTO getEventById(@PathVariable("eventId") Long eventId);

}
