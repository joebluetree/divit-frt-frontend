import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iOpBal_Search, iOpBalModel } from '../models/iopenbalance';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 22/09/2025
//Remark : this component manages open Balance data and set initial state of records (page,row) and searching. 
//version : v1 - 22/09/2025

export class OpenBalanceService extends baseService {

  constructor() {
    super('jv_header_id', 'jv_docno');
  }

  setInitialState() {
    return <iOpBalModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iOpBal_Search>{ jv_docno:'',jv_type: this.type, rec_branch_id: 0, rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
