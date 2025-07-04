import { ActivatedRoute } from "@angular/router";
import { iMenum } from "../../core/models/imenum";
import { GlobalService } from "../../core/services/global.service";
import { inject } from "@angular/core";
import { Location } from "@angular/common";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

export abstract class baseEditComponent {

  protected route = inject(ActivatedRoute);
  protected location = inject(Location);
  public gs = inject(GlobalService);

  protected fb = inject(FormBuilder);

  protected mform: FormGroup;
  protected showModel = false;

  protected id = 0;
  protected mode = '';
  protected appid = '';
  protected menuid = '';
  protected title = '';
  protected type = '';

  protected bExceptionRaised = false;

  protected bAdmin = false;
  protected bAdd = false;
  protected bEdit = false;
  protected bView = false;
  protected bPrint = false;
  protected bPdf = false;
  protected bExcel = false;
  protected bEmail = false;
  protected bDelete = false;

  protected menum: iMenum | null;

  constructor() {
  }

  protected init(): void {

    this.route.queryParams.forEach((rec: any) => {

      this.appid = rec["appid"];
      this.mode = rec["mode"];
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
        this.bPrint = this.menum.rights_print == "Y" ? true : false;
        this.bPdf = this.menum.rights_pdf == "Y" ? true : false;
        this.bExcel = this.menum.rights_excel == "Y" ? true : false;
        this.bEmail = this.menum.rights_email == "Y" ? true : false;
        this.bDelete = this.menum.rights_delete == "Y" ? true : false;
      }
    });

    if (!this.gs.IsValidAppId(this.appid))
      return;

  }

  public formArray(sName: string): FormArray {
    return this.mform.get(sName) as FormArray;
  }

  formArrayRecord(sName: string, index: number) {
    const _formGroup = this.formArray(sName);
    if (index >= 0 && index < _formGroup.length) {
      const row = _formGroup.at(index);
      return row;
    } else {
      return null;
    }
  }


  public get url() {
    return this.gs.url;
  }
  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  getControl(ctrlName: string) {
    return this.mform.controls[ctrlName];
  }

  return2Parent() {
    this.location.back();
  }

}
