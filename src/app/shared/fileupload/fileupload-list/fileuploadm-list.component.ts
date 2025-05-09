import { Component, Inject, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../base-class/baseListComponent';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadmSearchComponent } from '../fileupload-search/fileuploadm-search.component';
import { FileUploadmService } from '../services/fileuploadm.service';

@Component({
  selector: 'app-fileuploadm-list',
  templateUrl: './fileuploadm-list.component.html',
  styleUrls: ['./fileuploadm-list.component.css'],
  standalone: true,
  imports: [...CustomControls, FileUploadmSearchComponent]
})
export class FileUploadmListComponent extends baseListComponent {

  @ViewChild(FileUploadmSearchComponent) childComponent!: FileUploadmSearchComponent;

  constructor(
    public ms: FileUploadmService,
    public dialogRef: MatDialogRef<FileUploadmListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "files_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "files_parent_id", col_caption: "USER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_parent_type", col_caption: "TABLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_slno", col_caption: "COLUMN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "files_type", col_caption: "REFNO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_desc", col_caption: "ROW_ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "files_ref_no", col_caption: "STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_path", col_caption: "DESCRIPTION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_sub_id", col_caption: "OLD VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_size", col_caption: "NEW VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_version", col_caption: "VERSION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "files_processed", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];
  }

  protected override init(): void {

    this.route.queryParams.forEach((rec: any) => {
      this.url_param = { ...rec };
      this.appid = rec["appid"];
      this.menuid = "HISTORY-DATA";
      this.type = "HISTORY-DATA";
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

    this._ms.init(this.menuid, this.type);

    if (!this.gs.IsValidAppId(this.appid))
      return;

  }


  ngAfterViewInit(): void {
    this.childComponent.customSearch(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}

