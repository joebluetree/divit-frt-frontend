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
    public gs: GlobalService,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }
  typeList = [
    { key: 'NA', value: 'NA' },
    { key: 'Created Date', value: 'Created Date' },
    { key: 'Edited Date', value: 'Edited Date' },
  ]
  buildForm() {
    this.mform = this.fb.group({
      cust_date_type: [''],
      cust_from_date: [''],
      cust_to_date: [''],
      cust_created_by: [''],
      cust_edited_by: [''],
      cust_code: [''],
      cust_name: [''],
      cust_firm_code: [''],
      cust_is_blackacc: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      cust_date_type: "NA", //initial value "NA"
      cust_from_date: this.record.cust_from_date,
      cust_to_date: this.record.cust_to_date,
      cust_created_by: this.record.cust_created_by,
      cust_edited_by: this.record.cust_edited_by,
      cust_code: this.record.cust_code,
      cust_name: this.record.cust_name,
      cust_firm_code: this.record.cust_firm_code,
      cust_is_blackacc: this.record.cust_is_blackacc,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.cust_name = this.mform.value.cust_name;
      this.record.cust_date_type = this.mform.value.cust_date_type,
      this.record.cust_from_date = this.mform.value.cust_from_date,
      this.record.cust_to_date = this.mform.value.cust_to_date,
      this.record.cust_created_by = this.mform.value.cust_created_by,
      this.record.cust_edited_by = this.mform.value.cust_edited_by,
      this.record.cust_code = this.mform.value.cust_code,
      this.record.cust_name = this.mform.value.cust_name,
      this.record.cust_firm_code = this.mform.value.cust_firm_code,
      this.record.cust_is_blackacc = this.mform.value.cust_is_blackacc,
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
