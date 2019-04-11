import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faVideo, faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { CustomerService } from '../shared/customer.service';
import { Customer } from '../models/customer';
import { CircuitService } from '../shared/circuit.service';
import { MessageContent } from '../models/MessageContent';

@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.scss']
})
export class CustomerChatComponent implements OnInit {

  customer: Customer;
  faEdit = faEdit; faVideo = faVideo; faPhone = faPhone; faPhoneSlash = faPhoneSlash;

  // chat props
  threads = [];
  status = 'Offline'; // dynamic


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

  scrollChatToBottom() {
    try {
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    } catch { console.error }
  }

  async setThreadsOfConversation() {
    const threadObject = await this.circuitService.getConversation(this.customer);
    this.threads = this.filterTexts(threadObject).threads;
    this.scrollChatToBottom();
  }

  convertToPlain(rich) {
    return new DOMParser().parseFromString(rich.replace('<hr>', '\n'), 'text/html').body.textContent || '';
  }

  filterTexts(threadObject) {
    threadObject.threads.forEach(thread => {
      if (thread.parentItem.type === 'TEXT') {
        if ('subject' in thread.parentItem.text) {
          thread.parentItem.text.subject = this.convertToPlain(thread.parentItem.text.subject);
        }
        thread.parentItem.text.content = this.convertToPlain(thread.parentItem.text.content);
      }
      thread.comments.forEach(text => {
        text.text.content = this.convertToPlain(text.text.content);
      });
    });

    return threadObject;
  }

  sendMessage(customer: Customer) {
    const content: MessageContent = {
      content: 'Hallo Herr ' + customer.surname
    }
    this.circuitService.sendMessage(customer, content);
  }

  startCall(customer: Customer) {
    this.circuitService.startCall(customer.email, false);
  }

  endCall() {
    this.circuitService.endCall();
  }

}
