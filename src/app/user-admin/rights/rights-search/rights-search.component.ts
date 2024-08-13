import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iUserBranches_Search } from '../../models/iuserbranches';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-rights-search',
  templateUrl: './rights-search.component.html',
  styleUrls: ['./rights-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class RightsSearchComponent {

  mform: FormGroup;
  record!: iUserBranches_Search;

  @Input('input') set input(v: iUserBranches_Search) {
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
      user_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      user_name: this.record.user_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.user_name = this.mform.value.user_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
