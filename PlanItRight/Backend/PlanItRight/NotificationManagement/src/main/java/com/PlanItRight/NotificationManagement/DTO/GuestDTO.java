package com.PlanItRight.NotificationManagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestDTO {

    private Long id;
    private String name;
    private String email;
    private String rsvpStatus;

}
