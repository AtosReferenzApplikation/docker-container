import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from '../../app-routing.module';
import {LoginComponent} from '../../login/login.component';
import {FeedbackComponent} from '../../feedback/feedback.component';
import {ManagementComponent} from '../../management/management.component';
import {CustomerComponent} from '../../customer/customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StarRatingModule} from 'angular-star-rating';
import {AppModule} from '../../app.module';
import {NgxSpinnerComponent} from 'ngx-spinner';
import {CustomerChatComponent} from '../../customer/customer-chat/customer-chat.component';
import {VideoChatComponent} from '../../customer/customer-chat/video-chat/video-chat.component';
import {BasicChatComponent} from '../../customer/customer-chat/basic-chat/basic-chat.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        LoginComponent,
        FeedbackComponent,
        ManagementComponent,
        CustomerComponent,
        NgxSpinnerComponent,
        CustomerChatComponent,
        VideoChatComponent,
        BasicChatComponent
      ],
      imports: [
        AppRoutingModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
