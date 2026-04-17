import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ITShipmentSearchComponent } from '../itshipment-search/itshipment-search.component';
import { ITShipmentService } from '../../services/itshipment.service';

@Component({
  selector: 'app-itshipment-list',
  templateUrl: './itshipment-list.component.html',
  styleUrls: ['./itshipment-list.component.css'],
  standalone: true,
  imports: [...CustomControls, ITShipmentSearchComponent],
})

//Name : Sourav V
//Created Date : 09/02/2026
//Remark : this component display relevant details of each ITShipment records
//version : v1 - 09/02/2026

export class ITShipmentListComponent extends baseListComponent {

  hbl_mode: string = "";

  constructor(public ms: ITShipmentService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.hbl_mode = this.ms.getSearchRecord().hbl_mode || '';
    this.buildTable();
  }

  buildTable() {
    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const HouseParam = { id: 0, mbl_id: 0, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid };

    this.table_data = [
      { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' } },
      { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_houseno", col_caption: "HOUSE#", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.hbl_mode == 'OTHERS' ? { id: 'hbl_mbl_id' } :{id: 'hbl_id'} },
      { col_name: "hbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_place_final", col_caption: "FINAL-DESTINATION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_cntr_type", col_caption: "SHIPMENT MODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];

  }


  getMasterEditLink() {
    let hData = { link: '', menuid: '', type: '' };

    if (this.hbl_mode == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexportmEdit', menuid: 'SEA-EXPORT-M', type: 'SEA-EXPORT-M' };
    if (this.hbl_mode == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimportmEdit', menuid: 'SEA-IMPORT-M', type: 'SEA-IMPORT-M' };
    if (this.hbl_mode == 'AIR EXPORT')
      hData = { link: '/airexport/airexportEdit', menuid: 'AIR-EXPORT-M', type: 'AIR-EXPORT-M' };
    if (this.hbl_mode == 'AIR IMPORT')
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };
    if (this.hbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
  getHouseEditLink() {
    let hData = { link: '', menuid: '', type: '' };

    if (this.hbl_mode == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexporthEdit', menuid: 'SEA-EXPORT-H', type: 'SEA-EXPORT-H' };
    if (this.hbl_mode == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimporthEdit', menuid: 'SEA-IMPORT-H', type: 'SEA-IMPORT-H' };
    if (this.hbl_mode == 'AIR EXPORT')
      hData = { link: '/airexport/airexporthEdit', menuid: 'AIR-EXPORT-H', type: 'AIR-EXPORT-H' };
    if (this.hbl_mode == 'AIR IMPORT')
      hData = { link: '/airimport/airimporthEdit', menuid: 'AIR-IMPORT-H', type: 'AIR-IMPORT-H' };
    if (this.hbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
}

