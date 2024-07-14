import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { iUser } from '../../core/models/user';
import { baseService } from '../../shared/baseService';
import { iUser_Search, iUserm, iUserModel } from '../models/iuserm';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends baseService<iUserm> {

  constructor() {
    super('user_id', 'user_name', '/api/user');
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



  public getRecordCompanyWise(comp_id: number, id: number) {
    const options = {
      params: {
        'comp_id': comp_id,
        'id': id
      }
    }
    return this.http.get<iUser>(this.gs.getUrl(`${this.baseEndPoint}/getRecordAsync`), options);
  }


}
