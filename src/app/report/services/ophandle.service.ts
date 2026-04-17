import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iOpHandle_Search, iOpHandleModel } from '../models/iophandle';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 26/12/2025
//Remark : this component manages Operation Handling Report data and set initial state of records (page,row) and searching. 
//version : v1 - 26/12/2025

export class OpHandleService extends baseService {

  constructor() {
    super('ophandle_id', 'ophandle_refno');
  }

  setInitialState() {
    return <iOpHandleModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iOpHandle_Search>{title:this.title, ophandle_type:'',ophandle_group:'', ophandle_from_date:'',ophandle_to_date:'',ophandle_handled_by:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
