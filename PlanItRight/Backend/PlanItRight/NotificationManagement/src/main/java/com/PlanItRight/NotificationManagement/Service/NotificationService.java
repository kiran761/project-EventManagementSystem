package com.PlanItRight.NotificationManagement.Service;

import com.PlanItRight.NotificationManagement.FeignClient.NotificationClient;
import com.PlanItRight.NotificationManagement.DTO.GuestDTO;
import com.PlanItRight.NotificationManagement.Model.Notification;
import com.PlanItRight.NotificationManagement.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationClient notificationClient;

//    @Value("$(spring.mail.username)")
//    private String fromEmailId;

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }



    public void sendEmailToGuest(Notification notification, Long guestId , Long eventId) {


        System.out.println("HII");
       List<GuestDTO> allGuests =notificationClient.getAllGuestsFromEvent(eventId);
       GuestDTO guest = allGuests.stream().filter(g -> g.getId().equals(guestId)).findFirst().orElse(null);
       if(guest!=null){

           SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
simpleMailMessage.setFrom("Event");
        simpleMailMessage.setTo(guest.getEmail());
        simpleMailMessage.setText(notification.getMessage());
        simpleMailMessage.setSubject(notification.getSubject());

           javaMailSender.send(simpleMailMessage);

       }
    }
}
//SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//simpleMailMessage.setFrom(fromEmailId);
//        simpleMailMessage.setTo(recipient);
//        simpleMailMessage.setText(body);
//        simpleMailMessage.setSubject(subject);
//
//        javaMailSender.send(simpleMailMessage);