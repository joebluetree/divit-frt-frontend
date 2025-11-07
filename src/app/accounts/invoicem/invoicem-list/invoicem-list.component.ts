import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { InvoicemSearchComponent } from '../invoicem-search/invoicem-search.component';
import { InvoicemService } from '../../services/invoicem.service';

@Component({
  selector: 'app-invoicem-list',
  templateUrl: './invoicem-list.component.html',
  styleUrls: ['./invoicem-list.component.css'],
  standalone: true,
  imports: [...CustomControls, InvoicemSearchComponent],
})
export class InvoicemListComponent extends baseListComponent {
  @ViewChild(InvoicemSearchComponent) invSearch!: InvoicemSearchComponent;

  parent_id: number = 0;
  parent_type: string = "";

  constructor(public ms: InvoicemService) {
    super(ms);
  }
  ngOnInit(): void {

    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"];
      this.parent_type = rec["parent_type"];
    });

    const masterData = this.getMasterEditLink();
    const houseData = this.getHouseEditLink();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid, parent_id: this.parent_id, parent_type: this.parent_type };
    const HouseParam = { id: 0, mbl_id: this.parent_id, mode: 'edit', menuid: houseData.menuid, type: houseData.type, appid: this.appid }; // modify id for geting hbl_id of selected row
    const MasterParam = { id: 0, mode: 'edit', menuid: masterData.menuid, type: masterData.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/accounts/invoicemEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "inv_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "inv_no", col_caption: "REF-NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_date", col_caption: "DATE ", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_year", col_caption: "FIN-YEAR", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_cust_name", col_caption: "CUSTOMER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_arap", col_caption: "AR/AP", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_deleted", col_caption: "DELETED", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_ar_total", col_caption: "AR TOTAL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_ap_total", col_caption: "AP TOTAL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_balance", col_caption: "BALANCE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "inv_mbl_refno", col_caption: "MASTER", col_format: "link", col_sortable: true, col_link: masterData.link, col_param: MasterParam, col_show: true, col_param_list: { 'id': 'inv_mbl_id' } },
      { col_name: "inv_houseno", col_caption: "HOUSE", col_format: "link", col_sortable: true, col_link: houseData.link, col_param: HouseParam, col_show: true, col_param_list: { 'id': 'inv_hbl_id' } },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
      { col_name: "restore", col_caption: "RESTORE", col_format: "callback", col_sortable: false, col_link: '', col_param: {}, col_show: false, col_icon: 'fa fa-trash' },
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
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHERS', type: 'OTHERS' };
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
      hData = { link: '/otherop/otheropEdit', menuid: 'OTHERS', type: 'OTHERS' };
    return hData;
  }

  general_callback(data: any) {

  }
}
