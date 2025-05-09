import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../../base-class/baseService';
import { iFileUploadm_Search, iFileUploadmModel } from '../../models/ifileuploadm';


@Injectable({ providedIn: 'root' })
export class FileUploadmService extends baseService {

  constructor() {
    super('files_id', 'files_ref_no');
  }

  setInitialState() {
    return <iFileUploadmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iFileUploadm_Search>{ log_table: '', log_table_row_id: 0, log_desc: '', log_from_date: '', log_to_date: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

  uploadFiles(formData: FormData, url: string) {
    return this.http.post<any>(this.gs.getUrl(url), formData);
  }
  

  // uploadFiles(id:number, record: any, formData: FormData, url: string) {
  //   //return this.http.post(url, formData);
  //   return this.http.post<any>(this.gs.getUrl(url), record);
  // }
  
}
