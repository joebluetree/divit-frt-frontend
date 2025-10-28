import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iQtnm_air_Search, iQtnm_airModel } from '../models/iqtnmair';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 03/01/2025
//Remark : this component manages qtnm-air data and set initial state of records (page,row) and searching. 

export class QtnmAirService extends baseService {

  constructor() {
    super('qtnm_id', 'qtnm_no');
  }

  setInitialState() {
    return <iQtnm_airModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iQtnm_air_Search>{title: this.title, qtnm_type:'', qtnm_from_date:'',qtnm_to_date:'', qtnm_no: '', qtnm_to_name: '',qtnm_search: '', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
