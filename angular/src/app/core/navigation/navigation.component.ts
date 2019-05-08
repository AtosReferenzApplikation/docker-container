import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CircuitService } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSignInAlt = faSignInAlt; faSignOutAlt = faSignOutAlt;
  loggedIn: boolean;

  toggleNavbar = true;

  constructor(private circuitService: CircuitService,
    public router: Router) { }

  ngOnInit() {
    this.circuitService.loggedIn.subscribe(res => this.loggedIn = res);
  }

  logon() {
    this.circuitService.authenticateUser();
  }

  logout() {
    this.circuitService.logout();
  }

}
