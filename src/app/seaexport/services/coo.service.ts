import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iCoO_Search, iCoOModel } from '../models/icoo';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 19/06/2025
//Remark : this component manages cert. of origin data and set initial state of records (page,row) and searching. 
//version : v1 - 19/06/2025

export class CoOService extends baseService {

  constructor() {
    super('mbld_id', 'mbld_houseno');
  }

  setInitialState() {
    return <iCoOModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iCoO_Search>{ mbld_houseno:'', mbld_from_date:'',mbld_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
