import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iAccGroupm, iAccGroupm_Search, iAccGroupmModel } from '../models/iaccgroupm';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/baseService';
import { iAcctmModel } from '../models/iacctm';

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
