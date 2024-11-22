import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iUser_Search, iUserModel } from '../models/iuserm';

@Injectable({ providedIn: 'root' })
export class UserService extends baseService {

  constructor() {
    super('user_id', 'user_name');
  }
  setInitialState() {
    return <iUserModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iUser_Search>{ user_name: '', user_is_admin: 'NA', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
