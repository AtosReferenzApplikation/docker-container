import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer } from '../../../models/customer';
import { faEdit, faVideo, faPhone, faPhoneSlash, faPaperPlane, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { CustomerService, CircuitService } from '../../../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-basic-chat',
  templateUrl: './basic-chat.component.html',
  styleUrls: ['./basic-chat.component.scss']
})
export class BasicChatComponent implements OnInit {
  customer: Customer;
  participants = [];

  // fontawesome vars
  faEdit = faEdit;
  faVideo = faVideo;
  faPhone = faPhone;
  faPhoneSlash = faPhoneSlash;
  faPaperPlane = faPaperPlane;
  faVideoSlash = faVideoSlash;

  // chat props
  threads = [];
  status = 'Offline'; // dynamic
  messageTopic = '';
  messageTopicDesc = '';

  @ViewChild('scrollChat', {static: false}) private chat: ElementRef<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    public circuitService: CircuitService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe(params => {
      this.customerService.getCustomerById(params.id).subscribe(val => {
        this.customer = val;
      });
      // getParticipantById()??
    });

    // this.circuitService.authenticateUser();
    this.circuitService.loggedIn.subscribe(value => {
      if (value) {
        this.setThreadsOfConversation();
      }
    });

    this.circuitService.addEventListener('itemAdded', () => {
      this.setThreadsOfConversation();
    });
  }

  async setThreadsOfConversation() {
    const threadObject = await this.circuitService.getConversation(
      this.customer.email
    );
    this.threads = threadObject.threads;
    this.getParticipants();
    this.onLoaded();
  }

  // last http call is done
  onLoaded() {
    const checkParticipants = setInterval(() => {
      if (this.participants) {
        clearInterval(checkParticipants);
        this.spinner.hide();
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
      }
    }, 100);
  }

  get loggedOnUser() {
    return this.circuitService.loggedOnUser;
  }

  getParticipants() {
    this.circuitService.conversation.participants.forEach(userId => {
      this.circuitService
        .getUserById(userId)
        .then((res: any) => this.participants.push(res));
    });
  }

  getAvatarByUserId(id: any) {
    try {
      return this.participants[
        this.participants.findIndex(user => user.userId === id)
      ].avatar;
    } catch {
      return 'https://ui-avatars.com/api/?name=?';
    }
  }

  getParticipantById(id: any) {
    try {
      return this.participants[
        this.participants.findIndex(user => user.userId === id)
      ].displayName;
    } catch {
      return 'Kunde';
    }
  }

  getMinutesAndSeconds(ms: string): string {
    const min = Math.floor(+ms >= 1000 ? +ms / 1000 / 60 : 0);
    let sec = Math.floor(+ms >= 10000 ? +ms / 1000 : +ms / 1000);
    sec = sec - min * 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }

  msToDate(ms: any) {
    const date = new Date(ms);
    const minutes =
      date.getMinutes() < 10
        ? '0' + date.getMinutes().toString()
        : date.getMinutes();
    return (
      date.toLocaleDateString() +
      ' - ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      minutes
    );
  }

  // circuit service
  // call
  startCall(customer: Customer, video: boolean) {
    this.circuitService.startCall(customer.email, video);
  }

  endCall() {
    this.circuitService.endCall();
  }

  toggleVideo() {
    this.circuitService.toggleVideo();
  }

  // messaging
  sendTopicMessage(subject: string, content: string) {
    if (content.trim() !== '') {
      this.circuitService
        .sendMessage({
          subject: subject,
          content: content
        })
        .then(() => {
          this.messageTopic = '';
          this.messageTopicDesc = '';
        });
    }
  }

  sendMessage(content: string, thread: any) {
    if (content.trim() !== '') {
      this.circuitService.sendMessage({
        parentId: thread.parentItem.itemId,
        content: content
      });
    }
  }

  get localVideoStream(): Object {
    return (
      (this.circuitService.call && this.circuitService.call.localVideoStream) ||
      null
    );
  }
}
