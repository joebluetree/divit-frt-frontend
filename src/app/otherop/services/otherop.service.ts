import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iOtherOp_Search, iOtherOpModel } from '../models/iotherop';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 07/05/2025
//Remark : this component manages Other-Operation data and set initial state of records (page,row) and searching. 
//version : v1 - 07/05/2025

export class OtherOpService extends baseService {

  constructor() {
    super('oth_id', 'oth_refno');
  }

  setInitialState() {
    return <iOtherOpModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iOtherOp_Search>{ oth_refno:'', oth_from_date:'',oth_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
