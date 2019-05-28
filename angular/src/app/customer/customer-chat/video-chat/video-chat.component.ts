import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService, CircuitService } from '../../../shared';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements OnInit {
  customer: Customer;
  participants = [];

  // chat props
  threads = [];
  status = 'Offline'; // dynamic
  messageTopic = '';
  messageTopicDesc = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    public circuitService: CircuitService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customerService.getCustomerById(params.id).subscribe(val => {
        this.customer = val;
      });
    });
  }

  getParticipants() {
    this.circuitService.conversation.participants.forEach(userId => {
      this.circuitService
        .getUserById(userId)
        .then((res: any) => this.participants.push(res));
    });
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

  get callState(): string {
    return this.circuitService.call && this.circuitService.call.state;
  }

  get localVideoStream(): Object {
    return (
      (this.circuitService.call && this.circuitService.call.localVideoStream) ||
      null
    );
  }

  get remoteAudioStream(): Object {
    return (
      (this.circuitService.call &&
        this.circuitService.call.remoteAudioStream) ||
      null
    );
  }

  get remoteVideoStream(): Object {
    return (
      (this.circuitService.call &&
        this.circuitService.call.participants.length &&
        this.circuitService.call.participants[0].videoStream) ||
      null
    );
  }

}
