import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit {

  constructor(private http: HttpClient) { }

  title = 'Daten Erfassung';

  private addURL = '/spring/addCustomer';

  CustomerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required)
  });

  sendCustomer() {
    this.submitCustomer(this.addURL, this.CustomerForm.value)
      .subscribe();
  }

  submitCustomer(url: string, data: string) {
    return this.http.post<any>(url, data, httpOptions);
  }

  ngOnInit() {
  }

}
