import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AcctmService } from '../../services/acctm.service';
import { iAcctm } from '../../models/iacctm';
import { CustomControls } from '../../../app.config';
import { iAccGroupm } from '../../models/iaccgroupm';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

@Component({
  selector: 'app-acctm-edit',
  templateUrl: './acctm-edit.component.html',
  styleUrls: ['./acctm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class AcctmEditComponent extends baseEditComponent {

  filter = { acc_row_type: this.type };

  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'AR', value: 'AR' },
    { key: 'AP', value: 'AP' },
  ]

  constructor(
    private ms: AcctmService,
  ) {
    super();
    this.mform = this.fb.group({
      acc_id: [0],
      acc_code: ['', [Validators.required, Validators.maxLength(15)]],
      acc_short_name: ['', [Validators.maxLength(15)]],
      acc_name: ['', [Validators.required, Validators.maxLength(100)]],
      acc_type: ['NA', [Validators.required, Validators.maxLength(100)]],
      acc_row_type: [this.type],
      acc_maincode_id: [null],
      acc_maincode_name: [''],
      acc_grp_id: [null, [Validators.required]],
      acc_grp_name: ['', [Validators.required]],
      rec_version: [0],
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
      acc_id: this.id
    })
  }


  getRecord() {
    if (this.id <= 0) {
      return;
    }

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/accounts/acctm/GetRecordAsync').subscribe({
      next: (rec: iAcctm) => {
        this.mform.setValue({
          acc_id: rec.acc_id,
          acc_code: rec.acc_code,
          acc_short_name: rec.acc_short_name,
          acc_name: rec.acc_name,
          acc_type: rec.acc_type,
          acc_grp_id: rec.acc_grp_id,
          acc_grp_name: rec.acc_grp_name,
          acc_row_type: rec.acc_row_type,
          acc_maincode_id: rec.acc_maincode_id,
          acc_maincode_name: rec.acc_maincode_name,
          rec_version: rec.rec_version,
        });
      },
      error: (e) => {
        this.gs.showError(e);
      },
      complete: () => { }
    })
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iAcctm>this.mform.value;

    let _mode = this.mode;

    data.acc_row_type = this.type;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.acc_id,
      'mode': this.mode
    }
    console.log(data);
    this.ms.save(param, data, '/api/accounts/acctm/SaveAsync').subscribe({
      next: (v: iAcctm) => {
        if (this.mode == "add") {
          this.id = v.acc_id;
          this.mode = "edit";
          this.mform.patchValue({
            acc_id: this.id
          });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version
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

  callBack_AccGroup(action: { id: string, rec: iAccGroupm }) {
    console.log('action ', action);
    if (action.rec == null) {
      this.mform.patchValue({
        acc_grp_id: null,
        acc_grp_name: '',
      });
    }
    else {
      this.mform.patchValue({
        acc_grp_id: action.rec.grp_id,
        acc_grp_name: action.rec.grp_name,
      });
    }
  }
  callBack_Acctm(action: { id: string, rec: iAcctm }) {

    if (action.rec == null) {
      this.mform.patchValue({
        acc_maincode_id: null,
        acc_maincode_name: '',
      });
    }
    else {
      this.mform.patchValue({
        acc_maincode_id: action.rec.acc_id,
        acc_maincode_name: action.rec.acc_name,
      });
    }
  }


}

