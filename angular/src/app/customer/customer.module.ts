import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { CustomerComponent } from './customer.component';
import { CustomerChatModule } from './customer-chat/customer-chat.module';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomerChatModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    CustomerComponent,
    CustomerInfoComponent
  ],
  exports: [
    CustomerComponent,
    CustomerInfoComponent
  ]
})
export class CustomerModule { }
