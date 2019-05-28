import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faMinus,
  faCommentDots,
  faEnvelope,
  faEdit,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { Customer } from '../models/customer';
import { SAMPLE_CUSTOMERS, CustomerService } from '../shared';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  customerList = []; // contains all customers
  displayedCustomers = []; // contains customers which will be displayed

  inputIsCollapsed = true;
  invalidSubmit = { name: false, surname: false, email: false, phone: false };
  CustomerForm = new FormGroup({
    name: new FormControl(Validators.required),
    surname: new FormControl(Validators.required),
    email: new FormControl([Validators.required, Validators.email]),
    phone: new FormControl(Validators.required),
    postalcode: new FormControl(),
    city: new FormControl(),
    street: new FormControl()
  });

  // fontawesome vars
  faMinus = faMinus;
  faEdit = faEdit;
  faEnvelope = faEnvelope;
  faCommentDots = faCommentDots;
  faPhone = faPhone;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();
  }

  public trackByFn(index: number, item: Customer) {
    return item.id;
  } // test/implement trackBy in html if spring connection works

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  redirectToCustomer(customer: Customer) {
    this.router.navigate(['/management/customer/' + customer.id]);
  }

  searchCustomers(term: string) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name.toLowerCase() + item.surname.toLowerCase()).includes(
        term.toLowerCase()
      );
    });
  }

  addCustomerFromForm() {
    if (this.CustomerForm.status === 'VALID') {
      this.invalidSubmit = {
        name: false,
        surname: false,
        email: false,
        phone: false
      };
      this.customerService
        .addCustomer(this.CustomerForm.value)
        .subscribe(() => this.ngOnInit());
      this.CustomerForm.reset();
    } else {
      if (!this.CustomerForm.get('name').valid) {
        this.invalidSubmit.name = true;
      } else {
        this.invalidSubmit.name = false;
      }
      if (!this.CustomerForm.get('surname').valid) {
        this.invalidSubmit.surname = true;
      } else {
        this.invalidSubmit.surname = false;
      }
      if (!this.CustomerForm.get('email').valid) {
        this.invalidSubmit.email = true;
      } else {
        this.invalidSubmit.email = false;
      }
      if (!this.CustomerForm.get('phone').valid) {
        this.invalidSubmit.phone = true;
      } else {
        this.invalidSubmit.email = false;
      }

      console.error(this.CustomerForm.status);
    }
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (response: any) => {
        this.customerList = response;
        this.displayedCustomers = response;
      },
      () => {
        // SAMPLE DATA
        this.customerList = SAMPLE_CUSTOMERS;
        this.displayedCustomers = SAMPLE_CUSTOMERS;
      }
    );
  }

  updateCustomerById(id: any, customer: Customer) {
    this.customerService
      .updateCustomerById(id, customer)
      .subscribe(() => this.ngOnInit());
  }

  deleteCustomer(id: string) {
    this.customerService
      .deleteCustomerById(id)
      .subscribe(() => this.ngOnInit());
  }
}
