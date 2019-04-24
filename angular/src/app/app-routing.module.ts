import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackComponent } from './feedback/feedback.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'management', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: 'management', component: ManagementComponent, canActivate: [AuthGuard] },
  { path: 'management/customer/:id', component: CustomerComponent, canActivate: [AuthGuard] },
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
