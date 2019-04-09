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
  view = 'details';

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
    });
  }

  changeView() {
    if (this.view === 'details') {
      this.view = 'conversation';
      // let body = document.getElementsByTagName('body')[0];
      // body.classList.remove("className");   //remove the class
      // body.classList.add("className");   //add the class
      // change class of btn groups or wie geht es bei button groups https://getbootstrap.com/docs/4.3/components/button-group/
    } else {
      this.view = 'details';
    }
  }

}
