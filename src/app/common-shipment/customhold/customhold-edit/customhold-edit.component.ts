import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { CustomHoldService } from '../../services/customhold.service';
import { iCustomHold } from '../../models/icustomhold';

//Name : Sourav V
//Created Date : 02/07/2025
//Remark : this component manages creation,editing and saving of custom-hold records

@Component({
  selector: 'app-customhold-edit',
  templateUrl: './customhold-edit.component.html',
  styleUrls: ['./customhold-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class CustomHoldEditComponent extends baseEditComponent {

  parent_id: number = 0;
  parent_type: string = '';


  constructor(
    public ms: CustomHoldService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      custom_id: [0],
      custom_parent_id: [0],
      custom_refno: [''],
      custom_houseno: [''],
      custom_title: [''],
      custom_comm_inv_yn: [''],
      custom_comm_inv: [''],
      custom_fumi_cert_yn: [''],
      custom_fumi_cert: [''],
      custom_insp_chrg_yn: [''],
      custom_insp_chrg: [''],
      custom_remarks: [''],
      rec_version: [0],

    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"] || 0;
    });
    if (this.mode == "add")
      this.getRecord();
    else {
      this.newRecord();
    }
  }

  newRecord() {
    this.id = 0;
    this.mode = "add";
    this.mform.patchValue({
      custom_id: this.id,
      custom_parent_id: this.parent_id,
      rec_version: 0,
    })
    this.getDefaultData();
  }

  getDefaultData() {
    const param = { 'id': this.parent_id };
    this.ms.getRecord(param, '/api/CommonShipment/customhold/GetDefaultDataAsync').subscribe({
      next: (rec: iCustomHold) => {
        this.mform.patchValue({
          custom_parent_id: rec.custom_parent_id,
          custom_refno: rec.custom_refno,
          custom_houseno: rec.custom_houseno,

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

  getRecord() {
    const param = { 'id': this.parent_id };
    this.ms.getRecord(param, '/api/CommonShipment/customhold/GetRecordAsync').subscribe({
      next: (rec: iCustomHold) => {
        if (rec.custom_id == 0) {
          this.newRecord();
          this.mode = "add";
        }
        else {
          this.mode = "edit";
          this.mform.patchValue({
            custom_id: rec.custom_id,
            custom_parent_id: rec.custom_parent_id,
            custom_refno: rec.custom_refno,
            custom_houseno: rec.custom_houseno,
            custom_title: rec.custom_title,
            custom_comm_inv_yn: rec.custom_comm_inv_yn,
            custom_comm_inv: rec.custom_comm_inv,
            custom_fumi_cert_yn: rec.custom_fumi_cert_yn,
            custom_fumi_cert: rec.custom_fumi_cert,
            custom_insp_chrg_yn: rec.custom_insp_chrg_yn,
            custom_insp_chrg: rec.custom_insp_chrg,
            custom_remarks: rec.custom_remarks,
            rec_version: rec.rec_version,

          });
          console.log(rec);
        }
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
    const data = <iCustomHold>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.custom_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/CommonShipment/customhold/SaveAsync').subscribe({
      next: (v: iCustomHold) => {
        if (this.mode == "add") {
          this.id = v.custom_id;
          this.mode = "edit";
          this.mform.patchValue({ custom_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version,
        });
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
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

