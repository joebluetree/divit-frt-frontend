import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AccGroupService } from '../../services/accgroupm.service';
import { iAccGroupm } from '../../models/iaccgroupm';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

@Component({
  selector: 'app-accgroup-edit',
  templateUrl: './accgroup-edit.component.html',
  styleUrls: ['./accgroup-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class AccGroupEditComponent extends baseEditComponent {

  dataList = [
    { key: 'DIRECT INCOME', value: 'DIRECT INCOME' },
    { key: 'DIRECT EXPENSE', value: 'DIRECT EXPENSE' },
    { key: 'INDIRECT INCOME', value: 'INDIRECT INCOME' },
    { key: 'INDIRECT EXPENSE', value: 'INDIRECT EXPENSE' },
    { key: 'ASSET', value: 'ASSET' },
    { key: 'LIABILITIES', value: 'LIABILITIES' },
  ]

  constructor(
    private ms: AccGroupService
  ) {
    super();
    this.mform = this.fb.group({
      grp_id: [0],
      grp_name: ['', [Validators.required, Validators.maxLength(100)]],
      grp_main_group: ['', [Validators.required, Validators.maxLength(20)]],
      grp_order: [0, [Validators.required]],
      rowversion: [''],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0)
      return;
    const param = { 'id': this.id };
    this.ms.getRecord(param).subscribe({
      next: (rec: iAccGroupm) => {
        this.mform.setValue({
          grp_id: rec.grp_id,
          grp_name: rec.grp_name,
          grp_main_group: rec.grp_main_group,
          grp_order: rec.grp_order,
          rowversion: rec.rowversion,
        })
      },
      error: (e) => {
        this.gs.showAlert([e.message]);
      },
      complete: () => { }
    })
  }


  save() {

    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iAccGroupm>this.mform.value;

    if (data.grp_id == null)
      data.grp_id = 0;

    let bAdd = data.grp_id == 0 ? true : false;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.grp_id,
      'mode': bAdd ? "add" : "edit"
    }
    this.ms.save(param, data).subscribe({
      next: (v: iAccGroupm) => {
        if (data.grp_id == 0) {
          this.id = v.grp_id;
          data.grp_id = this.id;
          this.mform.patchValue({ grp_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rowversion: v.rowversion
        });
        this.ms.UpdateList(v, bAdd);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

}

