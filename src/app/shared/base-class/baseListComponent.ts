import { ActivatedRoute, Router } from "@angular/router";
import { iMenum } from "../../core/models/imenum";
import { GlobalService } from "../../core/services/global.service";
import { inject } from "@angular/core";
import { Location } from "@angular/common";

export abstract class baseListComponent {

  protected route = inject(ActivatedRoute);
  protected location = inject(Location);
  public gs = inject(GlobalService);



  protected appid = '';
  protected menuid = '';
  protected title = '';
  protected type = '';

  protected bAdmin = false;
  protected bAdd = false;
  protected bEdit = false;
  protected bView = false;
  protected bPrint = false;
  protected bPdf = false;
  protected bExcel = false;
  protected bEmail = false;
  protected Print = false;
  protected bDelete = false;
  protected showModel = false;

  protected menum: iMenum | null;

  protected table_data: any[] = [];

  protected url_param: any = {};



  constructor(
    protected _ms: any
  ) {
  }

  protected init(): void {

    this.route.queryParams.forEach((rec: any) => {

      this.url_param = { ...rec };
      this.appid = rec["appid"];
      this.menuid = rec["menuid"];
      this.type = rec["type"];
      this.menum = this.gs.getUserRights(this.menuid);
      if (this.menum) {
        this.title = this.menum.menu_name;
        this.bAdmin = this.menum.rights_admin == "Y" ? true : false;
        this.bAdd = this.menum.rights_add == "Y" ? true : false;
        this.bEdit = this.menum.rights_edit == "Y" ? true : false;
        this.bView = this.menum.rights_view == "Y" ? true : false;
        this.bPrint = this.menum.rights_print == "Y" ? true : false;
        this.bPdf = this.menum.rights_pdf == "Y" ? true : false;
        this.bExcel = this.menum.rights_excel == "Y" ? true : false;
        this.bEmail = this.menum.rights_email == "Y" ? true : false;
        this.bDelete = this.menum.rights_delete == "Y" ? true : false;
        
        this.Print = this.bPrint || this.bPdf || this.bExcel || this.bEmail;

      }
    })

    this._ms.init(this.menuid, this.type, this.title);

    if (!this.gs.IsValidAppId(this.appid))
      return;
  } 

  search(_record: any) {
    this._ms.updateSearchRecord(_record.record);
    if (!_record.action) {
      _record.action = 'SEARCH';
      _record.menu_id = this.menuid;
    }
    this.getList(_record.action, _record.url);
  }

  pageEvents(arg: any) {
    this.getList(arg.action, arg.url);
  }

  getList(action: string, url: string = '') {
    this._ms.getList(action, url);
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this._ms.sortColumn = data.sort_column;
      this._ms.sortOrder = data.sort_order;
    }
    if (data.action == 'ROW-SELECTED') {
      this._ms.selectedRow = data.row_id;
    }
    if (data.action == 'DELETE') {
      this.deleteRecord(data);
    }
  }

  deleteRecord(data: any) {
    this._ms.delete(data);
  }

  return2Parent() {
    this.location.back();
  }


}
