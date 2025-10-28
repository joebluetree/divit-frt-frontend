import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { baseEditComponent } from '../../base-class/baseEditComponent';
import { CustomControls } from '../../../app.config';
import { GenRemarkmEditComponent } from '../../genremarkm/genremarkm-edit/genremarkm-edit.component';
import { iGenMemo } from '../../models/igenmemo';
import { GenMemoService } from '../../services/genmemo.service';

@Component({
  selector: 'app-genmemo-edit',
  templateUrl: './genmemo-edit.component.html',
  styleUrls: ['./genmemo-edit.component.css'],
  standalone: true,
  imports: [...CustomControls, GenRemarkmEditComponent]
})

//Name : Sourav V
//Date : 08/06/2025
//Command : Create the General Memo Component Components.
//version 1.0

export class GenMemoEditComponent extends baseEditComponent {
  @ViewChild(GenRemarkmEditComponent) fs!: GenRemarkmEditComponent;

  constructor(
    public ms: GenMemoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenMemoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    this.showModel = false;
    this.mform = this.fb.group({}); // Placeholder, as form is handled by child
  }

  ngOnInit() {
    this.getRecord();
  }

  getRecord() {
    const param = {'id': this.data.id,'parent_type': this.data.parent_type};
    this.ms.getRecord(param, '/api/UserAdmin/genremark/GetDetailsAsync').subscribe({
      next: (res: iGenMemo[]) => {
        this.fs.fillRemarkDetails(res);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    });
  }

  save() {
    const formArray = this.fs?.getRemarksArray();
    if (!formArray || formArray.invalid) {
      alert("Remarks form is invalid.");
      return;
    }

    // const remarks: iGenMemo[] = formArray.getRawValue();
    const data = <iGenMemo>this.mform.value;
    data.remk_remarks = this.fs.getRemarksArray().value; // to get remark details

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;
    
    const param = {
      'id': this.data.id,
      'mode': this.mode,
      'parent_type':this.data.parent_type,
    };

    this.ms.save(param, data, '/api/UserAdmin/genremark/SaveAsync').subscribe({
      next: (v: iGenMemo) => {
      
      this.mform.patchValue(v);
      if (v.remk_remarks) {
        this.fs.fillRemarkDetails(v.remk_remarks);
      }
        this.gs.showAlert(['Save Complete']);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    });
  }

  getTitle(): string {
    return this.gs.getUserRights(this.data.menuid)?.menu_name ?? ''
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}