import { Injectable } from '@angular/core';
import { iCompany_Search, iCompanyModel } from '../models/icompanym';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';

@Injectable({ providedIn: 'root' })
export class CompanyService extends baseService {

  constructor() {
    super('comp_id', 'company_name');
  }

  setInitialState() {
    return <iCompanyModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iCompany_Search>{ comp_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }



}
