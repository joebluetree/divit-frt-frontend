import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iInvoicem_Search, iInvoicemModel } from '../models/iinvoicem';

@Injectable({ providedIn: 'root' })
export class InvoicemService extends baseService {

  constructor() {
    super('inv_id', 'inv_no');
  }

  setInitialState() {
    return <iInvoicemModel>{
      selected_row_id: -1,
      records: [],
      summary: {},
      searchRecord: <iInvoicem_Search>{ rec_deleted:'',parent_id:0 , rec_branch_id: 0,rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
