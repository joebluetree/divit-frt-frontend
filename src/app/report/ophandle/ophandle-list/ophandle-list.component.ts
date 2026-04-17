import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { OpHandleSearchComponent } from '../ophandle-search/ophandle-search.component';
import { OpHandleService } from '../../services/ophandle.service';

@Component({
  selector: 'app-ophandle-list',
  templateUrl: './ophandle-list.component.html',
  styleUrls: ['./ophandle-list.component.css'],
  standalone: true,
  imports: [...CustomControls, OpHandleSearchComponent],
})

//Name : Sourav V
//Created Date : 26/12/2025
//Remark : this component display relevant details of each Operation Handling Report records
//version : v1 - 26/12/2025

export class OpHandleListComponent extends baseListComponent {

  ophandle_id: number = 0;
  ophandle_type: string = "";
  ophandle_group: string = "";
  IsHouse: boolean = false;
  IsSummary: boolean = false;

  constructor(public ms: OpHandleService) {
    super(ms);
  }

  override search(event: any) {
    this.ophandle_type = event.record.ophandle_type|| '';
    this.ophandle_group = event.record.ophandle_group|| '';

    super.search(event);
    this.buildTable();
  }

  ngOnInit(): void {
    this.init();

    this.ophandle_type = this.ms.getSearchRecord().ophandle_type || '';
    this.ophandle_group = this.ms.getSearchRecord().ophandle_group || '';

    this.buildTable();
  }

  buildTable() {
    this.IsHouse = false;
    this.IsSummary = false;
    if(this.ophandle_group == "HOUSE")
      this.IsHouse = true;
    if(this.ophandle_group == "SUMMARY")
      this.IsSummary = true;
    
    const records = this.ms.getRecords();
      if (this.ophandle_type === 'ALL' && records?.length) {
        records.forEach((row: any) => this.applyLinksByMode(row));
    }
    
    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const HouseParam = { id: 0, mbl_id: this.ophandle_type == 'OTHERS' ? this.ophandle_id : 0, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid }; // modify id for geting hbl_id of selected row
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    if(this.IsSummary){
      this.table_data = [
        { col_name: "ophandle_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "ophandle_handled_name", col_caption: "HANDLED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_master_count", col_caption: "MASTER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_house_count", col_caption: "HOUSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];
    }
    // 'master_link'
    else{
      this.table_data = [
        { col_name: "ophandle_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "ophandle_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link,
          col_param: MasterParam, col_show: true, col_param_list: { id: 'ophandle_id'}},
        { col_name: "ophandle_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_handled_name", col_caption: "HANDLED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_agent_name", col_caption: "MASTER AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "ophandle_houseno", col_caption: "HOUSE", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: this.IsHouse, col_param_list: { 'id': 'ophandle_hbl_id' } },
        { col_name: "ophandle_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsHouse },
        { col_name: "ophandle_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsHouse },
        { col_name: "ophandle_shipterm_name", col_caption: "H-TERMS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsHouse },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        // { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
      ];
    }
  }

  getHouseEditLink() {

    let hData = { link: '', menuid: '', type: '' };

    if (this.ophandle_type == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexporthEdit', menuid: 'SEA-EXPORT-H', type: 'SEA-EXPORT-H' };
    if (this.ophandle_type == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimporthEdit', menuid: 'SEA-IMPORT-H', type: 'SEA-IMPORT-H' };
    if (this.ophandle_type == 'AIR EXPORT')
      hData = { link: '/airexport/airexporthEdit', menuid: 'AIR-EXPORT-H', type: 'AIR-EXPORT-H' };
    if (this.ophandle_type == 'AIR IMPORT')
      hData = { link: '/airimport/airimporthEdit', menuid: 'AIR-IMPORT-H', type: 'AIR-IMPORT-H' };
    if (this.ophandle_type == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
  getMasterEditLink() {

    let hData = { link: '', menuid: '', type: '' };

    if (this.ophandle_type == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexportmEdit', menuid: 'SEA-EXPORT-M', type: 'SEA-EXPORT-M' };
    if (this.ophandle_type == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimportmEdit', menuid: 'SEA-IMPORT-M', type: 'SEA-IMPORT-M' };
    if (this.ophandle_type == 'AIR EXPORT')
      hData = { link: '/airexport/airexportEdit', menuid: 'AIR-EXPORT-M', type: 'AIR-EXPORT-M' };
    if (this.ophandle_type == 'AIR IMPORT')
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };//airimportmEdit
    if (this.ophandle_type == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
  applyLinksByMode(row: any) {
    if (row.ophandle_type === 'SEA EXPORT') {
      row.master_link   = '/seaexport/seaexportmEdit';
      row.master_menuid = 'SEA-EXPORT-M';
      row.master_type   = 'SEA-EXPORT-M';

      row.house_link    = '/seaexport/seaexporthEdit';
      row.house_menuid  = 'SEA-EXPORT-H';
      row.house_type    = 'SEA-EXPORT-H';
    }

    if (row.ophandle_type === 'SEA IMPORT') {
      row.master_link   = '/seaimport/seaimportmEdit';
      row.master_menuid = 'SEA-IMPORT-M';
      row.master_type   = 'SEA-IMPORT-M';

      row.house_link    = '/seaimport/seaimporthEdit';
      row.house_menuid  = 'SEA-IMPORT-H';
      row.house_type    = 'SEA-IMPORT-H';
    }

    if (row.ophandle_type === 'AIR EXPORT') {
      row.master_link   = '/airexport/airexportEdit';
      row.master_menuid = 'AIR-EXPORT-M';
      row.master_type   = 'AIR-EXPORT-M';

      row.house_link    = '/airexport/airexporthEdit';
      row.house_menuid  = 'AIR-EXPORT-H';
      row.house_type    = 'AIR-EXPORT-H';
    }

    if (row.ophandle_type === 'AIR IMPORT') {
      row.master_link   = '/airimport/airimportEdit';
      row.master_menuid = 'AIR-IMPORT-M';
      row.master_type   = 'AIR-IMPORT-M';

      row.house_link    = '/airimport/airimporthEdit';
      row.house_menuid  = 'AIR-IMPORT-H';
      row.house_type    = 'AIR-IMPORT-H';
    }
  }
}

