import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerChatComponent } from './customer-chat/customer-chat.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { NotificationToast } from './shared/toasts/notification.toast';
import { ActivecallToast } from './shared/toasts/activecall.toast';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    ManagementComponent,
    CustomerComponent,
    CustomerChatComponent,
    NavigationComponent,
    NotificationToast,
    ActivecallToast,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    StarRatingModule.forRoot(),
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [NotificationToast, ActivecallToast],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
