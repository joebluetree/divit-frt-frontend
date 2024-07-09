import { Injectable } from '@angular/core';
import { iCompany_Search, iCompanym, iCompanyModel } from '../models/icompanym';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/baseService';

@Injectable({ providedIn: 'root' })
export class CompanyService extends baseService<iCompanym> {

  constructor() {
    super('comp_id', '/api/company');
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
