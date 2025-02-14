import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../base-class/baseService';
import { iHistorymModel, iHistorym_Search } from '../../models/ihistorym';


@Injectable({ providedIn: 'root' })
export class HistorymService extends baseService {

  constructor() {
    super('log_id', 'log_refno');
  }

  setInitialState() {
    return <iHistorymModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iHistorym_Search>{ log_table: '', log_table_row_id: 0, log_desc: '', log_from_date: '', log_to_date: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
