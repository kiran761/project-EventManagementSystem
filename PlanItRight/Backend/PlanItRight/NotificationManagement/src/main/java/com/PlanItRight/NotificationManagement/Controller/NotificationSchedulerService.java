package com.PlanItRight.NotificationManagement.Controller;

import com.PlanItRight.NotificationManagement.DTO.EventDTO;
import com.PlanItRight.NotificationManagement.DTO.GuestDTO;
import com.PlanItRight.NotificationManagement.DTO.TaskDTO;
import com.PlanItRight.NotificationManagement.FeignClient.NotificationClient;
import com.PlanItRight.NotificationManagement.Model.Notification;
import com.PlanItRight.NotificationManagement.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificationSchedulerService {

    @Autowired
    private NotificationClient notificationClient;

    @Autowired
    private NotificationService notificationService;

    @Scheduled(fixedRate = 6000) // Run every minute
    public void checkAndSendNotifications() {
        System.out.println("Hii 1");
        List<EventDTO> events = notificationClient.getAllEvents();
        LocalDateTime now = LocalDateTime.now();


        for (EventDTO event : events) {
            System.out.println("Hii 2");
            LocalDateTime eventDateTime = event.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().withHour(11).withMinute(0);

            if (ChronoUnit.HOURS.between(now, eventDateTime) <= 24) {
                System.out.println("Hii 3");
                System.out.println("Sending notifications for event: " + event.getEventId());
                sendNotificationsForEvent(event);
            }
        }

        List<TaskDTO> tasks=notificationClient.getAllTasks();
        for (TaskDTO task : tasks) {
            if (ChronoUnit.HOURS.between(now, task.getDueDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().withHour(11).withMinute(0)) <= 24) {
                System.out.println("Hii 6");
                System.out.println("Sending notifications for task: " + task.getId());
                sendNotificationsForTask(task);
            }
        }
    }

    private void sendNotificationsForTask(TaskDTO task){


    }

    private void sendNotificationsForEvent(EventDTO event) {
        System.out.println("Hii 4");
        List<GuestDTO> guests = notificationClient.getAllGuestsFromEvent(event.getEventId());
        Notification notification = new Notification();
        notification.setMessage("Reminder for the Event " + event.getName() + " at " + event.getDate() +
                "\n Just a quick reminder about the upcoming event! We're so excited and can't wait to see you there.");
        notification.setSubject(event.getName());

        for (GuestDTO guest : guests) {
            System.out.println("Hii 5");
            notificationService.sendEmailToGuest(notification, guest.getId(), event.getEventId());
        }
    }
}



