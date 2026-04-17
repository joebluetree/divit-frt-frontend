import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iAirVolume_Search, iAirVolumeModel } from '../models/iairvolume';

@Injectable({ providedIn: 'root' })

//Name : Sourav V
//Created Date : 16/01/2026
//Remark : this component manages Air Volume Report data and set initial state of records (page,row) and searching. 
//version : v1 - 16/01/2026

export class AirVolumeService extends baseService {

  public IsDetail: boolean = false;
  public action: string = "";

  constructor() {
    super('mbl_id', 'mbl_refno');
  }

  setInitialState() {
    return <iAirVolumeModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iAirVolume_Search>{title:this.title, mbl_from_date:'',mbl_to_date:'', mbl_format :'', mbl_mode:this.type, mbl_report_type:'', mbl_agent_name:'', rec_company_id: 0,rec_branch_id: 0},
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: '',
      IsDetail: this.IsDetail,
      action: this.action,
    };
  }
}
