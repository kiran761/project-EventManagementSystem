package com.PlanItRight.VendorAndBudgetManagement.controller;
import com.PlanItRight.VendorAndBudgetManagement.exception.EventNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.exception.VendorNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import com.PlanItRight.VendorAndBudgetManagement.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;


    @PostMapping("/add")
    public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vendor) {
        Vendor createdVendor = vendorService.addVendor(vendor);
        return ResponseEntity.ok(createdVendor);
    }


    @PostMapping("/addAll")
    public ResponseEntity<List<Vendor>> addAllVendors(@RequestBody List<Vendor> vendors)
    {
        return ResponseEntity.ok(vendorService.addAllVendors(vendors));
    }


    @PutMapping("/{vendorId}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable Long vendorId, @RequestBody Vendor vendor) throws VendorNotFoundException {
        Vendor updatedVendor = vendorService.updateVendor(vendorId, vendor);
        return updatedVendor != null ? ResponseEntity.ok(updatedVendor) : ResponseEntity.notFound().build();
    }


    @PutMapping("/{vendorId}/deactivate")
    public ResponseEntity<Void> deactivateVendor(@PathVariable Long vendorId) throws VendorNotFoundException {
        vendorService.deactivateVendor(vendorId);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{vendorId}/activate")
    public ResponseEntity<Void> activateVendor(@PathVariable Long vendorId) throws VendorNotFoundException {
        vendorService.activateVendor(vendorId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{vendorId}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long vendorId) throws VendorNotFoundException {
        Optional<Vendor> vendor = vendorService.getVendorById(vendorId);
        return vendor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/all")
    public ResponseEntity<List<Vendor>> getAllVendors() {

        return ResponseEntity.ok(vendorService.getAllVendors());
    }
}
