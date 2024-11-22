import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomermService } from '../../services/customerm.service';
import { iContactm, iCustomerm } from '../../models/icustomerm';
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

  titleList = [
    { key: 'NA', value: 'NA' },
    { key: 'MR', value: 'MR' },
    { key: 'MRS', value: 'MRS' },
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
      cust_credit_limit: [0],

      cust_contacts: this.fb.array([]),
      rec_version: [0],

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
    this.addContact();
  }

  addRow(rec: iContactm) {
    return this.fb.group({
      cont_id: [rec?.cont_id || 0],
      cont_parent_id: [rec?.cont_parent_id || 0],
      cont_title: [rec?.cont_title || "NA"],
      cont_name: [rec?.cont_name || ""],
      cont_designation: [rec?.cont_designation || ""],
      cont_email: [rec?.cont_email || ""],
      cont_tel: [rec?.cont_tel || ""],
      cont_mobile: [rec?.cont_mobile || ""],
      cont_remarks: [rec?.cont_remarks || ""],
      cont_country_id: [rec?.cont_country_id || 0],
      cont_country_code: [rec?.cont_country_code || ""],
      cont_country_name: [rec?.cont_country_name || ""],
    });
  }

  addContact(iRow: iContactm = <iContactm>{}) {
    this.formArray('cust_contacts')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    this.formArray('cust_contacts').removeAt(idx);
  }

  fillContacts(icontact_list: iContactm[]) {
    this.formArray('cust_contacts').clear();
    icontact_list.forEach((rec_contact: iContactm) => {
      this.addContact(rec_contact);
    });

  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/customer/GetRecordAsync').subscribe({
      next: (rec: iCustomerm) => {
        this.mform.patchValue({
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
          cust_credit_limit: rec.cust_credit_limit,
          rec_version: rec.rec_version,

        });
        this.fillContacts(rec.cust_contacts);
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
          rec_version: v.rec_version
        });
        this.fillContacts(v.cust_contacts);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  callBack(action: { id: string, name: string, rowIndex: number, rec: any }) {
    if (action.name == 'cont_cust_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_parent_id: action.rec.cust_id,
          cust_parent_name: action.rec.cust_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_parent_id: null,
          cust_parent_name: '',
        });
      }
    }
    if (action.name == 'cont_country_code') {
      if (action.rec) {
        this.formArrayRecord('cust_contacts', action.rowIndex)?.patchValue({
          cont_country_id: action.rec.param_id,
          cont_country_code: action.rec.param_code,
          cont_country_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cont_country_id: null,
          cont_country_code: '',
          cont_country_name: '',
        });
      }
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
    });
  }



}

