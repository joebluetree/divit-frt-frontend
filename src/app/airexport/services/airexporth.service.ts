import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAirExporth_Search, iAirExporthModel } from '../models/iairexporth';

@Injectable({ providedIn: 'root' })

//Name : Alen Cherian
//Date : 24/02/2025
//Command : Create the AirExport Service Components. 

export class AirExporthService extends baseService {
  constructor() {
    super('hbl_id', 'hbl_houseno');
  }

  setInitialState() {
    return <iAirExporthModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAirExporth_Search>{ hbl_houseno: '', hbl_from_date: '', hbl_to_date: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
