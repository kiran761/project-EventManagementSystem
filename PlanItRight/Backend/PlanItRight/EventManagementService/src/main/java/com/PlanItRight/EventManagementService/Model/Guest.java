package com.PlanItRight.EventManagementService.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Guest {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String email;
    private String rsvpStatus;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "event_id", nullable = false)
//    @JsonIgnore
//    private com.PlanItRight.EventManagementService.model.Event event;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "event_id", nullable = false)
//    private Event event;
}


