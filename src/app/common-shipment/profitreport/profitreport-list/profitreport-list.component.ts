import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { ProfitSearchComponent } from '../profitreport-search/profitreport-search.component';
import { ProfitService } from '../../services/profitreport.service';

@Component({
  selector: 'app-profitreport-list',
  templateUrl: './profitreport-list.component.html',
  styleUrls: ['./profitreport-list.component.css'],
  standalone: true,
  imports: [...CustomControls, ProfitSearchComponent],
})
export class ProfitListComponent extends baseListComponent {

  parent_id: number = 0;
  parent_type: string = "";
  IsSeaOp: boolean;
  IsAirOp: boolean;

  constructor(public ms: ProfitService) {
    super(ms);
  }
  ngOnInit(): void {

    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"];
      this.parent_type = rec["parent_type"];
    });
    
    this.IsSeaOp = this.parent_type == "SEA EXPORT"  || this.parent_type == "SEA IMPORT";
    this.IsAirOp = this.parent_type == "AIR EXPORT"  || this.parent_type == "AIR IMPORT";

    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid, parent_id: this.parent_id, parent_type: this.parent_type };
    const HouseParam = { id: 0, mbl_id: this.parent_type == 'OTHERS' ? this.parent_id : 0, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid }; // modify id for geting hbl_id of selected row
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };

    this.table_data = [
      { col_name: "inv_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "inv_date", col_caption: "DATE ", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_no", col_caption: "REF-NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      // { col_name: "inv_year", col_caption: "FIN-YEAR", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_wt", col_caption: "WT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_chwt", col_caption: "CHWT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAirOp },
      { col_name: "inv_cbm", col_caption: "CBM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsSeaOp },
      { col_name: "inv_cust_name", col_caption: "CUSTOMER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_inc_total", col_caption: "REVENUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_exp_total", col_caption: "EXPENSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_profit", col_caption: "PROFIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_mbl_refno", col_caption: "MASTER", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { 'id': 'inv_mbl_id' } },
      { col_name: "inv_houseno", col_caption: "HOUSE", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: this.parent_type == 'OTHERS' ? { 'id': 'inv_mbl_id' } : { 'id': 'inv_hbl_id' } },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];
  }
  //this.restoreInvoice()
  getHouseEditLink() {
    let hData = { link: '', menuid: '', type: '' };

    if (this.parent_type == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexporthEdit', menuid: 'SEA-EXPORT-H', type: 'SEA-EXPORT-H' };
    if (this.parent_type == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimporthEdit', menuid: 'SEA-IMPORT-H', type: 'SEA-IMPORT-H' };
    if (this.parent_type == 'AIR EXPORT')
      hData = { link: '/airexport/airexporthEdit', menuid: 'AIR-EXPORT-H', type: 'AIR-EXPORT-H' };
    if (this.parent_type == 'AIR IMPORT')
      hData = { link: '/airimport/airimporthEdit', menuid: 'AIR-IMPORT-H', type: 'AIR-IMPORT-H' };
    if (this.parent_type == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
  getMasterEditLink() {
    let hData = { link: '', menuid: '', type: '' };
    if (this.parent_type == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexportmEdit', menuid: 'SEA-EXPORT-M', type: 'SEA-EXPORT-M' };
    if (this.parent_type == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimportmEdit', menuid: 'SEA-IMPORT-M', type: 'SEA-IMPORT-M' };
    if (this.parent_type == 'AIR EXPORT')
      hData = { link: '/airexport/airexportmEdit', menuid: 'AIR-EXPORT-M', type: 'AIR-EXPORT-M' };
    if (this.parent_type == 'AIR IMPORT')
      hData = { link: '/airimport/airimportmEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };
    if (this.parent_type == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }

  general_callback(data: any) {

  }
}
