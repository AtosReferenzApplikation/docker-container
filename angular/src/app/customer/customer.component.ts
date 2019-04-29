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
  downloadJsonHref: any;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
    });
  }

  generateChatProtocol() {
    this.circuitService.getConversation(this.customer.email).then((threadObject: { threads: any; }) => {
      const threadsJson = JSON.stringify(this.formatThreads(threadObject.threads));
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(threadsJson));
      element.setAttribute('download', 'chat-protokoll_' + this.customer.surname + '-' + this.customer.name + '.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }

  formatThreads(threads: any) {
    // format here
    return threads;
  }

}
