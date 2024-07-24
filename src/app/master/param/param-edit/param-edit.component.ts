import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { iParam, iParamModel } from '../../models/iparam';
import { CustomControls } from '../../../app.config';
import { ParamService } from '../../services/param.service';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

@Component({
  selector: 'app-param-edit',
  templateUrl: './param-edit.component.html',
  styleUrls: ['./param-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class ParamEditComponent extends baseEditComponent {

  constructor(
    private ms: ParamService
  ) {
    super();
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      param_id: [0],
      param_code: ['', [Validators.required, Validators.maxLength(60)]],
      param_name: ['', [Validators.required, Validators.maxLength(60)]],
      param_order: ['', [Validators.required, Validators.minLength(1)]],
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
      next: (rec: iParam) => {
        this.mform.setValue({
          param_id: rec.param_id,
          param_code: rec.param_code,
          param_name: rec.param_name,
          param_order: rec.param_order,
          rowversion: rec.rowversion,
        })
      },
      error: (e) => {
        alert(e.message);
      }
    })
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iParam>this.mform.value;
    data.param_type = this.type;

    if (data.param_id == null)
      data.param_id = 0;

    let bAdd = data.param_id == 0 ? true : false;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.param_id,
      'mode': bAdd ? "add" : "edit"
    }
    this.ms.save(param, data).subscribe({
      next: (v: iParam) => {
        if (data.param_id == 0) {
          this.id = v.param_id;
          data.param_id = this.id;
          this.mform.patchValue({ param_id: this.id });
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
        this.gs.showAlert([e.error]);
      },
      complete: () => { }

    })
  }


}
