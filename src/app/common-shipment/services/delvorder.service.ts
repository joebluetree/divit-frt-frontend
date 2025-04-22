import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iDelvOrder_Search, iDelvOrderModel } from '../models/idelvorder';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 19/04/2025
//Remark : this component manages delv order data and set initial state of records (page,row) and searching. 
//version : v1 - 19-04-2025

export class DelvOrderService extends baseService {

  constructor() {
    super('do_id','');
  }

  setInitialState() {
    return <iDelvOrderModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iDelvOrder_Search>{ rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
