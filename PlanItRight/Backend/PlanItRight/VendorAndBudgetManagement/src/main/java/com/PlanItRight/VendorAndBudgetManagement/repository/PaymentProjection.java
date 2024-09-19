package com.PlanItRight.VendorAndBudgetManagement.repository;

import java.time.LocalDate;

public interface PaymentProjection {
    Long getId();
    Long getVendorId();
    Long getEventId();
    Double getAmount();
    LocalDate getDueDate();
    String getStatus();
}
