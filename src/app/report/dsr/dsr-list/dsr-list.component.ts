import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DSRService } from '../../services/dsr.service';
import { DSRSearchComponent } from '../dsr-search/dsr-search.component';

@Component({
  selector: 'app-dsr-list',
  templateUrl: './dsr-list.component.html',
  styleUrls: ['./dsr-list.component.css'],
  standalone: true,
  imports: [...CustomControls, DSRSearchComponent],
})

//Name : Sourav V
//Created Date : 04/02/2026
//Remark : this component display relevant details of each DSR records
//version : v1 - 04/02/2026

export class DSRListComponent extends baseListComponent {

  hbl_id: number = 0;
  // hbl_mbl_id: number = 0;
  hbl_format: string = "";
  hbl_mode: string = "";
  IsCntr: boolean;
  IsImport: boolean;
  action: string;


  constructor(public ms: DSRService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.hbl_mode = this.ms.getSearchRecord().hbl_mode || '';
    // this.hbl_mbl_id = this.ms.getSearchRecord().hbl_mbl_id || 0;
    this.buildTable();
  }

  override search(event: any) {
    this.init();
    this.ms.action = event.action;
    this.hbl_mode = event.record?.hbl_mode || '';
    super.search(event);
    this.buildTable();
  }

  buildTable() {
    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const HouseParam = { id: 0, mbl_id: 0, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid }; // modify id for geting hbl_id of selected row
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.IsCntr = this.hbl_mode == "SEA IMPORT" || this.hbl_mode == "SEA EXPORT" || this.hbl_mode == "OTHERS";
    this.IsImport = this.hbl_mode == "AIR IMPORT"  || this.hbl_mode == "SEA IMPORT";

    this.table_data = [
      { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' } },
      { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_no", col_caption: "BL#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_cntr_list", col_caption: "CNTR #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsCntr },
      { col_name: "hbl_pol_name", col_caption: "ORIGIN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pod_name", col_caption: "DESTINATION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_houseno", col_caption: "HOUSE#", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.hbl_mode == 'OTHERS' ? { id: 'hbl_mbl_id' } :{id: 'hbl_id'} },
      { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_book_slno", col_caption: "BOOKING #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
      { col_name: "hbl_pono", col_caption: "PO#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
      { col_name: "hbl_invoiceno", col_caption: "INVOICE #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
      { col_name: "hbl_incoterm", col_caption: "INCOTERM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
      { col_name: "hbl_invlist", col_caption: "AR.INV #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

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

