import { Injectable } from '@angular/core';
import { iAccGroupm, iAccGroupm_Search, iAccGroupmModel } from '../models/iaccgroupm';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/baseService';

@Injectable({ providedIn: 'root' })
export class AccGroupService extends baseService<iAccGroupm> {

  constructor() {
    super('grp_id', 'grp_name', '/api/accounts/accgroup');
  }

  setInitialState() {
    return <iAccGroupmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAccGroupm_Search>{ grp_main_group: 'NA', grp_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
