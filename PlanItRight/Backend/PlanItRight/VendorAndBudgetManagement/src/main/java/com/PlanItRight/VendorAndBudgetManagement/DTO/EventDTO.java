package com.PlanItRight.VendorAndBudgetManagement.DTO;


import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
//import org.springframework.scheduling.config.Task;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private Long eventId;

    private String name;
    private String description;
    private Date date;
    private String location;
    private String type;






}

