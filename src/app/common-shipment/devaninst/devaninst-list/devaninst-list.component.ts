import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { DevanInstService } from '../../services/devaninst.service';
import { DevanInstSearchComponent } from '../devaninst-search/devaninst-search.component';

@Component({
  selector: 'app-devaninst-list',
  templateUrl: './devaninst-list.component.html',
  styleUrls: ['./devaninst-list.component.css'],
  standalone: true,
  imports: [...CustomControls, DevanInstSearchComponent],
})

//Name : Sourav V
//Created Date : 25/06/2025
//Remark : this component display relevant details of each Devan Instruction records
//version : v1 - 25/06/2025

export class DevanInstListComponent extends baseListComponent {

  constructor(public ms: DevanInstService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/devaninst/devaninstEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "di_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "di_remarks_name", col_caption: "Remarks", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "di_devan_date", col_caption: "Date", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
