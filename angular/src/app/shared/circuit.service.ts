import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../models/customer';

import Circuit from 'circuit-sdk';
import { BehaviorSubject } from 'rxjs';
import { MessageContent } from '../models/MessageContent';

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

  // SDK var declarations
  client; // Circuit SDK instance
  user: any; // Logged on user
  call: any; // Active call object
  conversation: any; // Active conversation object
  connectionState: string = Circuit.Enums.ConnectionState.Disconnected;
  public addEventListener: Function;

  // observes if User is logged in
  public loggedIn = new BehaviorSubject(false);

  // OAuth configuration
  oauthConfig = {
    domain: 'circuitsandbox.net',
    client_id: '8e3edf9798f341c08ae59b5d8cf74341',
    redirect_uri: 'http://localhost:4200/circuit',
    scope: 'ALL'
  };


  constructor(private http: HttpClient) {
    this.refreshToken();

    // set Circuit SDK internal log level: Debug, Error, Info, Off, Warning
    Circuit.logger.setLevel(Circuit.Enums.LogLevel.Debug);

    // create Circuit SDK client implicit
    this.client = new Circuit.Client({
      client_id: this.oauthConfig.client_id,
      domain: this.oauthConfig.domain,
      scope: this.oauthConfig.scope
    });

    // bind event listener directly to SDK addEventListener
    this.addEventListener = this.client.addEventListener.bind(this);

    // keep the call object current in this service
    this.client.addEventListener('callIncoming', evt => this.call = evt.call);
    this.client.addEventListener('callStatus', evt => this.call = evt.call);
    this.client.addEventListener('callEnded', evt => this.call = null);
  }

  get loggedOnUser() {
    return this.client.loggedOnUser;
  }

  /**************
   *
   * AUTHENTICATION
   *
   *******************/

  // authentication for User with LogIn Popup
  authenticateUser() {
    const state = Math.random().toString(36).substr(2, 15); // to prevent cross-site request forgery
    const url = this.authUrl + '?response_type=token&client_id=' + this.oauthConfig.client_id
      + '&redirect_uri=http://localhost:4200/circuit&scope=' + this.oauthConfig.scope
      + '&state=' + state; // auth request url

    const loginPopup = window.open(url, 'Circuit Authentication', 'centerscreen,location,resizable,alwaysRaised,width=400,height=504');

    // close popup if user login was successful
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
    this.loggedIn.next(false);
    this.http.get(this.restUrl + '/oauth/token/' + localStorage.getItem('access_token'))
      .toPromise().then((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        this.headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        this.logonWithToken(localStorage.getItem('access_token'));
      }).catch(() => {
        this.loggedIn.next(true);
        // request user to logIn again
        // catch error 401 => unauthenticated
      });
  }


  /**************
   *
   * CIRCUIT SDK
   *
   *******************/

  // logon to circuit using access token
  private logonWithToken(token) {
    return this.client.logon({ accessToken: token, skipTokenValidation: true })
      .then(user => {
        this.loggedIn.next(true);
        return user;
      })
      .catch(err => {
        window.localStorage.removeItem('access_token');
        this.loggedIn.next(true);
        return Promise.reject(err);
      });
  }

  logout() {
    return this.client.logout();
  }

  /**
   * Calls
   */
  // starts video/audio call with the specified user
  // conversation will be created if it does not exist
  startCall(email: string, video: boolean): Promise<any> {
    return this.client.makeCall(email, { audio: true, video: video }, true)
      .then(call => this.call = call)
      .catch(console.error);
  }

  // answer an incoming call
  answerCall(video: boolean) {
    if (!this.call) {
      return Promise.reject('No incoming call found');
    }
    const mediaType = {
      audio: true,
      video: video
    };
    return this.client.answerCall(this.call.callId, mediaType);
  }

  // toggle own video
  toggleVideo() {
    if (!this.call) {
      return Promise.reject('No call found');
    }
    return this.client.toggleVideo(this.call.callId);
  }

  endCall() {
    if (!this.call) {
      return Promise.resolve();
    }
    return this.client.endCall(this.call.callId);
  }

  /**
   * Conversations
   */
  sendMessage(user: Customer, content: MessageContent) {
    this.client.getDirectConversationWithUser(user.email)
      .then(conversation => {
        if (conversation) {
          console.log(conversation.convId);
          return Promise.resolve(conversation);
        } else {
          return this.client.createDirectConversation(user.email);
        }
      })
      .then(conversation => {
        this.conversation = conversation;
        return this.client.addTextItem(conversation.convId, content);
      })
      .then(item => {
        return ({ client: this.client, conv: this.conversation, item: item });
      })
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
