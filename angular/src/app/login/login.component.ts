import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() { }

  logon() {
    this.authService.logon()
      .then(() => {
        if (this.authService.isLoggedIn) {
          this.redirectUser();
        }
      });
  }

  logout() {
    this.authService.logout();
  }

  private redirectUser() {
    // Get the redirect URL from the auth service
    // If no redirect has been set, use the default
    const redirect = this.authService.redirectUrl
      ? this.router.parseUrl(this.authService.redirectUrl)
      : '/management';

    // Redirect the user
    this.router.navigateByUrl(redirect);
  }
}
