package com.PlanItRight.EventManagementService.model;



import java.util.Date;
import java.util.List;

import org.hibernate.annotations.Cascade;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long eventId;
    private String email;
    private String name;
    private String description;
    private Date date;
    private String location;
    private String type;
    private Long budget;

    //    private String username;


    @OneToMany
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<com.PlanItRight.EventManagementService.model.Task> tasks;

    @OneToMany
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<com.PlanItRight.EventManagementService.model.Guest> guests;
}
