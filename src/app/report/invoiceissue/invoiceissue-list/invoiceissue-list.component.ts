import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { Action } from 'rxjs/internal/scheduler/Action';
import { InvoiceIssueSearchComponent } from '../invoiceissue-search/invoiceissue-search.component';
import { IInvoiceIssueService } from '../../services/invoiceissue.service';

@Component({
  selector: 'app-invoiceissue-list',
  templateUrl: './invoiceissue-list.component.html',
  styleUrls: ['./invoiceissue-list.component.css'],
  standalone: true,
  imports: [...CustomControls, InvoiceIssueSearchComponent],
})

//Name : Sourav V
//Created Date : 14/03/2026
//Remark : this component display relevant details of each Invoice Issue records
//version : v1 - 14/03/2026

export class InvoiceIssueListComponent extends baseListComponent {

  inv_mode: string = "";

  constructor(public ms: IInvoiceIssueService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    this.inv_mode = this.ms.getSearchRecord().inv_mode || '';
    this.buildTable();
  }

  override search(event: any) {
  // this.init();
  this.inv_mode = event.record?.inv_mode || '';

  super.search(event);
  this.buildTable();
}

  buildTable() {
    const masterData = this.getMasterEditLink();
    const invData = this.getInvoiceLink();

    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };
    const HouseParam = { id: 0, mode: 'edit', menuid: invData.menuid, type: invData.type, appid: this.appid };

    this.table_data = [
      { col_name: "inv_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "inv_mbl_refno", col_caption: "REF #", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { id: 'inv_mbl_id' } },
      { col_name: "inv_ref_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_no", col_caption: "INVOICE", col_format: "link", col_sortable: true, col_link: '/accounts/invoicemEdit', col_param: HouseParam, col_show: true, col_param_list: { id:'inv_id',parent_id: 'inv_mbl_id' } },
      { col_name: "inv_date", col_caption: "INV-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_cust_name", col_caption: "CUSTOMER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_pol_country", col_caption: "LOAD-COUNTRY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_pol_etd", col_caption: "LOAD-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_pod_country", col_caption: "RECEIVER-COUNTRY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_pod_eta", col_caption: "DELIVERY-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      // { col_name: "inv_mbl_cntr_type", col_caption: "CNTR-NOS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_amount", col_caption: "AMOUNT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_cur_code", col_caption: "CURRENCY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];

  }


  getMasterEditLink() {
    let hData = { link: '', menuid: '', type: '' };

    if (this.inv_mode == 'SEA EXPORT')
      hData = { link: '/seaexport/seaexportmEdit', menuid: 'SEA-EXPORT-M', type: 'SEA-EXPORT-M' };
    if (this.inv_mode == 'SEA IMPORT')
      hData = { link: '/seaimport/seaimportmEdit', menuid: 'SEA-IMPORT-M', type: 'SEA-IMPORT-M' };
    if (this.inv_mode == 'AIR EXPORT')
      hData = { link: '/airexport/airexportEdit', menuid: 'AIR-EXPORT-M', type: 'AIR-EXPORT-M' };
    if (this.inv_mode == 'AIR IMPORT')
      hData = { link: '/airimport/airimportEdit', menuid: 'AIR-IMPORT-M', type: 'AIR-IMPORT-M' };
    if (this.inv_mode == 'OTHERS')
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHEROP', type: 'OTHEROP' };
    return hData;
  }
  getInvoiceLink() {
    
    let hData = { menuid: '', type: '' };

    if (this.inv_mode == 'SEA EXPORT')
      hData = { menuid: 'SEA-EXPORT-INVOICE', type: 'SEA-EXPORT-INVOICE' };
    if (this.inv_mode == 'SEA IMPORT')
      hData = { menuid: 'SEA-IMPORT-INVOICE', type: 'SEA-IMPORT-INVOICE' };
    if (this.inv_mode == 'AIR EXPORT')
      hData = { menuid: 'AIR-EXPORT-INVOICE', type: 'AIR-EXPORT-INVOICE' };
    if (this.inv_mode == 'AIR IMPORT')
      hData = { menuid: 'AIR-IMPORT-INVOICE', type: 'AIR-IMPORT-INVOICE' };
    if (this.inv_mode == 'OTHERS')
      hData = { menuid: 'OTHERS-INVOICE', type: 'OTHERS-INVOICE' };
    if (this.inv_mode == 'PS')
      hData = { menuid: 'PS-INVOICE', type: 'PS-INVOICE' };
    return hData;
  }
}

