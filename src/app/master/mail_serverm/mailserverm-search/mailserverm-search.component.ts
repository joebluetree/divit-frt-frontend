import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iMailServerm_Search } from '../../models/imailserverm';


@Component({
  selector: 'app-mailserverm-search',
  templateUrl: './mailserverm-search.component.html',
  styleUrls: ['./mailserverm-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class MailServermSearchComponent {

  mform: FormGroup;
  record!: iMailServerm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iMailServerm_Search) {
    this.record = { ...v };
  }
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }


  buildForm() {
    this.mform = this.fb.group({
      mail_name: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      mail_name: this.record.mail_name,
    })
  }


  search(_action: string) {
    if (this.output) {
      this.record.mail_name = this.mform.value.mail_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
