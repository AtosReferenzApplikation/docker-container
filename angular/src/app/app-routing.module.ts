import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtosComponent } from './atos/atos.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    component: AtosComponent
  },
  {
    path: 'fb',
    component: FeedbackComponent
  },
  {
    path: '**',
    component: AtosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
