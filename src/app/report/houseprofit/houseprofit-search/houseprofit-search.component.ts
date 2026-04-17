import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iHouseProfit_Search } from '../../models/ihouseprofit';

@Component({
  selector: 'app-houseprofit-search',
  templateUrl: './houseprofit-search.component.html',
  styleUrls: ['./houseprofit-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 06/03/2026
//Remark : this component manages searching of House Profit Report records

export class HouseProfitSearchComponent {

  mform: FormGroup;
  record!: iHouseProfit_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iHouseProfit_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();
  @Output('isDetailChange') DetOutput = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  formatList = [
    { key: 'AGENT', value: 'AGENT' },
    { key: 'SHIPPER', value: 'SHIPPER' },
    { key: 'CONSIGNEE', value: 'CONSIGNEE' },
    { key: 'HANDLED-BY', value: 'HANDLED-BY' },
    { key: 'NOMINATION', value: 'CLIENT TYPE (HOUSE)' },
    { key: 'CLIENT TYPE', value: 'CLIENT TYPE (ADDRESS BOOK)' },
  ]

  groupList = [
    { key: 'ALL', value: 'ALL' },
    { key: 'SEA EXPORT', value: 'SEA EXPORT' },
    { key: 'SEA IMPORT', value: 'SEA IMPORT' },
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
    { key: 'OTHERS', value: 'OTHERS' },
    { key: 'PS', value: 'INTERNAL PAYMENT SETTLEMENT' },
  ]
  ClientTypeList = [
    { key: 'ALL', value: 'ALL' },
    { key: 'NA', value: 'N/A' },
    { key: 'PROSPECT', value: 'PROSPECT' },
    { key: 'NOMINATION', value: 'NOMINATION' },
    { key: 'MUTUAL', value: 'MUTUAL' },
    { key: 'FREEHAND', value: 'FREEHAND' },
    { key: 'AGENT', value: 'AGENT' },
    { key: 'NOMINATION,MUTUAL', value: 'NOMINATION + MUTUAL' },
    { key: 'FREEHAND,N/A', value: 'FREEHAND + N/A ' },
  ]
  TypeList = [
    { key: 'DETAIL', value: 'DETAIL' },
    { key: 'SUMMARY', value: 'SUMMARY' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      mbl_from_date: [''],
      mbl_to_date: [''],
      mbl_format: [''],
      mbl_report_type: ['DETAIL'],
      mbl_mode: [''],
      mbl_parent_name: [''],
      mbl_salesman_name: [''],
      mbl_agent_name: [''],
      mbl_shipper_name: [''],
      mbl_consignee_name: [''],
      mbl_handled_name: [''],
      mbl_client_type: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      mbl_from_date: this.record.mbl_from_date,
      mbl_to_date: this.record.mbl_to_date,
      mbl_format: this.record.mbl_format == ''? "AGENT" : this.record.mbl_format,
      mbl_report_type: this.record.mbl_report_type  == ''? "DETAIL" : this.record.mbl_report_type,
      mbl_mode: this.record.mbl_mode == ''? "ALL" : this.record.mbl_mode,
      mbl_parent_name: this.record.mbl_parent_name,
      mbl_salesman_name: this.record.mbl_salesman_name,
      mbl_agent_name: this.record.mbl_agent_name,
      mbl_shipper_name: this.record.mbl_shipper_name,
      mbl_consignee_name: this.record.mbl_consignee_name,
      mbl_handled_name: this.record.mbl_handled_name,
      mbl_client_type: this.record.mbl_client_type == ''? "ALL" : this.record.mbl_client_type,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.mbl_from_date = this.mform.value.mbl_from_date;
      this.record.mbl_to_date = this.mform.value.mbl_to_date;
      this.record.mbl_format = this.mform.value.mbl_format;
      this.record.mbl_report_type = this.mform.value.mbl_report_type;
      this.record.mbl_mode = this.mform.value.mbl_mode;
      this.record.mbl_parent_name = this.mform.value.mbl_parent_name;
      this.record.mbl_salesman_name = this.mform.value.mbl_salesman_name;
      this.record.mbl_agent_name = this.mform.value.mbl_agent_name;
      this.record.mbl_shipper_name = this.mform.value.mbl_shipper_name;
      this.record.mbl_consignee_name = this.mform.value.mbl_consignee_name;
      this.record.mbl_handled_name = this.mform.value.mbl_handled_name;
      this.record.mbl_client_type = this.mform.value.mbl_client_type;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url});
    }

  }
  callBack(action: any) {
    if (action.id == 'mbl_agent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_agent_id: null,
          mbl_agent_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_agent_id: action.rec.cust_id,
          mbl_agent_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_shipper_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_shipper_id: null,
          mbl_shippername: '',
        });
      } else {
        this.mform.patchValue({
          mbl_shipper_id: action.rec.cust_id,
          mbl_shipper_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_consignee_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_consignee_id: null,
          mbl_consignee_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_consignee_id: action.rec.cust_id,
          mbl_consignee_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_salesman_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_salesman_id: null,
          mbl_salesman_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_salesman_id: action.rec.param_id,
          mbl_salesman_name: action.rec.param_name,
        });
      }
    }
    if (action.id == 'mbl_parent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_parent_id: null,
          mbl_parent_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_parent_id: action.rec.cust_id,
          mbl_parent_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_customer_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_customer_id: null,
          mbl_customer_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_customer_id: action.rec.cust_id,
          mbl_customer_name: action.rec.cust_name,
        });
      }
    }
  }
}