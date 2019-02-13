import { TestBed, async } from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import {HttpClientModule } from '@angular/common/http';


describe('FeedbackComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedbackComponent
      ],
      imports: [
        HttpClientModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule
      ]
    }).compileComponents();
  }));





  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FeedbackComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Feedback'`, async(() => {
    const fixture = TestBed.createComponent(FeedbackComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Feedback');
  }));
});
