import { iAcctm_Search } from '../../models/iacctm';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-acctm-search',
  templateUrl: './acctm-search.component.html',
  styleUrls: ['./acctm-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class AcctmSearchComponent {

  mform: FormGroup;
  record!: iAcctm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iAcctm_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      acc_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      acc_name: this.record.acc_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.acc_name = this.mform.value.acc_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
