import { Injectable } from '@angular/core';
import { CircuitService } from "../shared/services/circuit.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private circuitService: CircuitService) {
    this.circuitService.authenticateUser();
  }

  logon() {
    return this.circuitService.logonWithCredentials('lucas.golenia@atos.net', 'em53EvBX6ArvwWgY');
  }

  logout() {
    this.isLoggedIn = false;
  }
}
