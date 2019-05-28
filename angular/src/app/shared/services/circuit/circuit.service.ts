import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../../../models/customer';

import Circuit from 'circuit-sdk';
import { BehaviorSubject } from 'rxjs';
import { MessageContent } from '../../../models/messageContent';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  authUri = 'https://circuitsandbox.net/oauth/authorize';
  restUri = 'https://circuitsandbox.net/rest/v2';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  // SDK var declarations
  client; // Circuit SDK instance
  user: any; // Logged on user
  call: any; // Active call object
  public conversation: any; // Active conversation object
  connectionState: string = Circuit.Enums.ConnectionState.Disconnected;
  public addEventListener: Function;

  // BehaviorSubjects
  public loggedIn = new BehaviorSubject(false);
  public activeCall = new BehaviorSubject(false);

  // OAuth configuration
  oauthConfig = {
    domain: 'circuitsandbox.net',
    client_id: '8e3edf9798f341c08ae59b5d8cf74341',
    redirect_uri: this.redirectUri,
    scope: 'ALL'
  };

  constructor(private http: HttpClient, private router: Router) {
    // set Circuit SDK internal log level: Debug, Error, Info, Off, Warning
    Circuit.logger.setLevel(Circuit.Enums.LogLevel.Off);

    // create Circuit SDK client implicit
    this.client = new Circuit.Client({
      client_id: this.oauthConfig.client_id,
      domain: this.oauthConfig.domain,
      scope: this.oauthConfig.scope,
      autoRenewToken: true
    });

    // bind event listener directly to SDK addEventListener
    this.addEventListener = this.client.addEventListener.bind(this);

    // keep the call object current in this service
    this.client.addEventListener('callIncoming', evt => (this.call = evt.call));
    this.client.addEventListener('callStatus', evt => (this.call = evt.call));
    this.client.addEventListener('callEnded', () => {
      this.call = null;
      this.activeCall.next(false);
    });
  }

  get loggedOnUser() {
    return this.client.loggedOnUser;
  }

  get redirectUri() {
    return window.location.href;
  }

  /**************
   *
   * AUTHENTICATION
   *
   *******************/

  // authentication for User with LogIn Popup
  logonPopup() {
    const state = Math.random()
      .toString(36)
      .substr(2, 15); // to prevent cross-site request forgery
    const url =
      this.authUri +
      '?response_type=token&client_id=' +
      this.oauthConfig.client_id +
      '&redirect_uri=' +
      this.redirectUri +
      '&scope=' +
      this.oauthConfig.scope +
      '&state=' +
      state; // auth request url

    const logonPopup = window.open(
      url, 'Circuit Authentication', 'centerscreen,location,resizable,alwaysRaised,width=400,height=504'
    );

    // close popup if user login was successful
    const checkLogon = setInterval(() => {
      try {
        if (logonPopup.location.href.includes('access_token=')) {
          const callbackUrl = logonPopup.location.href;
          clearInterval(checkLogon);
          logonPopup.close();
          const access_token = this.getValueFromString(
            'access_token',
            callbackUrl
          );
          localStorage.setItem('access_token', access_token);
          this.logonWithToken();
        }
      } catch (error) {} // todo: handle logon error
    }, 100);
  }

  getValueFromString(value: string, url: string) {
    value = value.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regexS = '[\\?&]' + value + '=([^&#]*)';
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    if (results == null) {
      return ''; // todo: handle logon error
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  }

  /**************
   *
   * CIRCUIT SDK
   *
   *******************/

  // try to logon with cached credentails/token
  authenticateUser() {
    this.loggedIn.next(false);
    return this.validateAccessToken();
  }

  validateAccessToken() {
    return this.client
      .validateToken(localStorage.getItem('access_token'))
      .then(() => this.logonWithToken())
      .catch(() => this.logonPopup());
  }

  // logon to circuit using access token stored in localStorage
  logonWithToken() {
    return this.client
      .logon({
        accessToken: localStorage.getItem('access_token'),
        prompt: false
      })
      .then(user => {
        this.loggedIn.next(true);
        return user;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  refreshAccessToken() {
    // replace with client.renewToken()
    this.http
      .get(
        this.restUri + '/oauth/token/' + localStorage.getItem('access_token')
      )
      .toPromise()
      .then((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        this.headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set(
            'Authorization',
            'Bearer ' + localStorage.getItem('access_token')
          );
      });
  }

  // force user logout
  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    return this.client.logout(true);
  }

  /**
   * User
   */
  getUserById(userId: string) {
    return this.client.getUserById(userId);
  }

  /**
   * Calls
   */
  // starts video/audio call with the specified user
  // conversation will be created if it does not exist
  startCall(email: string, video: boolean): Promise<any> {
    return this.client
      .makeCall(
        email,
        {
          audio: true,
          video: video
        },
        true
      )
      .then(call => (this.call = call))
      .catch(() => {
        if (!this.loggedIn.value) {
          this.authenticateUser();
        }
      });
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
    return this.client.toggleVideo(this.call.callId, res => console.log(res));
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
  getConversation(email) {
    return this.client
      .getDirectConversationWithUser(email, true)
      .then(conversation => {
        this.conversation = conversation;
        return this.client
          .getConversationFeed(conversation.convId)
          .then(conv => conv);
      })
      .catch(err => {
        if (!this.loggedIn.value) {
          this.authenticateUser();
        }
      });
  }

  sendMessage(content: MessageContent) {
    return this.client
      .addTextItem(this.conversation.convId, content)
      .then(item => {
        return {
          client: this.client,
          conv: this.conversation,
          item: item
        };
      })
      .catch(() => {
        if (!this.loggedIn.value) {
          this.authenticateUser();
        }
      });
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

    return this.http.get(this.restUri + '/conversations', {
      headers: this.headers,
      params: params
    });
  }

  startDirectConversation(customer: Customer) {
    return this.http.post(
      this.restUri + '/conversations/direct',
      {
        participant: customer.email
      },
      {
        headers: this.headers
      }
    );
  }

  sendMessageToConversation(
    convId: string,
    subject: string,
    content: string,
    attachments: string[] = []
  ) {
    return this.http.post(
      this.restUri + '/conversations/' + convId + '/messages',
      {
        subject: subject,
        content: content,
        attachments: attachments
      },
      {
        headers: this.headers
      }
    );
  }
}
