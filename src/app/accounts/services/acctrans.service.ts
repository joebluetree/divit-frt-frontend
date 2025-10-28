import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAccTrans_Search, iAccTransModel } from '../models/iacctrans';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 16/10/2025
//Remark : this component manages Acc Transaction data and set initial state of records (page,row) and searching. 
//version : v1 - 16/10/2025

export class AccTransService extends baseService {

  constructor() {
    super('jvh_id', 'jvh_docno');
  }

  setInitialState() {
    return <iAccTransModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAccTrans_Search>{ jvh_docno:'', jvh_type:this.type, rec_branch_id: 0, rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
