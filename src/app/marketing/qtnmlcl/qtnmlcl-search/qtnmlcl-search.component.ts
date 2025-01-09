import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iQtnm_lcl_Search } from '../../models/iqtnmlcl';

@Component({
  selector: 'app-qtnmlcl-search',
  templateUrl: './qtnmlcl-search.component.html',
  styleUrls: ['./qtnmlcl-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})
export class QtnmLclSearchComponent {

  mform: FormGroup;
  record!: iQtnm_lcl_Search;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iQtnm_lcl_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnm_from_date: [''],
      qtnm_to_date: [''],
      qtnm_to_name: [''],
      qtnm_no: [''],
      qtnm_pld_name: [''],

    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      qtnm_from_date: this.record.qtnm_from_date,
      qtnm_to_date: this.record.qtnm_to_date,
      qtnm_to_name: this.record.qtnm_to_name,
      qtnm_no: this.record.qtnm_no,
      qtnm_pld_name: this.record.qtnm_pld_name
    })
  }
 
  search(_action: string) {
    // const fromDate = this.mform.value.qtnm_date_from;
    // const toDate = this.mform.value.qtnm_date_to;
  
    // if (!fromDate || !toDate) {
    //   console.error('Both From and To dates are required.');
    //   return;
    // }
  
    // // Convert dates to JavaScript Date objects for comparison
    // const fromDateObj = new Date(fromDate);
    // const toDateObj = new Date(toDate);
    if (this.output) {
      this.record.qtnm_from_date = this.mform.value.qtnm_from_date;
      this.record.qtnm_to_date = this.mform.value.qtnm_to_date;
      this.record.qtnm_to_name = this.mform.value.qtnm_to_name,
      this.record.qtnm_no = this.mform.value.qtnm_no;
      this.record.qtnm_pld_name = this.mform.value.qtnm_pld_name
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
