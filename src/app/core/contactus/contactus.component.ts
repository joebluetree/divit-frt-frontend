import { Component, inject } from '@angular/core';
import { CustomerEditComponent } from '../../master/customer/customer-edit/customer-edit.component';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  standalone: true
})
export class ContactusComponent {
  title = 'Contact Us';

  constructor() {

  }


}
