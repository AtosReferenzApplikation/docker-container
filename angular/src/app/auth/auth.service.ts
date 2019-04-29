import { Injectable } from '@angular/core';
import { CircuitService } from '../shared/services/circuit/circuit.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private circuitService: CircuitService) {
    this.circuitService.loggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  logon() {
    // return this.circuitService.logonWithCredentials('lucas.golenia@atos.net', 'em53EvBX6ArvwWgY');
    return this.circuitService.authenticateUser();
  }

  logout() {
    this.circuitService.logout();
  }
}
