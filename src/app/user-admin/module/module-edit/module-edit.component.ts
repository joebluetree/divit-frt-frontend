import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';
import { iModulem } from '../../models/imodulem';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/baseEditComponent';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class ModuleEditComponent extends baseEditComponent {

  constructor(
    private ms: ModuleService
  ) {
    super();
    this.mform = this.fb.group({
      module_id: [0],
      module_name: ['', [Validators.required, Validators.maxLength(60)]],
      module_is_installed: ['Y'],
      module_order: ['', [Validators.required]],
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
      next: (rec) => {
        this.mform.setValue({
          module_id: rec.module_id,
          module_name: rec.module_name,
          module_is_installed: rec.module_is_installed,
          module_order: rec.module_order
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
    const data = <iModulem>this.mform.value;

    if (data.module_id == null)
      data.module_id = 0;

    let bAdd = data.module_id == 0 ? true : false;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    const param = {
      'id': data.module_id,
      'mode': bAdd ? "add" : "edit"
    }
    this.ms.save(param, data).subscribe({
      next: (v: iModulem) => {
        if (data.module_id == 0) {
          this.id = v.module_id;
          data.module_id = this.id;
          this.mform.patchValue({ module_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.ms.UpdateList(v, bAdd);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }

    })
  }

}
