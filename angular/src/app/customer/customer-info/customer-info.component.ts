import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService, CircuitService } from '../../shared';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  @Input() customer: Customer;
  @Input() avatarUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customerService.getCustomerById(params.id).subscribe(val => {
        this.customer = val;
        this.getAvatarOfCustomer(this.customer);
      });
    });
  }

  getAvatarOfCustomer(customer: any) {
    this.circuitService
      .getUserById(customer.id)
      .then(user => {
        this.avatarUrl = user.avatar;
      })
      .catch(
        () => (this.avatarUrl = `https://ui-avatars.com/api/name=${customer.name}+${customer.surname}`)
      );
  }

}
