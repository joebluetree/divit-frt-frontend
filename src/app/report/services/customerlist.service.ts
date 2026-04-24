import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iCustomerList_Search, iCustomerListModel } from '../models/icustomerlist';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 31/12/2025
//Remark : this component manages Customer List Report data and set initial state of records (page,row) and searching. 
//version : v1 - 31/12/2025

export class CustomerListService extends baseService {

  constructor() {
    super('cust_id', 'cust_refno');
  }

  setInitialState() {
    return <iCustomerListModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iCustomerList_Search>{title:this.title, cust_type:'',cust_name:'', cust_from_date:'',cust_to_date:'',cust_format:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
