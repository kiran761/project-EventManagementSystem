import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendorModel } from '../../../../Models/VendorModel';
import { VendorService } from '../../../../vendor.service';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent implements OnInit {

  eventId!: number;
  vendors: VendorModel[] = [];
  selectedVendor: string = ''; 
  vendorId: number = 0;

  @Output() closePopup = new EventEmitter<void>();

  paymentsData={
  dueDate: '',
  amount: '',
  status:'',
  }

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();  
  }


  loadVendors(): void {
    this.vendorService.fetchAllVendors().subscribe(
      (response: VendorModel[]) => {
        this.vendors = response;
         console.log("Vendors loaded:", this.vendors);
      },
      error => {
        console.error('Error fetching vendors:', error);
      }
    );
  }


  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.selectedVendor && this.paymentsData.dueDate && this.paymentsData.amount && this.paymentsData.status) {
      
      const selectedVendorObj = this.vendors.find(vendor => vendor.name === this.selectedVendor);
      if (selectedVendorObj) {
        this.vendorId = selectedVendorObj.id;

  

        // console.log('Payment Data of Vendor:', this.paymentsData);
        this.addPayment(this.paymentsData);  // Pass the updated paymentData object
      }
    } else {
      alert('Please fill in all required fields');
    }
  }

  addPayment(paymentsData: { dueDate: string, amount: string, status: string }): void {
    this.eventId = Number(localStorage.getItem('eventId'));
    this.vendorService.addPayment(this.vendorId, this.eventId, this.paymentsData).subscribe(
      (response: any) => {
        console.log('Payment added successfully:', response);
        this.onClose();
      },
      error => {
        console.error('Error adding payment:', error);
      }
    );
  }
}
