import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule
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
