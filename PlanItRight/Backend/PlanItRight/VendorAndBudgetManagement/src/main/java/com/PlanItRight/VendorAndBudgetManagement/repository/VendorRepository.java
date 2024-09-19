package com.PlanItRight.VendorAndBudgetManagement.repository;

import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor,Long> {
}
