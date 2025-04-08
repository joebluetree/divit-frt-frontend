import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAirImporth_Search, iAirImporthModel } from '../models/iairimporth';

@Injectable({ providedIn: 'root' })

//Name : Alen Cherian
//Date : 31/03/2025
//Command : Create the AirImport Service Components. 

export class AirImporthService extends baseService {
  constructor() {
    super('hbl_id','hbl_houseno');
  }

  setInitialState() {
    return <iAirImporthModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAirImporth_Search>{ hbl_houseno: '', hbl_from_date: '', hbl_to_date: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
