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

  DatetypeList = [
    { key: 'Ref Date', value: 'Ref Date' },
    { key: 'Created Date', value: 'Created Date' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      hbl_date_type: [''],
      hbl_from_date: [''],
      hbl_to_date: [''],
      hbl_mbl_refno: [''],
      rec_created_by: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      hbl_date_type: "Ref Date", 
      hbl_from_date: this.record.hbl_from_date,
      hbl_to_date: this.record.hbl_to_date,
      hbl_mbl_refno: this.record.hbl_mbl_refno,
      rec_created_by: this.record.rec_created_by,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.hbl_date_type = this.mform.value.hbl_date_type,
      this.record.hbl_from_date = this.mform.value.hbl_from_date;
      this.record.hbl_to_date = this.mform.value.hbl_to_date;
      this.record.hbl_mbl_refno = this.mform.value.hbl_mbl_refno;
      this.record.rec_created_by = this.mform.value.rec_created_by;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({action:_action, record: this.record, url: this.search_url });
    }
  }

}
