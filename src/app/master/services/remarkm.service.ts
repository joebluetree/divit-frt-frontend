import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iRemarkm_Search, iRemarkmModel } from '../models/iremarkm';

@Injectable({ providedIn: 'root' })
export class RemarkmService extends baseService {

  constructor() {
    super('rem_id', 'rem_name');
  }

  setInitialState() {
    return <iRemarkmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iRemarkm_Search>{ rem_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }



}
