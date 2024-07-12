import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomermService } from '../../services/customerm.service';
import { iCustomerm } from '../../models/icustomerm';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/baseEditComponent';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class CustomerEditComponent extends baseEditComponent {



  filter = { cust_row_type: this.type };

  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'AR', value: 'AR' },
    { key: 'AP', value: 'AP' },
  ]

  constructor(
    private service: CustomermService,
    private fb: FormBuilder,
  ) {
    super();
    this.mform = this.fb.group({
      cust_id: [0],
      cust_code: ['', [Validators.required, Validators.maxLength(15)]],
      cust_short_name: ['', [Validators.maxLength(15)]],
      cust_name: ['', [Validators.required, Validators.maxLength(100)]],

      cust_display_name: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address1: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address2: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address3: [''],

      cust_type: [''],
      cust_row_type: [this.type],
      cust_parent_id: [null],
      cust_parent_name: [''],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0) {
      return;
    }
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        console.log(rec);
        this.mform.setValue({
          cust_id: rec.cust_id,
          cust_code: rec.cust_code,
          cust_short_name: rec.cust_short_name,
          cust_name: rec.cust_name,
          cust_display_name: rec.cust_display_name,
          cust_address1: rec.cust_address1,
          cust_address2: rec.cust_address2,
          cust_address3: rec.cust_address3,
          cust_type: rec.cust_type,
          cust_row_type: rec.cust_row_type,
          cust_parent_id: rec.cust_parent_id,
          cust_parent_name: rec.cust_parent_name,
        });
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
    const data = <iCustomerm>this.mform.value;

    if (data.cust_id == null)
      data.cust_id = 0;

    data.cust_row_type = this.type;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (v: iCustomerm) => {
        if (data.cust_id == 0) {
          this.id = v.cust_id;
          data.cust_id = this.id;
          this.mform.patchValue({ cust_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        // this.store.dispatch(upsert_row({ record: v, row_type: this.type }));
        this.gs.showAlert(["Save Complete"]);

      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }

    })
  }


  callBack_Customer(action: { id: string, rec: iCustomerm }) {
    if (action.rec == null) {
      this.mform.patchValue({
        cust_parent_id: null,
        cust_parent_name: '',
      });
    }
    else {
      this.mform.patchValue({
        cust_parent_id: action.rec.cust_id,
        cust_parent_name: action.rec.cust_name,
      });
    }
  }


}

