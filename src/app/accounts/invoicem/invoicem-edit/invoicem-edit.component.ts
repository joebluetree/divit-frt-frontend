import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iAccGroupm } from '../../models/iaccgroupm';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { InvoicemService } from '../../services/invoicem.service';
import { iInvoiced, iInvoicem } from '../../models/iinvoicem';

@Component({
  selector: 'app-invoicem-edit',
  templateUrl: './invoicem-edit.component.html',
  styleUrls: ['./invoicem-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class InvoicemEditComponent extends baseEditComponent {

  parent_id: number = 0;
  parent_type: string = '';
  inv_arap: string = '';
  bSave = true;

  ArrivalList = [
    { key: 'YES', value: 'YES' },
    { key: 'NO', value: 'NO' },
  ]

  constructor(
    private ms: InvoicemService,
  ) {
    super();
    this.mform = this.createform();
  }

  createform() {
    let date = this.gs.getToday();
    let year = this.gs.globalConstants.global_fin_year;
    return this.fb.group({
      inv_id: [0],
      inv_cfno: [0],
      inv_no: [''],
      inv_date: [date],
      inv_year: [year],
      inv_cust_id: [0],
      inv_cust_code: [''],
      inv_cust_name: [''],
      inv_mbl_refno: [''],
      inv_arrnotice: ['NO'],
      inv_cust_refno: [''],
      inv_quoteno: [''],

      inv_mbl_code: [''],
      inv_houseno: [''],
      inv_shipper: [''],
      inv_consignee: [''],
      inv_pcs: [0],
      inv_uom_id: [0],
      inv_uom_code: [''],
      inv_lbs: [0],
      inv_kgs: [0],
      inv_cbm: [0],
      inv_cft: [0],
      inv_ftotal: [0],
      inv_cur_id: [0],
      inv_cur_code: [''],
      inv_exrate: [0],
      inv_total: [0],
      inv_paid: [0],
      inv_balance: [0],
      inv_remarks1: [''],
      inv_remarks2: [''],
      inv_remarks3: [''],
      inv_cost_type: [''],
      inv_arap: [''],
      inv_type: [''],
      inv_mbl_id: [0],
      inv_hbl_id: [0],
      rec_deleted: ['N'],
      rec_attached: [''],
      invoiced: this.fb.array([]),
      rec_files_count: [0],
      rec_files_attached: [''],
      rec_check_count: [0],
      rec_check_attached: [''],
      rec_version: [0],
      rec_locked: [''],
      rec_error: [''],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"] || 0;
      this.parent_type = rec["parent_type"] || '';
      this.inv_arap = rec["inv_arap"] || '';
    });
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
      inv_id: this.id,
      inv_mbl_id: this.parent_id,
      inv_type: this.parent_type,
      inv_arap: this.inv_arap,
    })
    this.getDefaultData();
  }

  addRow(rec: iInvoiced) {
    let defCur_id = this.mform?.get('inv_cur_id')?.value || 0;
    let defCur_code = this.mform?.get('inv_cur_code')?.value || '';
    let defExrate = this.mform?.get('inv_exrate')?.value || 0;
    const _rec = this.fb.group({
      invd_id: [rec?.invd_id || 0],
      invd_parent_id: [rec?.invd_parent_id || 0],
      invd_acc_id: [rec?.invd_acc_id || 0],
      invd_acc_code: [rec?.invd_acc_code || ""],
      invd_acc_name: [rec?.invd_acc_name || ""],
      invd_qty: [rec?.invd_qty || 0],
      invd_frate: [rec?.invd_frate || 0],
      invd_ftotal: [rec?.invd_ftotal || 0],
      invd_cur_id: [rec?.invd_cur_id || defCur_id],
      invd_cur_code: [rec?.invd_cur_code || defCur_code],
      invd_exrate: [rec?.invd_exrate || defExrate],
      invd_rate: [rec?.invd_rate || 0],
      invd_total: [rec?.invd_total || 0],
      invd_remarks: [rec?.invd_remarks || ""],
      rec_deleted: [rec?.rec_deleted || ""],
      invd_order: [rec?.invd_order || 0],
    });
    return _rec;
  }

  addInvoice(iRow: iInvoiced = <iInvoiced>{}) {
    this.formArray('invoiced')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('invoiced').removeAt(idx);
      this.findGrandTotal();
    }
  }

  fillInvoices(invoice_list: iInvoiced[]) {
    this.formArray('invoiced').clear();
    invoice_list.forEach(rec_invoice => {
      this.addInvoice(rec_invoice);
    });
    this.findGrandTotal();
  }

  getDefaultData() {
    const param = { 'id': this.parent_id };
    this.ms.getRecord(param, '/api/accounts/invoicem/GetDefaultData').subscribe({
      next: (rec: iInvoicem) => {
        this.mform.patchValue({
          inv_mbl_id: rec.inv_mbl_id,
          inv_mbl_refno: rec.inv_mbl_refno,
          inv_cur_id: rec.inv_cur_id,
          inv_cur_code: rec.inv_cur_code,
          inv_exrate: this.gs.roundNumber(rec.inv_exrate, this.gs.globalConstants.global_exrate_decimal),

          rec_branch_id: rec.rec_branch_id,
          rec_company_id: rec.rec_company_id,
          rec_version: rec.rec_version,

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
    this.ms.getRecord(param, '/api/accounts/invoicem/GetRecordAsync').subscribe({
      next: (rec: iInvoicem) => {
        this.mform.patchValue({
          inv_id: rec.inv_id,
          inv_cfno: rec.inv_cfno,
          inv_no: rec.inv_no,
          inv_date: rec.inv_date,
          inv_year: rec.inv_year,
          inv_cust_id: rec.inv_cust_id,
          inv_cust_code: rec.inv_cust_code,
          inv_cust_name: rec.inv_cust_name,
          inv_mbl_refno: rec.inv_mbl_refno,
          inv_arrnotice: rec.inv_arrnotice,
          inv_cust_refno: rec.inv_cust_refno,
          inv_quoteno: rec.inv_quoteno,

          inv_mbl_code: rec.inv_mbl_code,
          inv_houseno: rec.inv_houseno,
          inv_shipper: rec.inv_shipper,
          inv_consignee: rec.inv_consignee,

          inv_pcs: rec.inv_pcs,
          inv_uom_id: rec.inv_uom_id,
          inv_uom_code: rec.inv_uom_code,
          inv_lbs: rec.inv_lbs,
          inv_kgs: rec.inv_kgs,
          inv_cbm: rec.inv_cbm,
          inv_cft: rec.inv_cft,
          inv_ftotal: rec.inv_ftotal,
          inv_cur_id: rec.inv_cur_id,
          inv_cur_code: rec.inv_cur_code,
          inv_exrate: rec.inv_exrate,
          inv_total: rec.inv_total,
          inv_paid: rec.inv_paid,
          inv_remarks1: rec.inv_remarks1,
          inv_remarks2: rec.inv_remarks2,
          inv_remarks3: rec.inv_remarks3,
          inv_cost_type: rec.inv_cost_type,
          inv_arap: rec.inv_arap,
          inv_type: rec.inv_type,
          inv_mbl_id: rec.inv_mbl_id,
          inv_hbl_id: rec.inv_hbl_id,
          rec_deleted: rec.rec_deleted,
          rec_files_count: rec.rec_files_count,
          rec_files_attached: rec.rec_files_attached,
          rec_check_count: rec.rec_check_count,
          rec_check_attached: rec.rec_check_attached,
          rec_version: rec.rec_version,
          rec_locked: rec.rec_locked,
          rec_error: rec.rec_error,
        });
        if(rec.rec_error != ""){
          this.bSave = false;
        }
        this.inv_arap = rec.inv_arap;
        this.fillInvoices(rec.invoiced)
      },
      error: (e) => {
        this.gs.showError(e);
      },
      complete: () => { }
    });
  }

  getQtnmList() {
    const confirmDelete = window.confirm("Fill Line Item y/n");
    if (!confirmDelete) {
      return;
    }

    const param = { qtnm_no: this.mform?.get('inv_quoteno')?.value || '' };
    this.ms.getRecord(param, '/api/accounts/invoicem/GetQtnmlistData').subscribe({
      next: (recList: iInvoicem) => {
        this.mform.patchValue({
          inv_cur_id: recList.inv_cur_id,
          inv_cur_code: recList.inv_cur_code,
          inv_exrate: recList.inv_exrate,
        });
        recList.invoiced.forEach(rec_invoice => {
          this.addInvoice(rec_invoice);
          const rowIndex = this.formArray('invoiced').length - 1; // to update total (amount*exrate) of each added row
          this.findTotal({
            name: 'invd_exrate',
            rowIndex: rowIndex,
            isChanged: true
          })
        });
        // this.fillInvoices(recList.invoiced)

        this.findGrandTotal();
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    });
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iInvoicem>this.mform.value;
    // data.inv_date = this.gs.UpdateDateFormat(this.mform.get('inv_date')?.value);
    let _mode = this.mode;

    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.inv_id,
      'mode': this.mode
    }
    console.log(data);
    this.ms.save(param, data, '/api/accounts/invoicem/SaveAsync').subscribe({
      next: (v: iInvoicem) => {
        if (this.mode == "add") {
          this.id = v.inv_id;
          this.mode = "edit";
          this.mform.patchValue({
            inv_id: this.id
          });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          inv_no: v.inv_no,
          inv_mbl_id: v.inv_mbl_id,
          inv_hbl_id: v.inv_hbl_id,
          rec_version: v.rec_version
        });
        this.fillInvoices(v.invoiced)
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  restoreInvoice() {
    if (this.mform.invalid) {
      alert('Invalid Form');
      return;
    }

    const data = <iInvoicem>this.mform.value;

    let _mode = this.mode;

    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.inv_id,
      'mode': this.mode
    };

    let opt = data.rec_deleted == "N" ? "Delete " : "Restore ";       //to confirm delete/restore
    const confirmDelete = window.confirm(opt + data.inv_no + " y/n");
    if (!confirmDelete) {
      return;
    }

    data.rec_deleted = data.rec_deleted === "N" ? "Y" : "N";
    this.ms.save(param, data, '/api/accounts/invoicem/SaveAsync').subscribe({
      next: (v: iInvoicem) => {
        this.mform.patchValue({
          rec_deleted: v.rec_deleted,
          rec_version: v.rec_version
        });
        this.ms.UpdateRecord(v, _mode);

        if (data.rec_deleted == 'Y')
          this.gs.showAlert(["Deleted"]);
        if (data.rec_deleted == 'N')
          this.gs.showAlert(["Restored"]);

      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    });
  }

  callBack(action: any) {
    if (action.id == 'inv_year') {
      this.mform.patchValue({
        inv_year: action.rec ? action.rec.year_code : 0,
        inv_year_name: action.rec ? action.rec.year_name : "",
      });
    }
    if (action.id == 'inv_cust_code') {
      this.mform.patchValue({
        inv_cust_id: action.rec ? action.rec.cust_id : null,
        inv_cust_code: action.rec ? action.rec.cust_code : '',
        inv_cust_name: action.rec ? action.rec.cust_name : '',
      });
    }
    if (action.id == 'inv_uom_code') {
      this.mform.patchValue({
        inv_uom_id: action.rec ? action.rec.param_id : null,
        inv_uom_code: action.rec ? action.rec.param_code : '',
      });
    }

    if (action.id == 'inv_cur_code') {
      this.mform.patchValue({
        inv_cur_id: action.rec ? action.rec.param_id : null,
        inv_cur_code: action.rec ? action.rec.param_code : '',
        inv_exrate: action.rec ? this.gs.roundNumber(parseFloat(action.rec.param_value1), this.gs.globalConstants.global_exrate_decimal) : '',
      });
    }
    if (action.name == 'inv_mbl_code') {
      this.mform.patchValue({
        inv_hbl_id: action.rec ? action.rec.house_id : null,
        inv_mbl_code: action.rec ? action.rec.master_refno : '',
        inv_houseno: action.rec ? action.rec.master_no : '',
        inv_shipper: action.rec ? action.rec.house_shipper : '',
        inv_consignee: action.rec ? action.rec.house_consignee : '',
        inv_pcs: action.rec ? action.rec.house_pcs : null,
        inv_uom_id: action.rec ? action.rec.house_uom_id : null,
        inv_uom_code: action.rec ? action.rec.house_uom_code : '',
        inv_lbs: action.rec ? action.rec.house_lbs : 0,
        inv_kgs: action.rec ? action.rec.house_kgs : 0,
        inv_cbm: action.rec ? action.rec.house_cbm : 0,
        inv_cft: action.rec ? action.rec.house_cft : 0,
      });
    }
    if (action.name == 'invd_acc_code') {
      this.formArrayRecord('invoiced', action.rowIndex)?.patchValue({
        invd_acc_id: action.rec ? action.rec.acc_id : null,
        invd_acc_code: action.rec ? action.rec.acc_code : '',
        invd_acc_name: action.rec ? action.rec.acc_name : '',
      });
    }
    if (action.name == 'invd_cur_code') {
      this.formArrayRecord('invoiced', action.rowIndex)?.patchValue({
        invd_cur_id: action.rec ? action.rec.param_id : null,
        invd_cur_code: action.rec ? action.rec.param_code : '',
        invd_exrate: action.rec ? this.gs.roundNumber(parseFloat(action.rec.param_value1), this.gs.globalConstants.global_exrate_decimal) : '',
      });
      this.findTotal({
        name: 'invd_exrate',
        rowIndex: action.rowIndex,
        isChanged: true
      });
    }
  }

  findGrandTotal() {
    const invoice = <iInvoiced[]>this.formArray('invoiced').value;

    const amt = invoice.reduce((total, row) => {
      return total + (row.invd_total || 0);
    }, 0);

    const ninv_paid = this.mform.value.inv_paid || 0;
    let ninv_balance = (ninv_paid === 0) ? amt : amt - ninv_paid;

    this.mform.patchValue({
      inv_total: this.gs.roundNumber(amt, this.gs.globalConstants.global_dec_places),
      inv_balance: this.gs.roundNumber(ninv_balance, this.gs.globalConstants.global_dec_places)
    });
  }


  findUnit(action: any) {
    if (!action.isChanged) {
      return;
    }

    const data = <iInvoicem>this.mform.value

    const ninv_kgs = data?.inv_kgs || 0;
    const ninv_lbs = data?.inv_lbs || 0;
    const ninv_cbm = data?.inv_cbm || 0;
    const ninv_cft = data?.inv_cft || 0;

    if (action.name == 'inv_kgs') {
      let nlbs = this.ConvertUnit(ninv_kgs, 'kgs');
      this.mform.patchValue({
        inv_lbs: this.gs.roundNumber(nlbs, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'inv_lbs') {
      let nkgs = this.ConvertUnit(ninv_lbs, 'lbs');
      this.mform.patchValue({
        inv_kgs: this.gs.roundNumber(nkgs, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'inv_cbm') {
      let ncft = this.ConvertUnit(ninv_cbm, 'cbm');
      this.mform.patchValue({
        inv_cft: this.gs.roundNumber(ncft, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'inv_cft') {
      let ncbm = this.ConvertUnit(ninv_cft, 'cft');
      this.mform.patchValue({
        inv_cbm: this.gs.roundNumber(ncbm, this.gs.globalConstants.global_dec_places),
      });
    }
  }

  ConvertUnit(value: number, cUnit: 'kgs' | 'lbs' | 'cbm' | 'cft'): number {
    const convertionValue = {
      kgs: 2.20462,
      lbs: 0.453592,
      cbm: 35.3147,
      cft: 0.0283168
    };
    const changedValue = convertionValue[cUnit];
    return changedValue * value;
  }

  findTotal(action: any) {
    if (!action.isChanged) {
      return;
    }
    const data = this.formArrayRecord('invoiced', action.rowIndex);

    const ninvd_qty = data?.value.invd_qty || 0;
    const ninvd_frate = data?.value.invd_frate || 0;
    const ninvd_ftotal = data?.value.invd_ftotal || 0;
    const ninvd_exrate = data?.value.invd_exrate || 0;

    if (action.name == 'invd_qty' || action.name == 'invd_frate' || action.name == 'invd_exrate') {      // always use if condition maximum
      let nfTotal = ninvd_qty * ninvd_frate;
      let nRate = ninvd_exrate * ninvd_frate;
      let nTotal = ninvd_exrate * nfTotal;
      nfTotal = this.gs.roundNumber(nfTotal, this.gs.globalConstants.global_dec_places);
      nTotal = this.gs.roundNumber(nTotal, this.gs.globalConstants.global_dec_places);
      nRate = this.gs.roundNumber(nRate, this.gs.globalConstants.global_dec_places);
      data?.patchValue({
        invd_ftotal: nfTotal,
        invd_total: nTotal,
        invd_rate: nRate,
      });

    }
    if (action.name == 'invd_ftotal') {
      let nfRate = ninvd_frate;
      if (ninvd_qty && ninvd_ftotal != 0) {
        nfRate = ninvd_ftotal / ninvd_qty;
        nfRate = this.gs.roundNumber(nfRate, this.gs.globalConstants.global_dec_places);
      }
      let nRate = ninvd_exrate * nfRate;
      let nTotal = ninvd_exrate * ninvd_ftotal;
      nTotal = this.gs.roundNumber(nTotal, this.gs.globalConstants.global_dec_places);
      nRate = this.gs.roundNumber(nRate, this.gs.globalConstants.global_dec_places);
      data?.patchValue({
        invd_frate: nfRate,
        invd_total: nTotal,
        invd_rate: nRate
      });
    }
    this.findGrandTotal();
  }
}