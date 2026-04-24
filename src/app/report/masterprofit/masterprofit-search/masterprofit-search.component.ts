import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iMasterProfit_Search } from '../../models/imasterprofit';

@Component({
  selector: 'app-masterprofit-search',
  templateUrl: './masterprofit-search.component.html',
  styleUrls: ['./masterprofit-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 10/02/2026
//Remark : this component manages searching of Master Profit Report records

export class MasterProfitSearchComponent {

  mform: FormGroup;
  record!: iMasterProfit_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iMasterProfit_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();
  @Output('isDetailChange') DetOutput = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  formatList = [
    { key: 'GENERAL', value: 'GENERAL' },
    { key: 'AGENT', value: 'AGENT' },
    { key: 'OPERATION GROUP', value: 'OPERATION GROUP' },
    { key: 'PARTY', value: 'PARTY' },
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
  CriteriaList = [
    { key: 'NIL', value: 'NIL' },
    { key: 'PROFIT =', value: 'PROFIT =' },
    { key: 'PROFIT <', value: 'PROFIT <' },
    { key: 'PROFIT >', value: 'PROFIT >' },
    { key: 'PROFIT PER =', value: 'PROFIT PER =' },
    { key: 'PROFIT PER <', value: 'PROFIT PER <' },
    { key: 'PROFIT PER >', value: 'PROFIT PER >' },
  ]
  repTypeList = [
    { key: 'MASTER', value: 'MASTER' },
    { key: 'SUMMARY', value: 'SUMMARY' },
  ]
  PartyTypeList = [
    { key: 'MASTER', value: 'MASTER' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      mbl_from_date: [''],
      mbl_to_date: [''],
      mbl_mode: [''],
      mbl_format: [''],
      mbl_report_type: ['MASTER'],
      mbl_salesman_name: [''],
      mbl_agent_name: [''],
      mbl_parent_name: [''],
      mbl_customer_name: [''],
      mbl_profit_criteria: [''],
      mbl_profit_val: [''],
      mbl_profit_met: [''],
      mbl_loss_approved: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      mbl_from_date: this.record.mbl_from_date,
      mbl_to_date: this.record.mbl_to_date,
      mbl_mode: this.record.mbl_mode == ''? "ALL" : this.record.mbl_mode,
      mbl_format: this.record.mbl_format == ''? "GENERAL" : this.record.mbl_format,
      mbl_report_type: this.record.mbl_report_type  == ''? "MASTER" : this.record.mbl_report_type,
      mbl_salesman_name: this.record.mbl_salesman_name,
      mbl_agent_name: this.record.mbl_agent_name,
      mbl_parent_name: this.record.mbl_parent_name,
      mbl_customer_name: this.record.mbl_customer_name,
      mbl_profit_criteria: this.record.mbl_profit_criteria == ''? "NIL" : this.record.mbl_profit_criteria,
      mbl_profit_val: this.record.mbl_profit_val,
      mbl_profit_met: this.record.mbl_profit_met,
      mbl_loss_approved: this.record.mbl_loss_approved,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.mbl_from_date = this.mform.value.mbl_from_date;
      this.record.mbl_to_date = this.mform.value.mbl_to_date;
      this.record.mbl_mode = this.mform.value.mbl_mode;
      this.record.mbl_format = this.mform.value.mbl_format;
      this.record.mbl_report_type = this.mform.value.mbl_format == "PARTY" ? "MASTER" : this.mform.value.mbl_report_type;
      this.record.mbl_salesman_name = this.mform.value.mbl_salesman_name;
      this.record.mbl_agent_name = this.mform.value.mbl_agent_name;
      this.record.mbl_parent_name = this.mform.value.mbl_parent_name;
      this.record.mbl_customer_name = this.mform.value.mbl_customer_name;
      this.record.mbl_profit_criteria = this.mform.value.mbl_profit_criteria;
      this.record.mbl_profit_val = this.mform.value.mbl_profit_val;
      this.record.mbl_profit_met = this.mform.value.mbl_profit_met;
      this.record.mbl_loss_approved = this.mform.value.mbl_loss_approved;

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