import { Injectable } from '@angular/core';
import { iAcctm_Search, iAcctmModel } from '../models/iacctm';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/baseService';

@Injectable({ providedIn: 'root' })
export class AcctmService extends baseService {

  constructor() {
    super('acc_id', 'acc_name', '/api/accounts/acctm');
  }

  setInitialState() {
    return <iAcctmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAcctm_Search>{ acc_name: '', acc_row_type: this.type, rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
