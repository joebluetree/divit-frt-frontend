import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AirVolumeService } from '../../services/airvolume.service';
import { AirVolumeSearchComponent } from '../airvolume-search/airvolume-search.component';

@Component({
  selector: 'app-airvolume-list',
  templateUrl: './airvolume-list.component.html',
  styleUrls: ['./airvolume-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AirVolumeSearchComponent],
})

//Name : Sourav V
//Created Date : 16/01/2026
//Remark : this component display relevant details of each Air Volume Report records
//version : v1 - 16/01/2026

export class AirVolumeListComponent extends baseListComponent {

  mbl_id: number = 0;
  mbl_report_type: string = "";
  mbl_mode: string = "";
  IsDetail: boolean;
  action: string;


  constructor(public ms: AirVolumeService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.mbl_report_type = this.ms.getSearchRecord().mbl_report_type || '';
    this.mbl_mode = this.ms.getSearchRecord().mbl_mode || '';
    this.IsDetail = this.ms.IsDetail;
    this.buildTable();
  }

  override search(event: any) {
    this.init();
    if(event.action == "SEARCH")
      this.ms.IsDetail = this.IsDetail = event.IsDetail;
    this.ms.action = event.action;
    this.mbl_report_type = event.record?.mbl_report_type || '';
    this.mbl_mode = event.record?.mbl_mode || '';
    super.search(event);
    this.buildTable();
  }

  buildTable() {
    const masterData = this.getMasterEditLink();
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: this.IsDetail, col_param_list: { id: 'mbl_id' }},
      { col_name: "mbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "mbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "mbl_pcs", col_caption: "PCS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_weight", col_caption: "HAWB.WT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_chwt", col_caption: "HAWB.CHWT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsDetail },

    ];
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
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };//airimportmEdit
    if (this.mbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
}

