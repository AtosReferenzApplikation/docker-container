export class SessionLogger {

  private startDate: Date;

  private content: Object;
  private callLog: Object[];
  private messageLog: Object[];

  /**
   * Constructor
   * @param clerk name/object of the clerk to be logged
   * @param fileName name of the file
   */
  constructor() {
    this.callLog = [];
    this.messageLog = [];
  }

  inititalize() {
    this.startDate = new Date();
  }

  logText(date: Date, clientName: string, content: string) {
    this.messageLog.push({ datum: date, kanal: 'Nachricht', kunde: clientName, nachricht: content });
  }

  logCall(date: Date, clientName: string, duration: any) {
    duration = this.msToTime(duration);
    this.callLog.push({ datum: date, kanal: 'Anruf', kunde: clientName, dauer: duration });
  }

  /**
   * End the session.
   */
  public saveSession(clerk: string): Object { // rename: endLogging
    const duration = new Date(new Date().getTime() - this.startDate.getTime());

    return this.content = {
      sachbearbeiter: clerk,
      session: `${new Date().toLocaleDateString()} - ${duration.getHours() - 1}:${duration.getMinutes()}:${duration.getSeconds()}`,
      nachrichten: this.messageLog,
      anrufe: this.callLog
    };
  }

  public downloadSessionLog() {
    const threadsJson = JSON.stringify(this.content);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(threadsJson));
    element.setAttribute('download', 'chat-protocol_' + new Date().getMilliseconds() + '.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  msToTime(duration: any) {
    const seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return hours + ':' + minutes + ':' + seconds;
  }

}
