import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iAirExport_Search } from '../../models/iairexport';

@Component({
  selector: 'app-airexport-search',
  templateUrl: './airexport-search.component.html',
  styleUrls: ['./airexport-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 24/02/2025
//Command : Search the Fcl Components. 

export class AirExportSearchComponent {

  mform: FormGroup;
  record!: iAirExport_Search;
  records: any;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iAirExport_Search) {
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
      mbl_refno: [''],
      mbl_from_date: [''],
      mbl_to_date: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      mbl_refno: this.record.mbl_refno,
      mbl_from_date: this.record.mbl_from_date,
      mbl_to_date: this.record.mbl_to_date,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.mbl_refno = this.mform.value.mbl_refno;
      this.record.mbl_from_date = this.mform.value.mbl_from_date;
      this.record.mbl_to_date = this.mform.value.mbl_to_date;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
