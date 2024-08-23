import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { iParam } from '../../models/iparam';
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

  value1 = "";
  value2 = "";
  value3 = "";
  value4 = "";
  value5 = "";


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
      param_value1: ['', [Validators.maxLength(100)]],
      param_value2: ['', [Validators.maxLength(100)]],
      param_value3: ['', [Validators.maxLength(100)]],
      param_value4: ['', [Validators.maxLength(100)]],
      param_value5: ['', [Validators.maxLength(100)]],
      param_order: ['', [Validators.required, Validators.minLength(1)]],
      rowversion: [''],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();

    if (this.type == "SEA CARRIER") {
      this.value1 = "SCAC Code";
    }


    if (this.mode == "add")
      this.newRecord();
    if (this.mode == "edit")
      this.getRecord();
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      param_id: this.id
    })
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/param/GetRecordAsync').subscribe({
      next: (rec: iParam) => {
        this.mform.setValue({
          param_id: rec.param_id,
          param_code: rec.param_code,
          param_name: rec.param_name,
          param_value1: rec.param_value1,
          param_value2: rec.param_value2,
          param_value3: rec.param_value3,
          param_value4: rec.param_value4,
          param_value5: rec.param_value5,
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

    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.param_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/param/SaveAsync').subscribe({
      next: (v: iParam) => {
        if (this.mode = "add") {
          this.id = v.param_id;
          this.mode = "edit";
          this.mform.patchValue({ param_id: this.id });
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

  getTitle() {
    return "SETTINGS / " + this.type + " / " + this.mform.value.param_name;
  }


}
