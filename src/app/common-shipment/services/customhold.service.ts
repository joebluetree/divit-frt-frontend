import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iCustomHold_Search, iCustomHoldModel } from '../models/icustomhold';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 01/07/2025
//Remark : this component manages custom hold data and set initial state of records (page,row) and searching. 
//version : v1 - 01/07/2025

export class CustomHoldService extends baseService {

  constructor() {
    super('custom_id','');
  }

  setInitialState() {
    return <iCustomHoldModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iCustomHold_Search>{ rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
