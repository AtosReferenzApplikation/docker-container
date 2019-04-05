import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEvent } from 'angular-star-rating';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  constructor(private http: HttpClient) { }

  thanks = false;
  rated = false;
  title = 'Feedback';
  ratingText = 'Please rate us!';
  labelText = 'Tell us your opinion:';

  reFeedbackForm = new FormGroup({
    reFeedbackText: new FormControl(''),
    myRatingControl: new FormControl('', Validators.required)
  });

  private url = '/spring/submitFB';

  sendFb() {
    this.rated = false;
    this.thanks = true;
    this.submitFB(this.url, this.reFeedbackForm.value)
      .subscribe();
  }

  submitFB(url: string, data: string) {
    return this.http.post<any>(url, data, httpOptions);
  }

  onClick = ($event: ClickEvent) => {
    this.rated = true;
  }

  ngOnInit() {
  }

}
