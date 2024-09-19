import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported for ngModel to work
import { VendorService } from '../vendor.service';
import { VendorModel } from '../Models/VendorModel';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [FormsModule, NgIf], // Import FormsModule here
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {

  constructor(private vendorService: VendorService) {}
  isPopupOpen = false;

  vendor: VendorModel = {
    name: '',
    serviceType: '',
    contactInfo: '',
    status: 'pending',
    userEmail: localStorage.getItem('email') || ' ', // Assuming email is stored in localStorage
    location: '',
    id:0
  };

  openPopup() {
    this.isPopupOpen = true; // Opens the vendor popup
  }

  closePopup() {
    this.isPopupOpen = false; // Closes the vendor popup
  }

  onSubmit() {
    console.log('Vendor:', this.vendor);

    this.vendorService.addVendor(this.vendor).subscribe(
      (response: VendorModel) => {
        console.log("Vendor added:", response); // Log the added vendor response
      },
      error => {
        console.error('Error adding vendor:', error);
      }
    );

    this.vendor = {
      name: '',
      serviceType: '',
      contactInfo: '',
      status: 'pending',
      userEmail: localStorage.getItem('email') || ' ', // Assuming email is stored in localStorage
      location: '',
      id:0
    };
    this.closePopup(); // Close the popup after submission
  }
}
