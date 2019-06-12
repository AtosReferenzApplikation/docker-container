import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../../../models/customer';
import { SAMPLE_CUSTOMERS } from '../../sample-customers';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  get URI() {
    return window.location.href.includes('localost:')
      ? 'http://localhost:8080'
      : '/spring';
  }

  getAllCustomers() {
    return this.http.get(this.URI + '/getCustomers', httpOptions);
  }

  getCustomerById(id: string) {
    let customer: Customer;
    SAMPLE_CUSTOMERS.forEach(item => {
      // tslint:disable-next-line: triple-equals
      if (item.id == id) {
        customer = item;
      }
    });
    return of(customer);
  }

  addCustomer(customer: Customer) {
    return this.http.post<any> (
      this.URI + '/addCustomer',
      customer,
      httpOptions
    );
  }

  updateCustomerById(id: any, customer: Customer) {
    return this.http.put(
      this.URI + `/updateCustomer/${id}`,
      customer,
      httpOptions
    );
  }

  deleteCustomerById(id: string) {
    return this.http.delete(this.URI + `/deleteCustomer/${id}`, httpOptions);
  }
}
