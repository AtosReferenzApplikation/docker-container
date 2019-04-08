import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faMinus, faCommentDots, faEnvelope, faEdit, faPhone } from '@fortawesome/free-solid-svg-icons';

import { Customer } from '../models/customer';
import { CustomerService } from '../shared/customer.service';
import { SAMPLE_CUSTOMERS } from '../shared/sample-customers';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

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
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();
  }

  public trackByFn(index: number, item: Customer) {
    return item.id;
  } // test/implement trackBy in html if spring connection works

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  redirectToCustomer(customer: Customer) {
    this.router.navigate(['/management/customer/' + customer.id]);
  }

  searchCustomers(term: string) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name.toLowerCase() + item.surname.toLowerCase()).includes(term.toLowerCase());
    });
  }

  addCustomerFromForm() {
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

}
