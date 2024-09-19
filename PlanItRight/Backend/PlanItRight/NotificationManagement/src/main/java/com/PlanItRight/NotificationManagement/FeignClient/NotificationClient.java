package com.PlanItRight.NotificationManagement.FeignClient;


import com.PlanItRight.NotificationManagement.DTO.EventDTO;
import com.PlanItRight.NotificationManagement.DTO.GuestDTO;

import com.PlanItRight.NotificationManagement.DTO.TaskDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "EventManagementService", url = "http://localhost:7001")
public interface NotificationClient {

    @GetMapping("/api/guests/{eventId}/all")
    public List<GuestDTO> getAllGuestsFromEvent(@PathVariable Long eventId) ;

    @GetMapping("/api/events/all")
    public List<EventDTO> getAllEvents();

    @GetMapping("/api/tasks/all")
    public List<TaskDTO> getAllTasks() ;


}
