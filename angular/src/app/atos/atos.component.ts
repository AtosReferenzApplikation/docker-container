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
    this.http.get('http://192.168.99.100:80/spring?value=' + this.inputText, {responseType: 'text'})
      .subscribe((response: string) => {
        window.alert(response);
      });
  }

  getEntries() {
    this.http.get('http://192.168.99.100:80/spring/searchEntries?entry=' + this.searchEntry, {responseType: 'text'})
      .subscribe((response: string) => {
        window.alert('Gefundene Einträge zu ' + this.searchEntry + ': ' + response);
      });
  }

  ngOnInit() {
  }

}
