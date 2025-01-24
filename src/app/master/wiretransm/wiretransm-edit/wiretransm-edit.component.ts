import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { WiretransmService } from '../../services/wiretransm.service';
import { iWiretransd, iWiretransm } from '../../models/iwiretransm';

@Component({
  selector: 'app-wiretransm-edit',
  templateUrl: './wiretransm-edit.component.html',
  styleUrls: ['./wiretransm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class WiretransmEditComponent extends baseEditComponent {

  constructor(
    private ms: WiretransmService,
  ) {
    super();
    this.showModel = true;
    this.mform = this.fb.group({
      wtim_id: [0],
      wtim_slno: [0],
      wtim_refno: [''],
      wtim_to_name: [''],
      wtim_cust_id: [0],
      wtim_cust_code: [''],
      wtim_cust_name: [''],
      wtim_cust_fax: [''],
      wtim_cust_tel: [''],
      wtim_acc_no: [''],
      wtim_req_type: [''],
      wtim_from_name: [''],
      wtim_date: [''],
      wtim_sender_ref: [''],
      wtim_your_ref: [''],
      wtim_is_review: [''],
      wtim_is_urgent: [''],
      wtim_is_comment: [''],
      wtim_is_reply: [''],
      wtim_is_recycle: [''],
      wtim_remarks: [''],

      wtim_details: this.fb.array([]),
      rec_version: [0],

    })
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
      wtim_id: this.id
    })
  }

  addRow(rec: iWiretransd) {
    return this.fb.group({
      wtid_id: [rec?.wtid_id || 0],
      wtid_wtim_id: [rec?.wtid_wtim_id || 0],
      wtid_benef_id: [rec?.wtid_benef_id || 0],
      wtid_benef_name: [rec?.wtid_benef_name || ""],
      wtid_benef_ref: [rec?.wtid_benef_ref || ""],
      wtid_bank_id: [rec?.wtid_bank_id || 0],
      wtid_bank_name: [rec?.wtid_bank_name || ""],
      wtid_trns_amt: [rec?.wtid_trns_amt || 0],
      wtid_order: [rec?.wtid_order || 0],
    });
  }

  addDetails(iRow: iWiretransd = <iWiretransd>{}) {
    this.formArray('wtim_details')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('wtim_details').removeAt(idx);
    }
  }

  fillDetails(idetails_list: iWiretransd[]) {
    this.formArray('wtim_details').clear();
    idetails_list.forEach((rec_details: iWiretransd) => {
      this.addDetails(rec_details);
    });
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/wiretransm/GetRecordAsync').subscribe({
      next: (rec: iWiretransm) => {
        this.mform.patchValue({
          wtim_id: rec.wtim_id,
          wtim_slno: rec.wtim_slno,
          wtim_refno: rec.wtim_refno,
          wtim_to_name: rec.wtim_to_name,
          wtim_cust_id: rec.wtim_cust_id,
          wtim_cust_code: rec.wtim_cust_code,
          wtim_cust_name: rec.wtim_cust_name,
          wtim_cust_fax: rec.wtim_cust_fax,
          wtim_cust_tel: rec.wtim_cust_tel,
          wtim_acc_no: rec.wtim_acc_no,
          wtim_req_type: rec.wtim_req_type,
          wtim_from_name: rec.wtim_from_name,
          wtim_date: rec.wtim_date,
          wtim_sender_ref: rec.wtim_sender_ref,
          wtim_your_ref: rec.wtim_your_ref,
          wtim_is_urgent: rec.wtim_is_urgent,
          wtim_is_review: rec.wtim_is_review,
          wtim_is_comment: rec.wtim_is_comment,
          wtim_is_reply: rec.wtim_is_reply,
          wtim_is_recycle: rec.wtim_is_recycle,
          wtim_remarks: rec.wtim_remarks,

          rec_version: rec.rec_version,
        });
        this.fillDetails(rec.wtim_details);
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
    const data = <iWiretransm>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.wtim_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/wiretransm/SaveAsync').subscribe({
      next: (v: iWiretransm) => {
        if (this.mode == "add") {
          this.id = v.wtim_id;
          this.mode = "edit";
          this.mform.patchValue({ wtim_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version
        });
        this.fillDetails(v.wtim_details);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  callBack(action: { id: string, name: string, rowIndex: number, rec: any }) {
    if (action.id == 'wtim_cust_code') {
      if (action.rec) {
        this.mform.patchValue({
          wtim_cust_id: action.rec.cust_id,
          wtim_cust_code:action.rec.cust_code,
          wtim_cust_name: action.rec.cust_name,
          wtim_cust_fax: action.rec.cust_address1,
          wtim_cust_tel: action.rec.cust_address2,
          // wtim_cust_fax: action.rec.cust_contacts.cont_tel,
        });
      }
      else {
        this.mform.patchValue({
          wtim_cust_id: null,
          wtim_cust_code: '',
          wtim_cust_name: '',
          wtim_cust_fax: '',
          wtim_cust_tel: '',
        });
      }
    }
    if (action.id == 'wtid_benef_name') {
      if (action.rec) {
        this.formArrayRecord('wtim_details', action.rowIndex)?.patchValue({
          wtid_benef_id: action.rec.cust_id,
          wtid_benef_name: action.rec.cust_name,
        });
      }
      else {
        this.mform.patchValue({
          wtid_benef_id: null,
          wtid_benef_name: '',
        });
      }
    }
    if (action.id == 'wtid_bank_name') {
      if (action.rec) {
        this.formArrayRecord('wtim_details', action.rowIndex)?.patchValue({
          wtid_bank_id: action.rec.cust_id,
          wtid_bank_name: action.rec.cust_name,
        });
      }
      else {
        this.mform.patchValue({
          wtid_bank_id: null,
          wtid_bank_name: '',
        });
      }
    }
  }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }
}

