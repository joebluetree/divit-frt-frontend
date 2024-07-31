import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';
import { iModulem } from '../../models/imodulem';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

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
      module_id: [0, [Validators.required]],
      module_name: ['', [Validators.required, Validators.maxLength(60)]],
      module_is_installed: ['Y'],
      module_order: ['', [Validators.required]],
      rowversion: [''],
    })
  }

  ngOnInit() {

    this.id = 0;
    this.init();
    if (this.mode == "add")
      this.newRecord();
    if (this.mode == "edit")
      this.getRecord();
  }

  async newRecord() {
    try {
      this.id = await this.ms.getSequence({ name: 'master' });
      this.mform.patchValue({
        module_id: this.id
      })
    }
    catch (error: any) {
      this.gs.showAlert([error.message]);
    }

  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param).subscribe({
      next: (rec: iModulem) => {
        this.mform.setValue({
          module_id: rec.module_id,
          module_name: rec.module_name,
          module_is_installed: rec.module_is_installed,
          module_order: rec.module_order,
          rowversion: rec.rowversion,
        })
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }


  allvalid() {
    let msg = [];
    if (this.id <= 0) {
      msg.push('Invalid ID')
    }
    if (this.mform.invalid) {
      msg.push('Not all data are entered')
    }
    if (msg.length > 0) {
      this.gs.showAlert(msg);
      return false;
    }
    return true;
  }

  save() {

    if (!this.allvalid())
      return;

    const data = <iModulem>this.mform.value;

    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.module_id,
      'mode': this.mode
    }
    this.ms.save(param, data).subscribe({
      next: (v: iModulem) => {
        if (this.mode == "add") {
          this.id = v.module_id;
          this.mode = "edit";
          this.mform.patchValue({ module_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rowversion: v.rowversion
        });
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }

    })
  }

}
