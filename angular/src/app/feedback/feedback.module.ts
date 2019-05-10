import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule
  ],
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ]
})
export class FeedbackModule { }
