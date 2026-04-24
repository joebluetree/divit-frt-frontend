import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';

import { ConsigneeShipmentSearchComponent } from '../consigneeshipment-search/consigneeshipment-search.component';
import { ConsigneeShipmentService } from '../../services/consigneeshipment.service';

@Component({
  selector: 'app-consigneeshipment-list',
  templateUrl: './consigneeshipment-list.component.html',
  styleUrls: ['./consigneeshipment-list.component.css'],
  standalone: true,
  imports: [...CustomControls, ConsigneeShipmentSearchComponent],
})

//Name : Sourav V
//Created Date : 30/01/2026
//Remark : this component display relevant details of each CSReport records
//version : v1 - 30/01/2026

export class ConsigneeShipmentListComponent extends baseListComponent {

  hbl_id: number = 0;
  hbl_format: string = "";
  hbl_mode: string = "";
  hbl_bl_type: string = "";

  IsSeaIm: boolean;
  IsAirOp: boolean;
  IsSeaOp: boolean;
  IsImport: boolean;
  action: string;


  constructor(public ms: ConsigneeShipmentService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.hbl_format = this.ms.getSearchRecord().hbl_format || 'CONSIGNEE SHIPMENT REPORT';
    this.hbl_mode = this.ms.getSearchRecord().hbl_mode || '';
    this.hbl_bl_type = this.ms.getSearchRecord().hbl_bl_type || 'MASTER WISE';
    this.buildTable();
  }

  override search(event: any) {
    this.init();
    this.ms.action = event.action;
    this.hbl_format = event.record?.hbl_format || '';
    this.hbl_mode = event.record?.hbl_mode || '';
    this.hbl_bl_type = event.record?.hbl_bl_type || '';
    super.search(event);
    this.buildTable();
  }
  
  buildTable() {
    const masterData = this.getMasterEditLink();
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.IsSeaIm = this.hbl_mode == "SEA IMPORT";
    this.IsSeaOp = this.hbl_mode == "SEA IMPORT" || this.hbl_mode == "SEA EXPORT";
    this.IsAirOp = this.hbl_mode == "AIR IMPORT" || this.hbl_mode == "AIR EXPORT";
    this.IsImport = this.hbl_mode == "AIR IMPORT"  || this.hbl_mode == "SEA IMPORT";

    if(this.hbl_format == "CONSIGNEE SHIPMENT REPORT" && this.hbl_bl_type == "MASTER WISE"){
      this.table_data = [
        { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' }},
        { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_cntr_no", col_caption: "CNTR #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
        { col_name: "hbl_mbl_no", col_caption: "AWB #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAirOp },
        { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];  
    }
    if(this.hbl_format == "SHIPMENT STATUS REPORT" && this.hbl_bl_type == "MASTER WISE"){
      this.table_data = [
        { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' }},
        { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_name", col_caption: "ORIGIN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_name", col_caption: "DESTINATION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_cntr_no", col_caption: "CNTR#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp},
        { col_name: "hbl_mbl_no", col_caption: "AWB #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAirOp },
        { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_mbl_no", col_caption: "MASTER#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "cntr_lfd", col_caption: "LFD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaIm },
        { col_name: "cntr_pick_status", col_caption: "CNTR P/U STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaIm },
        { col_name: "cntr_pick_date", col_caption: "CNTR P/U DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaIm },
        { col_name: "hbl_vessel_name", col_caption: "VESSEL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
        { col_name: "hbl_voyage", col_caption: "VOYAGE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
        { col_name: "hbl_an_sent", col_caption: "ARRIVAL.NOTICE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];  
    }
    if(this.hbl_format == "CONSIGNEE SHIPMENT REPORT" && this.hbl_bl_type == "HOUSE WISE"){
      this.table_data = [
        { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' }},
        { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_houseno", col_caption: "B/L #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_cntr_no", col_caption: "CNTR #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
        { col_name: "hbl_mbl_no", col_caption: "AWB #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAirOp },
        { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_weight", col_caption: "WEIGHT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];  
    }
    if(this.hbl_format == "SHIPMENT STATUS REPORT" && this.hbl_bl_type == "HOUSE WISE"){
      this.table_data = [
        { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' }},
        { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pol_name", col_caption: "ORIGIN", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_name", col_caption: "DESTINATION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_houseno", col_caption: "B/L.NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_cntr_no", col_caption: "CNTR#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp},
        { col_name: "hbl_mbl_no", col_caption: "AWB #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAirOp },
        { col_name: "hbl_packages", col_caption: "PACKAGES", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true},
        { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_location_name", col_caption: "TERMINAL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
        { col_name: "hbl_mbl_no", col_caption: "MASTER#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pono", col_caption: "PO#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
        { col_name: "hbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "hbl_delivery_date", col_caption: "DELIVERY DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "cntr_lfd", col_caption: "LFD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaIm },
        { col_name: "cntr_pick_status", col_caption: "CNTR P/U STATUS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaIm },
        { col_name: "cntr_pick_date", col_caption: "CNTR P/U DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaIm },
        { col_name: "hbl_vessel_name", col_caption: "VESSEL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
        { col_name: "hbl_voyage", col_caption: "VOYAGE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
        { col_name: "hbl_an_sent", col_caption: "ARRIVAL.NOTICE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsImport },
        { col_name: "hbl_remarks", col_caption: "REMARKS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];  
    }
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
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };//airimportmEdit
    if (this.hbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
}

