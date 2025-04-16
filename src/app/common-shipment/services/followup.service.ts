import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iFollowUp_Search, iFollowUpModel } from '../models/ifollowup';

@Injectable({ providedIn: 'root' })

//Name : Alen Cherian
//Date : 09/04/2025
//Command : Create the Follow Up Service Components. 

export class FollowUpService extends baseService {
  constructor() {
    super('cf_id', '');
  }

  setInitialState() {
    return <iFollowUpModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iFollowUp_Search>{ rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
