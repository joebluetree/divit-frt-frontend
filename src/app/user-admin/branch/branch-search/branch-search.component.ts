import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iBranch_Search } from '../../models/ibranchm';
import { GlobalService } from '../../../core/services/global.service';


@Component({
  selector: 'app-branch-search',
  templateUrl: './branch-search.component.html',
  styleUrls: ['./branch-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class BranchSearchComponent {

  mform: FormGroup;
  record!: iBranch_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iBranch_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      branch_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      branch_name: this.record.branch_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.branch_name = this.mform.value.branch_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
