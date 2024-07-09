import { ActivatedRoute, Router } from "@angular/router";
import { iMenum } from "../core/models/imenum";
import { GlobalService } from "../core/services/global.service";
import { inject } from "@angular/core";
import { Location } from "@angular/common";

export abstract class baseEditComponent {

  protected route = inject(ActivatedRoute);
  protected location = inject(Location);
  public gs = inject(GlobalService);

  protected id = 0;
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

  constructor() {
  }

  protected init(): void {

    this.route.queryParams.forEach((rec: any) => {

      this.appid = rec["appid"];
      this.id = +rec["id"];
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
    });

    if (!this.gs.IsValidAppId(this.appid))
      return;

  }


  return2Parent() {
    this.location.back();
  }

}
