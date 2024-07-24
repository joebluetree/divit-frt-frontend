import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { iBranchm } from '../../models/ibranchm';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class BranchEditComponent extends baseEditComponent {

  constructor(
    private ms: BranchService
  ) {
    super();
    this.mform = this.fb.group({
      branch_id: [0],
      branch_code: ['', [Validators.required, Validators.maxLength(20)]],
      branch_name: ['', [Validators.required, Validators.maxLength(100)]],
      branch_address1: ['', [Validators.required, Validators.maxLength(100)]],
      branch_address2: ['', [Validators.required, Validators.maxLength(100)]],
      branch_address3: ['', [Validators.required, Validators.maxLength(100)]],
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
      next: (rec: iBranchm) => {
        this.mform.setValue({
          branch_id: rec.branch_id,
          branch_code: rec.branch_code,
          branch_name: rec.branch_name,
          branch_address1: rec.branch_address1,
          branch_address2: rec.branch_address2,
          branch_address3: rec.branch_address3,
          rowversion: rec.rowversion,
        })
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iBranchm>this.mform.value;

    if (data.branch_id == null)
      data.branch_id = 0;

    let bAdd = data.branch_id == 0 ? true : false;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.branch_id,
      'mode': bAdd ? "add" : "edit"
    }
    this.ms.save(param, data).subscribe({
      next: (v: iBranchm) => {
        if (data.branch_id == 0) {
          this.id = v.branch_id;
          data.branch_id = this.id;
          this.mform.patchValue({ branch_id: this.id });
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

