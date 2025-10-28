import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iAccTrans_Search } from '../../models/iacctrans';

@Component({
  selector: 'app-acctrans-search',
  templateUrl: './acctrans-search.component.html',
  styleUrls: ['./acctrans-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 15/10/2025
//Remark : this component manages searching of Open Balance records

export class AccTransSearchComponent {

  mform: FormGroup;
  record!: iAccTrans_Search;
  private summaryData: any = {};

  @Input('search_url') search_url = '';
  @Input('summary') set summary(val: any) {
    this.summaryData = val?.[0] ?? val ?? {};
    this.getSummary();
  }

  @Input('input') set input(v: iAccTrans_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      jvh_docno: [''],
      jvh_debit_total: [0],
      jvh_credit_total: [0],
      jvh_balance: [0],
    });
  }

  ngOnInit(): void {
    // this.mform.setValue({
    // }) 
    this.getSummary();
    this.search('');
  }
  
  getSummary() {
    if (!this.mform) return;
    this.mform.patchValue({
      jvh_docno: this.record.jvh_docno,
      jvh_debit_total: this.summaryData.jvh_debit_total || 0,
      jvh_credit_total: this.summaryData.jvh_credit_total || 0,
      jvh_balance: this.summaryData.jvh_balance || 0,
    })
  }
  search(_action: string) {
    if (this.output) {
      this.record.jvh_docno = this.mform.value.jvh_docno;
      this.record.jvh_year = this.gs.globalConstants.global_fin_year;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }
}