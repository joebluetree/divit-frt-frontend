import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { MessengerSlipSearchComponent } from '../messengerslip-search/messengerslip-search.component';
import { MessengerSlipService } from '../../services/slip.service';


@Component({
  selector: 'app-messengerslip-list',
  templateUrl: './messengerslip-list.component.html',
  styleUrls: ['./messengerslip-list.component.css'],
  standalone: true,
  imports: [...CustomControls, MessengerSlipSearchComponent]
})

//Name : Alen Cherian
//Date : 22/04/2025
//Command : Create the Messenger Slip to list.

export class MessengerSlipListComponent extends baseListComponent {
  parent_id: number = 0;
  mbl_mode: string = '';
  parent_type: string = '';

  constructor(
    public ms: MessengerSlipService,

  ) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"];
      this.parent_type = rec["parent_type"];
    });
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid, parent_type: this.parent_type };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/common-shipment/messengerslipEdit', col_param: param, col_show: this.bEdit },
      { col_name: "cs_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cs_refno", col_caption: "REF", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cs_to_name", col_caption: "TO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cs_date", col_caption: "DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cs_to_tel", col_caption: "TEL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cs_to_fax", col_caption: "FAX", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }
}
