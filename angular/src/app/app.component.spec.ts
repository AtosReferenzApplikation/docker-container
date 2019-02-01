import { TestBed, async } from '@angular/core/testing';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { AtosComponent } from './atos/atos.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AtosComponent,
        FeedbackComponent
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule
      ]
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
