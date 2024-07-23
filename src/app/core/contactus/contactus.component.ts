import { Component, inject } from '@angular/core';
import { CustomControls } from '../../app.config';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  imports: [...CustomControls],
  standalone: true
})
export class ContactusComponent {
  title = 'Track & Trace';

  loginForm: FormGroup;

  url = 'https://api.hlag.com/hlag/external/v2/events';
  //url = 'https://mock.api-portal.hlag.com/v2/events';

  client_id = '2f89b67a-003c-4f91-9130-80a1a4c8212a';
  client_secret = 'Hcm8Q~L5QDCa3Y14HaerCR.1jLOs4xBT.~gsOb32'

  constructor(private http: HttpClient) {

    this.loginForm = new FormGroup({
      bookingref: new FormControl(''),
      mblref: new FormControl(''),
      cntrno: new FormControl(''),
    })

    //'bookingref': '64956681',
    //'bookingref': 'HLCUMA3240338870',

    this.loginForm.setValue({
      'bookingref': '64956681',
      'mblref': 'HLCUMA3240338870',
      'cntrno': 'TCLU8346940'
    });
  }

  search() {
    const headers = {
      'X-IBM-Client-Id': this.client_id,
      'X-IBM-Client-Secret': this.client_secret,
      'accept': 'application/json',
      'API-version': '1',
    };
    //'carrierBookingReference': this.loginForm.value.bookingref,
    //'transportDocumentReference' : this.loginForm.value.mblref,
    //'equipmentReference' : this.loginForm.value.cntrno,
    const params = {
      'equipmentReference': this.loginForm.value.cntrno,
      'limit': 100,
    };
    const options = {
      headers: headers,
      params: params
    };
    this.http.get(this.url, options).subscribe({
      next: (v: any) => {
        console.log(v);
      },
      error: (err: any) => {
        console.log(err);
        alert(err.error);
      }
    });
  }


}
