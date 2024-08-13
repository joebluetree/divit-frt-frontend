import { iAccGroupm_Search } from './../../models/iaccgroupm';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';


@Component({
  selector: 'app-accgroup-search',
  templateUrl: './accgroup-search.component.html',
  styleUrls: ['./accgroup-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class AccGroupSearchComponent {

  mform: FormGroup;
  record!: iAccGroupm_Search;


  @Input('search_url') search_url = '';

  @Input('input') set input(v: iAccGroupm_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'DIRECT INCOME', value: 'DIRECT INCOME' },
    { key: 'DIRECT EXPENSE', value: 'DIRECT EXPENSE' },
    { key: 'INDIRECT INCOME', value: 'INDIRECT INCOME' },
    { key: 'INDIRECT EXPENSE', value: 'INDIRECT EXPENSE' },
    { key: 'ASSET', value: 'ASSET' },
    { key: 'LIABILITIES', value: 'LIABILITIES' },
  ]

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      grp_name: [''],
      grp_main_group: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      grp_name: this.record.grp_name,
      grp_main_group: this.record.grp_main_group,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.grp_name = this.mform.value.grp_name;
      this.record.grp_main_group = this.mform.value.grp_main_group;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });

    }
  }

}
