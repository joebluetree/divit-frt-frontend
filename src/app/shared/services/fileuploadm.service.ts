import { Injectable } from '@angular/core';
import { iPage } from 'ngx-jrt-controls';
import { baseService } from '../base-class/baseService';
import { iFileUploadm_Search, iFileUploadmModel } from '../models/ifileuploadm';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({ providedIn: 'root' })
export class FileUploadmService extends baseService {

  constructor() {
    super('files_id', 'files_ref_no');
  }

  setInitialState() {
    return <iFileUploadmModel>{
      selected_row_id: -1,
      records: [],
      searchRecord: <iFileUploadm_Search>{ files_type: '', files_ref_no: '', files_desc: '', rec_company_id: 0, rec_branch_id: 0 },
      pageRecord: <iPage>{ currentPageNo: 0, pages: 0, pageSize: this.gs.pageSize, rows: 0 },
      errorMessage: '',
      sort_column: '',
      sort_order: ''
    };
  }

  uploadFiles(formData: FormData, url: string) {
    return this.http.post<any>(this.gs.getUrl(url), formData);
  }

}
