import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit {

  constructor(private http: HttpClient) { }

  title = 'Daten Erfassung';

  private addURL = 'http://localhost:8080/addCustomer';//'/spring/addCustomer';
  private getURL = 'http://localhost:8080/getCustomers';
  customerList; // contains all customers
  displayedCustomers; // contains customers which will be displayed

  CustomerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();
  }

  searchCustomers(term) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name + item.surname).includes(term);
    });
  }

  sendCustomer() {
    this.submitCustomer(this.addURL, this.CustomerForm.value)
      .subscribe(() => this.ngOnInit());
  }

  submitCustomer(url: string, data: string) {
    return this.http.post<any>(url, data, httpOptions);
  }

  getCustomers() {
    this.http.get(this.getURL, httpOptions).subscribe((res: any) => {
      res.reverse();
      this.customerList = res;
      this.displayedCustomers = res;
    });
  }

  deleteCustomer(id: string) {
    this.http.delete('http://localhost:8080/deleteCustomer/' + id, httpOptions)
      .subscribe(() => this.ngOnInit());
  }

}


export interface Customer {
  id: string;
  name: string;
  surname: string;
}