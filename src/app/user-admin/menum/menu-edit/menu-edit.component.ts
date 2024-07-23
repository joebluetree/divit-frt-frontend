import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { iMenum } from '../../models/imenum';
import { iModulem } from '../../models/imodulem';
import { CustomControls } from '../../../app.config';
import { MenuService } from '../../services/menu.service';
import { baseEditComponent } from '../../../shared/baseEditComponent';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class MenuEditComponent extends baseEditComponent {

  constructor(
    private ms: MenuService,
  ) {
    super();
    this.mform = this.fb.group({
      menu_id: [0],
      menu_code: ['', [Validators.required, Validators.maxLength(20)]],
      menu_name: ['', [Validators.required, Validators.maxLength(60)]],
      menu_route: ['', [Validators.required, Validators.maxLength(60)]],
      menu_param: ['', [Validators.maxLength(100)]],
      menu_visible: ['Y'],
      menu_module_id: [0, [Validators.required]],
      menu_module_name: ['', [Validators.required, Validators.maxLength(60)]],
      menu_order: ['', [Validators.required]],
      rowversion: [''],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0)
      return;
    const param = { 'id': this.id };
    this.ms.getRecord(param).subscribe({
      next: (rec: iMenum) => {
        this.mform.setValue({
          menu_id: rec.menu_id,
          menu_code: rec.menu_code,
          menu_name: rec.menu_name,
          menu_route: rec.menu_route,
          menu_param: rec.menu_param,
          menu_module_id: rec.menu_module_id,
          menu_module_name: rec.menu_module_name,
          menu_visible: rec.menu_visible,
          menu_order: rec.menu_order,
          rowversion: rec.rowversion,

        })
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }


  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iMenum>this.mform.value;

    if (data.menu_id == null)
      data.menu_id = 0;

    let bAdd = data.menu_id == 0 ? true : false;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.menu_id,
      'mode': bAdd ? "add" : "edit"
    }
    this.ms.save(param, data).subscribe({
      next: (v: iMenum) => {
        if (data.menu_id == 0) {
          this.id = v.menu_id;
          data.menu_id = this.id;
          this.mform.patchValue({ menu_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rowversion: v.rowversion
        });
        this.ms.UpdateList(v, bAdd);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error || e.message]);
      },
      complete: () => { }

    })
  }

  callBack(action: { id: string, rec: iModulem }) {

    if (action.id == 'menu_module_name') {
      this.mform.patchValue({
        menu_module_id: action.rec ? action.rec.module_id : 0,
        menu_module_name: action.rec ? action.rec.module_name : '',
      })
    }
  }

}
