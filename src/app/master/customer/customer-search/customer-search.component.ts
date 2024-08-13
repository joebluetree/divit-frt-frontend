import { iCustomer_Search } from '../../models/icustomerm';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class CustomerSearchComponent {

  mform: FormGroup;
  record!: iCustomer_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iCustomer_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private gs: GlobalService,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      cust_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      cust_name: this.record.cust_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.cust_name = this.mform.value.cust_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
