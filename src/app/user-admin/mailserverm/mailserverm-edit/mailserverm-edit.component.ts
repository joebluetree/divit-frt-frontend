import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MailServermService } from '../../services/mailserverm.service';
import { MatDialog } from '@angular/material/dialog';
import { iMail_Serverm } from '../../models/imailserverm';
import { HistoryComponent } from '../../../shared/history/history.component';

@Component({
  selector: 'app-mailserverm-edit',
  templateUrl: './mailserverm-edit.component.html',
  styleUrls: ['./mailserverm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 20/01/2025
//Command : Create the Mail Server Settings Components.

export class MailServermEditComponent extends baseEditComponent {

  dataList = [
    { key: 'Y', value: 'YES' },
    { key: 'N', value: 'NO' }
  ]

  constructor(
    private ms: MailServermService,
  ) {
    super();
    this.showModel = false;
    this.mform = this.fb.group({
      mail_id: [0],
      mail_name: [''],
      mail_smtp_name: [''],
      mail_smtp_port: ['587'],
      mail_is_ssl: ['Y'],
      mail_is_auth: ['Y'],
      mail_is_spa: ['Y'],
      mail_bulk_tot: [1000],
      mail_bulk_sub: [100],
      mail_smtp_username: [''],
      mail_smtp_pwd: [''],
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
      mail_id: this.id
    })
  }


  getRecord() {
    if (this.id <= 0) {
      return;
    }

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/mailserver/GetRecordAsync').subscribe({
      next: (rec: iMail_Serverm) => {
        this.mform.patchValue({
          mail_id: rec.mail_id,
          mail_name: rec.mail_name,
          mail_smtp_name: rec.mail_smtp_name,
          mail_smtp_port: rec.mail_smtp_port,
          mail_is_ssl: rec.mail_is_ssl,
          mail_is_auth: rec.mail_is_auth,
          mail_is_spa: rec.mail_is_spa,
          mail_bulk_tot: rec.mail_bulk_tot,
          mail_bulk_sub: rec.mail_bulk_sub,
          mail_smtp_username: rec.mail_smtp_username,
          mail_smtp_pwd: rec.mail_smtp_pwd,
          rec_version: rec.rec_version,
        });
        console.log(rec);
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
    const data = <iMail_Serverm>this.mform.value;

    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    const param = {
      'id': data.mail_id,
      'mode': this.mode
    }
    console.log(param);
    console.log(data);
    this.ms.save(param, data, '/api/mailserver/SaveAsync').subscribe({
      next: (v: iMail_Serverm) => {
        if (this.mode == "add") {
          this.id = v.mail_id;
          this.mode = "edit";
          this.mform.patchValue({ mail_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          // mail_id: v.mail_id,
          rec_version: v.rec_version
        });
        console.log(data);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  // openHistory(): void {
  //   const dialogRef = this.dialog.open(HistoryComponent, {
  //     hasBackdrop: false,
  //     width: '250px',
  //     data: { title: 'History', message: 'Edit Details' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }

}
