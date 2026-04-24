import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iMasterProfit_Search, iMasterProfitModel } from '../models/imasterprofit';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 10/02/2026
//Remark : this component manages Master Profit Report data and set initial state of records (page,row) and searching. 
//version : v1 - 10/02/2026

export class MasterProfitService extends baseService {

  public IsDetail: boolean = false;
  public action: string = "";

  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iMasterProfitModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iMasterProfit_Search>{title:this.title, mbl_from_date:'',mbl_to_date:'', mbl_format :'', mbl_mode:'' , mbl_report_type:'',mbl_salesman_name:'',
        mbl_profit_criteria:'', mbl_profit_val:0, mbl_profit_met:'', mbl_loss_approved:'', mbl_agent_name:'', mbl_parent_name:'', mbl_customer_name:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
      IsDetail: this.IsDetail,
      action: this.action,
    };
  }
}
