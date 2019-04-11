import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faVideo, faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { CustomerService } from '../shared/customer.service';
import { Customer } from '../models/customer';
import { CircuitService } from '../shared/circuit.service';
import { MessageContent } from '../models/MessageContent';

@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.scss']
})
export class CustomerChatComponent implements OnInit {

  customer: Customer;
  faEdit = faEdit; faVideo = faVideo; faPhone = faPhone; faPhoneSlash = faPhoneSlash;

  // chat props
  topics = [];
  status = 'Offline'; // dynamic
  call = true; // later contains call object


  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
    });

    this.topics = [
      { title: 'Title of 1st', content: 'My first Topic', texts: [{ content: '1st text', user: { name: 'P', surname: 'M' } }, { content: '2nd text', user: { name: 'S', surname: 'B' } }], user: { name: 'S', surname: 'B' } },
      { title: 'Title of 2nd', content: 'My second Topic', texts: [{ content: '1st text', user: { name: 'P', surname: 'M' } }, { content: '2nd text', user: { name: 'P', surname: 'M' } }, { content: '3rd text', user: { name: 'S', surname: 'B' } }], user: { name: 'P', surname: 'M' } },
      { title: 'Title of 3rd', content: 'My third Topic', texts: [{ content: '1st text', user: { name: 'S', surname: 'B' } },], user: { name: 'P', surname: 'M' } },
    ]

    this.circuitService.loggedIn.subscribe(value => {
      if (value) {
        this.spinner.hide();
      } else {
        this.spinner.show();
      }
    });
  }

  ngOnDestroy(): void {
    // localStorage.clear();
  }

  logonToCircuit() {
    this.circuitService.authenticateUser();
  }

  messageCustomer(customer: Customer) {
    const content: MessageContent = {
      content: 'Hallo Herr ' + customer.surname
    }
    this.circuitService.sendMessage(customer, content);
  }

  callCustomer(customer: Customer) {
    this.circuitService.startCall(customer.email, false);
  }

}
