import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../models/customer';

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

  constructor(private http: HttpClient) {
    this.refreshToken();
  }

  // Authentication
  authenticateUser() {
    const client_id = '';
    const state = Math.random().toString(36).substr(2, 15);
    const scopes = 'ALL';
    const url = this.authUrl + '?response_type=token&client_id=' + client_id + '&redirect_uri=http://localhost:4200/circuit&scope=' + scopes + '&state=' + state;

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
      } catch (error) { }
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

  async refreshToken() {
    await this.http.get(this.restUrl + '/oauth/token/' + localStorage.getItem('access_token'))
      .toPromise().then((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      }).catch(err => /** No token in storage or bad connection */ console.log())
  }

  // API Calls
  getAllConversations(results: string = '25') {
    const params = new HttpParams()
      .set('direction', 'BEFORE')
      .set('results', results);

    return this.http.get(this.restUrl + '/conversations', { headers: this.headers, params: params });
  }

  startDirectConversation(customer: Customer) {
    return this.http.post(this.restUrl + '/conversations/direct', { 'participant': customer.email }, { headers: this.headers });
    // open in circuit: https://eu.yourcircuit.com/#/conversation/{convId}
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
