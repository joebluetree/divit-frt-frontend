import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ShipmentLogSearchComponent } from '../shipmentlog-search/shipmentlog-search.component';
import { ShipmentLogService } from '../../services/shipmentlog.service';

@Component({
  selector: 'app-shipmentlog-list',
  templateUrl: './shipmentlog-list.component.html',
  styleUrls: ['./shipmentlog-list.component.css'],
  standalone: true,
  imports: [...CustomControls, ShipmentLogSearchComponent],
})

//Name : Sourav V
//Created Date : 19/03/2026
//Remark : this component display relevant details of each Shipment Log records
//version : v1 - 19/03/2026

export class ShipmentLogListComponent extends baseListComponent {

  mbl_mode: string = "";
  mbl_list_format: string = "";

  IsSeaImp: boolean;
  IsSeaExp: boolean;
  IsAirImp: boolean;
  IsAirExp: boolean;

  constructor(public ms: ShipmentLogService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.mbl_mode = this.ms.getSearchRecord().mbl_mode || '';
    this.mbl_list_format = this.ms.getSearchRecord().mbl_list_format || 'F1';
    this.buildTable();
  }

  override search(event: any) {
    this.init();
    this.mbl_mode = event.record?.mbl_mode || '';
    this.mbl_list_format = event.record?.mbl_list_format || '';
    super.search(event);
    this.buildTable();
  }

  buildTable() {
    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const HouseParam = { id: 0, mbl_id: 0, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid };

    this.IsSeaExp = this.mbl_mode == "SEA EXPORT";
    this.IsSeaImp = this.mbl_mode == "SEA IMPORT";
    this.IsAirExp = this.mbl_mode == "AIR EXPORT";
    this.IsAirImp = this.mbl_mode == "AIR IMPORT";

    if (this.mbl_list_format == "F1") {
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_refno", col_caption: "REFNO", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'mbl_id' } },
        // { col_name: "mbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_houseno", col_caption: "HOUSE#", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.mbl_mode == 'OTHERS' ? { id: 'mbl_id', mbl_id: 'mbl_id' } : { id: 'mbl_hbl_id', mbl_id: 'mbl_id' } },
        { col_name: "mbl_handled_name", col_caption: "HANDLED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_shipstage", col_caption: "SHIPMENT STAGE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_incoterm", col_caption: "INCO.TERM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaImp },
        { col_name: "mbl_liner_bookingno", col_caption: "BOOKING#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp },
        { col_name: "mbl_cntr_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_firm_code", col_caption: "FIRM.CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_ams_fileno", col_caption: "AMS.FILE#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_it_tot", col_caption: "IT.SHIPMENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_carrier_an_recd_dt", col_caption: "A/N RECEIVED", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_an_sent_dt", col_caption: "A/N SENT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_bo_status", col_caption: "STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_bo_attended_code", col_caption: "STATUS.BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        
      ];
    }
    if (this.mbl_list_format == "F2") {
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'mbl_id' } },
        { col_name: "mbl_houseno", col_caption: "HOUSE#", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.mbl_mode == 'OTHERS' ? { id: 'mbl_id', mbl_id: 'mbl_id' } : { id: 'mbl_hbl_id', mbl_id: 'mbl_id' } },
        { col_name: "mbl_shipstage", col_caption: "SHIPMENT STAGE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_liner_bookingno", col_caption: "BOOKING#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp },
        { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_cntr_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp || this.IsSeaImp },
        { col_name: "mbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_isf_no", col_caption: "ISF", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp || this.IsSeaImp },
        { col_name: "mbl_mstatus", col_caption: "M RLS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp || this.IsSeaImp },
        { col_name: "mbl_hstatus", col_caption: "H RLS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp || this.IsSeaImp },
        { col_name: "mbl_is_pl", col_caption: "PL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_is_ci", col_caption: "CI", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_is_carr_an", col_caption: "CARRIER AN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_custom_reles_status", col_caption: "CUSTOM RELEASE STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_frt_status_name", col_caption: "FREIGHT RELEASE STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp || this.IsSeaImp || this.IsAirImp },
        { col_name: "mbl_paid_status", col_caption: "CLIENT PAID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaExp || this.IsSeaImp || this.IsAirImp },
        { col_name: "mbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_lfd", col_caption: "LFD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_is_delivery", col_caption: "DELIVERY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_plf_eta", col_caption: "DELIVERY DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];
    }
    if (this.mbl_list_format == "F3") {
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'mbl_id' } },
        { col_name: "mbl_houseno", col_caption: "HOUSE#", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.mbl_mode == 'OTHERS' ? { id: 'mbl_id', mbl_id: 'mbl_id' } : { id: 'mbl_hbl_id', mbl_id: 'mbl_id' } },
        { col_name: "mbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_cntr_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_place_final", col_caption: "FINAL DESTINATION", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_paid_status", col_caption: "CLIENT PAID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_lfd", col_caption: "LFD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];
    }


  }


  getMasterEditLink() {
    let hData = { link: '', menuid: '', type: '' };

    if (this.mbl_mode == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexportmEdit', menuid: 'SEA-EXPORT-M', type: 'SEA-EXPORT-M' };
    if (this.mbl_mode == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimportmEdit', menuid: 'SEA-IMPORT-M', type: 'SEA-IMPORT-M' };
    if (this.mbl_mode == 'AIR EXPORT')
      hData = { link: '/airexport/airexportEdit', menuid: 'AIR-EXPORT-M', type: 'AIR-EXPORT-M' };
    if (this.mbl_mode == 'AIR IMPORT')
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };
    if (this.mbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
  getHouseEditLink() {
    let hData = { link: '', menuid: '', type: '' };

    if (this.mbl_mode == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexporthEdit', menuid: 'SEA-EXPORT-H', type: 'SEA-EXPORT-H' };
    if (this.mbl_mode == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimporthEdit', menuid: 'SEA-IMPORT-H', type: 'SEA-IMPORT-H' };
    if (this.mbl_mode == 'AIR EXPORT')
      hData = { link: '/airexport/airexporthEdit', menuid: 'AIR-EXPORT-H', type: 'AIR-EXPORT-H' };
    if (this.mbl_mode == 'AIR IMPORT')
      hData = { link: '/airimport/airimporthEdit', menuid: 'AIR-IMPORT-H', type: 'AIR-IMPORT-H' };
    if (this.mbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
}

