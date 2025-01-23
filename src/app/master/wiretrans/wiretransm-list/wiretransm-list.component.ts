import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { WiretransmSearchComponent } from '../wiretransm-search/wiretransm-search.component';
import { WiretransmService } from '../../services/wiretransm.service';



@Component({
  selector: 'app-wiretransm-list',
  templateUrl: './wiretransm-list.component.html',
  styleUrls: ['./wiretransm-list.component.css'],
  standalone: true,
  imports: [...CustomControls, WiretransmSearchComponent]
})
export class WiretransmListComponent extends baseListComponent {

  constructor(
    public ms: WiretransmService,

  ) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/marketing/qtnmairEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "wtim_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "wtim_refno", col_caption: "REF NO", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "wtim_to_name", col_caption: "TO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "wtim_cust_name", col_caption: "CUSTOMER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "wtim_acc_no", col_caption: "A/C NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "wtim_req_type", col_caption: "REQUEST TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "wtim_from_name", col_caption: "FROM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }



}
