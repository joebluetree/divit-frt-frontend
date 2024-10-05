import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { iCompanym } from '../../models/icompanym';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class CompanyEditComponent extends baseEditComponent {

  constructor(
    private ms: CompanyService,
  ) {
    super();
    this.mform = this.fb.group({
      comp_id: [0],
      comp_code: ['', [Validators.required, Validators.maxLength(20)]],
      comp_name: ['', [Validators.required, Validators.maxLength(100)]],
      comp_address1: ['', [Validators.required, Validators.maxLength(100)]],
      comp_address2: ['', [Validators.required, Validators.maxLength(100)]],
      comp_address3: ['', [Validators.required, Validators.maxLength(100)]],
      rec_version: [0],
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

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      comp_id: this.id
    })
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/company/GetRecordAsync').subscribe({
      next: (rec: iCompanym) => {
        this.mform.setValue({
          comp_id: rec.comp_id,
          comp_code: rec.comp_code,
          comp_name: rec.comp_name,
          comp_address1: rec.comp_address1,
          comp_address2: rec.comp_address2,
          comp_address3: rec.comp_address3,
          rec_version: rec.rec_version,

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
    const data = <iCompanym>this.mform.value;

    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.comp_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/company/SaveAsync').subscribe({
      next: (v: iCompanym) => {
        if (this.mode == "add") {
          this.id = v.comp_id;
          this.mode = "edit";
          this.mform.patchValue({ comp_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version
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

