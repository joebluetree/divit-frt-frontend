import { iCustomer_Search } from '../../models/icustomerm';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iWiretransm_Search } from '../../models/iwiretransm';

@Component({
  selector: 'app-wiretransm-search',
  templateUrl: './wiretransm-search.component.html',
  styleUrls: ['./wiretransm-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class WiretransmSearchComponent {

  mform: FormGroup;
  record!: iWiretransm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iWiretransm_Search) {
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
      wtim_refno: [''],
      wtim_from_date: [''],
      wtim_to_date: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      wtim_refno: this.record.wtim_refno,
      wtim_from_date: this.record.wtim_from_date,
      wtim_to_date: this.record.wtim_to_date,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.wtim_refno = this.mform.value.wtim_refno;
      this.record.wtim_from_date = this.mform.value.wtim_from_date,
      this.record.wtim_to_date = this.mform.value.wtim_to_date;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
