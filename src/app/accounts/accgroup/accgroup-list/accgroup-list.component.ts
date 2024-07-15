import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { AccGroupService } from '../../services/accgroupm.service';
import { AccGroupSearchComponent } from '../accgroup-search/accgroup-search.component';
import { baseComponent } from '../../../shared/baseComponent';

@Component({
  selector: 'app-accgroup-list',
  templateUrl: './accgroup-list.component.html',
  styleUrls: ['./accgroup-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AccGroupSearchComponent]
})
export class AccGroupListComponent extends baseComponent {

  constructor(public ms: AccGroupService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/accounts/accgroupEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "grp_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "grp_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "grp_main_group", col_caption: "GROUP", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "grp_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
