import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { SeaImportHService } from '../../services/seaimporth.service';
import { SeaImportHSearchComponent } from '../seaimporth-search/seaimporth-search.component';


@Component({
  selector: 'app-seaimporth-list',
  templateUrl: './seaimporth-list.component.html',
  styleUrls: ['./seaimporth-list.component.css'],
  standalone: true,
  imports: [...CustomControls, SeaImportHSearchComponent],
})

//Name : Sourav V
//Created Date : 02/04/2025
//Remark : this component display relevant details of each sea export master records
//version : v1 - 02-04-2025

export class SeaImportHListComponent extends baseListComponent {

  constructor(public ms: SeaImportHService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();


    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/seaimport/seaimporthEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_no", col_caption: "MBL #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_houseno", col_caption: "HOUSE #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_packages", col_caption: "PCS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_telex_released_code", col_caption: "HBL STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_handled_name", col_caption: "HANDLED", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
