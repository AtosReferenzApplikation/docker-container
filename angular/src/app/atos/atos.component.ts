import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-atos',
  templateUrl: './atos.component.html',
  styleUrls: ['./atos.component.css']
})
export class AtosComponent implements OnInit {

  title = 'Verbindung zur Cassandra Datenbank über Container';
  inputText: string;
  searchEntry: string;

  constructor(private http: HttpClient) { }

  insertEntry() {
    console.log(this.inputText);
    this.insertEntryHttp('/api/spring/enterEntry?value=', this.inputText)
      .subscribe((response: string) => {
        window.alert(response);
      });
  }

  insertEntryHttp(url: string, text: string) {
    return this.http.get(url + text, {responseType: 'text'});
  }

  getEntries() {
    this.getEntriesHttp('/api/spring/searchEntries?entry=', this.searchEntry)
      .subscribe((response: string) => {
        window.alert('Gefundene Einträge zu ' + this.searchEntry + ': ' + response);
      });
  }

  getEntriesHttp(url: string, text: string) {
    return this.http.get(url + text, {responseType: 'text'});
  }


  ngOnInit() {
  }

}
