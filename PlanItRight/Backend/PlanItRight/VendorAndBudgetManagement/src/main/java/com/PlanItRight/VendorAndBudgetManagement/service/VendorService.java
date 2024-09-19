package com.PlanItRight.VendorAndBudgetManagement.service;

import com.PlanItRight.VendorAndBudgetManagement.exception.VendorNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import com.PlanItRight.VendorAndBudgetManagement.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public Vendor addVendor(Vendor vendor) {
        vendor.setStatus("active");
        return vendorRepository.save(vendor);
    }

    public Vendor updateVendor(Long vendorId, Vendor updatedVendor) throws VendorNotFoundException {
        if (vendorRepository.existsById(vendorId)) {
            updatedVendor.setId(vendorId);
            return vendorRepository.save(updatedVendor);
        } else {
            throw new VendorNotFoundException("Vendor with ID " + vendorId + " not found.");
        }
    }

    public void deactivateVendor(Long vendorId) throws VendorNotFoundException {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor with ID " + vendorId + " not found."));
        vendor.setStatus("inactive");
        vendorRepository.save(vendor);
    }

    public Optional<Vendor> getVendorById(Long vendorId) throws VendorNotFoundException {
        return Optional.ofNullable(vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor with ID " + vendorId + " not found.")));
    }

    public void activateVendor(Long vendorId) throws VendorNotFoundException {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor with ID " + vendorId + " not found."));
        vendor.setStatus("active");
        vendorRepository.save(vendor);
    }

    public List<Vendor> getAllVendors() {
        try {
            return vendorRepository.findAll();
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to retrieve all vendors due to database error: " + e.getMessage(), e);
        }
    }

    public List<Vendor> addAllVendors(List<Vendor> vendors) {
        try {
            return vendorRepository.saveAll(vendors);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to add vendors due to database error: " + e.getMessage(), e);
        }
    }
}
