import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iDSR_Search, iDSRModel } from '../models/idsr';
import { iITShipment_Search, iITShipmentModel } from '../models/iitshipment';
import { iShipmentLog_Search, iShipmentLogModel } from '../models/ishipmentlog';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 19/03/2026
//Remark : this component manages Shipment Log data and set initial state of records (page,row) and searching. 
//version : v1 - 19/03/2026

export class ShipmentLogService extends baseService {

  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iShipmentLogModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iShipmentLog_Search>{title:this.title, mbl_date_type:'', mbl_from_date:'', mbl_to_date:'', mbl_mode:'', mbl_is_master:'', mbl_is_house:'', mbl_stages:'',
                    mbl_shipper_name:'', mbl_consignee_name:'', mbl_agent_name:'', mbl_handled_name:'',mbl_user_role:'', rec_created_name:'', mbl_sort_order:'',mbl_incoterm: '',
                    mbl_list_format:'', mbl_eta_within:0, mbl_pending_ams:'', rec_company_id: 0, rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
    };
  }
}
