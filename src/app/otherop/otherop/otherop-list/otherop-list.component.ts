import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { OtherOpSearchComponent } from '../otherop-search/otherop-search.component';
import { OtherOpService } from '../../services/otherop.service';

@Component({
  selector: 'app-otherop-list',
  templateUrl: './otherop-list.component.html',
  styleUrls: ['./otherop-list.component.css'],
  standalone: true,
  imports: [...CustomControls, OtherOpSearchComponent],
})

//Name : Sourav V
//Created Date : 07/05/2025
//Remark : this component display relevant details of each Other-Operation records
//version : v1 - 07/05/2025

export class OtherOpListComponent extends baseListComponent {

  constructor(public ms: OtherOpService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/otherop/otheropEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "oth_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "oth_refno", col_caption: "REF #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_ref_date", col_caption: "DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_mbl_no", col_caption: "MBL #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_agent_name", col_caption: "MASTER AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "oth_handled_name", col_caption: "HANDLED", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
