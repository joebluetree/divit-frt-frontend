import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iSea_importm_Search, iSea_importmModel } from '../models/iseaimportm';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component manages sea-importm data and set initial state of records (page,row) and searching. 
//version : v1 - 29-03-2025

export class SeaImportmService extends baseService {

  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iSea_importmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iSea_importm_Search>{ mbl_refno:'',mbl_agent_name:'',mbl_pol_name:'',mbl_pod_name:'', mbl_from_date:'',mbl_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
