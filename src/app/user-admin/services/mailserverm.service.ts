import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../shared/base-class/baseService';
import { iMailServermModel, iMailServerm_Search } from '../models/imailserverm';


@Injectable({ providedIn: 'root' })
export class MailServermService extends baseService {

  constructor() {
    super('mail_id', 'mail_name');
  }

  setInitialState() {
    return <iMailServermModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iMailServerm_Search>{ mail_name: '', rec_company_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }
}
