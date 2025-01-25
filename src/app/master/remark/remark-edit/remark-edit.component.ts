import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { data_remark, iRemarkd, iRemarkm } from '../../models/iremarkm';
import { RemarkdEditComponent } from '../remarkd-edit/remarkd-edit.component';
import { RemarkmService } from '../../services/remarkm.service';

@Component({
  selector: 'app-remark-edit',
  templateUrl: './remark-edit.component.html',
  styleUrls: ['./remark-edit.component.css'],
  standalone: true,
  imports: [...CustomControls, RemarkdEditComponent]
})
export class RemarkEditComponent extends baseEditComponent {
   
  data_remark: data_remark;

  constructor(
    private ms: RemarkmService,
    public dialog: MatDialog
  ) {
    super();
    this.setDetailsData('new', <iRemarkd>{}, -1);
    this.showModel = true;
    this.mform = this.fb.group({
      rem_id: [0],
      rem_name: [''],
      rem_remarks : this.fb.array([]),
      rec_version: [0],
    })
  }

  setDetailsData(_mode: string, _record: iRemarkd, index: number) {
      this.data_remark = { mode: _mode, record: _record, index: index }
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
      rem_id: this.id
    })
  }

  addRow(rec: iRemarkd) {
    const _rec = this.fb.group({
      remd_id: [rec?.remd_id || 0],
      remd_remarkm_id: [rec?.remd_remarkm_id || 0],
      remd_desc1: [rec?.remd_desc1 || ""],
      remd_order: [rec?.remd_order || 0],
    });
    return _rec
  }

  addDetails(iRow: iRemarkd = <iRemarkd>{}) {
    this.formArray('rem_remarks')?.push(this.addRow(iRow));
  }

  deleteDetails(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
    this.formArray('rem_remarks').removeAt(idx);
    }
  }

    editDetails(idx: number) {
      console.log(<iRemarkd>this.formArrayRecord('rem_remarks', idx)?.value);
      this.data_remark = {
        mode: 'edit',
        record: <iRemarkd>this.formArrayRecord('rem_remarks', idx)?.value,
        index: idx
      }
    }

  fillDetails(iremark_list: iRemarkd[]) {
    this.formArray('rem_remarks').clear();
    iremark_list.forEach(rec_remark => {
      this.addDetails(rec_remark);
    });
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/remark/GetRecordAsync').subscribe({
      next: (rec: iRemarkm) => {
        this.mform.patchValue({
          rem_id: rec.rem_id,
          rem_name: rec.rem_name,
          rec_version: rec.rec_version,

        });
        this.fillDetails(rec.rem_remarks);
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
    const data = <iRemarkm>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.rem_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/remark/SaveAsync').subscribe({
      next: (v: iRemarkm) => {
        if (this.mode == "add") {
          this.id = v.rem_id;
          this.mode = "edit";
          this.mform.patchValue({ rem_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version
        });
        this.fillDetails(v.rem_remarks);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

    detailOutput(action: any) {
      if (action.mode == "new")
        this.addDetails(<iRemarkd>action.record);
      else {
        this.formArrayRecord('rem_remarks', action.index)?.patchValue({
          ...action.record
        })
      }
    }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }
}

