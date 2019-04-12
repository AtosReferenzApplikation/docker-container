import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CustomerService } from '../shared/customer.service';
import { Customer } from '../models/customer';
import { CircuitService } from '../shared/circuit.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None // for styling .nav-pills
})
export class CustomerComponent implements OnInit {

  customer: Customer;
  downloadJsonHref;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
    });
  }

  generateChatProtocol() {
    this.circuitService.getConversation(this.customer.email).then(threadObject =>{
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

  formatThreads(threads) {
    // format here
    return threads;
  }

}
