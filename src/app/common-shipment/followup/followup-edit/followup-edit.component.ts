import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { FollowUpService } from '../../services/followup.service';
import { iFollowUp } from '../../models/ifollowup';

@Component({
  selector: 'app-followup-edit',
  templateUrl: './followup-edit.component.html',
  styleUrls: ['./followup-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 09/04/2025
//Command : Create the Follow Up Components.
//version : 1.0


export class FollowUpEditComponent extends baseEditComponent {
  parent_id: number = 0;
  parent_type: string = '';

  constructor(
    private ms: FollowUpService,
    public dialog: MatDialog
  ) {
    super();
    this.showModel = false;
    let user = this.gs.globalConstants.global_user_id;
    let name = this.gs.getUserName();
    this.mform = this.fb.group({
      cf_id: [0],
      cf_mbl_id: [0],
      cf_mbl_refno: [''],
      cf_mode: [''],
      cf_mbl_ref_date: [''],
      cf_user_id: [user],
      cf_user_name: [name],

      cf_notes_id: [''],
      cf_remarks: [''],
      cf_followup_date: [''],
      cf_assigned_id: [0],
      cf_assigned_name: [''],
      cf_handled_id: [0],
      cf_handled_name: [''],
      followup: this.fb.array([]),
      rec_version: [0],
    })
  }


  ngOnInit() {
    this.id = 0;
    this.parent_id = 0;
    this.parent_type = "";
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"];
      this.parent_type = rec["parent_type"];
    });
    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
    this.getDetails();
  }

  async newRecord() {
    this.mform.reset();
    this.id = 0;
    this.mode = "add";
    this.gs.updateURL({
      id: this.id,
      mode: this.mode
    });
    this.mform.patchValue({
      cf_id: this.id,
      cf_mbl_id: this.parent_id,
      cf_mode: this.parent_type,
      cf_user_id: this.gs.globalConstants.global_user_id,
      cf_user_name: this.gs.getUserName(),
      cf_followup_date: this.gs.getToday(),
    })
    this.getDefaultData();
    this.getDetails();
  }


  getDetails() {
    const param = { 'id': this.parent_id, 'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/CommonShipment/FollowUp/GetDetailsAsync').subscribe({
      next: (rec: iFollowUp[]) => {
        this.fillDetails(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }


  getRecord() {
    const param = { 'id': this.id, 'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/CommonShipment/FollowUp/GetRecordAsync').subscribe({
      next: (rec: iFollowUp) => {
        this.mform.patchValue({
          cf_id: rec.cf_id,
          cf_mbl_id: rec.cf_mbl_id,
          cf_mbl_refno: rec.cf_mbl_refno,
          cf_mode: rec.cf_mode,
          cf_mbl_ref_date: rec.cf_mbl_ref_date,
          cf_user_id: rec.cf_user_id,
          cf_user_name: rec.cf_user_name,
          cf_handled_id: rec.cf_handled_id,
          cf_handled_name: rec.cf_handled_name,

          cf_remarks: rec.cf_remarks,
          cf_followed_date: rec.cf_followup_date,
          cf_assigned_id: rec.cf_assigned_id,
          cf_assigned_name: rec.cf_assigned_name,
          rec_version: rec.rec_version,
        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  getDefaultData() {
    const param = { 'id': this.parent_id };
    this.ms.getRecord(param, '/api/CommonShipment/FollowUp/GetDefaultDataAsync').subscribe({
      next: (rec: iFollowUp) => {
        this.mform.patchValue({
          cf_mbl_id: rec.cf_mbl_id,
          cf_mbl_refno: rec.cf_mbl_refno,
          cf_mode: rec.cf_mode,
          cf_handled_id: rec.cf_handled_id,
          cf_handled_name: rec.cf_handled_name,
          cf_mbl_ref_date: rec.cf_mbl_ref_date,
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

  addRow(rec: iFollowUp) {
    return this.fb.group({
      cf_id: [rec?.cf_id || 0],
      cf_mbl_id: [rec?.cf_mbl_id || 0],
      cf_remarks: [rec?.cf_remarks || ""],
      cf_followup_date: [rec?.cf_followup_date || ""],
      cf_assigned_id: [rec?.cf_assigned_id || 0],
      cf_assigned_name: [rec?.cf_assigned_name || ""],
      cf_handled_id: [rec?.cf_handled_id || 0],
      cf_handled_name: [rec?.cf_handled_name || ""],
      rec_created_by: [rec?.rec_created_by || ""],
      rec_created_date: [rec?.rec_created_date || ""],
      rec_edited_by: [rec?.rec_edited_by || ""],
      rec_edited_date: [rec?.rec_edited_date || ""],

    })
  }

  addDetails(iRow: iFollowUp = <iFollowUp>{}) {
    this.formArray('followup')?.push(this.addRow(iRow));
  }

  fillDetails(ifollow: iFollowUp[] = []): void {
    const follow = this.formArray('followup');
    follow.clear();
    ifollow.forEach((rec_follow: iFollowUp) => {
      this.addDetails(rec_follow);
    });
  }

  editdetails(idx: number) {
    const param = { 'id': idx, 'parent_type': this.parent_type };
    this.mode = "edit";
    this.gs.updateURL({
      id: idx,
      mode: this.mode
    });
    this.ms.getRecord(param, '/api/CommonShipment/FollowUp/GetRecordAsync').subscribe({
      next: (rec: iFollowUp) => {
        this.mform.patchValue({
          cf_id: rec.cf_id,
          cf_mbl_id: rec.cf_mbl_id,
          cf_mbl_refno: rec.cf_mbl_refno,
          vf_mode: rec.cf_mode,
          cf_mbl_ref_date: rec.cf_mbl_ref_date,
          cf_followup_date: rec.cf_followup_date,
          cf_user_id: rec.cf_user_id,
          cf_user_name: rec.cf_user_name,
          cf_handled_id: rec.cf_handled_id,
          cf_handled_name: rec.cf_handled_name,

          cf_remarks: rec.cf_remarks,
          cf_assigned_id: rec.cf_assigned_id,
          cf_assigned_name: rec.cf_assigned_name,
          rec_version: rec.rec_version,
        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }


  deleteRow(idx: number, follow: string, cf_id: number) {
    if (!cf_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${follow} ?`)) {
      const param = { id: cf_id, url: '/api/CommonShipment/FollowUp/DeleteAsync' };
      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('followup').removeAt(idx);
          }
        },
        error: (e) => {
          this.gs.showError(e);
        }
      });
    }
  }



  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iFollowUp>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.cf_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/CommonShipment/FollowUp/SaveAsync').subscribe({
      next: (v: iFollowUp) => {
        if (this.mode == "add") {
          this.id = v.cf_id;
          this.mode = "edit";
          this.mform.patchValue({ cf_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          cf_id: v.cf_id,
          cf_mbl_id: v.cf_mbl_id,
          cf_mbl_refno: v.cf_mbl_refno,
          rec_version: v.rec_version
        });
        console.log(data);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
        this.newRecord();
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  callBack(action: any) {
    console.log(action);
    let rec: any = {};
    if (action?.rec != null) {
      rec = action.rec;
    }
    if (action.id === 'cf_notes_id') {
      console.log(action);
      this.mform.patchValue({
        cf_notes_id: rec.param_code || "",
        cf_remarks: rec.param_name || "",
      });
    }

    if (action.id === 'cf_assigned_id') {
      console.log(action);
      this.mform.patchValue({
        cf_assigned_id: rec.user_id || 0,
        cf_assigned_name: rec.user_name || "",
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

