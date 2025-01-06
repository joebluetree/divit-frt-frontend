import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iQtnm_lcl_Search, iQtnm_lclModel } from '../models/iqtnmlcl';

@Injectable({ providedIn: 'root' })
export class QtnmLclService extends baseService {

  constructor() {
    super('qtnm_pkid', 'qtnm_cfno');
  }

  setInitialState() {
    return <iQtnm_lclModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iQtnm_lcl_Search>{ qtnm_from_date:'',qtnm_to_date:'', qtnm_no: '', qtnm_to_name: '',qtnm_pld_name: '', rec_company_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
