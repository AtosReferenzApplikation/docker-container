import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SAMPLE_CUSTOMERS } from './sample-customers';
import { CustomerService } from './services/customer/customer.service';
import { CircuitService } from './services/circuit/circuit.service';
import { ToastService } from './services/toast/toast.service';
import { ActivecallToast } from './toasts/activecall.toast';
import { NotificationToast } from './toasts/notification.toast';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    ActivecallToast,
    NotificationToast
  ],
  exports: [
    ActivecallToast,
    NotificationToast
  ],
  providers: [
    SAMPLE_CUSTOMERS,
    CustomerService,
    CircuitService,
    ToastService
  ]
})
export class SharedModule {}
