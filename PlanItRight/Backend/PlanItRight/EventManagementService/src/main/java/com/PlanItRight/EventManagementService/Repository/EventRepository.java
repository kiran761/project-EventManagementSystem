package com.PlanItRight.EventManagementService.repository;


import com.PlanItRight.EventManagementService.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
//    List<Event> findAllByUsername(String username);
    List<Event> findAllByEmail(String email);
}
