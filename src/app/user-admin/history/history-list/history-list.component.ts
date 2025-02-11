import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { HistorySearchComponent } from '../history-search/history-search.component';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
  standalone: true,
  imports: [...CustomControls, HistorySearchComponent]
})
export class HistoryListComponent extends baseListComponent {
  constructor(
    public ms: HistoryService,

  ) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "VIEW", col_format: "edit", col_sortable: false, col_link: '/admin/historyEdit', col_param: param, col_show: this.bEdit || this.bView },
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
}




