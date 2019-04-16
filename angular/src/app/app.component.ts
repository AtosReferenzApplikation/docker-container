import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CircuitService } from './shared/circuit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private circuitService: CircuitService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.initToasts());
  }

  initToasts() {
    this.circuitService.addEventListener('callIncoming', evt => (evt.call.convType === 'DIRECT') ? this.incomingCall(evt.call) : null);
    this.circuitService.addEventListener('itemAdded', evt => (evt.item.type === 'TEXT') ? this.incomingMessage(evt.item) : null);
  }

  async incomingCall(call: any) {
    const user = await this.circuitService.getUserById(call.peerUser.userId).then((res: any) => res);
    const callToast = this.toastrService.info(
      'von ' + user.displayName, 'Eingehender Anruf',
      { disableTimeOut: true, tapToDismiss: false }
    );

    callToast.onTap.subscribe(() => {
      if (!this.router.url.includes(user.userId)) {
        this.router.navigateByUrl('/management/customer/' + user.userId);
      }
      this.toastrService.remove(callToast.toastId);
    });
  }

  async incomingMessage(message: any) {
    const user = await this.circuitService.getUserById(message.creatorId).then((res: any) => res);
    const messageToast = this.toastrService.info(
      message.text.content, user.displayName,
      { enableHtml: true }
    );

    messageToast.onTap.subscribe(() => {
      if (!this.router.url.includes(user.userId)) {
        this.router.navigateByUrl('/management/customer/' + user.userId);
      }
      this.toastrService.remove(messageToast.toastId);
    });
  }
}
