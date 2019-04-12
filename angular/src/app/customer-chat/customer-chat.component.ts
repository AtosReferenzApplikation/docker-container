import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faVideo, faPhone, faPhoneSlash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { CustomerService } from '../shared/customer.service';
import { Customer } from '../models/customer';
import { CircuitService } from '../shared/circuit.service';

@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.scss']
})
export class CustomerChatComponent implements OnInit {

  customer: Customer;
  participants = [];
  faEdit = faEdit; faVideo = faVideo; faPhone = faPhone; faPhoneSlash = faPhoneSlash; faPaperPlane =  faPaperPlane;

  // chat props
  threads = [];
  status = 'Offline'; // dynamic
  messageTopic = '';
  messageTopicDesc = '';

  @ViewChild('scrollChat') private chat: ElementRef<any>;
  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customer = this.customerService.getCustomerById(params.id);
    });

    // this.threads = [
    //   { title: 'Title of 1st', content: 'My first Topic', texts: [{ content: '1st text', user: { name: 'P', surname: 'M' } }, { content: '2nd text', user: { name: 'S', surname: 'B' } }], user: { name: 'S', surname: 'B' } },
    //   { title: 'Title of 2nd', content: 'My second Topic', texts: [{ content: '1st text', user: { name: 'P', surname: 'M' } }, { content: '2nd text', user: { name: 'P', surname: 'M' } }, { content: '3rd text', user: { name: 'S', surname: 'B' } }], user: { name: 'P', surname: 'M' } },
    //   { title: 'Title of 3rd', content: 'My third Topic', texts: [{ content: '1st text', user: { name: 'S', surname: 'B' } },], user: { name: 'P', surname: 'M' } },
    // ]

    this.circuitService.authenticateUser();
    this.circuitService.loggedIn.subscribe(value => {
      if (value) {
        this.spinner.hide();
        this.setThreadsOfConversation();
      } else {
        this.spinner.show();
      }
    });
  }

  async setThreadsOfConversation() {
    const threadObject = await this.circuitService.getConversation(this.customer.email);
    this.threads = threadObject.threads;
    this.getParticipants();
    this.scrollChatToBottom();
  }

  scrollChatToBottom() {
    const checkParticipants = setInterval(() => {
      if (this.participants) {
        clearInterval(checkParticipants);
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
      }
    }, 100);
  }

  getParticipants() {
    this.circuitService.conversation.participants.forEach(async userId => {
      this.participants.push(await this.circuitService.getUserById(userId));
    });
  }

  getAvatarByUserId(id) {
    try {
      return this.participants[this.participants.findIndex(user => user.userId === id)].avatar;
    } catch (error) { return ''; }
  }

  // circuit service
  // call
  startCall(customer: Customer) {
    this.circuitService.startCall(customer.email, false);
  }

  endCall() {
    this.circuitService.endCall();
  }

  // messaging
  sendTopicMessage(subject: string, content: string) {
    if (content.trim() !== '') {
      this.circuitService.sendMessage({
        subject: subject,
        content: content
      }).then(() => {
        this.setThreadsOfConversation();
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
      }).then(this.setThreadsOfConversation());
    }
  }

}
