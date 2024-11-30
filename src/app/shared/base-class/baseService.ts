import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { GlobalService } from "../../core/services/global.service";
import { firstValueFrom } from "rxjs";

export abstract class baseService {

  protected http = inject(HttpClient);
  protected gs = inject(GlobalService);

  protected screen_id = '';
  protected state: any;
  protected type = '';

  constructor(
    protected pkid: string,
    protected name: string,
  ) {
  }
  protected abstract setInitialState(): any;

  public init(_screen_id: string, _type: string = '') {
    this.type = _type;
    this.state = this.gs.appStates[_screen_id] || this.setInitialState();
    this.gs.appStates[_screen_id] = this.state;
  }

  public UpdateRecord(record: any, mode: string) {
    if (!this.state)
      return;

    if (mode == "add")
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

  public getList(action: string, url: string = "") {
    let data = { menu_id: this.screen_id, action: action, ...this.state.searchRecord, ...this.state.pageRecord, ...this.gs.globalConstants };
    const options = {
      headers: this.gs.getHeaders(),
    };
    this.http.post<any>(this.gs.getUrl(url), data, options).subscribe({
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

  public getRecord(data: any, url: string = "") {
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...data }
    };
    return this.http.get<any>(this.gs.getUrl(url), options);
  }

  public async getSequence(param: any) {
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...param }
    }
    const result = await firstValueFrom(this.http.get<any>(this.gs.getUrl(`/api/search/GetSequenceAsync`), options));
    return result;
  }

  public postData(data: any, url: string = "") {
    let param = { ...data }
    const options = {
      headers: this.gs.getHeaders(),
    };
    return this.http.post<any>(this.gs.getUrl(url), param, options);
  }

  public save(param: any, record: any, url: string = "") {
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...param }
    }
    return this.http.post<any>(this.gs.getUrl(url), record, options);
  }

  public delete(data: any) {
    if (data.url == '') {
      alert('No Url Specified');
      return;
    }
    if (!confirm(`Delete ${data.rec[this.name]} y/n`))
      return;
    this.deleteRecord({ 'id': data.rec[this.pkid], url: data.url });
  }

  public deleteRecord(data: any) {
    if (data.url == '') {
      alert('No Url Specified');
      return;
    }
    const options = {
      headers: this.gs.getHeaders(),
      params: { ...data }
    }
    let mUrl = data.url;
    this.http.get<any>(this.gs.getUrl(mUrl), options).subscribe({
      next: (v: any) => {
        if (v.status) {
          this.RemoveRecord(data.id);
        }
      },
      error: (err: any) => {
        this.gs.showAlert([err.error]);
      }
    });
  }

}
