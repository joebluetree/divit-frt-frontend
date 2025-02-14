import { Component, Inject, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../base-class/baseListComponent';
import { HistorymSearchComponent } from '../history-search/historym-search.component';
import { HistorymService } from '../services/historym.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-historym-list',
  templateUrl: './historym-list.component.html',
  styleUrls: ['./historym-list.component.css'],
  standalone: true,
  imports: [...CustomControls, HistorymSearchComponent]
})
export class HistorymListComponent extends baseListComponent {

  @ViewChild(HistorymSearchComponent) childComponent!: HistorymSearchComponent;

  constructor(
    public ms: HistorymService,
    public dialogRef: MatDialogRef<HistorymListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "log_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "log_date", col_caption: "DATE", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_user_code", col_caption: "USER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_table", col_caption: "TABLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_column", col_caption: "COLUMN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "log_refno", col_caption: "REFNO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_table_row_id", col_caption: "ROW_ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "log_status", col_caption: "STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_desc", col_caption: "DESCRIPTION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_old_value", col_caption: "OLD VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "log_new_value", col_caption: "NEW VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_version", col_caption: "VERSION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];
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

