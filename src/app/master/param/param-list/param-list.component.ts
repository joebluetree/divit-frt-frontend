import { Location, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { iParam, iParam_Search } from '../../models/iparam';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ParamSearchComponent } from '../param-search/param-search.component';
import { CustomControls } from '../../../app.config';
import { iMenum } from '../../../core/models/imenum';
import { GlobalService } from '../../../core/services/global.service';
import { ParamService } from '../../services/param.service';
import { baseComponent } from '../../../shared/baseComponent';

@Component({
  selector: 'app-param-list',
  templateUrl: './param-list.component.html',
  styleUrls: ['./param-list.component.css'],
  standalone: true,
  imports: [...CustomControls, ParamSearchComponent]
})
export class ParamListComponent extends baseComponent {

  constructor(public ms: ParamService) {
    super(ms);
  }
  ngOnInit(): void {

    this.init();

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "VIEW/EDIT", col_format: "edit", col_sortable: false, col_link: '/masters/paramEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "param_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];

  }




}



