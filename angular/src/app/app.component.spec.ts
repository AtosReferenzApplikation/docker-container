import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ManagementModule } from './management/management.module';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared';
import { FeedbackModule } from './feedback/feedback.module';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        AppRoutingModule,
        HttpClientTestingModule,
        ManagementModule,
        CustomerModule,
        CoreModule,
        LoginModule,
        SharedModule,
        FeedbackModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
