package com.PlanItRight.VendorAndBudgetManagement.repository;

import com.PlanItRight.VendorAndBudgetManagement.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget,Long> {

    Optional<Budget> findByEventId(Long eventId);
}
