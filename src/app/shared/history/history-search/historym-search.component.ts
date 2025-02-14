import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iHistorym_Search } from '../../models/ihistorym';

@Component({
  selector: 'app-historym-search',
  templateUrl: './historym-search.component.html',
  styleUrls: ['./historym-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class HistorymSearchComponent {

  mform: FormGroup;
  record!: iHistorym_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iHistorym_Search) {
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
      log_table_row_id: [0],
      log_desc: [''],
      log_from_date: [''],
      log_to_date: [''],
    })
  }

  ngOnInit(): void {

    console.log(this.record);
    this.mform.setValue({
      log_table: this.record.log_table,
      log_table_row_id: this.record.log_table_row_id,
      log_desc: this.record.log_desc,
      log_from_date: this.record.log_from_date,
      log_to_date: this.record.log_to_date,
    })

  }

  customSearch(data: any) {
    this.mform.patchValue({
      log_table: data.table,
      log_table_row_id: data.id,
      log_desc: '',
    })
    this.search('search');
  }

  search(_action: string) {
    if (this.output) {
      this.record.log_table = this.mform.value.log_table;
      this.record.log_table_row_id = this.mform.value.log_table_row_id;
      this.record.log_desc = this.mform.value.log_desc;
      this.record.log_from_date = this.mform.value.log_from_date;
      this.record.log_to_date = this.mform.value.log_to_date;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
