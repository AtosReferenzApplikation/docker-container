import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CustomerService } from './services/customer/customer.service';
import { CircuitService } from './services/circuit/circuit.service';
import { ToastService } from './services/toast/toast.service';
import { ActivecallToast } from './toasts/activecall.toast';
import { NotificationToast } from './toasts/notification.toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
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
    CustomerService,
    CircuitService,
    ToastService
  ],
  entryComponents: [
    ActivecallToast,
    NotificationToast
  ]
})
export class SharedModule {}
