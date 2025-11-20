import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iHistoryModel, iHistory_Search } from '../models/ihistory';


@Injectable({ providedIn: 'root' })
export class HistoryService extends baseService {

  constructor() {
    super('log_id', 'log_refno');
  }

  setInitialState() {
    return <iHistoryModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iHistory_Search>{ log_table:'', log_type:'GENERAL', log_from_date:'',log_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
