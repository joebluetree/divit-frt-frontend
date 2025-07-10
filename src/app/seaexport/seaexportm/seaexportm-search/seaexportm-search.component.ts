import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iSea_exportm_Search } from '../../models/iseaexportm';

@Component({
  selector: 'app-seaexportm-search',
  templateUrl: './seaexportm-search.component.html',
  styleUrls: ['./seaexportm-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 24/02/2025
//Remark : this component manages searching of mbl-lcl records

export class SeaExportmSearchComponent {

  mform: FormGroup;
  record!: iSea_exportm_Search;

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iSea_exportm_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      mbl_from_date: [''],
      mbl_to_date: [''],
      mbl_refno: [''],
      mbl_agent_name: [''],
      mbl_pol_name: [''],
      mbl_pod_name: [''],    

    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      mbl_from_date: this.record.mbl_from_date,
      mbl_to_date: this.record.mbl_to_date,
      mbl_refno: this.record.mbl_refno,
      mbl_agent_name: this.record.mbl_agent_name,
      mbl_pol_name: this.record.mbl_pol_name,
      mbl_pod_name: this.record.mbl_pod_name,

    })
  }
 
  search(_action: string) {
    if (this.output) {
      this.record.mbl_from_date = this.mform.value.mbl_from_date;
      this.record.mbl_to_date = this.mform.value.mbl_to_date;
      this.record.mbl_refno = this.mform.value.mbl_refno;
      this.record.mbl_agent_name = this.mform.value.mbl_agent_name;
      this.record.mbl_pol_name = this.mform.value.mbl_pol_name;
      this.record.mbl_pod_name = this.mform.value.mbl_pod_name;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({action: _action, record: this.record, url: this.search_url });
    }
  }

}
