import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iUser_Search } from '../../models/iuserm';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class UserSearchComponent {

  mform: FormGroup;
  record!: iUser_Search;

  @Input('input') set input(v: iUser_Search) {
    this.record = { ...v };
  }

  @Input('search_url') search_url = '';
  @Output('searchResult') output = new EventEmitter<any>();

  dataList = [{ key: 'NA', value: 'ALL' }, { key: 'Y', value: 'YES' }, { key: 'N', value: 'NO' }]

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      user_name: [''],
      user_is_admin: ['NA'],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      user_name: this.record.user_name,
      user_is_admin: this.record.user_is_admin,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.user_name = this.mform.value.user_name;
      this.record.user_is_admin = this.mform.value.user_is_admin;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
