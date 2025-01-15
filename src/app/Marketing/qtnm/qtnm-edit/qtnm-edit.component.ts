import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { QtnmService } from '../../services/qtnm.service';
import { data_fcl, iQtnd_fcl, iQtnm } from '../../models/iqtnm';
import { QtndEditComponent } from '../qtnd-edit/qtnd-edit.component';

@Component({
  selector: 'app-qtnm-edit',
  templateUrl: './qtnm-edit.component.html',
  styleUrls: ['./qtnm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls, QtndEditComponent]
})
export class QtnmEditComponent extends baseEditComponent {
  data_fcl: data_fcl;

  // dataList = [
  //   { key: 'NA', value: 'NA' },
  //   { key: 'AR', value: 'AR' },
  //   { key: 'AP', value: 'AP' },
  // ]

  // titleList = [
  //   { key: 'NA', value: 'NA' },
  //   { key: 'MR', value: 'MR' },
  //   { key: 'MRS', value: 'MRS' },
  // ]

  constructor(
    private ms: QtnmService,
    public dialog: MatDialog
  ) {
    super();
    this.setInvoicedData('new', <iQtnd_fcl>{}, -1);
    this.showModel = false;
    let user = this.gs.getUserName();
    this.mform = this.fb.group({
      qtnm_id: [0],
      qtnm_cfno: [0],
      qtnm_type: [null], // [Validators.required, Validators.maxLength(15)]
      qtnm_no: [''], //, [Validators.maxLength(15)]
      qtnm_to_id: [0],
      qtnm_to_code: [''],
      qtnm_to_name: [''],
      qtnm_to_addr1: [''],  //, [Validators.required, Validators.maxLength(100)]
      qtnm_to_addr2: [''],  //, [Validators.required, Validators.maxLength(100)]
      qtnm_to_addr3: [''],
      qtnm_to_addr4: [''],
      qtnm_date: [''],
      qtnm_quot_by: [user],
      qtnm_valid_date: [''],
      qtnm_salesman_id: [0],  //, [Validators.required]
      qtnm_salesman_name: [''],  //, [Validators.required, Validators.maxLength(100)]
      qtnm_move_type: [''],
      qtnm_commodity: [''],
      qtnm_fcl: this.fb.array([]),
      rec_version: [0],
    })
  }

  setInvoicedData(_mode: string, _record: iQtnd_fcl, index: number) {
    this.data_fcl = { mode: _mode, record: _record, index: index }
  }

  ngOnInit() {
    this.id = 0;
    this.init();

    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
  }

  async newRecord() {
    this.id = 0;
    this.mform.patchValue({
      qtnm_id: this.id
    })
  }

  addRow(rec: iQtnd_fcl) {
    return this.fb.group({
      qtnd_id: [rec?.qtnd_id || 0],
      qtnd_qtnm_id: [rec?.qtnd_qtnm_id || 0],
      qtnd_pol_id: [rec?.qtnd_pol_id || 0],
      qtnd_pol_name: [rec?.qtnd_pol_name || ""],
      qtnd_pod_id: [rec?.qtnd_pod_id || 0],
      qtnd_pod_name: [rec?.qtnd_pod_name || ""],
      qtnd_carrier_id: [rec?.qtnd_carrier_id || 0],
      qtnd_carrier_name: [rec?.qtnd_carrier_name || ""],
      qtnd_trans_time: [rec?.qtnd_trans_time || ""],
      qtnd_routing: [rec?.qtnd_routing || ""],
      qtnd_cntr_type: [rec?.qtnd_cntr_type || ""],
      qtnd_etd: [rec?.qtnd_etd || ""],
      qtnd_cutoff: [rec?.qtnd_cutoff || ""],
      qtnd_of: [rec?.qtnd_of || 0],
      qtnd_pss: [rec?.qtnd_pss || 0],
      qtnd_baf: [rec?.qtnd_baf || 0],
      qtnd_isps: [rec?.qtnd_isps || 0],
      qtnd_haulage: [rec?.qtnd_haulage || 0],
      qtnd_ifs: [rec?.qtnd_ifs || 0],
      qtnd_tot_amt: [rec?.qtnd_tot_amt || 0],
      qtnd_order: [rec?.qtnd_order || 0],
    });
  }

  addFclDetails(iRow: iQtnd_fcl = <iQtnd_fcl>{}) {
    this.formArray('qtnm_fcl')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    this.formArray('qtnm_fcl').removeAt(idx);
  }

  editFcldetails(idx: number) {
    this.data_fcl = {
      mode: 'edit',
      record: <iQtnd_fcl>this.formArrayRecord('qtnm_fcl', idx)?.value,
      index: idx
    }
  }

  fillFclDetails(ifcl_list: iQtnd_fcl[]) {
    this.formArray('qtnm_fcl').clear();
    ifcl_list.forEach((rec_qtnd_fcl: iQtnd_fcl) => {
      this.addFclDetails(rec_qtnd_fcl);
    });
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/Marketing/Qtnmfcl/GetRecordAsync').subscribe({
      next: (rec: iQtnm) => {
        this.mform.patchValue({
          qtnm_id: rec.qtnm_id,
          qtnm_cfno: rec.qtnm_cfno,
          qtnm_type: rec.qtnm_type,
          qtnm_no: rec.qtnm_no,
          qtnm_to_id: rec.qtnm_to_id,
          qtnm_to_code: rec.qtnm_to_code,
          qtnm_to_name: rec.qtnm_to_name,
          qtnm_to_addr1: rec.qtnm_to_addr1,
          qtnm_to_addr2: rec.qtnm_to_addr2,
          qtnm_to_addr3: rec.qtnm_to_addr3,
          qtnm_to_addr4: rec.qtnm_to_addr4,
          qtnm_date: rec.qtnm_date,
          qtnm_quot_by: rec.qtnm_quot_by,
          qtnm_valid_date: rec.qtnm_valid_date,
          qtnm_salesman_id: rec.qtnm_salesman_id,
          qtnm_salesman_name: rec.qtnm_salesman_name,
          qtnm_move_type: rec.qtnm_move_type,
          qtnm_commodity: rec.qtnm_commodity,
          rec_version: rec.rec_version,

        });
        this.fillFclDetails(rec.qtnm_fcl);
        console.log(rec);
      },
      error: (e) => {
        alert(e.message);
      }
    })
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iQtnm>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.qtnm_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/Marketing/Qtnmfcl/SaveAsync').subscribe({
      next: (v: iQtnm) => {
        if (this.mode == "add") {
          this.id = v.qtnm_id;
          this.mode = "edit";
          this.mform.patchValue({ qtnm_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          qtnm_cfno: v.qtnm_cfno,
          qtnm_no: v.qtnm_no,

          rec_version: v.rec_version
        });
        this.fillFclDetails(v.qtnm_fcl);
        console.log(data);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  callBack(action: { id: string, name: string, rowIndex: number, rec: any }) {
    if (action.id == 'qtnm_to_name') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_to_id: action.rec.cust_id,
          qtnm_to_code: action.rec.cust_code,
          qtnm_to_name: action.rec.cust_name,
          qtnm_to_addr1: action.rec.cust_address1,
          qtnm_to_addr2: action.rec.cust_address2,
          qtnm_to_addr3: action.rec.cust_address3,
        });
      }
      else {
        this.mform.patchValue({
          qtnm_to_id: 0,
          qtnm_to_code: '',
          qtnm_to_name: '',
          qtnm_to_addr1: '',
          qtnm_to_addr2: '',
          qtnm_to_addr3: '',
        });
      }
    }
    if (action.id == 'qtnm_salesman_name') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_salesman_id: action.rec.param_id,
          qtnm_salesman_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnm_salesman_id: 0,
          qtnm_salesman_name: '',
        });
      }
    }
  }

  fclOutput(action: any) {
    if (action.mode == "new")
      this.addFclDetails(<iQtnd_fcl>action.record);
    else {
      this.formArrayRecord('qtnm_fcl', action.index)?.patchValue({
        ...action.record
      })
    }
  }

  openHistory(): void {
    const dialogRef = this.dialog.open(HistoryComponent, {
      hasBackdrop: false,
      width: '250px',
      data: { title: 'History', message: 'Edit Details' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }
}

