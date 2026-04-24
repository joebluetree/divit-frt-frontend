import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { MasterProfitService} from '../../services/masterprofit.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MasterProfitSearchComponent } from '../masterprofit-search/masterprofit-search.component';

@Component({
  selector: 'app-masterprofit-list',
  templateUrl: './masterprofit-list.component.html',
  styleUrls: ['./masterprofit-list.component.css'],
  standalone: true,
  imports: [...CustomControls, MasterProfitSearchComponent],
})

//Name : Sourav V
//Created Date : 08/01/2026
//Remark : this component display relevant details of each Sea Volume Report records
//version : v1 - 08/01/2026

export class MasterProfitListComponent extends baseListComponent {

  mbl_report_type: string = "";
  mbl_format: string = "";
  mbl_mode: string = "";
  IsGeneral: boolean;
  IsAgent: boolean;
  IsOp: boolean;

  constructor(public ms: MasterProfitService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.mbl_report_type = this.ms.getSearchRecord().mbl_report_type || 'MASTER';
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
    const InvoiceData = this.getInvoiceLink();
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const InvoiceParam = { id: 0, mode: 'edit', menuid: InvoiceData.menuid, type: InvoiceData.type, appid: this.appid };
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    
    this.IsGeneral = this.mbl_format == "GENERAL";
    this.IsAgent = this.mbl_format == "AGENT";
    this.IsOp = this.mbl_format == "OPERATION GROUP";

    if(this.mbl_report_type == "MASTER" && this.mbl_format != "PARTY"){
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'mbl_id' }},
        { col_name: "mbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_inv", col_caption: "ARAP", col_format: "link", col_sortable: true, col_link: '/accounts/invoicemList', col_param: InvoiceParam, col_show: true, col_param_list: { parent_id: 'mbl_id', parent_mode: 'mbl_mode' } },
        { col_name: "mbl_no", col_caption: "MBL#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_ref_count", col_caption: "REF.COUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_house_tot", col_caption: "HOUSE.COUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_inc_total", col_caption: "REVENUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_exp_total", col_caption: "EXPENSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_revenue", col_caption: "PROFIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_profit_per", col_caption: "%", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_cntr_type", col_caption: "F/L", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_20", col_caption: "20", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_40", col_caption: "40", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_40hq", col_caption: "40HC", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_45", col_caption: "45", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_teu", col_caption: "TEU", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_cbm", col_caption: "CBM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },
        { col_name: "mbl_weight", col_caption: "KGS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsAgent || this.IsOp) },

        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      ];
    }
    if(this.mbl_report_type == "SUMMARY"){
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_mode", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: (this.IsGeneral || this.IsOp) },
        { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsAgent },
        { col_name: "mbl_ref_count", col_caption: "REF.COUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_house_tot", col_caption: "HOUSE.COUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_inc_total", col_caption: "REVENUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_exp_total", col_caption: "EXPENSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_revenue", col_caption: "PROFIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_profit_per", col_caption: "%", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_20", col_caption: "20", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_40", col_caption: "40", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_40hq", col_caption: "40HC", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_45", col_caption: "45", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_teu", col_caption: "TEU", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_cbm", col_caption: "CBM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_weight", col_caption: "KGS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      ];
    }
    if(this.mbl_report_type == "MASTER" && this.mbl_format == "PARTY"){
      this.table_data = [
        { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
        { col_name: "mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'mbl_id' }},
        { col_name: "mbl_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_no", col_caption: "MBL#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_shipper_name", col_caption: "SHIPPER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_consignee_name", col_caption: "CONSIGNEE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_customer_name", col_caption: "BILLING-PARTY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        
        { col_name: "mbl_inc_total", col_caption: "REVENUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_exp_total", col_caption: "EXPENSE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "mbl_revenue", col_caption: "PROFIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        
        { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
        { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },

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
  getInvoiceLink() {
    
    let hData = { menuid: '', type: '' };

    if (this.mbl_mode == 'SEA EXPORT')
      hData = { menuid: 'SEA-EXPORT-INVOICE', type: 'SEA-EXPORT-INVOICE' };
    if (this.mbl_mode == 'SEA IMPORT')
      hData = { menuid: 'SEA-IMPORT-INVOICE', type: 'SEA-IMPORT-INVOICE' };
    if (this.mbl_mode == 'AIR EXPORT')
      hData = { menuid: 'AIR-EXPORT-INVOICE', type: 'AIR-EXPORT-INVOICE' };
    if (this.mbl_mode == 'AIR IMPORT')
      hData = { menuid: 'AIR-IMPORT-INVOICE', type: 'AIR-IMPORT-INVOICE' };
    if (this.mbl_mode == 'OTHERS')
      hData = { menuid: 'OTHERS-INVOICE', type: 'OTHERS-INVOICE' };
    if (this.mbl_mode == 'PS')
      hData = { menuid: 'PS-INVOICE', type: 'PS-INVOICE' };
    return hData;
  }


}