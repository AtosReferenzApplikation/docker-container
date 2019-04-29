import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerService } from '../shared/services/customer/customer.service';
import { Customer } from '../models/customer';
import { CircuitService } from '../shared/services/circuit/circuit.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None // styling .nav-pills
})
export class CustomerComponent implements OnInit {

  customer: Customer = null;
  avatarUrl = '';

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
      this.getAvatarOfCustomer(this.customer);
    });
  }

  getAvatarOfCustomer(customer: any) {
    this.circuitService.getUserById(customer.id).then(user => {
      this.avatarUrl = user.avatar;
    }).catch(() => this.avatarUrl = `https://ui-avatars.com/api/name=${customer.name}+${customer.surname}`);
  }

}
