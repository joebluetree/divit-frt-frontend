import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iHistory_Search } from '../../models/ihistory';



@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class HistorySearchComponent {

  mform: FormGroup;
  record!: iHistory_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iHistory_Search) {
    this.record = { ...v };
  }
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }


  buildForm() {
    this.mform = this.fb.group({
      log_table: [''],
      log_from_date: [''],
      log_to_date: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      log_table: this.record.log_table,
      log_from_date: this.record.log_from_date,
      log_to_date: this.record.log_to_date,
    })
  }


  search(_action: string) {
    if (this.output) {
      this.record.log_table = this.mform.value.log_table;
      this.record.log_from_date = this.mform.value.log_from_date,
      this.record.log_to_date = this.mform.value.log_to_date;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
