import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { CommonModule } from '@angular/common';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { HistoryService } from '../../services/history.service';
import { iHistory } from '../../models/ihistory';



@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css'],
  standalone: true,
  imports: [CommonModule,...CustomControls]
})

//Name : Alen Cherian
//Date : 11/02/2025


export class HistoryEditComponent extends baseEditComponent {

  constructor(
    private ms: HistoryService,
  ) {
    super();
    this.showModel = false;
    this.mform = this.fb.group({
      log_id: [0],
      log_date: [''],
      log_user_code: [''],
      log_table: [''],
      log_table_row_id: [0],
      log_column: [''],
      log_desc: [''],
      log_refno: [''],
      log_old_value: [''],
      log_new_value: [''],
      log_status: [''],
      rec_version: [0],
      rec_order: [0],
    })
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
      log_id: this.id
    })
  }


  getRecord() {
    if (this.id <= 0) {
      return;
    }

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/history/GetRecordAsync').subscribe({
      next: (rec: iHistory) => {
        this.mform.patchValue({
          log_id: rec.log_id,
          log_date: rec.log_date,
          log_user_code: rec.log_user_code,
          log_table: rec.log_table,
          log_table_row_id: rec.log_table_row_id,
          log_column: rec.log_column,
          log_desc: rec.log_desc,
          log_refno: rec.log_refno,
          log_old_value: rec.log_old_value,
          log_new_value: rec.log_new_value,
          log_status: rec.log_status,
          rec_version: rec.rec_version,
          rec_order: rec.rec_order,
        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      },
      complete: () => { }
    })
  }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }

}
