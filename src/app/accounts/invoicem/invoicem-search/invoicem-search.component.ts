import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iInvoicem, iInvoicem_Search } from '../../models/iinvoicem';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { InvoicemService } from '../../services/invoicem.service';

@Component({
  selector: 'app-invoicem-search',
  templateUrl: './invoicem-search.component.html',
  styleUrls: ['./invoicem-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class InvoicemSearchComponent {

  mform: FormGroup;
  record!: iInvoicem_Search;
  private summaryData: any = {};

  @Input('search_url') search_url = '';
  @Input('parent_id') parent_id: number = 0;
  @Input('summary') set summary(val: any) {
    this.summaryData = val?.[0] ?? val ?? {};
    this.getSummary();
  }

  @Input('input') set input(v: iInvoicem_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private ms: InvoicemService
  ) {
    this.buildForm();
  }

  boStatus = [
    { key: 'NA', value: 'NA' },
    { key: 'ATTENDED', value: 'ATTENDED' },
    { key: 'INPROGRESS', value: 'INPROGRESS' },
    { key: 'COMPLETED', value: 'COMPLETED' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      inv_mbl_stage: [''],
      rec_deleted: ['N'],
      inv_mbl_refno: [''],
      inv_inc_total: [0],
      inv_exp_total: [0],
      inv_revenue: [0],
      inv_paid: [0],
      inv_ar_balance: [0],
      inv_ap_balance: [0],
      inv_loss_memo: [''],
      inv_loss_approved: ['N'],
      inv_profit_req: ['N'],
      inv_bo_status: ['NA'],
      inv_remarks: [''],
    });
  }

  ngOnInit(): void {
    this.getSummary();
    this.search('');    // for loading List initialy before Search Action
  }

  getSummary() {
    if (!this.mform) return;
    this.mform.patchValue({
      rec_deleted: this.record.rec_deleted || 'N',
      inv_mbl_stage: this.summaryData.inv_mbl_stage || '',
      inv_mbl_refno: this.summaryData.inv_mbl_refno || '',
      inv_inc_total: this.summaryData.inv_inc_total || 0,
      inv_exp_total: this.summaryData.inv_exp_total || 0,
      inv_revenue: this.summaryData.inv_revenue || 0,
      inv_ar_balance: this.summaryData.inv_ar_balance || 0,
      inv_ap_balance: this.summaryData.inv_ap_balance || 0,
      inv_loss_memo: this.summaryData.inv_loss_memo || '',
      inv_loss_approved: this.summaryData.inv_loss_approved || 'N',
      inv_profit_req: this.summaryData.inv_profit_req || 'N',
      inv_bo_status: this.summaryData.inv_bo_status || 'NA',
      inv_remarks: this.summaryData.inv_remarks || '',
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.rec_deleted = this.mform.value.rec_deleted;
      this.record.parent_id = this.parent_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

  saveMemo() {
    if (this.mform.invalid) {
      alert('Invalid Form');
      return;
    }

    const data = <iInvoicem_Search>this.mform.value;

    const param = {
      id: this.parent_id // mbl_id from cargo_masterm
    };

    this.ms.save(param, data, '/api/accounts/invoicem/SaveMemoAsync').subscribe({
      next: (v: iInvoicem_Search) => {
        this.mform.patchValue({
          inv_loss_memo: v.inv_loss_memo,
          inv_loss_approved: v.inv_loss_approved,
          inv_profit_req: v.inv_profit_req,
          inv_bo_status: v.inv_bo_status,
        });
        this.gs.showAlert(["Update Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    });
  }
}