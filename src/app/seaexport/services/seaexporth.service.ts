import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iSea_exportH_Search, iSea_exportHModel } from '../models/iseaexporth';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 24/02/2025
//Remark : this component manages sea-exportm data and set initial state of records (page,row) and searching. 
//version : v1 - 24-02-2025

export class SeaExportHService extends baseService {

  constructor() {
    super('hbl_id', 'hbl_houseno');
  }

  setInitialState() {
    return <iSea_exportHModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iSea_exportH_Search>{title:this.title, hbl_houseno:'', hbl_from_date:'',hbl_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
