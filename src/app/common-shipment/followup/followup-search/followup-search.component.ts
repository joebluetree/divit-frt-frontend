import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { iFollowUp_Search } from '../../models/ifollowup';


@Component({
  selector: 'app-followup-search',
  templateUrl: './followup-search.component.html',
  styleUrls: ['./followup-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 09/04/2025
//Command : Search the Follow Up Components. 

export class FollowUpSearchComponent {

  mform: FormGroup;
  record!: iFollowUp_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iFollowUp_Search) {
    this.record = { ...v };
  }
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    public gs: GlobalService,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({

    })
  }

  ngOnInit(): void {
    this.mform.setValue({

    })
  }

  search(_action: string) {
    if (this.output) {

      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
