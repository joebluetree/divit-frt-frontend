import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { TrackmService } from '../../services/trackm.service';
import { iTrackm } from '../../models/itrackm';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class TrackEditComponent extends baseEditComponent {


  constructor(
    private ms: TrackmService,
  ) {
    super();
    this.mform = this.fb.group({
      track_id: [0],
      track_book_no: ['', [Validators.maxLength(100)]],
      track_cntr_no: ['', [Validators.required, Validators.maxLength(11)]],
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
    this.id = 0;
    this.mform.patchValue({
      track_id: this.id
    })
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/tnt/GetRecordAsync').subscribe({
      next: (rec: iTrackm) => {
        this.mform.setValue({
          track_id: rec.track_id,
          track_book_no: rec.track_book_no,
          track_cntr_no: rec.track_cntr_no,
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
    const data = <iTrackm>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.track_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/tnt/SaveAsync').subscribe({
      next: (v: iTrackm) => {
        if (this.mode == "add") {
          this.id = v.track_id;
          this.mode = "edit";
          this.mform.patchValue({ track_id: this.id });
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

  loadTracking() {

    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iTrackm>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    const param = {
      'id': data.track_id,
      'cntr': data.track_cntr_no,
      'comp_id': data.rec_company_id
    }
    this.ms.postData(param, "/api/tnt/GetTrackingDetails").subscribe({
      next: (v: any) => {

      },
      error: (e) => {
        this.gs.showAlert([e.error, e.message]);
      }
    })

  }


  // callBack_Customer(action: { id: string, rec: iTrackm }) {
  //   if (action.rec == null) {
  //     this.mform.patchValue({
  //       cust_parent_id: null,
  //       cust_parent_name: '',
  //     });
  //   }
  //   else {
  //     this.mform.patchValue({
  //       cust_parent_id: action.rec.cust_id,
  //       cust_parent_name: action.rec.cust_name,
  //     });
  //   }
  // }



}

