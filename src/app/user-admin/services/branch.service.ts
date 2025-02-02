import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { iBranch_Search, iBranchModel } from '../models/ibranchm';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class BranchService extends baseService {

  constructor() {
    super('branch_id', 'branch_name');
  }
  setInitialState() {
    return <iBranchModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iBranch_Search>{ branch_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
