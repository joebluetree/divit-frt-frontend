import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iProfit_Search } from '../../models/iprofitreport';
import { ProfitService } from '../../services/profitreport.service';

@Component({
  selector: 'app-profitreport-search',
  templateUrl: './profitreport-search.component.html',
  styleUrls: ['./profitreport-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class ProfitSearchComponent {

  mform: FormGroup;
  record!: iProfit_Search;
  private summaryData: any = {};

  @Input() print: boolean = false;
  @Input('search_url') search_url = '';
  @Input('parent_id') parent_id: number = 0;
  @Input('summary') set summary(val: any) {
    this.summaryData = val?.[0] ?? val ?? {};
    this.getSummary();
  }

  @Input('input') set input(v: iProfit_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private ms: ProfitService
  ) {
    this.buildForm();
  }

  ReportType = [
    { key: 'INVOICE WISE', value: 'INVOICE WISE' },
    { key: 'HOUSE WISE', value: 'HOUSE WISE' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      inv_mbl_refno: [''],
      inv_mbl_no: [''],
      inv_pol_name: [''],
      inv_pod_name: [''],
      inv_wt: [0],
      inv_chwt: [0],
      inv_cbm: [0],
      inv_report_type: [''],
      inv_unit_type: ['']
    });
  }

  ngOnInit(): void {
    this.getSummary();
    this.search('');    // for loading List initialy before Search Action
  }

  getSummary() {
    if (!this.mform) return;
    this.mform.patchValue({
      inv_mbl_refno: this.summaryData.inv_mbl_refno || '',
      inv_mbl_no: this.summaryData.inv_mbl_no || '',
      inv_pol_name: this.summaryData.inv_pol_name || '',
      inv_pod_name: this.summaryData.inv_pod_name || '',
      inv_wt: this.summaryData.inv_wt || 0,
      inv_chwt: this.summaryData.inv_chwt || 0,
      inv_cbm: this.summaryData.inv_cbm || 0,
      inv_report_type: this.record.inv_report_type == '' ? "INVOICE WISE" : this.record.inv_report_type,
      inv_unit_type: this.record.inv_unit_type== '' ? "CBM" : this.record.inv_unit_type,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.inv_report_type = this.mform.value.inv_report_type,
      this.record.inv_unit_type = this.mform.value.inv_unit_type;
      this.record.parent_id = this.parent_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({action:_action, record: this.record, url: this.search_url });
    }
  }
}