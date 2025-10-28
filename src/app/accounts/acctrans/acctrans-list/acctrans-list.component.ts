import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { AccTransSearchComponent } from '../acctrans-search/acctrans-search.component';
import { AccTransService } from '../../services/acctrans.service';


@Component({
  selector: 'app-acctrans-list',
  templateUrl: './acctrans-list.component.html',
  styleUrls: ['./acctrans-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AccTransSearchComponent],
})
//Name : Sourav V
//Created Date : 22/09/2025
//Remark : this component display relevant details of each acctrans records
//version : v1 - 22/09/2025
export class acctransListComponent extends baseListComponent {

  constructor(public ms: AccTransService) {
    super(ms);
  }
  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid};

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/accounts/acctransEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "jvh_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "jvh_header_id", col_caption: "HEADER ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "jvh_docno", col_caption: "DOCNO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jvh_date", col_caption: "DATE ", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jvh_balance", col_caption: "BALANCE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jvh_debit", col_caption: "DEBIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jvh_credit", col_caption: "CREDIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }
}
