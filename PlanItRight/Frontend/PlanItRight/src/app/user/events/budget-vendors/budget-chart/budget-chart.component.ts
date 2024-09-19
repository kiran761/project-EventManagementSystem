import { Component, AfterViewInit, ElementRef, ViewChild, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, registerables, Title, Tooltip } from 'chart.js';
import { VendorsComponent } from "../vendors/vendors.component";
import { VendorService } from '../../../../vendor.service';
import { forkJoin, map } from 'rxjs';
import { EventService } from '../../../../event.service';
import { AddVendorComponent } from '../../../../add-vendor/add-vendor.component';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, LineElement, LineController , PointElement);

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [CommonModule, VendorsComponent, AddVendorComponent],
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})

export class BudgetChartComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('budgetChart', { static: false }) budgetChartRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild(AddVendorComponent) addVendorComponent!: AddVendorComponent;



  budgetData: any;
  chart: Chart | null = null;
  chartInitialized = false;

  visibleVendors: { name: string, amount: number }[] = [];
  currentPage: number = 0;
  vendorsPerPage: number = 10;

  Math = Math;

  totalExpenses: number = 0;
  remainingBudget: number = 0;

  searchTerm: string = '';
  filteredVendors: any[] = [];
  isPopupOpen: boolean = false;

  eventIdgot= localStorage.getItem('eventId');
  eventId=Number(this.eventIdgot);

  constructor(private vendorService: VendorService, private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEventAndPayments();
    console.log('Budget Chart Event ID:', this.eventId);
  }

  loadEventAndPayments(): void {
    this.eventService.fetchEventById(this.eventId).subscribe(eventData => {
      this.budgetData = {
        name: eventData.name,
        total_budget: eventData.budget, // Corrected from 'amount' to 'budget'
        vendors: [] // We'll populate this later with the vendor data
      };

      this.loadPaymentsAndVendors();
    });
  }

  loadPaymentsAndVendors(): void {
    this.vendorService.fetchAllPayments().subscribe(payments => {
      const vendorRequests = payments
        .filter(payment => payment.eventId === this.eventId) // Filter payments by eventId
        .map(payment => {
          return this.vendorService.fetchVendorById(payment.vendorId).pipe(
            map(vendor => ({
              ...payment,
              name: vendor.name
            }))
          );
        });

      forkJoin(vendorRequests).subscribe(vendorData => {
        this.budgetData.vendors = vendorData;
      
        console.log('Final Vendor Data:', this.budgetData.vendors); // Debugging log
      
        this.filteredVendors = this.budgetData.vendors;
        this.updateBudgetInfo(); // Calculate totals and remaining budget
        this.updateVisibleVendors(); // Update the chart with the visible vendors
      });
    });
  }

  ngAfterViewChecked(): void {
    // console.log('Budget Data:', this.budgetData); // Debugging log

    if (this.budgetData && this.budgetData.vendors && this.budgetData.vendors.length > 0 && !this.chartInitialized && this.budgetChartRef) {
      this.createChart(this.visibleVendors);
      this.chartInitialized = true;
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  updateBudgetInfo(): void {
    const aggregatedData = this.aggregateVendorExpenses(this.filteredVendors);
    this.totalExpenses = this.calculateTotalExpenses(aggregatedData);
    this.remainingBudget = this.budgetData.total_budget - this.totalExpenses;
  }

  aggregateVendorExpenses(vendorData: { name: string, amount: number }[]): { name: string, amount: number }[] {
    const expenseMap = new Map<string, number>();

    vendorData.forEach(vendor => {
        if (expenseMap.has(vendor.name)) {
            expenseMap.set(vendor.name, expenseMap.get(vendor.name)! + vendor.amount);
        } else {
            expenseMap.set(vendor.name, vendor.amount);
        }
    });

    return Array.from(expenseMap, ([name, amount]) => ({ name, amount }));
  }

  calculateTotalExpenses(aggregatedData: { name: string, amount: number }[]): number {
    return aggregatedData.reduce((total, vendor) => total + vendor.amount, 0);
  }

  updateVisibleVendors(): void {
    const aggregatedData = this.aggregateVendorExpenses(this.filteredVendors);
    const startIndex = this.currentPage * this.vendorsPerPage;
    const endIndex = startIndex + this.vendorsPerPage;
    this.visibleVendors = aggregatedData.slice(startIndex, endIndex);
    if (this.chart) {
      this.chart.destroy();
      this.createChart(this.visibleVendors);
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.filteredVendors.length / this.vendorsPerPage);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateVisibleVendors();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleVendors();
    }
  }

  createChart(vendorData: { name: string, amount: number }[]): void {
    const canvas = this.budgetChartRef?.nativeElement;
    const ctx = canvas?.getContext('2d');

    console.log('Canvas:', canvas); // Debug log
    console.log('Context:', ctx);   // Debug log

    if (!ctx || vendorData.length === 0) {
        console.error('Chart context initialization failed or no data available.');
        return;
    }

    if (this.chart) {
        this.chart.destroy();
        this.chart = null;
    }

    this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: vendorData.map(vendor => vendor.name),
            datasets: [{
                label: 'Expenses',
                data: vendorData.map(vendor => vendor.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Vendor'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Expenses (USD)'
                    },
                    grid: {
                        color: '#f2f2f2'
                    }
                }
            }
        }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'in progress':
        return 'status-in-progress';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = searchTerm;
    this.filteredVendors = this.budgetData.vendors.filter((vendor: any) =>
      vendor.name.toLowerCase().includes(this.searchTerm)
    );
    this.currentPage = 0;
    this.updateBudgetInfo();
    this.updateVisibleVendors();
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  isVendorPopupOpen: boolean = false;

  openVendorPopup() {
    if (this.addVendorComponent) {
      this.addVendorComponent.openPopup(); // Calls openPopup of AddVendorComponent
    } else {
      console.error("AddVendorComponent is not initialized.");
    }
  }

  closeVendorPopup() {
    if (this.addVendorComponent) {
      this.addVendorComponent.closePopup(); // Calls closePopup of AddVendorComponent
    } else {
      console.error("AddVendorComponent is not initialized.");
    }
  }
  

}