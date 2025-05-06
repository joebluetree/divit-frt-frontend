import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iSlip_Search } from '../../models/islip';



@Component({
  selector: 'app-messengerslip-search',
  templateUrl: './messengerslip-search.component.html',
  styleUrls: ['./messengerslip-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 22/04/2025
//Command : Search the Messenger slip Components. 

export class MessengerSlipSearchComponent {

  mform: FormGroup;
  record!: iSlip_Search;

  @Input('search_url') search_url = '';

  @Input('parent_type') parent_type: string = '';

  @Input('input') set input(v: iSlip_Search) {
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
      cs_refno: [''],
      cs_from_date: [''],
      cs_to_date: ['']
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      cs_refno: this.record.cs_refno,
      cs_to_date: this.record.cs_to_date,
      cs_from_date: this.record.cs_from_date,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.cs_refno = this.mform.value.cs_refno;
      this.record.cs_to_date = this.mform.value.cs_to_date;
      this.record.cs_from_date = this.mform.value.cs_from_date;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.parent_type = this.parent_type;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
