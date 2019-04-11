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

import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerChatComponent } from './customer-chat/customer-chat.component';
import { NavigationComponent } from './core/navigation/navigation.component';



@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    ManagementComponent,
    CustomerComponent,
    CustomerChatComponent,
    NavigationComponent
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
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
