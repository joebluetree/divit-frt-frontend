import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { iFileUploadm } from '../../models/ifileuploadm';
import { HistoryComponent } from '../../history/history.component';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { baseListComponent } from '../../base-class/baseListComponent';
import { FileUploadmService } from '../../services/fileuploadm.service';

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
  @ViewChild('fileInput') fileInput!: ElementRef;
  parent_id: number = 0;
  parent_type: string = '';
  selectedFiles: File[] = [];
  // showDeletedOnly: string = '';
  showDeletedOnly: boolean = false;
  state: any;
  dataList = [];
  OperationsTypes: string[] = ['AIR IMPORT', 'AIR EXPORT', 'SEA IMPORT', 'SEA EXPORT', 'OTHERS'];

  constructor(
    public ms: FileUploadmService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FileUploadmEditComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    this.showModel = false;
    this.mform = this.fb.group({
      files_id: [0],
      files_parent_id: [0],
      files_ref_no: [''],
      files_parent_type: [''],
      files_slno: [0],
      // files_type_id: [0],
      files_type: [''],
      files_desc: [''],
      files_path: [''],
      files_size: [''],
      files_status: [''],
      files_search: [''],
      is_deleted: [false],
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
    this.getDataList();
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
    this.resetFileInput();
    this.getDefaultData();
    this.getDetails();
  }

  onDeletedToggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const newStatus = checked ? 'D' : 'N';

    this.mform.get('files_status')?.setValue(newStatus);
    this.showDeletedOnly = checked;
  }



  getDataList() {
    const param = {
      data: 'DOC-TYPE'  // only subtable is passed
    };

    this.ms.getRecord(param, '/api/UserAdmin/FileUpload/GetDataListAsync').subscribe({
      next: (res: any) => {
        if (res?.files_type) {
          this.dataList = res.files_type;  // bind to combobox
        }
      },
      error: (e) => {
        this.gs.showError(e);
      }
    });
  }


  getDetails() {
    const filesStatus = this.mform.get('files_status')?.value || '';
    const param: any = {
      id: this.parent_id,
      parent_type: this.parent_type,
      files_search: this.mform.get("files_search")?.value,
    };

    //Send files_status param only if checkbox is checked
    if (filesStatus === 'D') {
      param.files_status = filesStatus;
    }

    this.ms.getRecord(param, '/api/UserAdmin/FileUpload/GetDetailsAsync').subscribe({
      next: (rec: iFileUploadm[]) => {
        this.fillDetails(rec);

        const searchValue = param.files_search;
        this.mform.patchValue({ files_search: searchValue });

        this.mform.get('files_status')?.setValue(filesStatus);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    });
    this.resetFileInput();
    this.getDefaultData();
    this.mode = "add";
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
          files_type_id: rec.files_type_id,
          files_type: rec.files_type,
          files_desc: rec.files_desc,
          files_ref_no: rec.files_ref_no,
          files_path: rec.files_path,
          files_size: rec.files_size,
          files_status: rec.files_status,

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
    const param = { 'id': this.parent_id, 'parent_type': this.parent_type };
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
      files_type_id: [rec?.files_type_id || 0],
      files_type: [rec?.files_type || ""],
      files_slno: [rec?.files_slno || 0],
      files_desc: [rec?.files_desc || ""],
      files_ref_no: [rec?.files_ref_no || ""],
      files_path: [rec?.files_path || ""],
      files_size: [rec?.files_size || ""],

      files_status: [rec?.files_status || ""],
      rec_deleted_by: [rec?.rec_deleted_by || ""],
      rec_deleted_date: [rec?.rec_deleted_date || ""],

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
          files_type_id: rec.files_type_id,
          files_type: rec.files_type,
          files_desc: rec.files_desc,
          files_ref_no: rec.files_ref_no,
          files_path: rec.files_path,
          files_size: rec.files_size,

          rec_version: rec.rec_version,
        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  downloadFile(files_id: number, files_desc: string) {
    const requestData = {
      'files_id': files_id.toString(),
    };
    // this.gs.downloadViaPost(url,requestData,`${files_desc}`)
    this.http.post(this.gs.getUrl(`/api/UserAdmin/FileUpload/DownloadFiles`), requestData, {
      responseType: 'blob',
      observe: 'response'
    }).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.gs.downloadFile(response, `${files_desc}`);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    });

  }


  deleteRow(idx: number, follow: string, files_id: number) {
    if (!files_id) {
      alert("Invalid Record ID");
      return;
    }

    const data = <iFileUploadm>this.mform.value;
    data.files_id = files_id;
    data.files_status = "D";
    data.rec_deleted_by = this.gs.user.user_code;

    if (window.confirm(`Are you sure you want to delete ${follow} ?`)) {
      const param = { id: files_id };
      this.ms.save(param, data, '/api/UserAdmin/FileUpload/DeleteDetailsAsync')?.subscribe({
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

    if (this.selectedFiles.length === 0 && this.mode === "add") {
      this.gs.showAlert(['No files selected']);
      return;
    }

    const data = <iFileUploadm>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;
    data.files_parent_type = this.parent_type;

    console.log(data);

    const param = {
      'id': data.files_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/UserAdmin/FileUpload/SaveAsync').subscribe({
      next: (v: iFileUploadm) => {
        if (this.mode == "add") {
          this.id = v.files_id;
          this.mode = "edit";
          this.mform.patchValue({ files_id: this.id });
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
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
        this.newRecord();
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      this.gs.showAlert(['No files selected']);
      return;
    }

    if (this.mform.invalid) {
      alert('Invalid Form');
      return;
    }

    const data = <iFileUploadm>this.mform.value;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    const id = data.files_id || 0;
    const rec = data as any;

    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }

    formData.append('id', id.toString());
    for (const key in rec) {
      if (rec[key] != null) {
        formData.append(key, rec[key]);
      }
    }

    this.ms.uploadFiles(formData, '/api/UserAdmin/FileUpload/UploadFiles').subscribe({
      next: (res: any) => {
        console.log('Upload response:', res);
        // this.getDetails();
        this.newRecord();
        this.gs.showAlert(['Files uploaded successfully']);
      },
      error: (err) => {
        this.gs.showAlert([err.error]);
        console.error('Upload error:', err);
      }
    });
  }

  handleSubmit() {
    if (this.mode === 'edit') {
      this.save();
    } else {
      this.uploadFiles();
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      console.log('Selected files:', this.selectedFiles);
    }
  }

  resetFileInput() {
    this.selectedFiles = [];
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  callBack(action: any) {
    if (action.id == 'files_type') {
      console.log(action);
      let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        files_type_id: rec.param_id || 0,
        files_type: rec.param_name || "",
      });
    }
  }

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