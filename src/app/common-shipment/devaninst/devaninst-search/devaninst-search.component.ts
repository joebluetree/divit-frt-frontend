import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iMemo_Search } from '../../models/imemo';
import { iDevanInst_Search } from '../../models/idevaninst';

@Component({
  selector: 'app-devaninst-search',
  templateUrl: './devaninst-search.component.html',
  styleUrls: ['./devaninst-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 25/06/2025
//Remark : this component manages searching of mbl-lcl records

export class DevanInstSearchComponent {

  mform: FormGroup;
  record!: iDevanInst_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iDevanInst_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
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

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
