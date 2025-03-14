import { Component, inject } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { AirExportService } from '../../services/airexport.service';
import { iAirexport } from '../../models/iairexport';
import { AirExporthListComponent } from '../../airexporth/airexporth-list/airexporth-list.component';
import { AirExporthService } from '../../services/airexporth.service';
import { iAirexporth } from '../../models/iairexporth';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-airexport-edit',
  templateUrl: './airexport-edit.component.html',
  styleUrls: ['./airexport-edit.component.css'],
  standalone: true,
  imports: [...CustomControls,]
})

//Name : Alen Cherian
//Date : 24/02/2025
//Command : Create the AirExport Components.

export class AirExportEditComponent extends baseEditComponent {

  protected http = inject(HttpClient);

  dataList = [
    { key: 'PREPAID', value: 'PREPAID' },
    { key: 'COLLECT', value: 'COLLECT' },
    { key: 'TBA', value: 'TBA' },
  ]
  isSaved: boolean = false;

  constructor(
    private ms: AirExportService,
    public bs: AirExporthService,
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
      mbl_shipment_stage_id: [null],
      mbl_shipment_stage_name: [''],
      mbl_mode: [''],
      mbl_no: [''],
      mbl_agent_id: [null],
      mbl_agent_name: [''],
      mbl_frt_status_name: [''],
      mbl_pol_id: [null],
      mbl_pol_name: [''],
      mbl_pol_etd: [''],
      mbl_pod_id: [null],
      mbl_pod_name: [''],
      mbl_pod_eta: [''],
      mbl_country_id: [null],
      mbl_country_name: [''],
      mbl_liner_id: [null],
      mbl_liner_name: [''],
      mbl_by_carrier1: [''],
      mbl_by_carrier2: [''],
      mbl_by_carrier3: [''],
      mbl_to_port1: [''],
      mbl_to_port2: [''],
      mbl_to_port3: [''],
      mbl_currency_id: [null],
      mbl_currency_code: [''],
      mbl_handled_id: [null],
      mbl_handled_name: [''],
      mbl_salesman_id: [null],
      mbl_salesman_name: [''],
      mbl_mawb_weight: [0],
      mbl_mawb_chwt: [0],
      mbl_3rdparty: [''],
      mbl_direct: [''],
      mbl_vessel_name: [''],
      mbl_voyage: [''],
      air_export: this.fb.array([]),
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
    this.ms.getRecord(param, '/api/Airexport/GetRecordAsync').subscribe({
      next: (rec: iAirexport) => {
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
          mbl_by_carrier1: rec.mbl_by_carrier1,
          mbl_by_carrier2: rec.mbl_by_carrier2,
          mbl_by_carrier3: rec.mbl_by_carrier3,
          mbl_to_port1: rec.mbl_to_port1,
          mbl_to_port2: rec.mbl_to_port2,
          mbl_to_port3: rec.mbl_to_port3,
          mbl_currency_id: rec.mbl_currency_id,
          mbl_currency_code: rec.mbl_currency_code,
          mbl_handled_id: rec.mbl_handled_id,
          mbl_handled_name: rec.mbl_handled_name,
          mbl_salesman_id: rec.mbl_salesman_id,
          mbl_salesman_name: rec.mbl_salesman_name,
          mbl_mawb_weight: rec.mbl_mawb_weight,
          mbl_mawb_chwt: rec.mbl_mawb_chwt,
          mbl_3rdparty: rec.mbl_3rdparty,
          mbl_direct: rec.mbl_direct,
          mbl_vessel_name: rec.mbl_vessel_name,
          mbl_voyage: rec.mbl_voyage,
          rec_version: rec.rec_version,

        });
        this.fillDetails(rec.air_export);
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  addRow(rec: iAirexporth) {
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
      hbl_issued_date: [rec?.hbl_issued_date || ""],
      hbl_delivery_date: [rec?.hbl_delivery_date || ""],
      rec_created_by: [rec?.rec_created_by || ""],

    })
  }
  addDetails(iRow: iAirexporth = <iAirexporth>{}) {
    this.formArray('air_export')?.push(this.addRow(iRow));
  }

  fillDetails(ihouse_list: iAirexporth[]) {
    this.formArray('air_export').clear();
    ihouse_list.forEach((rec_air_exporth: iAirexporth) => {
      this.addDetails(rec_air_exporth);
    });
  }


  deleteRow(idx: number, house: string, hbl_id: number) {
    if (!hbl_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete House no ${house}?`)) {
      const param = { id: hbl_id, url: '/api/AirexportH/DeleteAsync' };

      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('air_export').removeAt(idx);
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
    const data = <iAirexport>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.mbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/Airexport/SaveAsync').subscribe({
      next: (v: iAirexport) => {
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

  callBack(action: { id: string, name: string, rowIndex: number, rec: any }) {
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
    if (action.id == 'mbl_currency_code') {
      if (action.rec) {
        this.mform.patchValue({
          mbl_currency_id: action.rec.param_id,
          mbl_currency_code: action.rec.param_code,
        });
      }
      else {
        this.mform.patchValue({
          mbl_currency_id: 0,
          mbl_currency_code: '',
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

