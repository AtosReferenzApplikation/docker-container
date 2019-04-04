import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { CustomerService } from '../shared/customer.service';
import { CircuitService } from '../shared/circuit.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { faMinus, faCommentDots, faEnvelope, faEdit, faPhone } from '@fortawesome/free-solid-svg-icons';
import { MessageContent } from '../models/MessageContent';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit, OnDestroy {

  customerList = []; // contains all customers
  displayedCustomers = []; // contains customers which will be displayed

  CustomerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null),
    phone: new FormControl(null),
  });

  // fontawesome
  faMinus = faMinus; faEdit = faEdit;
  faEnvelope = faEnvelope; faCommentDots = faCommentDots; faPhone = faPhone;

  constructor(private customerService: CustomerService,
    private circuitService: CircuitService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();
    this.customerList.push({ name: 'Peter', surname: 'Meier', id: 'TestId192837465', email: 'peter.meier99@gmx.de', phone: '+4915233742229' }); // SAMPLE DATA
    this.displayedCustomers.push({ name: 'Peter', surname: 'Meier', id: 'TestId192837465', email: 'peter.meier99@gmx.de', phone: '+4915233742229' }); // SAMPLE DATA

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

  public trackByFn(intex: number, item: Customer) {
    return item.id;
  } // test/implement trackBy in html if spring connection works

  searchCustomers(term: string) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name + item.surname).includes(term);
    });
  }

  sendCustomer() {
    if (this.CustomerForm.status === 'VALID') {
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

  loginToCircuit() {
    this.circuitService.authenticateUser();
  }

  messageCustomer(customer: Customer) {
    const content: MessageContent = {
      content: 'Hallo Herr ' + customer.surname
    }
    this.circuitService.sendMessage(customer, content)
    // // SAMPLE DATA
    // const subject = 'Ihr Feedback';
    // const content = 'Hallo ' + customer.name + ' ' + customer.surname;

    // const convId = await this.circuitService.startDirectConversation(customer).toPromise()
    //   .then((res: any) => res.convId)
    //   .catch(err => err.error.convId);

    // this.circuitService.sendMessageToConversation(convId, subject, content)
    //   .subscribe(res => console.log(res));
  }

  callCustomer(customer: Customer) {
    this.circuitService.startCall(customer.email, false);
  }

}
