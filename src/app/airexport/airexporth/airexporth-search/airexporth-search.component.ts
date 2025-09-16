import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iAirExporth_Search } from '../../models/iairexporth';

@Component({
  selector: 'app-airexporth-search',
  templateUrl: './airexporth-search.component.html',
  styleUrls: ['./airexporth-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 24/02/2025
//Command : Search the Fcl Components. 

export class AirExporthSearchComponent {

  mform: FormGroup;
  record!: iAirExporth_Search;

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iAirExporth_Search) {
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
      hbl_from_date: [''],
      hbl_to_date: [''],
      hbl_mbl_refno: [''],
      hbl_houseno: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      hbl_from_date: this.record.hbl_from_date,
      hbl_to_date: this.record.hbl_to_date,
      hbl_mbl_refno: this.record.hbl_mbl_refno,
      hbl_houseno: this.record.hbl_houseno,      
    })
  }

  search(_action: string) {
    if (this.output){
      this.record.hbl_from_date = this.mform.value.hbl_from_date;
      this.record.hbl_to_date = this.mform.value.hbl_to_date;
      this.record.hbl_mbl_refno = this.mform.value.hbl_mbl_refno;
      this.record.hbl_houseno = this.mform.value.hbl_houseno;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.output.emit({ action:_action, record: this.record, url: this.search_url });
    }
  }

}
