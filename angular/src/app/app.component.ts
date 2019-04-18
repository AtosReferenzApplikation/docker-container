import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CircuitService } from './shared/services/circuit.service';
import { ActivecallToast } from './shared/toasts/activecall.toast';
import { NotificationToast } from './shared/toasts/notification.toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  incomingToast = null;
  callToast = null;
  helpCallState = '';

  constructor(private circuitService: CircuitService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.initToasts());
  }

  initToasts() {
    this.circuitService.addEventListener('callIncoming', evt => (evt.call.convType === 'DIRECT') ? this.incomingCall(evt.call) : null);
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
    this.circuitService.addEventListener('callStatus', (evt: any) => {
      if (evt.call.state === 'Active') {
        if (this.helpCallState !== 'Active') {
          if (this.callToast) { this.toastrService.remove(this.callToast.toastId); }
          this.callToast = null;
          this.helpCallState = 'Active';
          this.activeCall(evt.call, true);
        }
      } else {
        if (!this.callToast) { this.activeCall(evt.call, false); this.helpCallState = evt.call.state; }
      }
    });
    this.circuitService.addEventListener('itemAdded', evt => {
      if (evt.item.type === 'TEXT' && evt.item.creatorId !== this.circuitService.client.loggedOnUser.userId) {
        this.incomingMessage(evt.item);
      }
    });
  }

  async incomingCall(call: any) {
    const user = await this.circuitService.getUserById(call.peerUser.userId).then((res: any) => res);
    this.incomingToast = this.toastrService.info(
      'von ' + user.displayName, 'Eingehender Anruf',
      { disableTimeOut: true, tapToDismiss: false, toastComponent: NotificationToast }
    );

    this.onTapNavigateToUser(this.incomingToast, '/management/customer/', user.userId, true);
  }

  async incomingMessage(message: any) {
    const user = await this.circuitService.getUserById(message.creatorId).then((res: any) => res);
    const messageToast = this.toastrService.info(
      message.text.content, user.displayName,
      { enableHtml: true, toastComponent: NotificationToast }
    );

    this.onTapNavigateToUser(messageToast, '/management/customer/', user.userId, true);
  }

  async activeCall(call: any, active: boolean) {
    const user = await this.circuitService.getUserById(call.peerUser.userId).then((res: any) => res);

    if (active) {
      this.callToast = this.toastrService.info(
        'mit ' + user.displayName, 'Telefonat läuft',
        { disableTimeOut: true, tapToDismiss: false, toastComponent: ActivecallToast }
      );
      this.onTapNavigateToUser(this.callToast, '/management/customer/', user.userId, false);
    } else if (call.direction === 'outgoing') {
      this.callToast = this.toastrService.info(
        'an ' + user.displayName, 'Anruf',
        { disableTimeOut: true, tapToDismiss: false, toastComponent: ActivecallToast }
      );
      this.onTapNavigateToUser(this.callToast, '/management/customer/', user.userId, false);
    }
  }

  onTapNavigateToUser(toast: any, uri: string, userId: string, remove: boolean) {
    toast.onTap.subscribe(() => {
      if (!this.router.url.includes(userId)) {
        this.router.navigateByUrl(uri + userId);
      }
      if (remove) { this.toastrService.remove(toast.toastId); }
    });
  }
}
