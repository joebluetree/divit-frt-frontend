import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../base-class/baseService';
import { iGenMemo_Search, iGenMemoModel } from '../models/igenmemo';


@Injectable({ providedIn: 'root' })
export class GenMemoService extends baseService {

  constructor() {
    super('remk_id', 'remk_desc');
  }

  setInitialState() {
    return <iGenMemoModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iGenMemo_Search>{ remk_parent_type: '', remk_desc: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
