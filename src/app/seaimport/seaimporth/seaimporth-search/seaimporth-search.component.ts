import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iSea_importH_Search } from '../../models/iseaimporth';


@Component({
  selector: 'app-seaimporth-search',
  templateUrl: './seaimporth-search.component.html',
  styleUrls: ['./seaimporth-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 24/02/2025
//Remark : this component manages searching of hbl-lcl records

export class SeaImportHSearchComponent {

  mform: FormGroup;
  record!: iSea_importH_Search;

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iSea_importH_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      hbl_from_date: [''],
      hbl_to_date: [''],
      hbl_houseno: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      hbl_from_date: this.record.hbl_from_date,
      hbl_to_date: this.record.hbl_to_date,
      hbl_houseno: this.record.hbl_houseno,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.hbl_from_date = this.mform.value.hbl_from_date;
      this.record.hbl_to_date = this.mform.value.hbl_to_date;
      this.record.hbl_houseno = this.mform.value.hbl_houseno;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({action:_action, record: this.record, url: this.search_url });
    }
  }

}
