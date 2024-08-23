import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iSettings_Search } from '../../models/isettings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-settings-search',
  templateUrl: './settings-search.component.html',
  styleUrls: ['./settings-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class SettingsSearchComponent {

  mform: FormGroup;
  record!: iSettings_Search;

  @Input('input') set input(v: iSettings_Search) {
    this.record = { ...v };
  }

  @Input('search_url') search_url = '';
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }


  buildForm() {
    this.mform = this.fb.group({
      caption: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      caption: this.record.caption,
    })

    this.search('search');
  }


  search(_action: string) {
    if (this.output) {
      this.record.caption = this.mform.value.caption;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
