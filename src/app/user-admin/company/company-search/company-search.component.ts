import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iCompany_Search } from '../../models/icompanym';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css'],
  standalone: true,
  imports: [...CustomControls, CompanySearchComponent]
})
export class CompanySearchComponent {

  mform: FormGroup;
  record!: iCompany_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iCompany_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      comp_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      comp_name: this.record.comp_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.comp_name = this.mform.value.comp_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
