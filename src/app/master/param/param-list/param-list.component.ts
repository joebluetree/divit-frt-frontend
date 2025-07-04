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
import { baseListComponent } from '../../../shared/base-class/baseListComponent';

@Component({
  selector: 'app-param-list',
  templateUrl: './param-list.component.html',
  styleUrls: ['./param-list.component.css'],
  standalone: true,
  imports: [...CustomControls, ParamSearchComponent]
})
export class ParamListComponent extends baseListComponent {

  value1 = "";
  value2 = "";
  value3 = "";
  value4 = "";
  value5 = "";


  constructor(public ms: ParamService) {
    super(ms);
  }
  ngOnInit(): void {



    this.init();

    if (this.type == "SEA CARRIER") {
      this.value1 = "SCAC CODE";
    }
 

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "VIEW/EDIT", col_format: "edit", col_sortable: false, col_link: '/masters/paramEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "param_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "param_value1", col_caption: this.value1, col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.value1 != "" },
      { col_name: "param_value2", col_caption: this.value2, col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.value2 != "" },
      { col_name: "param_value3", col_caption: this.value3, col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.value3 != "" },
      { col_name: "param_value4", col_caption: this.value4, col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.value4 != "" },
      { col_name: "param_value5", col_caption: this.value5, col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.value5 != "" },


      { col_name: "param_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];


  }




}



