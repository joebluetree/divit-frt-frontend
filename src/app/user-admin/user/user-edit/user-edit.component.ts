import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { iUserm, iUserModel } from '../../models/iuserm';
import { iBranchm } from '../../models/ibranchm';
import { iUserBranches } from '../../models/iuserbranches';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/baseEditComponent';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class UserEditComponent extends baseEditComponent {

  constructor(
    private ms: UserService,
  ) {
    super();
    this.mform = this.fb.group({
      user_id: [0],
      user_code: ['', [Validators.required, Validators.maxLength(20)]],
      user_name: ['', [Validators.required, Validators.maxLength(60)]],
      user_password: ['', [Validators.required, Validators.maxLength(20)]],
      user_email: ['', [Validators.required, Validators.maxLength(60)]],
      user_is_admin: ['N'],
      rec_branch_id: [0, [Validators.required]],
      rec_branch_name: ['', [Validators.required]],
      rowversion: [''],
      userbranches: this.fb.array([]),
    })
  }

  addRow(rec: iUserBranches) {
    return this.fb.group({
      ub_id: [rec ? rec.ub_id : 0],
      ub_user_id: [rec ? rec.ub_user_id : 0],
      rec_branch_id: [rec ? rec.rec_branch_id : 0],
      rec_branch_name: [{ value: rec ? rec.rec_branch_name : '', disabled: true }],
      ub_selected: [rec ? rec.ub_selected : 'N'],
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
    const param = {
      'comp_id': this.gs.user.user_company_id,
      'id': this.id
    }

    this.ms.getRecord(param).subscribe({
      next: (rec: iUserm) => {
        this.mform.patchValue({
          user_id: rec.user_id,
          user_code: rec.user_code,
          user_name: rec.user_name,
          user_password: rec.user_password,
          user_email: rec.user_email,
          rowversion: rec.rowversion,
          user_is_admin: rec.user_is_admin,
          rec_branch_id: rec.rec_branch_id,
          rec_branch_name: rec.rec_branch_name,
        });
        rec.userbranches.forEach((rec: any) => {
          this.formArray('userbranches').push(this.addRow(rec))
        });
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
    const data = <iUserm>this.mform.value;

    if (data.user_id == null)
      data.user_id = 0;

    let bAdd = data.user_id == 0 ? true : false;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': this.id,
      'mode': bAdd ? "add" : "edit"
    }
    this.ms.save(param, data).subscribe({
      next: (v: iUserm) => {
        if (data.user_id == 0) {
          this.id = v.user_id;
          data.user_id = this.id;
          this.mform.patchValue({
            user_id: this.id,
          });
          this.formArray('userbranches').clear();
          v.userbranches.forEach(rec => {
            this.formArray('userbranches').push(this.addRow(rec))
          });
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
      }
    })
  }

  callBack(action: { id: string, rec: iBranchm }) {
    if (action.id == 'rec_branch_name') {
      this.mform.patchValue({
        rec_branch_id: action.rec ? action.rec.branch_id : 0,
        rec_branch_name: action.rec ? action.rec.branch_name : '',
      })
    }
  }

}
