import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iAirImporth_Search } from '../../models/iairimporth';


@Component({
  selector: 'app-airimporth-search',
  templateUrl: './airimporth-search.component.html',
  styleUrls: ['./airimporth-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 31/03/2025
//Command : Search the AirImport House Components. 

export class AirImporthSearchComponent {

  mform: FormGroup;
  record!: iAirImporth_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iAirImporth_Search) {
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
      hbl_houseno: [''],
      hbl_from_date: [''],
      hbl_to_date: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      hbl_houseno: this.record.hbl_houseno,
      hbl_from_date: this.record.hbl_from_date,
      hbl_to_date: this.record.hbl_to_date,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.hbl_houseno = this.mform.value.hbl_houseno;
      this.record.hbl_from_date = this.mform.value.hbl_from_date;
      this.record.hbl_to_date = this.mform.value.hbl_to_date;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
