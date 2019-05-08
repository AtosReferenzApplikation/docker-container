import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { CustomerComponent } from './customer.component';
import { CustomerChatComponent } from './customer-chat/customer-chat.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CustomerComponent,
    CustomerChatComponent
  ],
  exports: [
    CustomerChatComponent
  ]
})
export class CustomerModule { }
