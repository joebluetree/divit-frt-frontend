import { iQtnmFcl_Search } from '../../models/iqtnmfcl';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-qtnmfcl-search',
  templateUrl: './qtnmfcl-search.component.html',
  styleUrls: ['./qtnmfcl-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

  //Name : Alen Cherian
  //Date : 03/01/2025
  //Command : Search the Fcl Components. 

export class QtnmFclSearchComponent {

  mform: FormGroup;
  record!: iQtnmFcl_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iQtnmFcl_Search) {
    this.record = { ...v };
  }
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    public gs: GlobalService,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnm_no: [''],
      qtnm_from_date: [''],
      qtnm_to_date: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      qtnm_no: this.record.qtnm_no,
      qtnm_from_date: this.record.qtnm_from_date,
      qtnm_to_date: this.record.qtnm_to_date,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.qtnm_no = this.mform.value.qtnm_no;
      this.record.qtnm_from_date = this.mform.value.qtnm_from_date;
      this.record.qtnm_to_date = this.mform.value.qtnm_to_date;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
