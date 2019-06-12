import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerChatComponent } from './customer/customer-chat/customer-chat.component';
import { NavigationComponent } from './core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {VideoChatComponent} from './customer/customer-chat/video-chat/video-chat.component';
import {BasicChatComponent} from './customer/customer-chat/basic-chat/basic-chat.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FeedbackComponent,
        ManagementComponent,
        CustomerComponent,
        CustomerChatComponent,
        NavigationComponent,
        LoginComponent,
        VideoChatComponent,
        BasicChatComponent
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule,
        NgbModule,
        FontAwesomeModule,
        NgxSpinnerModule,
      ]
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    // expect(app).toBeTruthy();
  }));
});
