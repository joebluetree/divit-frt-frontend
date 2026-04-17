import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iOpHandle_Search } from '../../models/iophandle';

@Component({
  selector: 'app-ophandle-search',
  templateUrl: './ophandle-search.component.html',
  styleUrls: ['./ophandle-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 26/12/2025
//Remark : this component manages searching of Operation Handling Report records

export class OpHandleSearchComponent {

  mform: FormGroup;
  record!: iOpHandle_Search;

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iOpHandle_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  typeList = [
    { key: 'ALL', value: 'ALL' },
    { key: 'SEA EXPORT', value: 'SEA EXPORT' },
    { key: 'SEA IMPORT', value: 'SEA IMPORT' },
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
  ]

  groupList = [
    { key: 'MASTER', value: 'MASTER' },
    { key: 'HOUSE', value: 'HOUSE' },
    { key: 'SUMMARY', value: 'SUMMARY' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      ophandle_from_date: [''],
      ophandle_to_date: [''],
      ophandle_type: [''],
      ophandle_group: [''],
      ophandle_handled_by: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }
  ngOnInit(): void {
    this.mform.setValue({
      ophandle_from_date: this.record.ophandle_from_date,
      ophandle_to_date: this.record.ophandle_to_date,
      ophandle_type: this.record.ophandle_type,
      ophandle_group: this.record.ophandle_group,
      ophandle_handled_by: this.record.ophandle_handled_by,

    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.ophandle_from_date = this.mform.value.ophandle_from_date;
      this.record.ophandle_to_date = this.mform.value.ophandle_to_date;
      this.record.ophandle_type = this.mform.value.ophandle_type;
      this.record.ophandle_group = this.mform.value.ophandle_group;
      this.record.ophandle_handled_by = this.mform.value.ophandle_handled_by;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url });
    }

  }
  callBack(action: any) {
    if (action.id == 'ophandle_handled_by') {
      if (action.rec == null) {
        this.mform.patchValue({
          ophandle_handled_id: null,
          ophandle_handled_by: '',
        });
      } else {
        this.mform.patchValue({
          ophandle_handled_id: action.rec.param_id,
          ophandle_handled_by: action.rec.param_name,
        });
      }
    }
  }
}