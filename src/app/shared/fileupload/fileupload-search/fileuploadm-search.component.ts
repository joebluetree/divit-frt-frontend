import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iFileUploadm_Search } from '../../models/ifileuploadm';

@Component({
  selector: 'app-fileuploadm-search',
  templateUrl: './fileuploadm-search.component.html',
  styleUrls: ['./fileuploadm-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class FileUploadmSearchComponent {

  mform: FormGroup;
  record!: iFileUploadm_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iFileUploadm_Search) {
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
      files_type: [''],
      files_ref_no: [''],
      files_desc: [''],
    })
  }

  ngOnInit(): void {

    console.log(this.record);
    this.mform.setValue({
      files_type: this.record.files_type,
      files_ref_no: this.record.files_ref_no,
      files_desc: this.record.files_desc,
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
      this.record.files_type = this.mform.value.files_type;
      this.record.files_ref_no = this.mform.value.files_ref_no;
      this.record.files_desc = this.mform.value.files_desc;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
