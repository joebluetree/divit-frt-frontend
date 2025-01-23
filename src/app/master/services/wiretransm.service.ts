import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iWiretransm_Search, iWiretransModel } from '../models/iwiretransm';


@Injectable({ providedIn: 'root' })

//Name : Alen Cherian
//Created Date : 23/01/2025


export class WiretransmService extends baseService {

  constructor() {
    super('qtnm_id', 'qtnm_no');
  }

  setInitialState() {
    return <iWiretransModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iWiretransm_Search>{ wtim_refno:'', wtim_from_date:'',wtim_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
