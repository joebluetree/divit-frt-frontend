import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { AirExportService } from '../../services/airexport.service';
import { iAirexporth, iAirExporthModel } from '../../models/iairexporth';


@Component({
  selector: 'app-airexporth-edit',
  templateUrl: './airexporth-edit.component.html',
  styleUrls: ['./airexporth-edit.component.css'],
  standalone: true,
  imports: [...CustomControls,]
})

//Name : Alen Cherian
//Date : 28/02/2025
//Command : Create the AirExport House Components.
//version : 1.0


export class AirExporthEditComponent extends baseEditComponent {

  iDec = 3;

  dataList = [
    { key: 'PREPAID', value: 'PREPAID' },
    { key: 'COLLECT', value: 'COLLECT' },
    { key: 'TBA', value: 'TBA' },
  ]

  dataList1 = [
    { key: 'FREEHAND', value: 'FREEHAND' },
    { key: 'MUTUAL', value: 'MUTUAL' },
    { key: 'NOMINATION', value: 'NOMINATION' },
  ]

  constructor(
    private ms: AirExportService,
    public dialog: MatDialog
  ) {
    super();

    this.showModel = false;
    let date = this.gs.getToday();
    let user = this.gs.getUserName();
    this.mform = this.fb.group({
      hbl_id: [0],
      hbl_cfno: [0],
      hbl_houseno: [''],
      hbl_mbl_id: [0],
      hbl_mbl_refno: [''],
      hbl_shipment_stage_id: [null],
      hbl_shipment_stage_name: [''],
      hbl_date: [date],
      hbl_mode: [''],
      hbl_shipper_id: [null],
      hbl_shipper_code: [''],
      hbl_shipper_name: [''],
      hbl_shipper_add1: [''],
      hbl_shipper_add2: [''],
      hbl_shipper_add3: [''],
      hbl_shipper_add4: [''],
      hbl_consignee_id: [null],
      hbl_consigned_code: [''],
      hbl_consigned_to1: [''],
      hbl_consigned_to2: [''],
      hbl_consigned_to3: [''],
      hbl_consigned_to4: [''],
      hbl_consigned_to5: [''],
      hbl_consigned_to6: [''],
      hbl_notify_name: [''],
      hbl_notify_add1: [''],
      hbl_notify_add2: [''],
      hbl_notify_add3: [''],

      hbl_exp_ref1: [''],
      hbl_exp_ref2: [''],
      hbl_exp_ref3: [''],
      hbl_agent_name: [''],
      hbl_agent_city: [''],
      hbl_place_delivery: [''],
      hbl_iata: [''],
      hbl_accno: [''],
      hbl_frt_status_name: [''],
      hbl_oc_status: [''],
      hbl_carriage_value: [''],
      hbl_customs_value: [''],
      hbl_ins_amt: [''],
      hbl_aesno: [''],

      hbl_lcno: [''],
      hbl_bltype: [''],
      hbl_handled_id: [null],
      hbl_handled_name: [''],
      hbl_salesman_id: [null],
      hbl_salesman_name: [''],
      hbl_goods_nature: [''],
      hbl_commodity: [''],
      hbl_format_id: [null],
      hbl_format_name: [''],
      hbl_rout1: [''],
      hbl_rout2: [''],
      hbl_rout3: [''],
      hbl_pol_name: [''],
      hbl_pod_name: [''],
      hbl_asarranged_consignee: [''],
      hbl_asarranged_shipper: [''],

      hbl_packages: [0],
      hbl_weight: [0],
      hbl_weight_unit: [''],
      hbl_class: [''],
      hbl_comm: [''],
      hbl_chwt: [0],
      hbl_rate: [0],
      hbl_total: [0],

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
      hbl_id: this.id
    })
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/AirexportHou/GetRecordAsync').subscribe({
      next: (rec: iAirexporth) => {
        this.mform.patchValue({
          hbl_id: rec.hbl_id,
          hbl_cfno: rec.hbl_cfno,
          hbl_houseno: rec.hbl_houseno,
          hbl_mbl_id: rec.hbl_mbl_id,
          hbl_mbl_refno: rec.hbl_mbl_refno,
          hbl_shipment_stage_id: rec.hbl_shipment_stage_id,
          hbl_shipment_stage_name: rec.hbl_shipment_stage_name,
          hbl_date: rec.hbl_date,
          hbl_mode: rec.hbl_mode,
          hbl_shipper_id: rec.hbl_shipper_id,
          hbl_shipper_name: rec.hbl_shipper_name,
          hbl_shipper_add1: rec.hbl_shipper_add1,
          hbl_shipper_add2: rec.hbl_shipper_add2,
          hbl_shipper_add3: rec.hbl_shipper_add3,
          hbl_shipper_add4: rec.hbl_shipper_add4,
          hbl_consignee_id: rec.hbl_consignee_id,
          hbl_consigned_to1: rec.hbl_consigned_to1,
          hbl_consigned_to2: rec.hbl_consigned_to2,
          hbl_consigned_to3: rec.hbl_consigned_to3,
          hbl_consigned_to4: rec.hbl_consigned_to4,
          hbl_consigned_to5: rec.hbl_consigned_to5,
          hbl_consigned_to6: rec.hbl_consigned_to6,
          hbl_notify_name: rec.hbl_notify_name,
          hbl_notify_add1: rec.hbl_notify_add1,
          hbl_notify_add2: rec.hbl_notify_add2,
          hbl_notify_add3: rec.hbl_notify_add3,

          hbl_exp_ref1: rec.hbl_exp_ref1,
          hbl_exp_ref2: rec.hbl_exp_ref2,
          hbl_exp_ref3: rec.hbl_exp_ref3,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_agent_city: rec.hbl_agent_city,
          hbl_place_delivery: rec.hbl_place_delivery,
          hbl_iata: rec.hbl_iata,
          hbl_accno: rec.hbl_accno,
          hbl_frt_status_name: rec.hbl_frt_status_name,
          hbl_oc_status: rec.hbl_oc_status,
          hbl_carriage_value: rec.hbl_carriage_value,
          hbl_customs_value: rec.hbl_customs_value,
          hbl_ins_amt: rec.hbl_ins_amt,
          hbl_aesno: rec.hbl_aesno,

          hbl_lcno: rec.hbl_lcno,
          hbl_bltype: rec.hbl_bltype,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,
          hbl_goods_nature: rec.hbl_goods_nature,
          hbl_commodity: rec.hbl_commodity,
          hbl_format_id: rec.hbl_format_id,
          hbl_format_name: rec.hbl_format_name,
          hbl_rout1: rec.hbl_rout1,
          hbl_rout2: rec.hbl_rout2,
          hbl_rout3: rec.hbl_rout3,
          hbl_pol_name: rec.hbl_pol_name,
          hbl_pod_name: rec.hbl_pod_name,
          hbl_asarranged_consignee: rec.hbl_asarranged_consignee,
          hbl_asarranged_shipper: rec.hbl_asarranged_shipper,
          
          hbl_packages: rec.hbl_packages,
          hbl_weight: rec.hbl_weight,
          hbl_weight_unit: rec.hbl_weight_unit,
          hbl_class: rec.hbl_class,
          hbl_comm: rec.hbl_comm,
          hbl_chwt: rec.hbl_chwt,
          hbl_rate: rec.hbl_rate,
          hbl_total: rec.hbl_total,

          rec_version: rec.rec_version,

        });
        console.log(rec);
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
    const data = <iAirexporth>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.hbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/AirexportHou/SaveAsync').subscribe({
      next: (v: iAirexporth) => {
        if (this.mode == "add") {
          this.id = v.hbl_id;
          this.mode = "edit";
          this.mform.patchValue({ hbl_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          hbl_cfno: v.hbl_cfno,
          hbl_houseno: v.hbl_houseno,

          rec_version: v.rec_version
        });
        console.log(data);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  findTotal(action: any) {
      console.log(action);
      if (!action.isChanged) {
        return;
      }
      const data = <iAirexporth>this.mform.value;
      const chwt = data?.hbl_chwt || 0;
      const rate = data?.hbl_rate || 0;

      if (action.id == "hbl_chwt" || action.id == "hbl_rate"){
        let amount = chwt * rate;
        amount = this.gs.roundNumber(amount, this.iDec);
        this.mform.patchValue({
          hbl_total: amount,
        })
      }

  }


  callBack(action: { id: string, name: string, rowIndex: number, rec: any }) {
    if (action.id == 'hbl_shipment_stage_name') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          hbl_shipment_stage_id: action.rec.param_id,
          hbl_shipment_stage_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          hbl_shipment_stage_id: 0,
          hbl_shipment_stage_name: '',

        });
      }
    }
    if (action.id == 'hbl_shipper_name') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          hbl_shipper_id: action.rec.cust_id,
          hbl_shipper_code: action.rec.cust_code,
          hbl_shipper_name: action.rec.cust_name,
          hbl_shipper_add1: action.rec.cust_address1,
          hbl_shipper_add2: action.rec.cust_address2,
          hbl_shipper_add3: action.rec.cust_address3,
          hbl_shipper_add4: action.rec.cust_tel,
        });
      }
      else {
        this.mform.patchValue({
          hbl_shipper_id: 0,
          hbl_shipper_code: '',
          hbl_shipper_name: '',
          hbl_shipper_add1: '',
          hbl_shipper_add2: '',
          hbl_shipper_add3: '',
          hbl_shipper_add4: '',
        });
      }
    }
    if (action.id == 'hbl_consignee_id') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          hbl_consignee_id: action.rec.cust_id,
          hbl_consigned_code: action.rec.cust_code,
          hbl_consigned_to1: action.rec.cust_name,
          hbl_consigned_to2: action.rec.cust_address1,
          hbl_consigned_to3: action.rec.cust_address2,
          hbl_consigned_to4: action.rec.cust_address3,
          hbl_consigned_to5: action.rec.cust_address4,
          hbl_consigned_to6: action.rec.cust_tel,
        });
      }
      else {
        this.mform.patchValue({
          hbl_consignee_id: 0,
          hbl_consigned_code: '',
          hbl_consigned_to1: '',
          hbl_consigned_to2: '',
          hbl_consigned_to3: '',
          hbl_consigned_to4: '',
          hbl_consigned_to5: '',
          hbl_consigned_to6: '',
        });
      }
    }

    if (action.id == 'hbl_handled_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_handled_id: action.rec.param_id,
          hbl_handled_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          hbl_handled_id: 0,
          hbl_handled_name: '',
        });
      }
    }
    if (action.id == 'hbl_salesman_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_salesman_id: action.rec.param_id,
          hbl_salesman_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          hbl_salesman_id: 0,
          hbl_salesman_name: '',
        });
      }
    }

    if (action.id == 'hbl_format_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_format_id: action.rec.param_id,
          hbl_format_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          hbl_format_id: 0,
          hbl_format_name: '',
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

