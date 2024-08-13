import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iTrackm_Search } from '../../models/itrackm';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class TrackSearchComponent {

  mform: FormGroup;
  record!: iTrackm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iTrackm_Search) {
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
      track_book_no: [''],
      track_cntr_no: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      track_book_no: this.record.track_book_no,
      track_cntr_no: this.record.track_cntr_no,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.track_book_no = this.mform.value.track_book_no;
      this.record.track_cntr_no = this.mform.value.track_cntr_no;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
