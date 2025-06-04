import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../base-class/baseService';
import { iGenRemarkm_Search, iGenRemarkmModel } from '../../models/igenremarkm';



@Injectable({ providedIn: 'root' })
export class GenRemarkmService extends baseService {

  constructor() {
    super('remk_id', 'remk_desc');
  }

  setInitialState() {
    return <iGenRemarkmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iGenRemarkm_Search>{ remk_parent_type: '', remk_desc: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
