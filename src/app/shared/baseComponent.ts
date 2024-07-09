import { ActivatedRoute, Router } from "@angular/router";
import { iMenum } from "../core/models/imenum";
import { GlobalService } from "../core/services/global.service";
import { inject } from "@angular/core";
import { Location } from "@angular/common";

export abstract class baseComponent {

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
  protected bDelete = false;

  protected menum: iMenum | null;

  protected table_data: any[] = [];

  protected abstract deleteRecord(data: any): any;


  constructor(protected _ms: any) {
  }

  protected init(): void {

    this.route.queryParams.forEach((rec: any) => {
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
        this.bDelete = this.menum.rights_delete == "Y" ? true : false;
      }
    })

    this._ms.init(this.menuid, this.type);

    if (!this.gs.IsValidAppId(this.appid))
      return;
  }

  search(_record: any) {
    this._ms.updateSearchRecord(_record);
    this.getList('SEARCH');
  }

  pageEvents(arg: any) {
    this.getList(arg.action);
  }

  getList(action: string) {
    this._ms.getList(action);
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

  return2Parent() {
    this.location.back();
  }

}
