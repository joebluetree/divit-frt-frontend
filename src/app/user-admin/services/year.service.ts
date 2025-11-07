import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iYear_Search, iYearModel } from '../models/iyearm';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 29/10/2025
//Remark : this component manages Yearm data and set initial state of records (page,row) and searching. 
//version : v1 - 29/10/2025

export class YearService extends baseService {

  constructor() {
    super('year_id', 'year_name');
  }
  setInitialState() {
    return <iYearModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iYear_Search>{ year_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
