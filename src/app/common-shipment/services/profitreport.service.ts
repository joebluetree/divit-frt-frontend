import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iProfit_Search, iProfitModel } from '../models/iprofitreport';

@Injectable({ providedIn: 'root' })
export class ProfitService extends baseService {

  constructor() {
    super('inv_id', 'inv_no');
  }

  setInitialState() {
    return <iProfitModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iProfit_Search>{title: this.title ,rec_deleted:'N', parent_id:0, inv_unit_type:'', inv_report_type:'', rec_branch_id: 0,rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
