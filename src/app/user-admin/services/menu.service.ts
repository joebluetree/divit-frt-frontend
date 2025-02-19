import { Injectable } from '@angular/core';
import { iMenu_Search, iMenuModel } from '../models/imenum';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class MenuService extends baseService {

  constructor() {
    super('menu_id', 'menu_name');
  }
  setInitialState() {
    return <iMenuModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iMenu_Search>{ menu_name: '', menu_visible: 'NA', module_id: 0, module_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }





}
