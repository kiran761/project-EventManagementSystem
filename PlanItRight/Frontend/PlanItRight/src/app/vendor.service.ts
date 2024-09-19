import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorModel } from './Models/VendorModel';
import { Payment } from './Models/PaymentModel';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private vendorApiUrl = 'http://localhost:7000/api/vendors';
  private paymentApiUrl = 'http://localhost:7000/api/payments/all';

  constructor(private http: HttpClient) {}

  fetchVendorById(vendorId: number): Observable<VendorModel> {
    return this.http.get<VendorModel>(`${this.vendorApiUrl}/${vendorId}`);
  }

  fetchAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentApiUrl);
  }

  fetchAllVendors(): Observable<VendorModel[]> {
    
    return this.http.get<VendorModel[]>(`${this.vendorApiUrl}/all`);
  }

  addPayment(vendorId: number, eventId: number, paymentsData: {dueDate: string, amount: string, status: string}): Observable<any> {
   
    const url = `http://localhost:7000/api/payments/vendors/${vendorId}/events/${eventId}`;
    return this.http.post(url, paymentsData); 
}

addVendor(vendorData: VendorModel): Observable<VendorModel> {
  console.log("Hello Hii"+vendorData); 
  return this.http.post<VendorModel>(`${this.vendorApiUrl}/add`, vendorData);
}
  
}
  