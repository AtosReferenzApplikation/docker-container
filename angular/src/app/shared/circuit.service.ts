import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../models/customer';
import Circuit from 'circuit-sdk';
// import * as Circuit from 'circuit-sdk';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

  authUrl = 'https://circuitsandbox.net/oauth/authorize';
  restUrl = 'https://circuitsandbox.net/rest/v2';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  // sdk
  client; // Circuit SDK instance
  user: any; // Logged on user
  call: any; // Active call object
  connectionState: string = Circuit.Enums.ConnectionState.Disconnected;
  public addEventListener: Function;
  // OAuth configuration. Get your own client_id for your app at https://circuit.github.io/oauth.html
  oauthConfig = {
    domain: 'circuitsandbox.net',
    client_id: '8e3edf9798f341c08ae59b5d8cf74341',
    redirect_uri: 'http://localhost:4200/circuit',
    scope: 'ALL'
  };

  constructor(private http: HttpClient) {
    this.refreshToken();

    // Set Circuit SDK internal log level
    Circuit.logger.setLevel(Circuit.Enums.LogLevel.Debug);

    // Create the Circuit SDK client using Implicit grant type
    // See http://circuit.github.com/oauth
    this.client = new Circuit.Client({
      client_id: this.oauthConfig.client_id,
      domain: this.oauthConfig.domain,
      scope: this.oauthConfig.scope
    });

    // Bind event listener directly to SDK's addEventListener
    this.addEventListener = this.client.addEventListener.bind(this);

    // Keep the call object current in this service
    this.client.addEventListener('callIncoming', evt => this.call = evt.call);
    this.client.addEventListener('callStatus', evt => this.call = evt.call);
    this.client.addEventListener('callEnded', evt => this.call = null);
  }

  /**************
   *
   * AUTHENTICATION
   *
   *******************/

  authenticateUser() {
    const state = Math.random().toString(36).substr(2, 15);
    const url = this.authUrl + '?response_type=token&client_id=' + this.oauthConfig.client_id
      + '&redirect_uri=http://localhost:4200/circuit&scope=' + this.oauthConfig.scope
      + '&state=' + state;

    const loginPopup = window.open(url, 'Circuit Authentication', 'centerscreen,location,resizable,alwaysRaised,width=400,height=504');

    const checkLogin = setInterval(() => {
      try {
        if (loginPopup.location.href.includes('access_token=')) {
          const callbackUrl = loginPopup.location.href;
          clearInterval(checkLogin);
          loginPopup.close();
          const access_token = this.getValueFromString('access_token', callbackUrl);
          localStorage.setItem('access_token', access_token);

          this.refreshToken();
        }
      } catch (error) { } // todo: handle login error
    }, 100);
  }

  getValueFromString(value: string, url: string) {
    value = value.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    const regexS = '[\\?&]' + value + '=([^&#]*)';
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    if (results == null) {
      return ''; // todo: handle login error
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  }

  refreshToken() {
    this.http.get(this.restUrl + '/oauth/token/' + localStorage.getItem('access_token'))
      .toPromise().then((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        this.headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

        this.logonWithSpinner(localStorage.getItem('access_token'));
      }).catch(() => {
        // request user to logIn again
        // catch error 401
      });
  }


  /**************
   *
   * CIRCUIT SDK
   *
   *******************/

  // Logon to Circuit using the access token and show spinner while looging in.
  private logonWithSpinner(token) {
    // const loading = this.loadingCtrl.create({ content: 'Signing in...' });
    // loading.present();
    return this.client.logon({ accessToken: token, skipTokenValidation: true })
      .then(user => {
        // loading.dismiss();
        console.log('client logon success', user)
        return user;
      })
      .catch(err => {
        window.localStorage.removeItem('access_token');
        // loading.dismiss();
        console.log('client logon error', err)
        return Promise.reject(err);
      });
  }

  // Logout of Circuit
  logout() {
    return this.client.logout();
  }

  // Starts video/audio call with the specified user, conversation will be created if it does not exist.
  startCall(email: string, video: boolean): Promise<any> {
    return this.client.makeCall(email, { audio: true, video: !!video }, true)
      .then(call => this.call = call)
      .catch(console.error);
  }


  /**************
   *
   * REST API
   *
   *******************/

  getAllConversations(results: string = '25') {
    const params = new HttpParams()
      .set('direction', 'BEFORE')
      .set('results', results);

    return this.http.get(this.restUrl + '/conversations', { headers: this.headers, params: params });
  }

  startDirectConversation(customer: Customer) {
    return this.http.post(this.restUrl + '/conversations/direct', { 'participant': customer.email }, { headers: this.headers });
  }

  sendMessageToConversation(convId: string, subject: string, content: string, attachments: string[] = []) {
    return this.http.post(this.restUrl + '/conversations/' + convId + '/messages',
      {
        subject: subject,
        content: content,
        attachments: attachments
      }, { headers: this.headers });
  }

}
