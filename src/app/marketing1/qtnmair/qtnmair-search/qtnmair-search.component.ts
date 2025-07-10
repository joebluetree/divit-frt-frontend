import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iQtnm_lcl_Search } from '../../models/iqtnmlcl';
import { iQtnm_air_Search } from '../../models/iqtnmair';

@Component({
  selector: 'app-qtnmair-search',
  templateUrl: './qtnmair-search.component.html',
  styleUrls: ['./qtnmair-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 03/01/2025
//Remark : this component manages searching of qtnm-air records

export class QtnmAirSearchComponent {

  mform: FormGroup;
  record!: iQtnm_air_Search;
  appid: string = '';

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iQtnm_air_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnm_from_date: [''],
      qtnm_to_date: [''],
      qtnm_to_name: [''],
      qtnm_no: [''],

    })

  }

  ngOnInit(): void {
    this.appid = this.gs.app_id
    this.mform.setValue({
      qtnm_from_date: this.record.qtnm_from_date,
      qtnm_to_date: this.record.qtnm_to_date,
      qtnm_to_name: this.record.qtnm_to_name,
      qtnm_no: this.record.qtnm_no,
    })
  }
 
  search(_action: string) {
    if (this.output) {
      this.record.qtnm_type = this.mform.value.qtnm_type;
      this.record.qtnm_from_date = this.mform.value.qtnm_from_date;
      this.record.qtnm_to_date = this.mform.value.qtnm_to_date;
      this.record.qtnm_to_name = this.mform.value.qtnm_to_name,
      this.record.qtnm_no = this.mform.value.qtnm_no;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action,record: this.record, url: this.search_url });
    }
  }

}
