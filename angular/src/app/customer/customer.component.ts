import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CircuitService, CustomerService } from '../shared';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None // styling .nav-pills
})
export class CustomerComponent implements OnInit {
  customer: Customer;
  avatarUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customerService.getCustomerById(params.id).subscribe(val => {
        this.customer = val;
        this.getAvatarOfCustomer(this.customer);
      });
    });
  }

  getAvatarOfCustomer(customer: any) {
    this.circuitService
      .getUserById(customer.id)
      .then(user => {
        this.avatarUrl = user.avatar;
      })
      .catch(
        () => (this.avatarUrl = `https://ui-avatars.com/api/name=${customer.name}+${customer.surname}`)
      );
  }
}
