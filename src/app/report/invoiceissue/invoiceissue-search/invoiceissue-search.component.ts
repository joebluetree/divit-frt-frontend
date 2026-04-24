import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iInvoiceIssue_Search } from '../../models/iinvoiceissue';

@Component({
  selector: 'app-invoiceissue-search',
  templateUrl: './invoiceissue-search.component.html',
  styleUrls: ['./invoiceissue-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 14/03/2026
//Remark : this component manages searching of Invoice Issue Report records

export class InvoiceIssueSearchComponent {

  mform: FormGroup;
  record!: iInvoiceIssue_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iInvoiceIssue_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  groupList = [
    { key: 'ALL', value: 'ALL' },
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
    { key: 'SEA EXPORT', value: 'SEA EXPORT' },
    { key: 'SEA IMPORT', value: 'SEA IMPORT' },
    { key: 'OTHERS', value: 'OTHERS' },
  ]
  InvTypeList = [
    { key: 'A/R', value: 'A/R' },
    { key: 'A/P', value: 'A/P' },
  ]
  DateTypeList = [
    { key: 'INV. DATE', value: 'INV. DATE' },
    { key: 'REF. DATE', value: 'REF. DATE' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      inv_date_type: [''],
      inv_from_date: [''],
      inv_to_date: [''],
      inv_mode: [''],
      inv_type: [''],
      inv_parent_name: [''],
      inv_cust_name: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      inv_date_type: this.record.inv_date_type == ''? "INV. DATE" : this.record.inv_date_type,
      inv_from_date: this.record.inv_from_date,
      inv_to_date: this.record.inv_to_date,
      inv_mode: this.record.inv_mode == ''? "ALL" : this.record.inv_mode,
      inv_type:this.record.inv_type == ''? "A/R" : this.record.inv_type,
      inv_parent_name: this.record.inv_parent_name,
      inv_cust_name: this.record.inv_cust_name,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.inv_date_type = this.mform.value.inv_date_type;
      this.record.inv_from_date = this.mform.value.inv_from_date;
      this.record.inv_to_date = this.mform.value.inv_to_date;
      this.record.inv_mode = this.mform.value.inv_mode;
      this.record.inv_type = this.mform.value.inv_type;
      this.record.inv_parent_name = this.mform.value.inv_parent_name;
      this.record.inv_cust_name = this.mform.value.inv_cust_name;


      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url, IsDetail: this.IsDetail});
    }
  }
  callBack(action: any) {
    if (action.id == 'inv_parent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          inv_parent_id: null,
          inv_parent_name: "",
        });
      } else {
        this.mform.patchValue({
          inv_parent_id: action.rec.cust_id,
          inv_parent_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'inv_cust_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          inv_cust_id: null,
          inv_cust_name: "",
        });
      } else {
        this.mform.patchValue({
          inv_cust_id: action.rec.cust_id,
          inv_cust_name: action.rec.cust_name,
        });
      }
    }
  }
}