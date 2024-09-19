package com.PlanItRight.NotificationManagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {

    private Long eventId;

    private String name;
    private String description;
    private Date date;
    private String location;
    private String type;
    private Long budget;
}
