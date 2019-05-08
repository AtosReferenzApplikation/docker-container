import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CircuitService } from '../circuit/circuit.service';
import { ActivecallToast } from '../../toasts/activecall.toast';
import { NotificationToast } from '../../toasts/notification.toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  incomingToast = null; // an incoming call toast
  callToast = null; // an active call toast
  helpCallState = ''; // status of the call, e.g. ended, incoming, active

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private circuitService: CircuitService
  ) { }

  /**
   * Event listeners will be set which will display different toast.
   */
  initializeToasts() {
    // If there is an incoming call present the incomingcall toast
    this.circuitService.addEventListener('callIncoming', (evt: any) => this.incomingCall(evt.call));

    // If a call ends the active toast (which has been ended) it has to be removed
    this.circuitService.addEventListener('callEnded', () => {
      if (this.callToast) {
        this.helpCallState = '';
        this.toastrService.remove(this.callToast.toastId);
        this.callToast = null;
      }

      if (this.incomingToast) {
        this.toastrService.remove(this.incomingToast.toastId);
        this.incomingToast = null;
      }
    });

    // Track the call status and remove/display toasts
    this.circuitService.addEventListener('callStatus', (evt: any) => {
      if (evt.call.state === 'Active') {
        // catch multiple events which have call.state == 'Active'
        // only the first one will be displayed
        if (this.helpCallState !== 'Active') {
          // the 'calling' toast has to be removed (if there is one)
          if (this.callToast) {
            this.toastrService.remove(this.callToast.toastId);
          }
          this.callToast = null;
          this.helpCallState = 'Active';
          this.activeCall(evt.call, true);
        }
      } else if (!this.callToast) {
        this.activeCall(evt.call, false);
        this.helpCallState = evt.call.state;
      }
    });

    // tracks if an new conversation item is added to a chat
    this.circuitService.addEventListener('itemAdded', (evt: any) => {
      // if it is a new text message, the clerk gets notified
      if (evt.item.type === 'TEXT' &&
        evt.item.creatorId !== this.circuitService.client.loggedOnUser.userId) {
        this.incomingMessage(evt.item);
      }
    });
  }

  /**
   * Displays an imcoming call toast
   * @param call circuit call object
   */
  private async incomingCall(call: any) {
    const user = await this.circuitService
      .getUserById(call.peerUser.userId);

    this.incomingToast = this.toastrService.info(
      'von ' + user.displayName,
      'Eingehender Anruf',
      {
        disableTimeOut: true,
        tapToDismiss: false,
        toastComponent: NotificationToast
      }
    );

    this.onTapNavigateToUser(this.incomingToast, '/management/customer/', user.userId, false);
  }

  /**
   * Display an incoming message toast
   * @param message message object
   */
  private async incomingMessage(message: any) {
    const user = await this.circuitService
      .getUserById(message.creatorId);

    const messageToast = this.toastrService.info(
      message.text.content,
      user.displayName,
      { enableHtml: true, toastComponent: NotificationToast }
    );

    this.onTapNavigateToUser(messageToast, '/management/customer/', user.userId, true);
  }

  /**
   * Presents toast of an active call, which can be active or outgoing pending
   * @param call circuit call object
   * @param active if the call is active => true: call with Peter, false: calling Peter
   */
  private async activeCall(call: any, active: boolean) {
    const user = await this.circuitService
      .getUserById(call.peerUser.userId);

    if (active) {
      this.callToast = this.toastrService.info(
        'mit ' + user.displayName,
        'Telefonat läuft',
        {
          disableTimeOut: true,
          tapToDismiss: false,
          toastComponent: ActivecallToast
        }
      );
      this.onTapNavigateToUser(this.callToast, '/management/customer/', user.userId, false);
      this.incomingToast = null;
    } else if (call.direction === 'outgoing') {
      this.callToast = this.toastrService.info(
        'an ' + user.displayName,
        'Anruf',
        {
          disableTimeOut: true,
          tapToDismiss: false,
          toastComponent: ActivecallToast
        }
      );
      this.onTapNavigateToUser(this.callToast, '/management/customer/', user.userId, false);
    }
  }

  /**
   * If the clerk clicks a toast he can be redirected
   * @param toast toast object
   * @param url url to be redirected
   * @param userId userid of the user to be redirected to
   * @param remove if the toast sould be removed or not
   */
  private onTapNavigateToUser(toast: any, url: string, userId: string, remove: boolean) {
    toast.onTap.subscribe(() => {
      if (!this.router.url.includes(userId)) {
        this.router.navigateByUrl(url + userId);
      }
      if (remove) {
        this.toastrService.remove(toast.toastId);
      }
    });
  }
}
