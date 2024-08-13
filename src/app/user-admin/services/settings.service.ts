import { Injectable } from '@angular/core';
import { iSettings, iSettings_Search, iSettingsModel } from '../models/isettings';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class SettingsService extends baseService {

  constructor() {
    super('settings_id', 'settings_id');
  }
  setInitialState() {
    return <iSettingsModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iSettings_Search>{ caption: '', category: this.type, rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }


  public ReUpdate(category: string, comp_id: number, branch_id: number, user_code: string, url: string) {
    const params = {
      'category': category,
      'company_id': comp_id,
      'branch_id': branch_id,
      'user_code': user_code
    }
    const options = {
      params: params
    }
    return this.http.post<iSettings>(this.gs.getUrl(url), null, options);

  }


}
