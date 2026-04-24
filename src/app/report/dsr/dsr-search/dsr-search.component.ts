import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iConsigneeShipment_Search } from '../../models/iconsigneeshipment';
import { iDSR_Search } from '../../models/idsr';

@Component({
  selector: 'app-dsr-search',
  templateUrl: './dsr-search.component.html',
  styleUrls: ['./dsr-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 04/02/2026
//Remark : this component manages searching of Agent Shipment Report records

export class DSRSearchComponent {

  mform: FormGroup;
  record!: iDSR_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iDSR_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }
  
  DateTypeList = [
    { key: 'REF. DATE', value: 'REF. DATE' },
    { key: 'ETD', value: 'ETD' },
    { key: 'ETA', value: 'ETA' },
  ]

  groupList = [
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
    { key: 'SEA EXPORT', value: 'SEA EXPORT' },
    { key: 'SEA IMPORT', value: 'SEA IMPORT' },
    { key: 'OTHERS', value: 'OTHERS' },
  ]
  
  blTypeList = [
    { key: 'HOUSE WISE', value: 'HOUSE WISE' },
    { key: 'MASTER WISE', value: 'MASTER WISE' },
  ]
  
  formatList = [
    { key: 'CONSIGNEE SHIPMENT REPORT', value: 'CONSIGNEE SHIPMENT REPORT' },
    { key: 'SHIPMENT STATUS REPORT', value: 'SHIPMENT STATUS REPORT' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      hbl_date_type: [''],
      hbl_from_date: [''],
      hbl_to_date: [''],
      hbl_mode: [''],
      hbl_parent_name: [''],
      hbl_consignee_name: [''],
      hbl_shipper_name: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      hbl_date_type: this.record.hbl_date_type == ''? "REF. DATE" : this.record.hbl_date_type,
      hbl_from_date: this.record.hbl_from_date,
      hbl_to_date: this.record.hbl_to_date,
      hbl_mode: this.record.hbl_mode,
      hbl_parent_name: this.record.hbl_parent_name,
      hbl_consignee_name: this.record.hbl_consignee_name,
      hbl_shipper_name: this.record.hbl_shipper_name,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.hbl_date_type = this.mform.value.hbl_date_type;
      this.record.hbl_from_date = this.mform.value.hbl_from_date;
      this.record.hbl_to_date = this.mform.value.hbl_to_date;
      this.record.hbl_mode = this.mform.value.hbl_mode;
      this.record.hbl_parent_name = this.mform.value.hbl_parent_name;
      this.record.hbl_consignee_name = this.mform.value.hbl_consignee_name;
      this.record.hbl_shipper_name = this.mform.value.hbl_shipper_name;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url, IsDetail: this.IsDetail});
    }

  }
  callBack(action: any) {
    if (action.id == 'hbl_parent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_parent_id: null,
          hbl_parent_name: "",
        });
      } else {
        this.mform.patchValue({
          hbl_parent_id: action.rec.cust_id,
          hbl_parent_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'hbl_consignee_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_consignee_id: null,
          hbl_consignee_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_consignee_id: action.rec.cust_id,
          hbl_consignee_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'hbl_shipper_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_shipper_id: null,
          hbl_shipper_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_shipper_id: action.rec.cust_id,
          hbl_shipper_name: action.rec.cust_name,
        });
      }
    }
  }
}