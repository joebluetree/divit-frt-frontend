import { Component, inject } from '@angular/core';
import { CustomControls } from '../../app.config';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ParamSearchComponent } from '../../master/param/param-search/param-search.component';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  imports: [...CustomControls],
  standalone: true
})
export class ContactusComponent {
  title = 'Track & Trace';

  http = inject(HttpClient);

  url = 'https://api.hlag.com/hlag/external/v2/events';
  client_id = '2f89b67a-003c-4f91-9130-80a1a4c8212a';
  client_secret = 'Hcm8Q~L5QDCa3Y14HaerCR.1jLOs4xBT.~gsOb32'

  loginForm: FormGroup;

  constructor() {

    this.loginForm = new FormGroup({
      bookingref: new FormControl(''),
      cntrno: new FormControl(''),
    })

    this.loginForm.setValue({
      'bookingref': '64956681',
      'cntrno': 'TCLU8346940'
    });
  }

  search() {
    const headers = {
      'X-IBM-Client-Id': this.client_id,
      'X-IBM-Client-Secret': this.client_secret,
    };
    const params = {
      'carrierBookingReference': this.loginForm.value.bookingref
    };
    const options = {
      Headers: headers,
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
