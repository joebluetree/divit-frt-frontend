import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iDSR_Search, iDSRModel } from '../models/idsr';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 04/02/2026
//Remark : this component manages DSR data and set initial state of records (page,row) and searching. 
//version : v1 - 04/02/2026

export class DSRService extends baseService {

  public IsDetail: boolean = false;
  public action: string = "";

  constructor() {
    super('hbl_id', 'hbl_refno');
  }

  setInitialState() {
    return <iDSRModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iDSR_Search>{title:this.title, hbl_date_type:'', hbl_from_date:'', hbl_to_date:'', hbl_parent_name :'', hbl_mode:this.type , hbl_format:'',hbl_consignee_name:'',hbl_shipper_name:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
      IsDetail: this.IsDetail,
      action: this.action,
    };
  }
}
