import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAgentShipment_Search, iAgentShipmentModel } from '../models/iagentshipment';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 27/01/2026
//Remark : this component manages Agent Shipment Report data and set initial state of records (page,row) and searching. 
//version : v1 - 27/01/2026

export class AgentShipmentService extends baseService {

  public IsDetail: boolean = false;
  public action: string = "";

  constructor() {
    super('hbl_id', 'hbl_refno');
  }

  setInitialState() {
    return <iAgentShipmentModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAgentShipment_Search>{title:this.title, hbl_from_date:'',hbl_to_date:'', hbl_parent_name :'', hbl_mode:this.type , hbl_shipper_name:'',hbl_consignee_name:'', hbl_agent_name:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
      IsDetail: this.IsDetail,
      action: this.action,
    };
  }
}
