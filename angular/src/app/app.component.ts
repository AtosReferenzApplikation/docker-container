import { Component, OnInit, OnDestroy } from '@angular/core';

import { CircuitService, ToastService } from './shared';
import { SessionLogger } from './utils/sessionLogger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sessionLogger = new SessionLogger();

  constructor(private circuitService: CircuitService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.initializeToasts();
    this.sessionLogger.inititalize();
  }

  ngOnDestroy(): void {
    this.circuitService
      .getUserById(this.circuitService.loggedOnUser.userId)
      .then((user: any) => {
        this.sessionLogger.saveSession(user.displayName);
      });
  }

  async logConversationItem(item: any) {
    const date = new Date(+item.creationTime);

    if (item.type === 'RTC' && item.rtc.type !== 'MISSED') {
      const client = item.rtc.rtcParticipants[1].displayName;
      const duration = +item.rtc.ended.duration;
      this.sessionLogger.logCall(date, client, duration);
    } else if (item.type === 'TEXT') {
      const client = await this.circuitService.getUserById(item.creatorId);
      const content = item.text.content;
      this.sessionLogger.logText(date, client.displayName, content);
    }
  }

  async saveSession() {
    const user = await this.circuitService.getUserById(
      this.circuitService.loggedOnUser.userId
    );
    console.log(this.sessionLogger.saveSession(user.displayName));
  }
}
