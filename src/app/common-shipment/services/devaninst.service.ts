import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iDevanInst_Search, iDevanInstModel } from '../models/idevaninst';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 25/06/2025
//Remark : this component manages Devan Instruction data and set initial state of records (page,row) and searching. 
//version : v1 - 25/06/2025

export class DevanInstService extends baseService {

  constructor() {
    super('di_id','');
  }

  setInitialState() {
    return <iDevanInstModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iDevanInst_Search>{ rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
