import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  customerList; // contains all customers
  displayedCustomers; // contains customers which will be displayed

  CustomerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null),
  });

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();
  }

  searchCustomers(term: string) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name + item.surname).includes(term);
    });
  }

  sendCustomer() {
    if (this.CustomerForm.status === 'VALID') {
      if (this.CustomerForm.value.email == null) {
        this.CustomerForm.value.email = this.CustomerForm.value.name.toLowerCase() + '.' + this.CustomerForm.value.surname.toLowerCase() + '@atos.de';
      }

      this.customerService.addCustomer(this.CustomerForm.value)
        .subscribe(() => this.ngOnInit());
    } else {
      console.error('INPUT IS INVALID');
    }
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe((result: any) => {
      this.customerList = result;
      this.displayedCustomers = result;
    });
  }

  deleteCustomer(id: string) {
    this.customerService.deleteCustomerById(id).subscribe(() => this.ngOnInit());
  }

}
