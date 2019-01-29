import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEvent } from 'angular-star-rating';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  constructor() { }

  thanks = false;
  rated = false;
  title = 'Feedback';
  ratingText = 'Please rate us!';
  labelText = 'Tell us your opinion:';

  reFeedbackForm = new FormGroup({
    reFeedbackText: new FormControl(''),
    myRatingControl: new FormControl('', Validators.required)
  })

  get reFeedbackText() {
    return this.reFeedbackForm.get('reFeedbackText');
  }

  sendFb() {
    this.rated = false;
    this.thanks = true;
    this.reFeedbackForm.reset();
  }

  onClick = ($event: ClickEvent) => {
    this.rated = true;
  }

  ngOnInit() {
  }

}
