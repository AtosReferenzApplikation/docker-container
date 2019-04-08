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
import { AtosComponent } from './atos/atos.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CircuitComponent } from './circuit/circuit.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';



@NgModule({
  declarations: [
    AppComponent,
    AtosComponent,
    FeedbackComponent,
    CircuitComponent,
    ManagementComponent,
    CustomerComponent
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
