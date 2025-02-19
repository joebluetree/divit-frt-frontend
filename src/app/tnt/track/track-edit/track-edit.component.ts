import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { TrackmService } from '../../services/trackm.service';
import { iTrackm } from '../../models/itrackm';
import { iTracking_data } from '../../models/itracking_data';
import { iParam } from '../../../master/models/iparam';

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
      track_carrier_id: [0],
      track_carrier_name: [''],
      track_carrier_scac: [''],
      track_api_type: [''],
      track_request_id: [''],

      rec_version: [0],
      tracking_data: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();

    this.showModel = false;

    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
  }

  addRow(rec: iTracking_data) {
    return this.fb.group({
      track_id: [rec.tnt_track_id || 0],
      tnt_trackm_id: [rec.tnt_trackm_id || 0],
      tnt_trackd_id: [rec.tnt_trackd_id || 0],
      event_date: [rec.tnt_event_date || ''],
      tnt_date: [rec.tnt_date || ''],
      tnt_transport_mode: [rec.tnt_transport_mode || ''],
      tnt_event_type: [rec.tnt_event_type || ''],
      tnt_status_code: [rec.tnt_status_code || ''],
      tnt_status_name: [rec.tnt_status_name || ''],
      tnt_port_code: [rec.tnt_port_code || ''],
      tnt_port_name: [rec.tnt_port_name || ''],
      tnt_port_location: [rec.tnt_port_location || ''],
      tnt_vessel: [rec.tnt_vessel || ''],
      tnt_vessel_imon: [rec.tnt_vessel_imon || ''],
      tnt_voyage: [rec.tnt_voyage || ''],
      tnt_row_type: [rec.tnt_row_type || ''],
    })
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
        this.mform.patchValue({
          track_id: rec.track_id,
          track_book_no: rec.track_book_no,
          track_cntr_no: rec.track_cntr_no,

          track_carrier_id: rec.track_carrier_id,
          track_carrier_name: rec.track_carrier_name,
          track_carrier_scac: rec.track_carrier_scac,

          track_api_type: rec.track_api_type,
          track_request_id: rec.track_request_id,

          rec_version: rec.rec_version,
        });

        console.log(this.mform.value);

        this.formArray('tracking_data').clear();
        rec.tracking_data.forEach(rec => {
          this.formArray('tracking_data').push(this.addRow(rec))
        });

      },
      error: (e) => {
        this.gs.showError(e);
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
          track_api_type: v.track_api_type,
          track_request_id: v.track_request_id,
          rec_version: v.rec_version
        });
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  loadTrackingDetails() {

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
      'carrier_id': data.track_carrier_id,
      'comp_id': data.rec_company_id,
      'track_api_type': data.track_api_type,
      'track_request_id': data.track_request_id
    }
    this.ms.postData(param, "/api/tnt/GetTrackingDetails").subscribe({
      next: (v: any) => {
        this.getRecord();
      },
      error: (e) => {
        this.gs.showAlert([e.error, e.message]);
      }
    })

  }

  callBack(action: { id: string, rec: iParam }) {
    if (action.id == 'track_carrier_name') {
      this.mform.patchValue({
        track_carrier_id: action.rec ? action.rec.param_id : 0,
        track_carrier_name: action.rec ? action.rec.param_name : "",
      })
    }
  }

}
