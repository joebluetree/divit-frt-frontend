import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iGenMemo_Search } from '../../models/igenmemo';

@Component({
  selector: 'app-genmemo-search',
  templateUrl: './genmemo-search.component.html',
  styleUrls: ['./genmemo-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class GenMemoSearchComponent {

  mform: FormGroup;
  record!: iGenMemo_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iGenMemo_Search) {
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
    })
  }

  ngOnInit(): void {

    this.mform.setValue({

    })

  }

  search(_action: string) {
    if (this.output) {

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
