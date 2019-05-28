import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService
  ]
})
export class CoreModule { }
