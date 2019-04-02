import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { CustomerService } from '../shared/customer.service';
import { CircuitService } from '../shared/circuit.service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit, OnDestroy {

  constructor(private customerService: CustomerService,
    private circuitService: CircuitService) { }

  customerList = []; // contains all customers
  displayedCustomers = []; // contains customers which will be displayed

  CustomerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null),
  });

  ngOnInit() {
    this.CustomerForm.reset();
    this.getCustomers();
    this.customerList.push({ name: 'Peter', surname: 'Meier', id: 'TestId192837465', email: 'peter.meier99@gmx.de' }); // SAMPLE DATA
    this.displayedCustomers.push({ name: 'Peter', surname: 'Meier', id: 'TestId192837465', email: 'peter.meier99@gmx.de' }); // SAMPLE DATA
  }

  ngOnDestroy(): void {
    // localStorage.clear();
  }

  searchCustomers(term: string) {
    this.displayedCustomers = this.customerList.filter((item: Customer) => {
      return (item.name + item.surname).includes(term);
    });
  }

  sendCustomer() {
    if (this.CustomerForm.status === 'VALID') {
      if (this.CustomerForm.value.email == null) {
        // this.CustomerForm.value.email = this.CustomerForm.value.name.toLowerCase() + '.' + this.CustomerForm.value.surname.toLowerCase() + '@atos.de';
      }

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

  // circuit api calls
  loginToCircuit() {
    this.circuitService.authenticateUser();
  }

  async messageCustomer(customer: Customer/**, subject: string, content: string*/) {
    let convId = '';

    // SAMPLE
    const subject = 'Ihr Feedback';
    const content = 'Hallo Herr ' + customer.surname + ' ich schreibe Ihnen auf Grund Ihres Feedbacks.';
    await this.circuitService.startDirectConversation(customer).toPromise()
      .then((res: any) => convId = res.convId)
      .catch(err => convId = err.error.convId);

    this.circuitService.sendMessageToConversation(convId, subject, content)
      .subscribe(res => console.log(res));
  }

}
