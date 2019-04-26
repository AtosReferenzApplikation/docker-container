import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CircuitService } from '../../shared/services/circuit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public router: Router,
    private circuitService: CircuitService) {
    this.setMessage();
  }

  ngOnInit() {
    this.circuitService.loggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/management';
        this.router.navigateByUrl(redirect);
      }
    });
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  logon() {
    this.message = 'Trying to log in ...';

    this.authService.logon().then(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/management';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
