import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAirExport_Search, iAirExportModel } from '../models/iairexport';

@Injectable({ providedIn: 'root' })

  //Name : Alen Cherian
  //Date : 24/02/2025
  //Command : Create the AirExport Service Components. 

export class AirExportService extends baseService {
  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iAirExportModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAirExport_Search>{ mbl_refno: '', mbl_from_date: '', mbl_to_date: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
