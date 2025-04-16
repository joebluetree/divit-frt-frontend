import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iMemo_Search, iMemoModel } from '../models/imemo';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 09/04/2025
//Remark : this component manages memo data and set initial state of records (page,row) and searching. 
//version : v1 - 09-04-2025

export class MemoService extends baseService {

  constructor() {
    super('memo_id','memo_id');
  }

  setInitialState() {
    return <iMemoModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iMemo_Search>{ rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
