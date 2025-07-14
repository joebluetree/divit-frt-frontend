import { Injectable } from '@angular/core';
import { iCustomer_Search, iCustomerModel } from '../models/icustomerm';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class CustomermService extends baseService {

  constructor() {
    super('cust_id', 'cust_name');
  }

  setInitialState() {
    return <iCustomerModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iCustomer_Search>{ title:this.title, cust_date_type: '',cust_from_date: '',cust_to_date: '',cust_created_by: '',cust_edited_by: '',cust_code: '',cust_name: '',cust_firm_code: '',cust_is_blackacc: '', cust_row_type: this.type, rec_company_id: 0 ,rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }



}
