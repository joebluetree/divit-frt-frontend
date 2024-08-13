import { Injectable } from "@angular/core";
import { baseService } from "../../shared/base-class/baseService";
import { iTrackm_Search, iTrackmModel } from '../models/itrackm';
import { iPage } from "ngx-jrt-controls";

@Injectable({ providedIn: 'root' })
export class TrackmService extends baseService {

  constructor() {
    super('track_id', 'track_cntr_no');
  }

  protected override setInitialState() {
    return <iTrackmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iTrackm_Search>{ track_book_no: '', track_cntr_no: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }


}
