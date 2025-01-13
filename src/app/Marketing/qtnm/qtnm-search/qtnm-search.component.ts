import { iQtnm_Search } from '../../models/iqtnm';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-qtnm-search',
  templateUrl: './qtnm-search.component.html',
  styleUrls: ['./qtnm-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class QtnmSearchComponent {

  mform: FormGroup;
  record!: iQtnm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iQtnm_Search) {
    this.record = { ...v };
  }
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private gs: GlobalService,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnm_no: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      qtnm_no: this.record.qtnm_no,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.qtnm_no = this.mform.value.qtnm_no;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
