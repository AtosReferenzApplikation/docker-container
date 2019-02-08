import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEvent } from 'angular-star-rating';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
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

  private url = '/api/spring/submitFB';

  sendFb() {
    this.rated = false;
    this.thanks = true;
    // console.log(JSON.stringify(this.reFeedbackForm.value));
    // console.log(this.reFeedbackForm.value);
    return this.http.post<any>(this.url, this.reFeedbackForm.value, httpOptions)
      .subscribe(
      );
  }

  onClick = ($event: ClickEvent) => {
    this.rated = true;
  }

  ngOnInit() {
  }

}
