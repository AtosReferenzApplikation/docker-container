import { TestBed, async, inject } from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


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
        StarRatingModule,
        HttpClientTestingModule
      ],
      providers: [
        FeedbackComponent
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

  it('Post form data correctly',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        // We call the service
        const fixture = TestBed.createComponent(FeedbackComponent);
        fixture.componentInstance.submitFB('/api/spring/submitFB', '{reFeedbackText: \'Test Feedback-Text!\', myRatingControl: 5}')
          .subscribe((data: any) => {
            expect(data.myRatingControl).toBe(5);
            expect(data.reFeedbackText).toBe('Test Feedback-Text!');
          });
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne('/api/spring/submitFB');
        expect(req.request.method).toEqual('POST');
        // Then we set the fake data to be returned by the mock
        req.flush({ 'reFeedbackText': 'Test Feedback-Text!', 'myRatingControl': 5 });
      })
  );




});
