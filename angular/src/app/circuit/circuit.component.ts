import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Customer } from '../models/customer';
import { CircuitService } from '../shared/circuit.service';
import { MessageContent } from '../models/MessageContent';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
})
export class CircuitComponent implements OnInit, OnDestroy {

  constructor(private circuitService: CircuitService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
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

  loginToCircuit() {
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
