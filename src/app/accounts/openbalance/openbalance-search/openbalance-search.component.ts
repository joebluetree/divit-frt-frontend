import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iOpBal_Search } from '../../models/iopenbalance';

@Component({
  selector: 'app-openbalance-search',
  templateUrl: './openbalance-search.component.html',
  styleUrls: ['./openbalance-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 22/09/2025
//Remark : this component manages searching of Open Balance records

export class OpenBalanceSearchComponent {

  mform: FormGroup;
  record!: iOpBal_Search;
  private summaryData: any = {};

  @Input('search_url') search_url = '';
  @Input('summary') set summary(val: any) {
    this.summaryData = val?.[0] ?? val ?? {};
    this.getSummary();
  }

  @Input('input') set input(v: iOpBal_Search) {
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
      jv_docno: [''],
      // jv_acc_code: [''],
      // jv_acc_name: [''],
      jv_debit_total: [0],
      jv_credit_total: [0],
      jv_balance: [0],
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
      jv_docno: this.record.jv_docno,
      jv_debit_total: this.summaryData.jv_debit_total || 0,
      jv_credit_total: this.summaryData.jv_credit_total || 0,
      jv_balance: this.summaryData.jv_balance || 0,
    })
  }
  search(_action: string) {
    if (this.output) {
      this.record.jv_docno = this.mform.value.jv_docno;
      this.record.jv_year = this.gs.globalConstants.global_fin_year;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }
}