import { Component } from '@angular/core';
import { RightsSearchComponent } from '../rights-search/rights-search.component';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { RightsService } from '../../services/rights.service';

@Component({
  selector: 'app-rights-list',
  templateUrl: './rights-list.component.html',
  styleUrls: ['./rights-list.component.css'],
  standalone: true,
  imports: [...CustomControls, RightsSearchComponent]
})
export class RightsListComponent extends baseListComponent {

  constructor(public ms: RightsService) {
    super(ms);
  }


  ngOnInit(): void {

    this.init();

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/admin/rightsEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "ub_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "ub_user_name", col_caption: "USER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_branch_name", col_caption: "BRANCH", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];


  }

}
