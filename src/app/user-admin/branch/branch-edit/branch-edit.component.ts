import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { iBranchm } from '../../models/ibranchm';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { iMenum } from '../../models/imenum';
import { CustomControls } from '../../../app.config';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class BranchEditComponent {
  id = 0;
  appid = '';
  menuid = '';
  title = '';
  type = '';

  bAdmin = false;
  bAdd = false;
  bEdit = false;
  bView = false;
  bDelete = false;
  menum: iMenum | null;

  showModel = true;
  mform: FormGroup;

  constructor(
    private gs: GlobalService,
    private service: BranchService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.mform = this.fb.group({
      branch_id: [0],
      branch_code: ['', [Validators.required, Validators.maxLength(20)]],
      branch_name: ['', [Validators.required, Validators.maxLength(100)]],
      branch_address1: ['', [Validators.required, Validators.maxLength(100)]],
      branch_address2: ['', [Validators.required, Validators.maxLength(100)]],
      branch_address3: ['', [Validators.required, Validators.maxLength(100)]],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.route.queryParams.forEach(rec => {
      this.appid = rec["appid"];
      this.id = +rec["id"];
      this.menuid = rec["menuid"];
      this.type = rec["type"];
      this.menum = this.gs.getUserRights(this.menuid);
      if (this.menum) {
        this.title = this.menum.menu_name;
        this.bAdmin = this.menum.rights_admin == "Y" ? true : false;
        this.bAdd = this.menum.rights_add == "Y" ? true : false;
        this.bEdit = this.menum.rights_edit == "Y" ? true : false;
        this.bView = this.menum.rights_view == "Y" ? true : false;
        this.bDelete = this.menum.rights_delete == "Y" ? true : false;
      }
    })

    if (!this.gs.IsValidAppId(this.appid))
      return;


    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0)
      return;
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        this.mform.setValue({
          branch_id: rec.branch_id,
          branch_code: rec.branch_code,
          branch_name: rec.branch_name,
          branch_address1: rec.branch_address1,
          branch_address2: rec.branch_address2,
          branch_address3: rec.branch_address3,

        })
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }

  getControl(ctrlName: string) {
    return this.mform.controls[ctrlName];
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iBranchm>this.mform.value;

    if (data.branch_id == null)
      data.branch_id = 0;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
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


        this.gs.showAlert(["Save Complete"]);

      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }

    })
  }

  return2Parent() {
    this.location.back();
  }

}

