import { Injectable } from '@angular/core';
import { iModule_Search, iModuleModel } from '../models/imodulem';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class ModuleService extends baseService {

  constructor() {
    super('module_id', 'module_name');
  }
  setInitialState() {
    return <iModuleModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iModule_Search>{ module_name: '', module_is_installed: 'NA', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }


}
