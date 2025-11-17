import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { iAccLedgerd, iAccLedgerh } from '../../models/iaccledger';
import { data_ledgerd } from '../../models/iacctrans';
import { AccTransService } from '../../services/acctrans.service';
import { AccTransdEditComponent } from "../acctransd-edit/acctransd-edit.component";

@Component({
  selector: 'app-acctrans-edit',
  templateUrl: './acctrans-edit.component.html',
  styleUrls: ['./acctrans-edit.component.css'],
  standalone: true,
  imports: [...CustomControls, AccTransdEditComponent]
})

//Name : Sourav V
//Created Date : 22/09/2025
//Remark : this component manages creation,editing and saving of Open Balance records

export class AccTransEditComponent extends baseEditComponent {

  data_ledgerd: data_ledgerd;
  bSave = true;

  constructor(
    private ms: AccTransService,
  ) {
    super();
    this.setLedgerData('new', <iAccLedgerd>{}, 0);
    this.mform = this.createform();
  }

  createform() {
    let date = this.gs.getToday();
    let year_code = this.gs.globalConstants.global_fin_year;
    let year_name = this.gs.globalConstants.global_fin_year_name;
    return this.fb.group({
      jvh_id: [0],
      jvh_year: [year_code],
      jvh_year_name: [year_name],
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
      jvh_total: [0],
      jvh_credit: [0],
      jvh_debit: [0],
      ledger_details: this.fb.array([]),
      rec_version: [0],
      rec_locked: [''],
      rec_error: [''],
    })
  }

  setLedgerData(_mode: string, _record: iAccLedgerd, index: number) {
    this.data_ledgerd = { mode: _mode, record: _record, index: index }
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.bSave = false;
    if (this.mode == "add") {
      this.bSave = this.bAdd;
      this.newRecord();
    }
    if (this.mode == "edit") {
      this.bSave = this.bEdit;
      this.getRecord();
    }
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      jvh_id: this.id,
    })
    // this.getDefaultData();
  }

  addRow(rec: iAccLedgerd) {
    let a = this.gs.getToday();
    const _rec = this.fb.group({
      jv_id: [rec?.jv_id || 0],
      jv_header_id: [rec?.jv_header_id || 0],
      jv_acc_id: [rec?.jv_acc_id || 0],
      jv_acc_code: [rec?.jv_acc_code || ""],
      jv_acc_name: [rec?.jv_acc_name || ""],
      jv_cur_id: [rec?.jv_cur_id || 0],
      jv_cur_code: [rec?.jv_cur_code|| ""],
      jv_exrate: [rec?.jv_exrate || 0],
      jv_famt: [rec?.jv_famt || 0],
      jv_drcr: [rec?.jv_drcr || ""],
      jv_debit: [rec?.jv_debit || 0],
      jv_credit: [rec?.jv_credit || 0],
      jv_dcamt: [rec?.jv_dcamt || 0],
      jv_doc_type: [rec?.jv_doc_type || ""],
      jv_bank: [rec?.jv_bank || ""],
      jv_chqno: [rec?.jv_chqno || ""],
      jv_chq_date: [rec?.jv_chq_date || ""],
      jv_tax_amt: [rec?.jv_tax_amt || 0],
      jv_tax_per: [rec?.jv_tax_per|| 0],
      jv_ctr: [rec?.jv_ctr || 0],
    });
    this.findTotal();
    return _rec;
  }

  addLedgerd(iRow: iAccLedgerd = <iAccLedgerd>{}) {
    this.formArray('ledger_details')?.push(this.addRow(iRow));
    this.findTotal();
  }

  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('ledger_details').removeAt(idx);
    }
    this.findTotal();
  }

  editLedgerd(idx: number) {
    this.data_ledgerd = {
      mode: 'edit',
      record: <iAccLedgerd>this.formArrayRecord('ledger_details', idx)?.value,
      index: idx
    }
    // this.findTotal();
  }

  fillLedgerd(iledgerd_list: iAccLedgerd[]) {
    this.formArray('ledger_details').clear();
    iledgerd_list.forEach(rec_ledger => {
      this.addLedgerd(rec_ledger);
    });
    this.findTotal();
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/accounts/acctrans/GetRecordAsync').subscribe({
      next: (rec: iAccLedgerh) => {
        this.mform.patchValue({
          jvh_id: rec.jvh_id,
          jvh_vrno: rec.jvh_vrno,
          jvh_year: rec.jvh_year,
          jvh_year_name: rec.jvh_year_name,
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
          jvh_credit: rec.jvh_credit,
          jvh_debit: rec.jvh_debit,
          rec_version: rec.rec_version,
          rec_locked: rec.rec_locked,
          rec_error: rec.rec_error,
        });
        this.fillLedgerd(rec.ledger_details);
        if(rec.rec_error != ""){
          this.bSave = false;
        }
      },
      error: (e) => {
        this.gs.showError(e);
      },
      complete: () => { }
    });
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iAccLedgerh>this.mform.value;
    let _mode = this.mode;
    
    data.jvh_type = this.type
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.jvh_id,
      'mode': this.mode
    }
    console.log(data);
    this.ms.save(param, data, '/api/accounts/acctrans/SaveAsync').subscribe({
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
          jvh_debit: v.jvh_debit,
          jvh_credit: v.jvh_credit,
          rec_version: v.rec_version
        });
        this.fillLedgerd(v.ledger_details)
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  findTotal() {//action: any
    const data = <iAccLedgerd[]>this.formArray('ledger_details').value;

    const TotalDebit = data.reduce((total, row) => {
      const val = row.jv_dcamt || 0;
      if (row.jv_drcr === 'DR') {
        total = total + val; // debit
      }
      return total
    }, 0);
    
    const TotalCredit = data.reduce((total, row) => {
      const val = row.jv_dcamt || 0;
      if (row.jv_drcr === 'CR') {
        total = total + val; // credit
      }
      return total
      console.log(total);
    }, 0);

    this.mform.patchValue({
      jvh_debit: this.gs.roundNumber(TotalDebit, this.gs.globalConstants.global_dec_places),
      jvh_credit: this.gs.roundNumber(TotalCredit, this.gs.globalConstants.global_dec_places),
    });
  }
  
  callBack(action: { id: string, rec: any }) {
    if (action.id == 'jvh_year') {
        this.mform.patchValue({
          jvh_year: action.rec? action.rec.year_code : 0,
          jvh_year_name: action.rec? action.rec.year_name: "",
        });
    }
  }

  output(action: any) {
    if (action.mode == "new")
      this.addLedgerd(<iAccLedgerd>action.record);
    else {
      this.formArrayRecord('ledger_details', action.index)?.patchValue({
        ...action.record
      })
      this.findTotal();
    }
  }
}