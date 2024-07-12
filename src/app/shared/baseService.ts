import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { GlobalService } from "../core/services/global.service";

export abstract class baseService<T> {

  protected http = inject(HttpClient);
  protected gs = inject(GlobalService);

  protected screen_id = '';
  protected state: any;
  protected type = '';

  constructor(
    protected pkid: string,
    protected baseEndPoint: string,
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
    this.http.post<any>(this.gs.getUrl(`${this.baseEndPoint}/GetListAsync`), data).subscribe({
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

  public getRecord(id: number) {
    const options = {
      params: {
        'id': id
      }
    };
    return this.http.get<T>(this.gs.getUrl(`${this.baseEndPoint}/getRecordAsync`), options);
  }

  public save(id: number, record: T) {
    const options = {
      params: {
        'id': id,
        'mode': id == 0 ? "add" : "edit"
      }
    }
    return this.http.post<T>(this.gs.getUrl(`${this.baseEndPoint}/SaveAsync`), record, options);
  }

  public delete(id: number) {
    const options = {
      params: {
        'id': id
      }
    }
    this.http.get<any>(this.gs.getUrl(`${this.baseEndPoint}/DeleteAsync`), options).subscribe({
      next: (v: any) => {
        if (v.status) {
          this.RemoveRecord(id);
        }
      },
      error: (err: any) => {
        this.gs.showAlert([err.error]);
      }
    });
  }
}
