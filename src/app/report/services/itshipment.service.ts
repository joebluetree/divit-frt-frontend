import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iDSR_Search, iDSRModel } from '../models/idsr';
import { iITShipment_Search, iITShipmentModel } from '../models/iitshipment';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 09/02/2026
//Remark : this component manages IT Shipment data and set initial state of records (page,row) and searching. 
//version : v1 - 09/02/2026

export class ITShipmentService extends baseService {

  constructor() {
    super('hbl_id', 'hbl_refno');
  }

  setInitialState() {
    return <iITShipmentModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iITShipment_Search>{title:this.title, hbl_from_date:'', hbl_to_date:'', hbl_mode:this.type, rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
    };
  }
}
