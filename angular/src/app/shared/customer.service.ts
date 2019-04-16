import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { SAMPLE_CUSTOMERS } from './sample-customers';

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

  getCustomerById(id: string) {
    let customer;
    SAMPLE_CUSTOMERS.forEach(item => {
      // tslint:disable-next-line: triple-equals
      if (item.id == id) {
        customer = item;
      }
    });
    return customer;
  }

  addCustomer(customer: Customer) {
    // '/spring/addCustomer'
    return this.http.post<any>(this.URL + '/addCustomer', customer, httpOptions);
  }

  updateCustomerById(id, customer: Customer) {
    return this.http.put(this.URL + `/updateCustomer/${id}`, customer, httpOptions);
  }

  deleteCustomerById(id: string) {
    return this.http.delete(this.URL + `/deleteCustomer/${id}`, httpOptions);
  }
}
