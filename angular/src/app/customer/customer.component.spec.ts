import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomerChatComponent } from './customer-chat/customer-chat.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import {VideoChatComponent} from './customer-chat/video-chat/video-chat.component';
import {BasicChatComponent} from './customer-chat/basic-chat/basic-chat.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerComponent,
        CustomerChatComponent,
        VideoChatComponent,
        BasicChatComponent
      ],
      imports: [
        FontAwesomeModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
