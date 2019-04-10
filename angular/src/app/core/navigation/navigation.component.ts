import { Component, OnInit } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { CircuitService } from '../../shared/circuit.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSignInAlt = faSignInAlt;

  constructor(private circuitService: CircuitService) { }

  ngOnInit() {
  }

  login() {
    this.circuitService.authenticateUser();
  }

  logout() {
    this.circuitService.logout();
  }

}
