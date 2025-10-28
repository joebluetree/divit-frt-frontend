import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iSea_importH_Search, iSea_importHModel } from '../models/iseaimporth';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 02/04/2025
//Remark : this component manages sea-import house data and set initial state of records (page,row) and searching. 
//version : v1 - 02-04-2025

export class SeaImportHService extends baseService {

  constructor() {
    super('hbl_id', 'hbl_houseno');
  }

  setInitialState() {
    return <iSea_importHModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iSea_importH_Search>{title:this.title,hbl_date_type:'', hbl_mbl_refno:'', rec_created_by:'', hbl_from_date:'',hbl_to_date:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
