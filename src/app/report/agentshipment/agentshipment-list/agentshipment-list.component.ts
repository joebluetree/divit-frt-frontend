import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AgentShipmentSearchComponent } from '../agentshipment-search/agentshipment-search.component';
import { AgentShipmentService } from '../../services/agentshipment.service';

@Component({
  selector: 'app-agentshipment-list',
  templateUrl: './agentshipment-list.component.html',
  styleUrls: ['./agentshipment-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AgentShipmentSearchComponent],
})

//Name : Sourav V
//Created Date : 27/01/2026
//Remark : this component display relevant details of each Sea Volume Report records
//version : v1 - 27/01/2026

export class AgentShipmentListComponent extends baseListComponent {

  hbl_id: number = 0;
  hbl_report_type: string = "";
  hbl_mode: string = "";
  IsSeaOp: boolean;
  action: string;


  constructor(public ms: AgentShipmentService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.hbl_report_type = this.ms.getSearchRecord().hbl_report_type || '';
    this.hbl_mode = this.ms.getSearchRecord().hbl_mode || '';
    this.IsSeaOp = this.hbl_mode == "SEA EXPORT" || this.hbl_mode == "SEA IMPORT";
    this.buildTable();
  }

  override search(event: any) {
    this.init();
    this.ms.action = event.action;
    this.hbl_report_type = event.record?.hbl_report_type || '';
    this.IsSeaOp = event.record?.hbl_mode == "SEA EXPORT" || event.record?.hbl_mode == "SEA IMPORT";
    super.search(event);
    this.buildTable();
  }
  
  buildTable() {
    const masterData = this.getMasterEditLink();
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "hbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "hbl_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'hbl_mbl_id' }},
      { col_name: "hbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_vessel_name", col_caption: "VESSEL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_voyage", col_caption: "VOYAGE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_mbl_no", col_caption: "MBL#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_houseno", col_caption: "HBL#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "hbl_cntr_no", col_caption: "CNTR#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
      { col_name: "hbl_cntr_type_name", col_caption: "CNTR.TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
      { col_name: "hbl_cntr_sealno", col_caption: "SEAL NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
      { col_name: "cntr_discharge_date", col_caption: "DISCHARGE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
      { col_name: "cntr_pick_date", col_caption: "PICKUP", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
      { col_name: "cntr_return_date", col_caption: "EMPTY.RET", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },

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
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };//airimportmEdit
    if (this.hbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
}

