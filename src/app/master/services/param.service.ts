import { Injectable } from '@angular/core';
import { iParam_Search, iParamModel } from '../models/iparam';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class ParamService extends baseService {

  constructor() {
    super('param_id', 'param_name');
  }

  setInitialState() {
    return <iParamModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iParam_Search>{ param_type: this.type, param_code: '', param_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }


}
