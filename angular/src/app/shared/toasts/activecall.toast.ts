import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';
import { faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { CircuitService } from '../services/circuit.service';

@Component({
  selector: '[notification-toast-component]',
  styles: [`
    :host {
      background-color: #0096e8;
      position: relative;
      overflow: hidden;
      margin: 0 0 6px;
      padding: 10px 10px 10px 10px;
      width: auto !important;
      border-radius: 3px 3px 3px 3px;
      color: white;
      pointer-events: all;
      cursor: pointer;
    }
    .btn-pink {
      -webkit-backface-visibility: hidden;
      -webkit-transform: translateZ(0);
    }
    .content {
      margin-left: 15px;
      margin-right: 15px;
    }
  `],
  template: `
  <div class="row" [style.display]="state.value === 'inactive' ? 'none' : ''">
    <div class="content">
      <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
        {{ title }}
      </div>
      <div *ngIf="message && options.enableHtml" role="alert" aria-live="polite"
        [class]="options.messageClass" [innerHTML]="message">
      </div>
      <div *ngIf="message && !options.enableHtml" role="alert" aria-live="polite"
        [class]="options.messageClass" [attr.aria-label]="message">
        {{ message }}
      </div>
    </div>
    <div *ngIf="options.disableTimeOut" style="display: flex">
      <button type="button" *ngIf="!options.closeButton" style="margin-right: 5px" class="btn btn-primary rounded-circle"
        (click)="endCall()">
        <fa-icon [icon]="faPhoneSlash"></fa-icon>
      </button>
      <a *ngIf="options.closeButton" (click)="remove()" class="btn btn-pink btn-sm">
        close
      </a>
    </div>
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width + '%'"></div>
  </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ActivecallToast extends Toast {
  // used for demo purposes
  faPhoneSlash = faPhoneSlash;

  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    private circuitService: CircuitService
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }

  endCall() {
    this.circuitService.endCall();
    this.remove();
  }
}
