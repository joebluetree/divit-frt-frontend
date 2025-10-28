import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { OpenBalanceSearchComponent } from '../openbalance-search/openbalance-search.component';
import { OpenBalanceService } from '../../services/openbalance.service';


@Component({
  selector: 'app-openbalance-list',
  templateUrl: './openbalance-list.component.html',
  styleUrls: ['./openbalance-list.component.css'],
  standalone: true,
  imports: [...CustomControls, OpenBalanceSearchComponent],
})
//Name : Sourav V
//Created Date : 22/09/2025
//Remark : this component display relevant details of each openbalance records
//version : v1 - 22/09/2025
export class OpenBalanceListComponent extends baseListComponent {

  constructor(public ms: OpenBalanceService) {
    super(ms);
  }
  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid};

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/accounts/openbalanceEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "jv_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "jv_header_id", col_caption: "HEADER ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "jv_docno", col_caption: "DOCNO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_date", col_caption: "DATE ", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_acc_code", col_caption: "A/C CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_acc_name", col_caption: "A/C NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_cur_code", col_caption: "CUR.", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_exrate", col_caption: "EX-RATE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_dcamt", col_caption: "AMT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_debit", col_caption: "DEBIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_credit", col_caption: "CREDIT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_refno", col_caption: "INV-NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_refdate", col_caption: "INV-DT", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_shipment_ref", col_caption: "REF-NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "jv_shipment_date", col_caption: "REF-DT", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }
}
