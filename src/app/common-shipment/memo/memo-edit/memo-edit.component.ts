import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { MemoService } from '../../services/memo.service';
import { iMemo } from '../../models/imemo';
import { HistoryComponent } from '../../../shared/history/history.component';

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component manages creation,editing and saving of sea import (parent table) records

@Component({
  selector: 'app-memo-edit',
  templateUrl: './memo-edit.component.html',
  styleUrls: ['./memo-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class MemoEditComponent extends baseEditComponent {

  parent_id: number = 0;
  parent_type: string = '';
  // memo_id: number;
  

  constructor(
    public ms: MemoService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      memo_id: [0],
      memo_parent_id: [0],
      memo_parent_type: [''],
      memo_remarks_id: [0],
      memo_remarks_code: [''],
      memo_remarks_name: [''],
      memo_date: [date],
      memo_memo: [''],
      memo_details: this.fb.array([]),
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
      this.newRecord();
    else{
      // this.getRecord();
      this.getDetails();
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
      memo_id: this.id,
      memo_parent_id: this.parent_id,
      memo_parent_type: this.parent_type,
      memo_date: this.gs.getToday(),
      rec_version: 0,
    })
    this.getDetails();
  }

  
  getDetails() {
    const param = { 'id': this.parent_id ,'ParentType': this.parent_type};
    this.ms.getRecord(param, '/api/CommonShipment/memo/GetMemoRemarksAsync').subscribe({
      next: (rec: iMemo[]) => {
        this.fillMemoDetails(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  addRow(rec: iMemo) {
    return this.fb.group({
      memo_id: [rec?.memo_id || 0],
      memo_parent_id: [rec?.memo_parent_id || 0],
      memo_parent_type: [rec?.memo_parent_type || ""],
      memo_date: [rec?.memo_date || ""],
      memo_remarks_id: [rec?.memo_remarks_id || 0],
      memo_remarks_name: [rec?.memo_remarks_name || ""],
      rec_created_by: [rec?.rec_created_by || ""]
    });
  }

  addMemoDetails(iRow: iMemo = <iMemo>{}) {
    this.formArray('memo_details')?.push(this.addRow(iRow));
  }

  fillMemoDetails(imemo_list: iMemo[]) {
    this.formArray('memo_details').clear();
    imemo_list.forEach((rec_memo_detail: iMemo) => {
      this.addMemoDetails(rec_memo_detail);
    });
  }
  
  editMemoDetails(idx: number) {
    const param = { 'id': idx };
    this.mode = "edit";
    this.gs.updateURL({
      id: idx,
      mode: this.mode      
    })
    this.ms.getRecord(param, '/api/CommonShipment/memo/GetRecordAsync').subscribe({
      next: (rec: iMemo) => {
        this.mform.patchValue({
          memo_id: rec.memo_id,
          memo_parent_id: rec.memo_parent_id,
          memo_parent_type: rec.memo_parent_type,
          memo_date: rec.memo_date,
          memo_remarks_id: rec.memo_remarks_id,
          memo_remarks_code: rec.memo_remarks_code,
          memo_remarks_name: rec.memo_remarks_name,

          rec_version: rec.rec_version,
        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  deleteRow(idx: number, memo_id: number) {
    if (!memo_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete?`)) {
      const param = { id: memo_id, url: '/api/CommonShipment/memo/DeleteAsync' };

      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('memo_details').removeAt(idx);
          }
        },
        error: (e) => {
          this.gs.showError(e);
        }
      });
    }
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/CommonShipment/memo/GetRecordAsync').subscribe({
      next: (rec: iMemo) => {
        this.mform.patchValue({
          memo_id: rec.memo_id,
          memo_parent_id: rec.memo_parent_id,
          memo_parent_type: rec.memo_parent_type,
          memo_remarks_id: rec.memo_remarks_id,
          memo_remarks_code: rec.memo_remarks_code,
          memo_remarks_name: rec.memo_remarks_name,
          memo_date: rec.memo_date,

          rec_version: rec.rec_version,

        });
        // this.fillMemoDetails(rec.memo_details);
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
    const data = <iMemo>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.memo_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/CommonShipment/memo/SaveAsync').subscribe({
      next: (v: iMemo) => {
        if (this.mode == "add") {
          this.id = v.memo_id;
          this.mode = "edit";
          this.mform.patchValue({ memo_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version,
        });
        this.fillMemoDetails(v.memo_details);
        this.ms.UpdateRecord(v, _mode);
        // this.gs.showAlert(["Save Complete"]);
        this.mform.reset();
        this.newRecord();
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  callBack(action: any) {
    let rec: any = {};

    if (action.id == 'memo_remarks_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        memo_remarks_id: rec.param_id || 0,
        memo_remarks_code: rec.param_code || '',
        memo_remarks_name: rec.param_name || '',
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

