import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChatComponent } from './basic-chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BasicChatComponent', () => {
  let component: BasicChatComponent;
  let fixture: ComponentFixture<BasicChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicChatComponent],
      imports: [
        FontAwesomeModule,
        NgxSpinnerModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
