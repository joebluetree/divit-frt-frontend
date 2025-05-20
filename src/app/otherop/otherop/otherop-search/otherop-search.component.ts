import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iOtherOp_Search } from '../../models/iotherop';

@Component({
  selector: 'app-otherop-search',
  templateUrl: './otherop-search.component.html',
  styleUrls: ['./otherop-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 07/05/2025
//Remark : this component manages searching of Other-Operation records

export class OtherOpSearchComponent {

  mform: FormGroup;
  record!: iOtherOp_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iOtherOp_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      oth_from_date: [''],
      oth_to_date: [''],
      oth_refno: [''],

    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      oth_from_date: this.record.oth_from_date,
      oth_to_date: this.record.oth_to_date,
      oth_refno: this.record.oth_refno,

    })
  }
 
  search(_action: string) {
    if (this.output) {
      this.record.oth_from_date = this.mform.value.oth_from_date;
      this.record.oth_to_date = this.mform.value.oth_to_date;
      this.record.oth_refno = this.mform.value.oth_refno;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
