import { Injectable } from '@angular/core';
import { CircuitService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private circuitService: CircuitService) {
    this.circuitService.loggedIn.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
  }

  logon() {
    return this.circuitService.authenticateUser();
  }

  logout() {
    return this.circuitService.logout();
  }
}
