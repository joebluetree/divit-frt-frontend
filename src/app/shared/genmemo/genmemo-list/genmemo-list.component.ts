import { Component, Inject, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../base-class/baseListComponent';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenMemoSearchComponent } from '../genmemo-search/genmemo-search.component';
import { GenMemoService } from '../services/genmemo.service';

@Component({
  selector: 'app-genmemo-list',
  templateUrl: './genmemo-list.component.html',
  styleUrls: ['./genmemo-list.component.css'],
  standalone: true,
  imports: [...CustomControls, GenMemoSearchComponent]
})
export class GenMemoListComponent extends baseListComponent {

  constructor(public ms: GenMemoService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "remk_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "remk_parent_id", col_caption: "USER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "remk_parent_type", col_caption: "TABLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "remk_slno", col_caption: "COLUMN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
    ];
  }

}

