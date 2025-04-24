import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { MessengerSlipService } from '../../services/slip.service';
import { iSlip } from '../../models/islip';

@Component({
  selector: 'app-messengerslip-edit',
  templateUrl: './messengerslip-edit.component.html',
  styleUrls: ['./messengerslip-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 22/04/2025
//Command : Create the Messenger Slip Edit Components.
//version : 1.0


export class MessengerSlipEditComponent extends baseEditComponent {
  mbl_refno: string = '';
  mbl_id: number = 0;
  mbl_mode: string = '';
  parent_type: string = '';

  dataList = [
    { key: 'AM', value: 'AM' },
    { key: 'PM', value: 'PM' },
  ]

  constructor(
    private ms: MessengerSlipService,
    public dialog: MatDialog
  ) {
    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      cs_id: [0],
      cs_mbl_id: [0],
      cs_refno: [''],
      cs_date: [date],
      cs_slno: [null],
      cs_mode: [''],
      cs_ampm: [''],
      cs_to_id: [null],
      cs_to_code: [''],
      cs_to_name: [''],
      cs_to_tel: [''],
      cs_to_fax: [''],
      cs_from_id: [null],
      cs_from_name: [''],
      cs_is_drop: [''],
      cs_is_pick: [''],
      cs_is_receipt: [''],
      cs_is_check: [''],
      cs_check_det: [''],
      cs_is_bl: [''],
      cs_bl_det: [''],
      cs_is_oth: [''],
      cs_oth_det: [''],
      cs_deliver_to_id: [null],
      cs_deliver_to_code: [''],
      cs_deliver_to_name: [''],
      cs_deliver_to_add1: [''],
      cs_deliver_to_add2: [''],
      cs_deliver_to_add3: [''],
      cs_deliver_to_tel: [''],
      cs_deliver_to_attn: [''],
      cs_remark: [''],

      rec_version: [0],
    })
  }


  ngOnInit() {
    this.id = 0;
    this.mbl_id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.mbl_id = +rec["mbl_id"];
      this.mbl_refno = rec["mbl_refno"];
      this.parent_type = rec["parent_type"];
    });
    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
  }

  async newRecord() {
    this.id = 0;
    this.mode = "add";
    this.mform.patchValue({
      cs_id: this.id,
      cs_mbl_id: this.mbl_id,
      cs_date: this.gs.getToday(),
      cs_mode: this.parent_type,
    })
    if (this.mbl_id != 0)
      this.getDefaultData();
  }



  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/CommonShipment/MessengerSlip/GetRecordAsync').subscribe({
      next: (rec: iSlip) => {
        this.mform.patchValue({
          cs_id: rec.cs_id,
          cs_mbl_id: rec.cs_mbl_id,
          cs_slno: rec.cs_slno,
          cs_refno: rec.cs_refno,
          cs_mode: rec.cs_mode,
          cs_date: rec.cs_date,
          cs_ampm: rec.cs_ampm,
          cs_to_id: rec.cs_to_id,
          cs_to_code: rec.cs_to_code,
          cs_to_name: rec.cs_to_name,
          cs_to_tel: rec.cs_to_tel,
          cs_to_fax: rec.cs_to_fax,
          cs_from_id: rec.cs_from_id,
          cs_from_name: rec.cs_from_name,
          cs_is_drop: rec.cs_is_drop,
          cs_is_pick: rec.cs_is_pick,
          cs_is_receipt: rec.cs_is_receipt,
          cs_is_check: rec.cs_is_check,
          cs_check_det: rec.cs_check_det,
          cs_is_bl: rec.cs_is_bl,
          cs_bl_det: rec.cs_bl_det,
          cs_is_oth: rec.cs_is_oth,
          cs_oth_det: rec.cs_oth_det,
          cs_deliver_to_id: rec.cs_deliver_to_id,
          cs_deliver_to_code: rec.cs_deliver_to_code,
          cs_deliver_to_name: rec.cs_deliver_to_name,
          cs_deliver_to_add1: rec.cs_deliver_to_add1,
          cs_deliver_to_add2: rec.cs_deliver_to_add2,
          cs_deliver_to_add3: rec.cs_deliver_to_add3,
          cs_deliver_to_tel: rec.cs_deliver_to_tel,
          cs_deliver_to_attn: rec.cs_deliver_to_attn,
          cs_remark: rec.cs_remark,
          rec_version: rec.rec_version,
        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  getDefaultData() {
    const param = { 'id': this.mbl_id };
    this.ms.getRecord(param, '/api/CommonShipment/MessengerSlip/GetDefaultDataAsync').subscribe({
      next: (rec: iSlip) => {
        this.mform.patchValue({
          cs_mbl_id: rec.cs_mbl_id,
          cs_refno: rec.cs_refno,
          cs_from_id: rec.cs_from_id,
          cs_from_name: rec.cs_from_name,
          cs_to_id: rec.cs_to_id,
          cs_to_code: rec.cs_to_code,
          cs_to_name: rec.cs_to_name,
          cs_to_tel: rec.cs_to_tel,
          cs_to_fax: rec.cs_to_fax,
          cs_bl_det: rec.cs_bl_det,
          rec_branch_id: rec.rec_branch_id,
          rec_company_id: rec.rec_company_id,
          rec_version: rec.rec_version,

        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }



  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iSlip>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.cs_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/CommonShipment/MessengerSlip/SaveAsync').subscribe({
      next: (v: iSlip) => {
        if (this.mode == "add") {
          this.id = v.cs_id;
          this.mode = "edit";
          this.mform.patchValue({ cs_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          cs_id: v.cs_id,
          cs_mbl_id: v.cs_mbl_id,
          cs_refno: v.cs_refno,
          rec_version: v.rec_version
        });
        console.log(data);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  callBack(action: any) {
    console.log(action);
    let rec: any = {};
    if (action?.rec != null) {
      rec = action.rec;
    }
    if (action.id === 'cs_to_id') {
      console.log(action);
      this.mform.patchValue({
        cs_to_id: rec.cust_id || 0,
        cs_to_code: rec.cust_code || "",
        cs_to_name: rec.cust_name || "",
        cs_to_tel: rec.cust_tel || "",
        cs_to_fax: rec.cust_fax || "",
      });
    }

    if (action.id === 'cs_from_id') {
      console.log(action);
      this.mform.patchValue({
        cs_from_id: rec.param_id || 0,
        cs_from_name: rec.param_name || "",
      });
    }
    if (action.id === 'cs_deliver_to_id') {
      console.log(action);
      this.mform.patchValue({
        cs_deliver_to_id: rec.cust_id || 0,
        cs_deliver_to_code: rec.cust_code || "",
        cs_deliver_to_name: rec.cust_name || "",
      });
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

