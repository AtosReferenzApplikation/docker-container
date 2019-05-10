import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChatComponent } from './customer-chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { BasicChatComponent } from './basic-chat/basic-chat.component';

describe('CustomerChatComponent', () => {
  let component: CustomerChatComponent;
  let fixture: ComponentFixture<CustomerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerChatComponent, VideoChatComponent, BasicChatComponent],
      imports: [
        FontAwesomeModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot([]),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
