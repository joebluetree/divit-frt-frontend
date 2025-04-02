import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { AirImporthSearchComponent } from '../airimporth-search/airimporth-search.component';
import { AirImporthService } from '../../services/airimporth.service';



@Component({
  selector: 'app-airimporth-list',
  templateUrl: './airimporth-list.component.html',
  styleUrls: ['./airimporth-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AirImporthSearchComponent]
})

//Name : Alen Cherian
//Date : 31/03/2025
//Command : Create the Air Import House to list.

export class AirImporthListComponent extends baseListComponent {

  constructor(
    public ms: AirImporthService,

  ) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/airimport/airimporthEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "hbl_houseno", col_caption: "HOUSE NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_id", col_caption: "MASTER ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "hbl_mbl_refno", col_caption: "REF#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_date", col_caption: "DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_place_delivery", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_salesman_name", col_caption: "SALESMAN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_handled_name", col_caption: "HANDLED BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }
}
