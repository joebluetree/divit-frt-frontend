import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iUser_Search } from '../../models/iuserm';
import { GlobalService } from '../../../core/services/global.service';
import { iYear_Search } from '../../models/iyearm';

@Component({
  selector: 'app-year-search',
  templateUrl: './year-search.component.html',
  styleUrls: ['./year-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class YearSearchComponent {

  mform: FormGroup;
  record!: iYear_Search;

  @Input('input') set input(v: iYear_Search) {
    this.record = { ...v };
  }

  @Input('search_url') search_url = '';
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      year_name: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      year_name: this.record.year_name,
    })
    this.search('')
  }

  search(_action: string) {
    if (this.output) {
      this.record.year_name = this.mform.value.year_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
