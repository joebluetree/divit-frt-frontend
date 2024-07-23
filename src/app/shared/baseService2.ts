import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { GlobalService } from "../core/services/global.service";


export abstract class baseService2 {

  protected http = inject(HttpClient);
  protected gs = inject(GlobalService);

  protected screen_id = '';
  protected state: any;
  protected type = '';



  constructor(protected pkid: string, protected name: string, protected baseEndPoint: string
  ) {

  }
  protected abstract setInitialState(): any;



  public init(_screen_id: string, _type: string = '') {
    this.type = _type;
    this.state = this.gs.appStates[_screen_id] || this.setInitialState();
    this.gs.appStates[_screen_id] = this.state;
  }

  public UpdateList(record: any, bAdd: boolean) {
    if (bAdd)
      this.state.records.push({ ...record });
    else {
      this.state.records = this.state.records.map((_rec: any) => {
        if (_rec[this.pkid] == record[this.pkid])
          return record;
        else
          return _rec;
      })
    }
  }

  public RemoveRecord(id: number) {
    const index = this.state.records.findIndex((obj: any) => obj[this.pkid] === id);
    let rec = this.state.records.find((f: any) => f[this.pkid] == id);
    if (index !== -1) {
      this.state.records.splice(index, 1);
    }
  }

  public updateSearchRecord(_Record: any) {
    this.state.searchRecord = { ..._Record };
  }

  public updateRowId(_id: number) {
    this.state.selected_row_id = _id;
  }

  public get selectedRow() {
    return this.state.selected_row_id;
  }
  public set selectedRow(value: any) {
    this.state.selected_row_id = value;
  }

  public getRecords() {
    return this.state.records;
  }

  public getSearchRecord() {
    return this.state.searchRecord
  }

  public getPageRecord() {
    return this.state.pageRecord;
  }

  public get sortColumn() {
    return this.state.sort_column;
  }
  public set sortColumn(value: any) {
    this.state.sort_column = value;
  }

  public get sortOrder() {
    return this.state.sort_order;
  }
  public set sortOrder(value: any) {
    this.state.sort_order = value;
  }

  public getErrorMessage() {
    return this.state.errorMessage;
  }

  public getList(action: string) {
    let data = { menu_id: this.screen_id, action: action, ...this.state.searchRecord, ...this.state.pageRecord, ...this.gs.getGlobalConstants() };
    const options = {
      headers: this.gs.getHeaders(),
    };
    this.http.post<any>(this.gs.getUrl(`${this.baseEndPoint}/GetListAsync`), data, options).subscribe({
      next: (v: any) => {
        this.state.errorMessage = '';
        this.state.records = v.records;
        this.state.pageRecord.currentPageNo = v.page.currentPageNo;
        this.state.pageRecord.pages = v.page.pages;
        this.state.pageRecord.rows = v.page.rows;
      },
      error: (v) => {
        this.state.errorMessage = v.message;
        this.gs.showAlert([v.message]);
        this.state.records = [];
      }
    });
  }

  public getRecord(data: any, endPoint: string = '') {
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...data }
    };
    const _url = endPoint || `${this.baseEndPoint}/getRecordAsync`;
    return this.http.get<any>(this.gs.getUrl(_url), options);
  }

  public save(param: any, record: any, endPoint: string = '') {
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...param }
    }
    const _url = endPoint || `${this.baseEndPoint}/SaveAsync`;
    return this.http.post<any>(this.gs.getUrl(_url), record, options);
  }

  public delete(data: any) {
    if (!confirm(`Delete ${data.rec[this.name]} y/n`))
      return;
    this.deleteRecord({ 'id': data.rec[this.pkid] });
  }

  public deleteRecord(param: any) {
    //endpoint = 'DeleteAsync'
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...param }
    }
    this.http.get<any>(this.gs.getUrl(`${this.baseEndPoint}/DeleteAsync`), options).subscribe({
      next: (v: any) => {
        if (v.status) {
          this.RemoveRecord(param.id);
        }
      },
      error: (err: any) => {
        this.gs.showAlert([err.error]);
      }
    });
  }

}
