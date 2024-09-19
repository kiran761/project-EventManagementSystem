import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VendorService } from '../../../../vendor.service';
import { Payment } from '../../../../Models/PaymentModel';

@Component({
  selector: 'app-budget-vendors-sub',
  standalone: true,
  imports: [NgFor],
  templateUrl: './budget-vendors-sub.component.html',
  styleUrl: './budget-vendors-sub.component.css'
})
export class BudgetVendorsSubComponent {
  @Input() eventId!: number;

  vendors: any[] = [];
  highestVendor: any;
  secondHighestVendor: any;
  currentIndex: number = 0;
  intervalId: any;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    console.log('Event ID:', this.eventId);
    this.fetchPayments();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchPayments(): void {
    this.vendorService.fetchAllPayments().subscribe((payments: Payment[]) => {
      this.processPayments(payments);
    }, error => {
      console.error('Failed to fetch payments:', error);
    });
  }

  processPayments(payments: Payment[]): void {
    const vendorSpendMap = new Map<number, number>();

    // Calculate total spend per vendor (using vendorId)
    payments.forEach(payment => {
      const currentSpend = vendorSpendMap.get(payment.vendorId) || 0;
      vendorSpendMap.set(payment.vendorId, currentSpend + payment.amount);
    });

    // Fetch vendor names using their IDs
    vendorSpendMap.forEach((spend, vendorId) => {
      this.vendorService.fetchVendorById(vendorId).subscribe(vendor => {
        this.vendors.push({ name: vendor.name, spend });
        // Sort vendors by spend in descending order
        this.vendors.sort((a, b) => b.spend - a.spend);

        // Set the highest and second highest vendors
        if (this.vendors.length > 0) {
          this.highestVendor = this.vendors[0];
        }

        if (this.vendors.length > 1) {
          this.secondHighestVendor = this.vendors[1];
        }
      }, error => {
        console.error(`Failed to fetch vendor with ID ${vendorId}:`, error);
      });
    });

    // Start the interval to automatically iterate through the data
    this.intervalId = setInterval(() => {
      this.nextSet();
    }, 3000); // Change rows every 3 seconds
  }

  nextSet(): void {
    // Move to the next set of 5 vendors
    this.currentIndex += 1;
    if (this.currentIndex + 5 > this.vendors.length) {
      this.currentIndex = 0; // Loop back to the beginning
    }
  }

  getVisibleVendors(): any[] {
    return this.vendors.slice(this.currentIndex, this.currentIndex + 5);
  }}
