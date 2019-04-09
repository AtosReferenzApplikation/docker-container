import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None // for styling .nav-pills
})
export class CustomerComponent implements OnInit {

  customer: Customer;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
    });
  }

}
