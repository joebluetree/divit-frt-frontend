import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iAirVolume_Search} from '../../models/iairvolume';

@Component({
  selector: 'app-airvolume-search',
  templateUrl: './airvolume-search.component.html',
  styleUrls: ['./airvolume-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 16/01/2025
//Remark : this component manages searching of Air Volume Report records

export class AirVolumeSearchComponent {

  mform: FormGroup;
  record!: iAirVolume_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iAirVolume_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();
  @Output('isDetailChange') DetOutput = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  formatList = [
    { key: 'OPERATION GROUP', value: 'OPERATION GROUP' },
    { key: 'AGENT', value: 'AGENT' },
  ]

  groupList = [
    { key: 'ALL', value: 'ALL' },
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
  ]

  repTypeList = [
    { key: 'DETAIL', value: 'DETAIL' },
    { key: 'SUMMARY', value: 'SUMMARY' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      mbl_from_date: [''],
      mbl_to_date: [''],
      mbl_format: [''],
      mbl_report_type: [''],
      mbl_agent_name: [''],
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
      mbl_agent_name: this.record.mbl_agent_name,
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
      this.record.mbl_agent_name = this.mform.value.mbl_agent_name;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.IsDetail = this.mform.value.mbl_report_type === 'DETAIL';
      this.DetOutput.emit({record: this.record, IsDetail: this.IsDetail, action: _action});
      this.output.emit({ action: _action, record: this.record, url: this.search_url, IsDetail: this.IsDetail});
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
  }
}