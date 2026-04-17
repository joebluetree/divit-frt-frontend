import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iHouseProfit_Search, iHouseProfitModel } from '../models/ihouseprofit';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 06/03/2026
//Remark : this component manages House Profit Report data and set initial state of records (page,row) and searching. 
//version : v1 - 06/03/2026

export class HouseProfitService extends baseService {

  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iHouseProfitModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iHouseProfit_Search>{title:this.title, mbl_from_date:'',mbl_to_date:'', mbl_format :'', mbl_report_type:'', mbl_mode:'' , mbl_parent_name:'', mbl_salesman_name:'',
        mbl_agent_name:'', mbl_shipper_name:'', mbl_consignee_name:'', mbl_handled_name:'', mbl_client_type:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
    };
  }
}
