import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { DevanInstService } from '../../services/devaninst.service';
import { iDevanInst } from '../../models/idevaninst';

//Name : Sourav V
//Created Date : 26/06/2025
//Remark : this component manages creation,editing and saving of Devan Instruction (parent table) records

@Component({
  selector: 'app-devaninst-edit',
  templateUrl: './devaninst-edit.component.html',
  styleUrls: ['./devaninst-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class DevanInstEditComponent extends baseEditComponent {

  parent_id: number = 0;
  parent_type: string = '';
  // di_id: number;


  constructor(
    public ms: DevanInstService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    this.mform = this.fb.group({
      di_id: [0],
      di_parent_id: [0],
      di_parent_type: [''],
      di_refno: [''],
      di_request_to_id: [0],
      di_request_to_code: [''],
      di_request_to_name: [''],
      di_request_to_add1: [''],
      di_request_to_add2: [''],
      di_request_to_add3: [''],
      di_request_to_add4: [''],

      di_cargo_loc_id: [0],
      di_cargo_loc_code: [''],
      di_cargo_loc_name: [''],
      di_cargo_loc_add1: [''],
      di_cargo_loc_add2: [''],
      di_cargo_loc_add3: [''],
      di_cargo_loc_add4: [''],

      di_is_devan_sent: [''],
      di_devan_date: [''],

      di_remark1: [''],
      di_remark2: [''],
      di_remark3: [''],

      rec_version: [0],

    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"] || 0;
      this.parent_type = rec["parent_type"] || '';
    });
    if (this.mode == "add")
      this.getRecord();
      // this.newRecord();
    else {
      // this.getRecord();
      this.newRecord();
    }
  }

  newRecord() {
    this.mform.reset();
    this.id = 0;
    this.mode = "add";
    this.gs.updateURL({
      id: this.id,
      mode: this.mode
    })
    this.mform.patchValue({
      di_id: this.id,
      di_parent_id: this.parent_id,
      di_parent_type: this.parent_type,
      rec_version: 0,
    })
    this.getDefaultData();
  }

  getDefaultData() {
      const param = { 'id': this.parent_id, 'parent_type': this.parent_type };
      this.ms.getRecord(param, '/api/CommonShipment/devaninst/GetDefaultData').subscribe({
        next: (rec: iDevanInst) => {
          this.mform.patchValue({
            // di_id:rec.di_id,
            di_parent_id: rec.di_parent_id,
            di_refno: rec.di_refno,
  
            rec_branch_id: rec.rec_branch_id,
            rec_company_id: rec.rec_company_id,
            rec_version: rec.rec_version,
  
          });
          console.log(rec);
          // }
        },
        error: (e) => {
          this.gs.showError(e);
        }
      })
    }
  
  getRecord() {
    const param = { 'id': this.parent_id };
    this.ms.getRecord(param, '/api/CommonShipment/devaninst/GetRecordAsync').subscribe({
      next: (rec: iDevanInst) => {
        if (rec.di_id == 0) {
          this.newRecord();
          this.mode = "add";
        }
        else {
          this.mform.patchValue({
            di_id: rec.di_id,
            di_parent_id: rec.di_parent_id,
            di_parent_type: rec.di_parent_type,
            di_refno: rec.di_refno,
            di_request_to_id: rec.di_request_to_id,
            di_request_to_code: rec.di_request_to_code,
            di_request_to_name: rec.di_request_to_name,
            di_request_to_add1: rec.di_request_to_add1,
            di_request_to_add2: rec.di_request_to_add2,
            di_request_to_add3: rec.di_request_to_add3,
            di_request_to_add4: rec.di_request_to_add4,
            di_cargo_loc_id: rec.di_cargo_loc_id,
            di_cargo_loc_code: rec.di_cargo_loc_code,
            di_cargo_loc_name: rec.di_cargo_loc_name,
            di_cargo_loc_add1: rec.di_cargo_loc_add1,
            di_cargo_loc_add2: rec.di_cargo_loc_add2,
            di_cargo_loc_add3: rec.di_cargo_loc_add3,
            di_cargo_loc_add4: rec.di_cargo_loc_add4,
            di_remark1: rec.di_remark1,
            di_remark2: rec.di_remark2,
            di_remark3: rec.di_remark3,
            di_devan_date: rec.di_devan_date,
            di_is_devan_sent: rec.di_is_devan_sent,
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
    const data = <iDevanInst>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.di_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/CommonShipment/devaninst/SaveAsync').subscribe({
      next: (v: iDevanInst) => {
        if (this.mode == "add") {
          this.id = v.di_id;
          this.mode = "edit";
          this.mform.patchValue({ di_id: this.id });
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
        // this.mform.reset();
        // this.newRecord();
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  callBack(action: any) {
    let rec: any = {};

    if (action.id == 'di_request_to_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        di_request_to_id: rec.cust_id || 0,
        di_request_to_code: rec.cust_code || '',
        di_request_to_name: rec.cust_name || '',
        di_request_to_add1: rec.cust_address1 || '',
        di_request_to_add2: rec.cust_address2 || '',
        di_request_to_add3: this.gs.getAttention(rec),
        di_request_to_add4: this.gs.getTelFax(rec),
      });
    }
    if (action.id == 'di_cargo_loc_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        di_cargo_loc_id: rec.cust_id || 0,
        di_cargo_loc_code: rec.cust_code || '',
        di_cargo_loc_name: rec.cust_name || '',
        di_cargo_loc_add1: rec.cust_address1 || '',
        di_cargo_loc_add2: rec.cust_address2 || '',
        di_cargo_loc_add3: this.gs.getAttention(rec),
        di_cargo_loc_add4: this.gs.getTelFax(rec),
        
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

