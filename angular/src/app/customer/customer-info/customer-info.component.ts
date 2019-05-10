import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  @Input() customer: Customer;
  @Input() avatarUrl: string;

  constructor() { }

  ngOnInit() { }

}
