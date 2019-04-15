import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChatComponent } from './customer-chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('CustomerChatComponent', () => {
  let component: CustomerChatComponent;
  let fixture: ComponentFixture<CustomerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerChatComponent],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
