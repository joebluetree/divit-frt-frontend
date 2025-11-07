import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { YearService } from '../../services/year.service';
import { iYearm } from '../../models/iyearm';


@Component({
  selector: 'app-year-edit',
  templateUrl: './year-edit.component.html',
  styleUrls: ['./year-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 29/10/2025
//Remark : this component manages creation,editing and saving of Year Master records

export class YearEditComponent extends baseEditComponent {

  constructor(
    private ms: YearService,
  ) {
    super();
    this.mform = this.fb.group({
      year_id: [0],
      year_code: [0, [Validators.required, Validators.min(1000), Validators.max(9999)]],
      year_name: [''],
      year_start_date: [''],
      year_end_date: [''],
      year_closed: ['N'],
      year_default: ['N'],
    });
    // this.showModel = true;
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
      year_id: this.id
    })
  }

  getRecord() {

    const param = {
      'comp_id': this.gs.user.user_company_id,
      'id': this.id
    }

    this.ms.getRecord(param, '/api/year/GetRecordAsync').subscribe({
      next: (rec: iYearm) => {
        this.mform.patchValue({
          year_id: rec.year_id,
          year_code: rec.year_code,
          year_name: rec.year_name,
          year_start_date: rec.year_start_date,
          year_end_date: rec.year_end_date,
          year_closed: rec.year_closed,
          year_default: rec.year_default,
        });
      },
      error: (e) => {
        this.gs.showError(e);
      },
      complete: () => { }
    })
  }


  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iYearm>this.mform.value;

    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': this.id,
      'mode': this.mode
    }

    this.ms.save(param, data, '/api/year/SaveAsync').subscribe({
      next: (v: iYearm) => {
        if (this.mode == "add") {
          this.id = v.year_id;
          this.mode = "edit";
          this.mform.patchValue({ 
            year_id: this.id 
          });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          year_code: v.year_code,
          year_default: v.year_default
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
