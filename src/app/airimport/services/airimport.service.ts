import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAirImport_Search, iAirImportModel } from '../models/iairimport';

@Injectable({ providedIn: 'root' })

//Name : Alen Cherian
//Date : 29/03/2025
//Command : Create the AirImport Service Components. 
// Sourav V : 15/07/2025 added Title in search 

export class AirImportService extends baseService {
  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iAirImportModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAirImport_Search>{title:this.title, mbl_refno: '', mbl_from_date: '', mbl_to_date: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

}
