package com.PlanItRight.EventManagementService.repository;

import com.PlanItRight.EventManagementService.repository.TaskProjection;
import com.PlanItRight.EventManagementService.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    @Query("SELECT t.id as id, t.name as name, t.description as description, t.dueDate as dueDate, t.dueTime as dueTime, t.status as status, t.event.id as eventId FROM Task t WHERE t.event.id = :eventId")
    List<TaskProjection> findAllByEventId(Long eventId);
}
