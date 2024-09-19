package com.PlanItRight.NotificationManagement.Repository;

import com.PlanItRight.NotificationManagement.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface NotificationRepository extends JpaRepository<Notification,Long> {

//    List<Notification> findByRecipientId(Long recipientId);
//    List<Notification> findByEventId(Long eventId);
//    List<Notification> findByRecipientIdAndEventId(Long recipientId, Long eventId);
}
