import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iQtnmFcl_Search, iQtnmFclModel } from '../models/iqtnmfcl';

@Injectable({ providedIn: 'root' })

  //Name : Alen Cherian
  //Date : 03/01/2025
  //Command : Create the Fcl Service Components. 

export class QtnmFclService extends baseService {
  constructor() {
    super('qtnm_id', 'qtnm_name');
  }

  setInitialState() {
    return <iQtnmFclModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iQtnmFcl_Search>{ qtnm_no: '', qtnm_from_date: '', qtnm_to_date: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
