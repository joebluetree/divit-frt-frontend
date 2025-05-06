import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { MessengerSlipService } from '../../services/slip.service';
import { iSlip } from '../../models/islip';

@Component({
  selector: 'app-messengerslip-detlist',
  templateUrl: './messengerslip-detlist.component.html',
  styleUrls: ['./messengerslip-detlist.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 25/04/2025
//Command : Create the Messenger Slip Details List Components.
//version : 1.0


export class MessengerSlipDetListComponent extends baseEditComponent {
  parent_refno: string = '';
  parent_id: number = 0;
  mbl_mode: string = '';
  parent_type: string = '';

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
      cs_time: [''],
      cs_ampm: ['NA'],
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
      cs_detail: this.fb.array([]),

      rec_version: [0],
    })
  }


  ngOnInit() {
    this.id = 0;
    this.parent_id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"];
      this.parent_refno = rec["parent_refno"];
      this.parent_type = rec["parent_type"];
    });
    this.getDetails();
  }


  getDetails() {
    const param = { 'id': this.parent_id, 'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/CommonShipment/MessengerSlip/GetDetailsAsync').subscribe({
      next: (rec: iSlip[]) => {
        this.fillDetails(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }


  addRow(rec: iSlip) {
    return this.fb.group({
      cs_id: [rec.cs_id || 0],
      cs_mbl_id: [rec.cs_mbl_id || 0],
      cs_refno: [rec.cs_refno || ''],
      cs_date: [rec.cs_date || ''],
      cs_slno: [rec.cs_slno || 0],
      cs_mode: [rec.cs_mode || ''],
      cs_time: [rec.cs_time || ''],
      cs_ampm: [rec.cs_ampm || ''],
      cs_to_id: [rec.cs_to_id || 0],
      cs_to_code: [rec.cs_to_code || ''],
      cs_to_name: [rec.cs_to_name || ''],
      cs_to_tel: [rec.cs_to_tel || ''],
      cs_to_fax: [rec.cs_to_fax || ''],
      cs_from_id: [rec.cs_from_id || 0],
      cs_from_name: [rec.cs_from_name || ''],
      cs_is_drop: [rec.cs_is_drop || ''],
      cs_is_pick: [rec.cs_is_pick || ''],
      cs_is_receipt: [rec.cs_is_receipt || ''],
      cs_is_check: [rec.cs_is_check || ''],
      cs_check_det: [rec.cs_check_det || ''],
      cs_is_bl: [rec.cs_is_bl || ''],
      cs_bl_det: [rec.cs_bl_det || ''],
      cs_is_oth: [rec.cs_is_oth || ''],
      cs_oth_det: [rec.cs_oth_det || ''],
      cs_deliver_to_id: [rec.cs_deliver_to_id || 0],
      cs_deliver_to_code: [rec.cs_deliver_to_code || ''],
      cs_deliver_to_name: [rec.cs_deliver_to_name || ''],
      cs_deliver_to_add1: [rec.cs_deliver_to_add1 || ''],
      cs_deliver_to_add2: [rec.cs_deliver_to_add2 || ''],
      cs_deliver_to_add3: [rec.cs_deliver_to_add3 || ''],
      cs_deliver_to_tel: [rec.cs_deliver_to_tel || ''],
      cs_deliver_to_attn: [rec.cs_deliver_to_attn || ''],
      cs_remark: [rec.cs_remark || ''],
      rec_created_by: [rec.rec_created_by || ""],
      rec_created_date: [rec.rec_created_date || ""],
      rec_edited_by: [rec.rec_edited_by || ""],
      rec_edited_date: [rec.rec_edited_date || ""],
      rec_version: [rec.rec_version || 0],
    });
  }


  addDetails(iRow: iSlip = <iSlip>{}) {
    this.formArray('cs_detail')?.push(this.addRow(iRow));
  }

  fillDetails(ifollow: iSlip[] = []): void {
    const follow = this.formArray('cs_detail');
    follow.clear();
    ifollow.forEach((rec_follow: iSlip) => {
      this.addDetails(rec_follow);
    });
  }

  deleteRow(idx: number, house: string, hbl_id: number) {
    if (!hbl_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete House no ${house}?`)) {
      const param = { id: hbl_id, url: '/api/CommonShipment/MessengerSlip/DeleteAsync' };

      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('cs_detail').removeAt(idx);
          }
        },
        error: (e) => {
          this.gs.showError(e);
        }
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

