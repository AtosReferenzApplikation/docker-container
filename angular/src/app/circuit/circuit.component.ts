import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { CustomerService } from '../shared/customer.service';
import { CircuitService } from '../shared/circuit.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faMinus, faCommentDots, faEnvelope, faEdit, faPhone } from '@fortawesome/free-solid-svg-icons';
import { MessageContent } from '../models/MessageContent';

import { SAMPLE_CUSTOMERS } from '../shared/sample-customers';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
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
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();

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

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  searchCustomers(term: string) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name.toLowerCase() + item.surname.toLowerCase()).includes(term.toLowerCase());
    });
  }

  addCustomerFromForm() {
    console.log(this.CustomerForm.value)
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

    // SAMPLE DATA
    this.customerList = SAMPLE_CUSTOMERS;
    this.displayedCustomers = SAMPLE_CUSTOMERS;
  }

  updateCustomerById(id, customer: Customer) {
    this.customerService.updateCustomerById(id, customer).subscribe(() => this.ngOnInit())
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
    this.circuitService.sendMessage(customer, content);
  }

  callCustomer(customer: Customer) {
    this.circuitService.startCall(customer.email, false);
  }

}
