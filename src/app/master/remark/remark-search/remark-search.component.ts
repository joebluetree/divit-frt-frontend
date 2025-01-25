import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iRemarkm_Search } from '../../models/iremarkm';

@Component({
  selector: 'app-remark-search',
  templateUrl: './remark-search.component.html',
  styleUrls: ['./remark-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class RemarkSearchComponent {

  mform: FormGroup;
  record!: iRemarkm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iRemarkm_Search) {
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
      rem_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      rem_name: this.record.rem_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.rem_name = this.mform.value.rem_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
