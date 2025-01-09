import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iQtnm_Search, iQtnmModel } from '../models/iqtnm';

@Injectable({ providedIn: 'root' })
export class QtnmService extends baseService {

  constructor() {
    super('qtnm_id', 'qtnm_name');
  }

  setInitialState() {
    return <iQtnmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iQtnm_Search>{ qtnm_no: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
