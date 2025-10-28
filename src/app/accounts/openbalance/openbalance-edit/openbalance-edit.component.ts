import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { OpenBalanceService } from '../../services/openbalance.service';
import { iAccLedgerd, iAccLedgerh } from '../../models/iaccledger';
import { iOpBalm } from '../../models/iopbalm';

@Component({
  selector: 'app-openbalance-edit',
  templateUrl: './openbalance-edit.component.html',
  styleUrls: ['./openbalance-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 22/09/2025
//Remark : this component manages creation,editing and saving of Open Balance records

export class OpenBalanceEditComponent extends baseEditComponent {

  TypeList = [
    { key: 'CR', value: 'CR' },
    { key: 'DR', value: 'DR' },
  ]

  constructor(
    private ms: OpenBalanceService,
  ) {
    super();
    this.mform = this.createform();
  }

  createform() {
    let date = this.gs.getToday();
    let year = this.gs.globalConstants.global_fin_year;
    return this.fb.group({
      jvh_id: [0],
      jvh_year: [year],
      jvh_vrno: [0],
      jvh_docno: [''],
      jvh_type: [''],
      jvh_date: [date],
      jvh_refno: [''],
      jvh_refdate: [''],
      jvh_status: [''],
      jvh_remarks: [''],
      jvh_narration: [''],
      jvh_master_date: [''],
      jvh_is_payroll: [''],
      jvh_shipment_ref: [''],
      jvh_shipment_date: [''],
      ledger_detail: this.createDetailForm(),
      rec_version: [0],
    })
  }
  createDetailForm() {
    return this.fb.group({
      jv_id: [0],
      jv_header_id: [0],
      jv_year: [0],
      jv_famt: [0],
      jv_acc_id: [0],
      jv_acc_code: [''],
      jv_acc_name: [''],
      jv_cur_id: [0],
      jv_cur_code: [''],
      jv_exrate: [0],
      jv_drcr: ['CR'],
      jv_dcamt: [0],
      jv_debit: [0],
      jv_credit: [0],
      jv_inv_id: [0],
      jv_inv_code: [''],
      jv_doc_type: [''],
      jv_bank: [''],
      jv_chqno: [''],
      jv_chq_date: [''],
    });
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    if (this.mode == "add")
      this.newRecord();
    if (this.mode == "edit")
      this.getRecord();
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      jvh_id: this.id,
    })
    this.getDefaultData();
  }

  getDefaultData() {
    const param = {
      'company_id': this.gs.user.user_company_id,
      'branch_id': this.gs.user.user_branch_id,
    };
    this.ms.getRecord(param, '/api/accounts/openbalance/GetDefaultData').subscribe({
      next: (rec: iAccLedgerh) => {
        this.mform.get('ledger_detail')?.patchValue({
          jv_cur_id: rec.ledger_detail.jv_cur_id,
          jv_cur_code: rec.ledger_detail.jv_cur_code,
          jv_exrate: this.gs.roundNumber(rec.ledger_detail.jv_exrate, this.gs.globalConstants.global_exrate_decimal),

          rec_branch_id: rec.rec_branch_id,
          rec_company_id: rec.rec_company_id,
          // rec_version: rec.rec_version,
        });
        // this.exrate_decimal = rec.exrate_decimal;
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/accounts/openbalance/GetRecordAsync').subscribe({
      next: (rec: iAccLedgerh) => {
        this.mform.patchValue({
          jvh_id: rec.jvh_id,
          jvh_vrno: rec.jvh_vrno,
          jvh_docno: rec.jvh_docno,
          jvh_type: rec.jvh_type,
          jvh_date: rec.jvh_date,
          jvh_refno: rec.jvh_refno,
          jvh_refdate: rec.jvh_refdate,
          jvh_status: rec.jvh_status,
          jvh_remarks: rec.jvh_remarks,
          jvh_narration: rec.jvh_narration,
          jvh_master_date: rec.jvh_master_date,
          jvh_is_payroll: rec.jvh_is_payroll,
          jvh_shipment_ref: rec.jvh_shipment_ref,
          jvh_shipment_date: rec.jvh_shipment_date,
          rec_version: rec.rec_version,
        });
        // this.exrate_decimal = rec.exrate_decimal;
        this.patchDetailRecord(rec.ledger_detail);
      },
      error: (e) => {
        this.gs.showError(e);
      },
      complete: () => { }
    });
  }

  patchDetailRecord(detail: iAccLedgerd | null) {
    if (!detail) return;

    this.mform.get('ledger_detail')?.patchValue({
      jv_id: detail.jv_id,
      jv_header_id: detail.jv_header_id,
      jv_year: detail.jv_year,
      jv_famt: detail.jv_famt,
      jv_cur_id: detail.jv_cur_id,
      jv_cur_code: detail.jv_cur_code,
      jv_exrate: detail.jv_exrate,
      jv_drcr: detail.jv_drcr,
      jv_dcamt: detail.jv_dcamt,
      jv_debit: detail.jv_debit,
      jv_credit: detail.jv_credit,
      jv_inv_id: detail.jv_inv_id,
      jv_inv_code: detail.jv_inv_code,
      jv_doc_type: detail.jv_doc_type,
      jv_bank: detail.jv_bank,
      jv_chqno: detail.jv_chqno,
      jv_chq_date: detail.jv_chq_date,
      jv_acc_id: detail.jv_acc_id,
      jv_acc_code: detail.jv_acc_code,
      jv_acc_name: detail.jv_acc_name,
    });
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iAccLedgerh>this.mform.value;
    let _mode = this.mode;

    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.jvh_id,
      'mode': this.mode
    }
    console.log(data);
    this.ms.save(param, data, '/api/accounts/openbalance/SaveAsync').subscribe({
      next: (v: iAccLedgerh) => {
        if (this.mode == "add") {
          this.id = v.jvh_id;
          this.mode = "edit";
          this.mform.patchValue({
            jvh_id: this.id
          });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          jvh_vrno: v.jvh_vrno,
          jvh_docno: v.jvh_docno,
          rec_version: v.rec_version
        });

        const newRec = this.UpdateRecList(v);// to update record list after record add/edit

        this.patchDetailRecord(v.ledger_detail);
        this.ms.UpdateRecord(newRec, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  UpdateRecList(v: iAccLedgerh): iOpBalm {
    return {
      jv_id: 0,
      jv_header_id: v.jvh_id,
      jv_docno: v.jvh_docno,
      jv_date: v.jvh_date,
      jv_refno: v.jvh_refno,
      jv_refdate: v.jvh_refdate,
      jv_acc_code: v.ledger_detail.jv_acc_code,
      jv_acc_name: v.ledger_detail.jv_acc_name,
      jv_famt: v.ledger_detail.jv_famt,
      jv_cur_code: v.ledger_detail.jv_cur_code,
      jv_exrate: v.ledger_detail.jv_exrate,
      jv_dcamt: v.ledger_detail.jv_dcamt,
      jv_debit: v.ledger_detail.jv_debit,
      jv_credit: v.ledger_detail.jv_credit,
      jv_shipment_ref: v.jvh_shipment_ref,
      jv_shipment_date: v.jvh_shipment_date,

      rec_version: v.rec_version,
      rec_company_id: v.rec_company_id,
      rec_branch_id: v.rec_branch_id,
      rec_created_by: v.rec_created_by,
      rec_created_date: v.rec_created_date,
      rec_edited_by: v.rec_edited_by,
      rec_edited_date: v.rec_edited_date,
    };
  }

  callBack(action: { id: string, rec: any }) {
    if (action.id == 'jv_acc_code') {
      if (action.rec == null) {
        this.mform.get('ledger_detail')?.patchValue({
          jv_acc_id: null,
          jv_acc_code: '',
          jv_acc_name: '',
        });
      } else {
        this.mform.get('ledger_detail')?.patchValue({
          jv_acc_id: action.rec.acc_id,
          jv_acc_code: action.rec.acc_code,
          jv_acc_name: action.rec.acc_name,
        });
      }
    }
    if (action.id == 'jv_cur_code') {
      if (action.rec == null) {
        this.mform.get('ledger_detail')?.patchValue({
          jv_cur_id: null,
          jv_cur_code: '',
          jv_exrate: 0,
        });
      } else {
        this.mform.get('ledger_detail')?.patchValue({
          jv_cur_id: action.rec.param_id,
          jv_cur_code: action.rec.param_code,
          jv_exrate: this.gs.roundNumber(
            parseFloat(action.rec.param_value1),
            this.gs.globalConstants.global_exrate_decimal
          ),
        });
      }
      this.findTotal({
        name: 'jv_exrate',
        rowIndex: action.id,
        isChanged: true,
      });
    }
  }

  findTotal(action: any) {
    if (!action.isChanged) {
      return;
    }

    const data = <iAccLedgerh>this.mform.value;

    const jv_famt = data?.ledger_detail.jv_famt || 0;
    const jv_exrate = data?.ledger_detail.jv_exrate || 0;

    if (action.name === 'jv_famt' || action.name === 'jv_exrate') {
      let jv_dcamt = jv_famt * jv_exrate;
      jv_dcamt = this.gs.roundNumber(jv_dcamt, this.gs.globalConstants.global_dec_places);

      this.mform.get('ledger_detail')?.patchValue({
        jv_dcamt: jv_dcamt
      });
    }

  }
}