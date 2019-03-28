import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get(this.URL + '/getCustomers', httpOptions);
  }

  getCustomersById(id: string) {
    // to be implemented
  }

  addCustomer(customer: Customer) {
    // '/spring/addCustomer'
    return this.http.post<any>(this.URL + '/addCustomer', customer, httpOptions);
  }

  deleteCustomerById(id: string) {
    return this.http.delete(this.URL + '/deleteCustomer/' + id, httpOptions);
  }
}
