package com.PlanItRight.EventManagementService.repository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface TaskProjection {
    Long getId();
    String getName();
    String getDescription();
    LocalDate getDueDate();
    LocalTime getDueTime();
    String getStatus();
    Long getEventId(); // This will map to the event_id in the database
}