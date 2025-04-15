import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { MemoService } from '../../services/memo.service';
import { MemoSearchComponent } from '../memo-search/memo-search.component';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css'],
  standalone: true,
  imports: [...CustomControls, MemoSearchComponent],
})

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component display relevant details of each sea export master records
//version : v1 - 29-03-2025

export class MemoListComponent extends baseListComponent {

  constructor(public ms: MemoService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/memo/memoEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "memo_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "memo_remarks_name", col_caption: "Remarks", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "memo_date", col_caption: "Date", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
