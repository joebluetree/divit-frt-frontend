import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iInvoiceIssue_Search, iInvoiceIssueModel } from '../models/iinvoiceissue';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 14/03/2026
//Remark : this component manages Invoice Issue and set initial state of records (page,row) and searching. 
//version : v1 - 14/03/2026

export class IInvoiceIssueService extends baseService {

  constructor() {
    super('inv_id', 'inv_mbl_refno');
  }

  setInitialState() {
    return <iInvoiceIssueModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iInvoiceIssue_Search>{title:this.title, inv_date_type:'', inv_from_date:'', inv_to_date:'', inv_mode:'', inv_type:'', inv_parent_name:'', inv_cust_name:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
    };
  }
}
