package com.PlanItRight.VendorAndBudgetManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PlanItRight.VendorAndBudgetManagement.exception.PaymentNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.exception.VendorNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.model.Payment;
import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import com.PlanItRight.VendorAndBudgetManagement.repository.PaymentProjection;
import com.PlanItRight.VendorAndBudgetManagement.repository.PaymentRepository;
import com.PlanItRight.VendorAndBudgetManagement.repository.VendorRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public List<PaymentProjection> getAllPayments() {

        return paymentRepository.findAllPayments();
    }

    public Payment createPayment(Payment payment, Long vendorId, Long eventId) throws VendorNotFoundException {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor with this ID " + vendorId + " not found."));
        payment.setVendor(vendor);
        payment.setEventId(eventId);
        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentsByVendorIdAndEventId(Long vendorId, Long eventId) {
        return paymentRepository.findByVendorIdAndEventId(vendorId, eventId);
    }

    public List<Payment> getPaymentsByEventId(Long eventId) {
        return paymentRepository.findByEventId(eventId);
    }

    public Optional<Payment> getPaymentById(Long paymentId) throws PaymentNotFoundException {
        return Optional.ofNullable(paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment with ID " + paymentId + " not found.")));
    }

    public Payment updatePayment(Long paymentId, Payment updatedPayment, Long vendorId, Long eventId)
            throws PaymentNotFoundException, VendorNotFoundException {
        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment with ID " + paymentId + " not found."));

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor with ID " + vendorId + " not found."));

        existingPayment.setAmount(updatedPayment.getAmount());
        existingPayment.setDueDate(updatedPayment.getDueDate());
        existingPayment.setStatus(updatedPayment.getStatus());
        existingPayment.setVendor(vendor);
        existingPayment.setEventId(eventId);

        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long paymentId) throws PaymentNotFoundException {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment with ID " + paymentId + " not found."));
        paymentRepository.delete(payment);
    }
}
