import { Component, Inject } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { FileUploadmService } from '../services/fileuploadm.service';
import { iFileUploadm } from '../../models/ifileuploadm';

@Component({
  selector: 'app-fileuploadm-edit',
  templateUrl: './fileuploadm-edit.component.html',
  styleUrls: ['./fileuploadm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 06/05/2025
//Command : Create the File Upload Components.
//version : 1.0


export class FileUploadmEditComponent extends baseEditComponent {
  parent_id: number = 0;
  parent_type: string = '';
  selectedFiles: File[] = [];


  constructor(
    private ms: FileUploadmService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FileUploadmEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.showModel = false;
    this.mform = this.fb.group({
      files_id: [0],
      files_parent_id: [0],
      files_ref_no: [''],
      files_parent_type: [''],
      files_slno: [0],
      files_type: [''],
      // files_desc: [''],
      files_path: [''],
      fileupload: this.fb.array([]),
      rec_version: [0],
    })
  }


  ngOnInit() {
    this.id = 0;
    console.log(this.data);
    this.parent_id = 0;
    this.parent_type = "";
    this.init();
    this.parent_id = this.data.id;
    this.parent_type = this.data.parent_type;
    this.mode = this.data.mode;
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
      files_id: this.id,
      files_parent_id: this.parent_id,
      files_parent_type: this.parent_type,
    })
    this.getDefaultData();
    this.getDetails();
  }


  getDetails() {
    const param = { 'id': this.parent_id, 'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/UserAdmin/FileUpload/GetDetailsAsync').subscribe({
      next: (rec: iFileUploadm[]) => {
        this.fillDetails(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }


  getRecord() {
    const param = { 'id': this.id, 'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/UserAdmin/FileUpload/GetRecordAsync').subscribe({
      next: (rec: iFileUploadm) => {
        this.mform.patchValue({
          files_id: rec.files_id,
          files_parent_id: rec.files_parent_id,
          files_parent_type: rec.files_parent_type,
          files_slno: rec.files_slno,
          files_type: rec.files_type,
          // files_desc: rec.files_desc,
          files_ref_no: rec.files_ref_no,
          files_path: rec.files_path,

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
    this.ms.getRecord(param, '/api/UserAdmin/FileUpload/GetDefaultDataAsync').subscribe({
      next: (rec: iFileUploadm) => {
        this.mform.patchValue({
          files_parent_id: rec.files_parent_id,
          files_parent_type: rec.files_parent_type,
          files_ref_no: rec.files_ref_no,

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

  addRow(rec: iFileUploadm) {
    return this.fb.group({
      files_id: [rec.files_id || 0],
      files_parent_id: [rec?.files_parent_id || 0],
      files_parent_type: [rec?.files_parent_type || ""],
      files_type: [rec?.files_type || ""],
      files_slno: [rec?.files_slno || 0],
      // files_desc: [rec?.files_desc || ""],
      files_ref_no: [rec?.files_ref_no || ""],
      files_path: [rec?.files_path || ""],

      rec_created_by: [rec?.rec_created_by || ""],
      rec_created_date: [rec?.rec_created_date || ""],
      rec_edited_by: [rec?.rec_edited_by || ""],
      rec_edited_date: [rec?.rec_edited_date || ""],

    })
  }

  addDetails(iRow: iFileUploadm = <iFileUploadm>{}) {
    this.formArray('fileupload')?.push(this.addRow(iRow));
  }

  fillDetails(ifollow: iFileUploadm[] = []): void {
    const follow = this.formArray('fileupload');
    follow.clear();
    ifollow.forEach((rec_follow: iFileUploadm) => {
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
    this.ms.getRecord(param, '/api/UserAdmin/FileUpload/GetRecordAsync').subscribe({
      next: (rec: iFileUploadm) => {
        this.mform.patchValue({
          files_id: rec.files_id,
          files_parent_id: rec.files_parent_id,
          files_parent_type: rec.files_parent_type,
          files_slno: rec.files_slno,
          files_type: rec.files_type,
          // files_desc: rec.files_desc,
          files_ref_no: rec.files_ref_no,
          files_path: rec.files_path,

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
      const param = { id: cf_id, url: '/api/UserAdmin/FileUpload/DeleteAsync' };
      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('fileupload').removeAt(idx);
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

    const data = <iFileUploadm>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.files_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/UserAdmin/FileUpload/SaveAsync').subscribe({
      next: (v: iFileUploadm) => {
        if (this.mode == "add") {
          this.id = v.files_id;
          // this.mode = "edit";
          this.mform.patchValue({ cf_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          files_id: v.files_id,
          files_parent_id: v.files_parent_id,
          files_ref_no: v.files_ref_no,
          rec_version: v.rec_version
        });
        console.log(data);
        this.uploadFiles(v.files_id, v);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
        this.newRecord();
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  uploadFiles(id: number, rec: any) {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.gs.showAlert(['No files selected']);
      return;
    }
  
    const formData = new FormData();
  
    // Append files
    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }
  
    // Append scalar id
    formData.append('id', id.toString());
  
    // Flatten and append DTO fields
    for (const key in rec) {
      if (rec[key] != null) {
        formData.append(key, rec[key]);
      }
    }
  
    // Call service
    this.ms.uploadFiles(formData, '/api/UserAdmin/FileUpload/UploadFiles').subscribe({
      next: (res) => {
        this.gs.showAlert(['Files uploaded successfully']);
        console.log('Upload response:', res);
      },
      error: (err) => {
        this.gs.showAlert(['File upload failed']);
        console.error('Upload error:', err);
      }
    });
    this.getDetails();
  }
  

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      console.log('Selected files:', this.selectedFiles);
    }
  }


  // openHistory(): void {
  //   const dialogRef = this.dialog.open(HistoryComponent, {
  //     hasBackdrop: false,
  //     width: '250px',
  //     data: { title: 'History', message: 'Edit Details' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}

