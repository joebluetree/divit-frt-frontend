import { Component, ViewChild } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { CustomerListSearchComponent } from '../customerlist-search/customerlist-search.component';
import { CustomerListService } from '../../services/customerlist.service';

@Component({
  selector: 'app-customerlist-list',
  templateUrl: './customerlist-list.component.html',
  styleUrls: ['./customerlist-list.component.css'],
  standalone: true,
  imports: [...CustomControls, CustomerListSearchComponent],
})

//Name : Sourav V
//Created Date : 26/12/2025
//Remark : this component display relevant details of each Operation Handling Report records
//version : v1 - 26/12/2025

export class CustomerListListComponent extends baseListComponent {

  cust_id: number = 0;
  cust_format: string = "";
  IsStandard: boolean = false;
  IsCredit: boolean = false;

  constructor(public ms: CustomerListService) {
    super(ms);
  }

  override search(event: any) {
    this.cust_format = event.record.cust_format || '';

    super.search(event);
    this.buildTable();
  }

  ngOnInit(): void {
    this.init();

    this.cust_format = this.ms.getSearchRecord().cust_format || '';

    this.buildTable();
  }

  buildTable() {
    this.IsStandard = false;
    this.IsCredit = false;
    if (this.cust_format == "STANDARD")
      this.IsStandard = true;
    if (this.cust_format == "CREDIT/SPECIAL ACCOUNT")
      this.IsCredit = true;

    const param = { id: 0, mode: 'edit', menuid: "CUSTOMER", type: "CUSTOMER", appid: this.appid };

    this.table_data = [
      { col_name: "cust_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "cust_name", col_caption: "NAME", col_format: "link", col_sortable: true, col_link: '/masters/customerEdit', col_param: param, col_show: true, col_param_list: { 'id': 'cust_id' } },
      { col_name: "cust_official_name", col_caption: "OFFICIAL NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_address1", col_caption: "ADDRESS1", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_address2", col_caption: "ADDRESS2", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_address3", col_caption: "ADDRESS3", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_type", col_caption: "CATEGORY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_contact", col_caption: "CONTACT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_tel", col_caption: "TELEPHONE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_mobile", col_caption: "MOBILE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_email", col_caption: "EMAIL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cust_city", col_caption: "CITY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsStandard },
      { col_name: "cust_state_name", col_caption: "STATE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsStandard },
      { col_name: "cust_country_name", col_caption: "COUNTRY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsStandard },
      { col_name: "cust_is_splacc", col_caption: "CREDIT/SPECIAL.A/C", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsCredit },
      { col_name: "cust_days", col_caption: "CREDIT DAYS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsCredit },
      { col_name: "cust_splacc_memo", col_caption: "MEMO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.IsCredit },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      // { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];

  }
}

