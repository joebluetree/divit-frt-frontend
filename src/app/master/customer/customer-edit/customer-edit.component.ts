import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomermService } from '../../services/customerm.service';
import { iCustomerm } from '../../models/icustomerm';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';


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
    private ms: CustomermService,
    public dialog: MatDialog
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
      rowversion: [''],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();

    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
  }

  async newRecord() {
    this.id = await this.ms.getSequence({ name: 'master' });
    this.mform.patchValue({
      cust_id: this.id
    })
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/customer/GetRecordAsync').subscribe({
      next: (rec: iCustomerm) => {
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
          rowversion: rec.rowversion,

        });
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
    const data = <iCustomerm>this.mform.value;

    data.cust_row_type = this.type;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.cust_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/customer/SaveAsync').subscribe({
      next: (v: iCustomerm) => {
        if (this.mode == "add") {
          this.id = v.cust_id;
          this.mode = "edit";
          this.mform.patchValue({ cust_id: this.id });
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
      }
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


  openHistory(): void {
    const dialogRef = this.dialog.open(HistoryComponent, {
      hasBackdrop: false,
      width: '250px',
      data: { title: 'History', message: 'Edit Details' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }



}

