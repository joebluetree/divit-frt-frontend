import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { MasterProfitService} from '../../services/masterprofit.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HouseProfitSearchComponent } from '../houseprofit-search/houseprofit-search.component';
import { HouseProfitService } from '../../services/houseprofit.service';

@Component({
  selector: 'app-houseprofit-list',
  templateUrl: './houseprofit-list.component.html',
  styleUrls: ['./houseprofit-list.component.css'],
  standalone: true,
  imports: [...CustomControls, HouseProfitSearchComponent],
})

//Name : Sourav V
//Created Date : 06/03/2026
//Remark : this component display relevant details of each House Profit
//version : v1 - 06/03/2026

export class HouseProfitListComponent extends baseListComponent {

  mbl_report_type: string = "";
  mbl_format: string = "";
  mbl_mode: string = "";
  IsShipper: boolean;
  IsConsignee: boolean;
  IsAgent: boolean;
  IsNomination: boolean;
  IsClient: boolean;
  IsHandledBy: boolean;

  constructor(public ms: HouseProfitService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.mbl_report_type = this.ms.getSearchRecord().mbl_report_type || 'DETAIL';
    this.mbl_format = this.ms.getSearchRecord().mbl_format || '';
    this.mbl_mode = this.ms.getSearchRecord().mbl_mode || '';
    this.buildTable();
  }

  override search(event: any) {
    this.init();
    this.mbl_report_type = event.record?.mbl_report_type || '';
    this.mbl_format = event.record?.mbl_format || '';
    this.mbl_mode = event.record?.mbl_mode || '';
    super.search(event);
    this.buildTable();
  }
  
  buildTable() {
    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const HouseParam = { id: 0, mbl_id: 0, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid };
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    
    this.IsShipper = this.mbl_format == "SHIPPER";
    this.IsConsignee = this.mbl_format == "CONSIGNEE";
    this.IsAgent = this.mbl_format == "AGENT";
    this.IsNomination = this.mbl_format == "NOMINATION";
    this.IsClient = this.mbl_format == "CLIENT TYPE";
    this.IsHandledBy = this.mbl_format == "HANDLED-BY";

    if(this.mbl_report_type == "DETAIL"){
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'mbl_id' }},
        { col_name: "mbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_houseno", col_caption: "HOUSE", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.mbl_mode == 'OTHERS' ? { id: 'mbl_id' } :{id: 'mbl_hbl_id'} },
        { col_name: "mbl_mode", col_caption: "GROUP", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsShipper },
        { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsConsignee },
        { col_name: "mbl_bltype", col_caption: "CLIENT-TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsNomination },
        { col_name: "mbl_agent_bltype", col_caption: "CLIENT-TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsClient },
        { col_name: "mbl_handled_name", col_caption: "HANDLED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsHandledBy },
        { col_name: "mbl_inc_total", col_caption: "REVENUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_exp_total", col_caption: "EXPENSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_revenue", col_caption: "PROFIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_cntr_type", col_caption: "F/L", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true},
        { col_name: "mbl_20", col_caption: "20", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_40", col_caption: "40", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_40hq", col_caption: "40HC", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_45", col_caption: "45", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_teu", col_caption: "TEU", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_cbm", col_caption: "CBM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_weight", col_caption: "KGS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      ];
    }
    if(this.mbl_report_type == "SUMMARY"){
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAgent },
        { col_name: "mbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsShipper },
        { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsConsignee },
        { col_name: "mbl_bltype", col_caption: "CLIENT-TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsNomination },
        { col_name: "mbl_agent_bltype", col_caption: "CLIENT-TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsClient },
        { col_name: "mbl_handled_name", col_caption: "HANDLED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsHandledBy },
        { col_name: "mbl_ref_count", col_caption: "REF.COUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_house_count", col_caption: "HOUSE.COUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_inc_total", col_caption: "REVENUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_exp_total", col_caption: "EXPENSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_revenue", col_caption: "PROFIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_teu", col_caption: "TEU", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_cbm", col_caption: "CBM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_weight", col_caption: "KGS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
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
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };//airimportmEdit
    if (this.mbl_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHERS', type: 'OTHERS' };
    if (this.mbl_mode == 'PS')
      hData = { link: '/otherop/otheropEdit', menuid: 'PS', type: 'PS' };
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
    if (this.mbl_mode == 'PS')
      hData = { link: '/otherop/otheropEdit', menuid: 'PS', type: 'PS' };
    return hData;
  }


}