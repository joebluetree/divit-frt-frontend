import { Injectable } from '@angular/core';
import { iCustomer_Search, iCustomerModel } from '../models/icustomerm';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class CustomermService extends baseService {

  constructor() {
    super('cust_id', 'cust_name', '/api/customer');
  }

  setInitialState() {
    return <iCustomerModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iCustomer_Search>{ cust_name: '', cust_row_type: this.type, rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }



}
