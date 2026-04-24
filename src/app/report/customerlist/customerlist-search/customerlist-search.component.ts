import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iCustomerList_Search } from '../../models/icustomerlist';

@Component({
  selector: 'app-customerlist-search',
  templateUrl: './customerlist-search.component.html',
  styleUrls: ['./customerlist-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 31/12/2025
//Remark : this component manages searching of Customer List Report records

export class CustomerListSearchComponent {

  mform: FormGroup;
  record!: iCustomerList_Search;

  // isStandard: boolean = false;

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iCustomerList_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  typeList = [
    { key: 'ALL', value: 'ALL' },
    { key: 'SHIPPER', value: 'SHIPPER' },
    { key: 'CONSIGNEE', value: 'CONSIGNEE' },
    { key: 'IMPORTER', value: 'IMPORTER' },
    { key: 'EXPORTER', value: 'EXPORTER' },
    { key: 'CUSTOMS BROKER', value: 'CUSTOMS BROKER' },
    { key: 'DOMESTIC FORWARDER', value: 'DOMESTIC FORWARDER' },
    { key: 'OVERSEAS AGENT', value: 'OVERSEAS AGENT' },
    { key: 'AIR CARRIER', value: 'AIR CARRIER' },
    { key: 'SEA CARRIER', value: 'SEA CARRIER' },
    { key: 'TRUCKER', value: 'TRUCKER' },
    { key: 'WAREHOUSE', value: 'WAREHOUSE' },
    { key: 'TERMINAL SEA / RAIL', value: 'TERMINAL SEA / RAIL' },
    { key: 'TERMINAL AIR', value: 'TERMINAL AIR' },
    { key: 'SHIPPING VENDOR', value: 'SHIPPING VENDOR' },
    { key: 'GENERAL VENDOR', value: 'GENERAL VENDOR' },
    { key: 'EMPLOYEES', value: 'EMPLOYEES' },
    { key: 'CONTRACTOR', value: 'CONTRACTOR' },
    { key: 'MISCELLANEOUS', value: 'MISCELLANEOUS' },
    { key: 'TBD', value: 'TBD' },
    { key: 'BANK / FINANCIAL INSTITUTE', value: 'BANK / FINANCIAL INSTITUTE' }
  ];

  formatList = [
    { key: 'STANDARD', value: 'STANDARD' },
    { key: 'CREDIT/SPECIAL ACCOUNT', value: 'CREDIT/SPECIAL ACCOUNT' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      cust_from_date: [''],
      cust_to_date: [''],
      cust_type: ['IMPORTER'],
      cust_name: [''],
      cust_format: ['STANDARD'],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      cust_from_date: this.record.cust_from_date,
      cust_to_date: this.record.cust_to_date,
      cust_type: this.record.cust_type == "" ? "IMPORTER" : this.record.cust_type,
      cust_name: this.record.cust_name,
      cust_format: this.record.cust_format == "" ? "STANDARD" : this.record.cust_format,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.cust_from_date = this.mform.value.cust_from_date;
      this.record.cust_to_date = this.mform.value.cust_to_date;
      this.record.cust_type = this.mform.value.cust_type ?? "I";
      this.record.cust_name = this.mform.value.cust_name;
      this.record.cust_format = this.mform.value.cust_format;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url });
    }

  }
}