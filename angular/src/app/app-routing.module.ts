import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtosComponent } from './atos/atos.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'management', pathMatch: 'full' },
  { path: 'home', component: AtosComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'management/customer/:id', component: CustomerComponent },
  { path: '**', redirectTo: 'management' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
