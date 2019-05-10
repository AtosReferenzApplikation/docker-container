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
      this.customer = this.customerService.getCustomerById(params.id);
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
    // tslint:disable-next-line: max-line-length
    return (
      (this.circuitService.call &&
        this.circuitService.call.participants.length &&
        this.circuitService.call.participants[0].videoStream) ||
      null
    );
  }

}
