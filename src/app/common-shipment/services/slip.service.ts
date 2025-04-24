import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iSlip_Search, iSlipModel } from '../models/islip';

@Injectable({ providedIn: 'root' })

//Name : Alen Cherian
//Date : 22/04/2025
//Command : Create the Messenger Slip Service Components. 

export class MessengerSlipService extends baseService {
  constructor() {
    super('cs_id', 'cs_refno'); // wanted to change ?
  }

  setInitialState() {
    return <iSlipModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iSlip_Search>{ cs_refno: '', cs_from_date: '', cs_to_date: '',parent_type: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
