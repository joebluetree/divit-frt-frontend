import { Component, inject } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { AirImportService } from '../../services/airimport.service';
import { iAirimport } from '../../models/iairimport';
import { iAirimporth } from '../../models/iairimporth';


@Component({
  selector: 'app-airimport-edit',
  templateUrl: './airimport-edit.component.html',
  styleUrls: ['./airimport-edit.component.css'],
  standalone: true,
  imports: [...CustomControls,]
})

//Name : Alen Cherian
//Date : 29/03/2025
//Command : Create the AirImport Components.

export class AirImportEditComponent extends baseEditComponent {

  dataList = [
    { key: 'PREPAID', value: 'PREPAID' },
    { key: 'COLLECT', value: 'COLLECT' },
    { key: 'TBA', value: 'TBA' },
  ]
  isSaved: boolean = false;

  constructor(
    private ms: AirImportService,
    public dialog: MatDialog
  ) {
    super();
    this.showModel = false;
    let date = this.gs.getToday();
    let user = this.gs.getUserName();
    this.mform = this.fb.group({
      mbl_id: [0],
      mbl_cfno: [0],
      mbl_refno: [''],
      mbl_ref_date: [date],
      mbl_shipment_stage_id: [0],
      mbl_shipment_stage_name: [''],
      mbl_mode: [''],
      mbl_no: [''],
      mbl_agent_id: [0],
      mbl_agent_name: [''],
      mbl_frt_status_name: [''],
      mbl_pol_id: [0],
      mbl_pol_name: [''],
      mbl_pol_etd: [''],
      mbl_pod_id: [0],
      mbl_pod_name: [''],
      mbl_pod_eta: [''],
      mbl_country_id: [0],
      mbl_country_name: [''],
      mbl_liner_id: [0],
      mbl_liner_name: [''],
      mbl_handled_id: [0],
      mbl_handled_name: [''],
      mbl_salesman_id: [0],
      mbl_salesman_name: [''],
      mbl_mawb_weight: [0],
      mbl_mawb_chwt: [0],
      mbl_vessel_name: [''],

      mbl_cargo_loc_id: [0],
      mbl_cargo_loc_code: [''],
      mbl_cargo_loc_name: [''],
      mbl_cargo_loc_add1: [''],
      mbl_cargo_loc_add2: [''],
      mbl_cargo_loc_add3: [''],
      mbl_cargo_loc_add4: [''],
      mbl_incoterm_id: [''],
      mbl_incoterm: [''],

      mbl_stage_changed_date: [''],
      mbl_an_sent_dt: [''],
      air_import: this.fb.array([]),
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
    this.id = 0;
    this.mform.patchValue({
      mbl_id: this.id
    })
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/Airimport/GetRecordAsync').subscribe({
      next: (rec: iAirimport) => {
        this.mform.patchValue({
          mbl_id: rec.mbl_id,
          mbl_cfno: rec.mbl_cfno,
          mbl_refno: rec.mbl_refno,
          mbl_ref_date: rec.mbl_ref_date,
          mbl_shipment_stage_id: rec.mbl_shipment_stage_id,
          mbl_shipment_stage_name: rec.mbl_shipment_stage_name,
          mbl_mode: rec.mbl_mode,
          mbl_no: rec.mbl_no,
          mbl_agent_id: rec.mbl_agent_id,
          mbl_agent_name: rec.mbl_agent_name,
          mbl_frt_status_name: rec.mbl_frt_status_name,
          mbl_pol_id: rec.mbl_pol_id,
          mbl_pol_name: rec.mbl_pol_name,
          mbl_pol_etd: rec.mbl_pol_etd,
          mbl_pod_id: rec.mbl_pod_id,
          mbl_pod_name: rec.mbl_pod_name,
          mbl_pod_eta: rec.mbl_pod_eta,
          mbl_country_id: rec.mbl_country_id,
          mbl_country_name: rec.mbl_country_name,
          mbl_liner_id: rec.mbl_liner_id,
          mbl_liner_name: rec.mbl_liner_name,
          mbl_handled_id: rec.mbl_handled_id,
          mbl_handled_name: rec.mbl_handled_name,
          mbl_salesman_id: rec.mbl_salesman_id,
          mbl_salesman_name: rec.mbl_salesman_name,
          mbl_mawb_weight: rec.mbl_mawb_weight,
          mbl_mawb_chwt: rec.mbl_mawb_chwt,
          mbl_vessel_name: rec.mbl_vessel_name,

          mbl_cargo_loc_id: rec.mbl_cargo_loc_id,
          mbl_cargo_loc_code: rec.mbl_cargo_loc_code,
          mbl_cargo_loc_name: rec.mbl_cargo_loc_name,
          mbl_cargo_loc_add1: rec.mbl_cargo_loc_add1,
          mbl_cargo_loc_add2: rec.mbl_cargo_loc_add2,
          mbl_cargo_loc_add3: rec.mbl_cargo_loc_add3,
          mbl_cargo_loc_add4: rec.mbl_cargo_loc_add4,
          mbl_incoterm_id: rec.mbl_incoterm_id,
          mbl_incoterm: rec.mbl_incoterm,

          mbl_stage_changed_date: rec.mbl_stage_changed_date,
          mbl_an_sent_dt: rec.mbl_an_sent_dt,

          rec_version: rec.rec_version,

        });
        this.fillDetails(rec.air_import);
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  addRow(rec: iAirimporth) {
    return this.fb.group({
      hbl_id: [rec?.hbl_id || 0],
      hbl_cfno: [rec?.hbl_cfno || 0],
      hbl_houseno: [rec?.hbl_houseno || ""],
      hbl_mbl_id: [rec?.hbl_mbl_id || 0],
      hbl_mbl_refno: [rec?.hbl_mbl_refno || ""],
      hbl_date: [rec?.hbl_date || ""],
      hbl_shipper_id: [rec?.hbl_shipper_id || 0],
      hbl_shipper_code: [rec?.hbl_shipper_code || ""],
      hbl_shipper_name: [rec?.hbl_shipper_name || ""],
      hbl_consignee_id: [rec?.hbl_consignee_id || 0],
      hbl_consignee_code: [rec?.hbl_consignee_code || ""],
      hbl_consignee_name: [rec?.hbl_consignee_name || ""],
      hbl_handled_id: [rec?.hbl_handled_id || 0],
      hbl_handled_name: [rec?.hbl_handled_name || ""],
      hbl_packages: [rec?.hbl_packages || 0],
      hbl_pickup_date: [rec?.hbl_pickup_date || ""],
      hbl_delivery_date: [rec?.hbl_delivery_date || ""],
      rec_created_by: [rec?.rec_created_by || ""],
      rec_created_date: [rec?.rec_created_date || ""],

    })
  }
  addDetails(iRow: iAirimporth = <iAirimporth>{}) {
    this.formArray('air_import')?.push(this.addRow(iRow));
  }

  fillDetails(ihouse_list: iAirimporth[]) {
    this.formArray('air_import').clear();
    ihouse_list.forEach((rec_air_importh: iAirimporth) => {
      this.addDetails(rec_air_importh);
    });
  }


  deleteRow(idx: number, house: string, hbl_id: number) {
    if (!hbl_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete House no ${house}?`)) {
      const param = { id: hbl_id, url: '/api/AirimportH/DeleteAsync' };

      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('air_import').removeAt(idx);
          }
        },
        error: (e) => {
          this.gs.showError(e);
        }
      });
    }
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iAirimport>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.mbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/Airimport/SaveAsync').subscribe({
      next: (v: iAirimport) => {
        if (this.mode == "add") {
          this.id = v.mbl_id;
          this.mode = "edit";
          this.mform.patchValue({ mbl_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          mbl_cfno: v.mbl_cfno,
          mbl_refno: v.mbl_refno,
          rec_version: v.rec_version
        });
        console.log(data);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
        this.isSaved = true;
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
        this.isSaved = false;
      }
    })
  }

  callBack(action: any) {
    if (action.id == 'mbl_shipment_stage_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_shipment_stage_id: action.rec.param_id,
          mbl_shipment_stage_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_shipment_stage_id: 0,
          mbl_shipment_stage_name: '',
        });
      }
    }
    if (action.id == 'mbl_agent_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_agent_id: action.rec.cust_id,
          mbl_agent_name: action.rec.cust_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_agent_id: 0,
          mbl_agent_name: '',
        });
      }
    }
    if (action.id == 'mbl_pol_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_pol_id: action.rec.param_id,
          mbl_pol_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_pol_id: 0,
          mbl_pol_name: '',
        });
      }
    }
    if (action.id == 'mbl_pod_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_pod_id: action.rec.param_id,
          mbl_pod_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_pod_id: 0,
          mbl_pod_name: '',
        });
      }
    }
    if (action.id == 'mbl_country_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_country_id: action.rec.param_id,
          mbl_country_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_country_id: 0,
          mbl_country_name: '',
        });
      }
    }
    if (action.id == 'mbl_liner_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_liner_id: action.rec.param_id,
          mbl_liner_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_liner_id: 0,
          mbl_liner_name: '',
        });
      }
    }
    if (action.id == 'mbl_cargo_loc_code') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_cargo_loc_id: action.rec.cust_id,
          mbl_cargo_loc_code: action.rec.cust_code,
          mbl_cargo_loc_name: action.rec.cust_name,
          mbl_cargo_loc_add1: action.rec.cust_address1,
          mbl_cargo_loc_add2: action.rec.cust_address2,
          mbl_cargo_loc_add3: action.rec.cust_address3,
          mbl_cargo_loc_add4: action.rec.cust_tel,
        });
      }
      else {
        this.mform.patchValue({
          mbl_cargo_loc_id: 0,
          mbl_cargo_loc_code: '',
          mbl_cargo_loc_name: '',
          mbl_cargo_loc_add1: '',
          mbl_cargo_loc_add2: '',
          mbl_cargo_loc_add3: '',
          mbl_cargo_loc_add4: '',
        });
      }
    }
    if (action.id == 'mbl_handled_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_handled_id: action.rec.param_id,
          mbl_handled_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_handled_id: 0,
          mbl_handled_name: '',
        });
      }
    }
    if (action.id == 'mbl_incoterm') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_incoterm_id: action.rec.param_id,
          mbl_incoterm: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_incoterm_id: 0,
          mbl_incoterm: '',
        });
      }
    }
    if (action.id == 'mbl_salesman_name') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_salesman_id: action.rec.param_id,
          mbl_salesman_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          mbl_salesman_id: 0,
          mbl_salesman_name: '',
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

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }
}

