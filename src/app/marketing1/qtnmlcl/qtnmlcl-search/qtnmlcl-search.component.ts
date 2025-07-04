import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iQtnm_lcl_Search } from '../../models/iqtnmlcl';

@Component({
  selector: 'app-qtnmlcl-search',
  templateUrl: './qtnmlcl-search.component.html',
  styleUrls: ['./qtnmlcl-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 04/01/2025
//Remark : this component manages searching of qtnm-lcl records
// versio 2: added print option

export class QtnmLclSearchComponent {

  mform: FormGroup;
  record!: iQtnm_lcl_Search;
  appid: string = '';

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iQtnm_lcl_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnm_from_date: [''],
      qtnm_to_date: [''],
      qtnm_to_name: [''],
      qtnm_no: [''],
      qtnm_pld_name: [''],

    })

  }

  ngOnInit(): void {
    this.appid = this.gs.app_id
    this.mform.setValue({
      qtnm_from_date: this.record.qtnm_from_date,
      qtnm_to_date: this.record.qtnm_to_date,
      qtnm_to_name: this.record.qtnm_to_name,
      qtnm_no: this.record.qtnm_no,
      qtnm_pld_name: this.record.qtnm_pld_name
    })
  }
 
  search(_action: string) {
    if (this.output) {
      this.record.qtnm_type = this.mform.value.qtnm_type;
      this.record.qtnm_from_date = this.mform.value.qtnm_from_date;
      this.record.qtnm_to_date = this.mform.value.qtnm_to_date;
      this.record.qtnm_to_name = this.mform.value.qtnm_to_name,
      this.record.qtnm_no = this.mform.value.qtnm_no;
      this.record.qtnm_pld_name = this.mform.value.qtnm_pld_name
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({action: _action, record: this.record, url: this.search_url }); // action added
    }
  }

}
