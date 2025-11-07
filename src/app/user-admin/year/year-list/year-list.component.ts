import { Component } from '@angular/core';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { YearService} from '../../services/year.service';
import { CustomControls } from '../../../app.config';
import { YearSearchComponent } from '../year-search/year-search.component';

@Component({
  selector: 'app-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.css'],
  standalone: true,
  imports: [...CustomControls, YearSearchComponent]
})

//Name : Sourav V
//Created Date : 29/10/2025
//Remark : this component display relevant details of each year Master records
//version : v1 - 29/10/2025

export class YearListComponent extends baseListComponent {

  constructor(public ms: YearService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/admin/yearEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "year_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel},
      { col_name: "year_code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "year_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "year_start_date", col_caption: "START-DT", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "year_end_date", col_caption: "END-DT", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "year_closed", col_caption: "CLOSED", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "year_default", col_caption: "DEFAULT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];



  }


}
