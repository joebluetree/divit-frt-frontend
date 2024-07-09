import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { iRights, iRights_header, iRights_Search, iRightsModel } from '../models/irights';
import { baseService } from '../../shared/baseService';

@Injectable({ providedIn: 'root' })
export class RightsService extends baseService<iRights_header> {

  constructor() {
    super('rights_id', '/api/rights');
  }
  setInitialState() {
    return <iRightsModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iRights_Search>{ user_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }




}
