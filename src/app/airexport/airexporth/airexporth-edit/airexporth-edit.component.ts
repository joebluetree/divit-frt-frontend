import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { iAirexporth, iAirExporthModel } from '../../models/iairexporth';
import { AirExporthService } from '../../services/airexporth.service';

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
  mbl_id: number = 0;


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

  dataList2 = [
    { key: 'SHIPPER', value: 'SHIPPER' },
    { key: 'CONSIGNEE', value: 'CONSIGNEE' },
    { key: 'CONSIGNOR', value: 'CONSIGNOR' },
  ]

  defaultPrintType = 'SHIPPER';

  constructor(
    private ms: AirExporthService,
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
      hbl_shipment_stage_id: [0],
      hbl_shipment_stage_name: [''],
      hbl_date: [date],
      hbl_mode: [''],
      hbl_shipper_id: [0],
      hbl_shipper_code: [''],
      hbl_shipper_name: [''],
      hbl_shipper_add1: [''],
      hbl_shipper_add2: [''],
      hbl_shipper_add3: [''],
      hbl_shipper_add4: [''],
      hbl_consignee_id: [0],
      hbl_consignee_code: [''],
      hbl_consignee_name: [''],
      hbl_consignee_add1: [''],
      hbl_consignee_add2: [''],
      hbl_consignee_add3: [''],
      hbl_consignee_add4: [''],
      hbl_consignee_add5: [''],
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
      hbl_handled_id: [0],
      hbl_handled_name: [''],
      hbl_salesman_id: [0],
      hbl_salesman_name: [''],
      hbl_goods_nature: [''],
      hbl_commodity: [''],
      hbl_format_id: [0],
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
      hbl_weight_unit: ['KG'],
      hbl_class: [''],
      hbl_comm: [''],
      hbl_chwt: [0],
      hbl_rate: [0],
      hbl_total: [0],

      hbl_toagent1: [''],
      hbl_rate1: [0],
      hbl_total1: [0],
      hbl_printsc1: ['N'],
      hbl_printsc2: ['N'],

      hbl_toagent2: [''],
      hbl_rate2: [0],
      hbl_total2: [0],
      hbl_printsc3: ['N'],
      hbl_printsc4: ['N'],

      hbl_toagent3: [''],
      hbl_rate3: [0],
      hbl_total3: [0],
      hbl_printsc5: ['N'],
      hbl_printsc6: ['N'],

      hbl_toagent4: [''],
      hbl_rate4: [0],
      hbl_total4: [0],
      hbl_printsc7: ['N'],
      hbl_printsc8: ['N'],

      hbl_toagent5: [''],
      hbl_rate5: [0],
      hbl_total5: [0],
      hbl_printsc9: ['N'],
      hbl_printsc10: ['N'],

      hbl_tocarrier1: [''],
      hbl_carrate1: [0],
      hbl_cartotal1: [0],
      hbl_carprintsc1: ['N'],
      hbl_carprintsc2: ['N'],

      hbl_tocarrier2: [''],
      hbl_carrate2: [0],
      hbl_cartotal2: [0],
      hbl_carprintsc3: ['N'],
      hbl_carprintsc4: ['N'],

      hbl_tocarrier3: [''],
      hbl_carrate3: [0],
      hbl_cartotal3: [0],
      hbl_carprintsc5: ['N'],
      hbl_carprintsc6: ['N'],

      hbl_charges1: [''],
      hbl_charges2: [''],
      hbl_charges3: [''],
      hbl_charges4: [''],
      hbl_charges5: [''],

      hbl_charges1_carrier: [''],
      hbl_charges2_carrier: [''],
      hbl_charges3_carrier: [''],

      hbl_remark1: [''],
      hbl_remark2: [''],
      hbl_remark3: [''],
      hbl_by1: [''],
      hbl_by1_carrier: [''],
      hbl_by2: [''],
      hbl_by2_carrier: [''],
      hbl_issued_date: [''],
      hbl_delivery_date: [''],
      hbl_issued_by: [''],
      hbl_print: ['SHIPPER'],

      marks1: this.createFormDesc(),
      marks2: this.createFormDesc(),
      marks3: this.createFormDesc(),
      marks4: this.createFormDesc(),
      marks5: this.createFormDesc(),
      marks6: this.createFormDesc(),
      marks7: this.createFormDesc(),
      marks8: this.createFormDesc(),
      marks9: this.createFormDesc(),
      marks10: this.createFormDesc(),
      marks11: this.createFormDesc(),
      marks12: this.createFormDesc(),
      marks13: this.createFormDesc(),
      marks14: this.createFormDesc(),
      marks15: this.createFormDesc(),
      marks16: this.createFormDesc(),
      marks17: this.createFormDesc(),

      rec_version: [0],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.mbl_id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.mbl_id = +rec["mbl_id"];
    });
    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
  }

  async newRecord() {
    this.id = 0;
    this.mform.patchValue({
      hbl_id: this.id,
      hbl_mbl_id: this.mbl_id
    })
    this.getDefaultData();
  }

  createFormDesc() {
    return this.fb.group({
      desc_id: [0],
      desc_parent_id: [0],
      desc_parent_type: [''],
      desc_ctr: [0],
      desc_mark: [''],
      desc_description: ['']
    });
  }


  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/AirexportH/GetRecordAsync').subscribe({
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
          hbl_shipper_code: rec.hbl_shipper_code,
          hbl_shipper_name: rec.hbl_shipper_name,
          hbl_shipper_add1: rec.hbl_shipper_add1,
          hbl_shipper_add2: rec.hbl_shipper_add2,
          hbl_shipper_add3: rec.hbl_shipper_add3,
          hbl_shipper_add4: rec.hbl_shipper_add4,
          hbl_consignee_id: rec.hbl_consignee_id,
          hbl_consignee_code: rec.hbl_consignee_code,
          hbl_consignee_name: rec.hbl_consignee_name,
          hbl_consignee_add1: rec.hbl_consignee_add1,
          hbl_consignee_add2: rec.hbl_consignee_add2,
          hbl_consignee_add3: rec.hbl_consignee_add3,
          hbl_consignee_add4: rec.hbl_consignee_add4,
          hbl_consignee_add5: rec.hbl_consignee_add5,
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

          //charges for agents

          hbl_charges1: rec.hbl_charges1,
          hbl_toagent1: rec.hbl_toagent1,
          hbl_rate1: rec.hbl_rate1,
          hbl_total1: rec.hbl_total1,
          hbl_printsc1: rec.hbl_printsc1,
          hbl_printsc2: rec.hbl_printsc2,

          hbl_charges2: rec.hbl_charges2,
          hbl_toagent2: rec.hbl_toagent2,
          hbl_rate2: rec.hbl_rate2,
          hbl_total2: rec.hbl_total2,
          hbl_printsc3: rec.hbl_printsc3,
          hbl_printsc4: rec.hbl_printsc4,

          hbl_charges3: rec.hbl_charges3,
          hbl_toagent3: rec.hbl_toagent3,
          hbl_rate3: rec.hbl_rate3,
          hbl_total3: rec.hbl_total3,
          hbl_printsc5: rec.hbl_printsc5,
          hbl_printsc6: rec.hbl_printsc6,

          hbl_charges4: rec.hbl_charges4,
          hbl_toagent4: rec.hbl_toagent4,
          hbl_rate4: rec.hbl_rate4,
          hbl_total4: rec.hbl_total4,
          hbl_printsc7: rec.hbl_printsc7,
          hbl_printsc8: rec.hbl_printsc8,

          hbl_charges5: rec.hbl_charges5,
          hbl_toagent5: rec.hbl_toagent5,
          hbl_rate5: rec.hbl_rate5,
          hbl_total5: rec.hbl_total5,
          hbl_printsc9: rec.hbl_printsc9,
          hbl_printsc10: rec.hbl_printsc10,

          //charges for carrier

          hbl_charges1_carrier: rec.hbl_charges1_carrier,
          hbl_tocarrier1: rec.hbl_tocarrier1,
          hbl_carrate1: rec.hbl_carrate1,
          hbl_cartotal1: rec.hbl_cartotal1,
          hbl_carprintsc1: rec.hbl_carprintsc1,
          hbl_carprintsc2: rec.hbl_carprintsc2,

          hbl_charges2_carrier: rec.hbl_charges2_carrier,
          hbl_tocarrier2: rec.hbl_tocarrier2,
          hbl_carrate2: rec.hbl_carrate2,
          hbl_cartotal2: rec.hbl_cartotal2,
          hbl_carprintsc3: rec.hbl_carprintsc3,
          hbl_carprintsc4: rec.hbl_carprintsc4,

          hbl_charges3_carrier: rec.hbl_charges3_carrier,
          hbl_tocarrier3: rec.hbl_tocarrier3,
          hbl_carrate3: rec.hbl_carrate3,
          hbl_cartotal3: rec.hbl_cartotal3,
          hbl_carprintsc5: rec.hbl_carprintsc5,
          hbl_carprintsc6: rec.hbl_carprintsc6,

          hbl_remark1: rec.hbl_remark1,
          hbl_remark2: rec.hbl_remark2,
          hbl_remark3: rec.hbl_remark3,
          hbl_by1: rec.hbl_by1,
          hbl_by1_carrier: rec.hbl_by1_carrier,
          hbl_by2: rec.hbl_by2,
          hbl_by2_carrier: rec.hbl_by2_carrier,
          hbl_issued_date: rec.hbl_issued_date,
          hbl_delivery_date: rec.hbl_delivery_date,
          hbl_issued_by: rec.hbl_issued_by,

          rec_version: rec.rec_version,
        });

        this.updateDesc(rec);
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  updateDesc(data: iAirexporth) {
    if (!data)
      return;
    for (let i = 1; i <= 17; i++) {
      this.mform.patchValue({ [`marks${i}`]: (data as any)[`marks${i}`] ?? this.createFormDesc() });
    }
  }

  getDefaultData() {
    const param = { 'id': this.mbl_id };
    this.ms.getRecord(param, '/api/AirexportH/GetDefaultDataAsync').subscribe({
      next: (rec: iAirexporth) => {
        this.mform.patchValue({
          hbl_mbl_id: rec.hbl_mbl_id,
          hbl_mbl_refno: rec.hbl_mbl_refno,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,
          hbl_pol_name: rec.hbl_pol_name,
          hbl_pod_name: rec.hbl_pod_name,
          hbl_issued_date: rec.hbl_issued_date,
          hbl_issued_by: rec.hbl_issued_by,
          hbl_by2_carrier: rec.hbl_by2_carrier,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_agent_city: rec.hbl_agent_city,
          hbl_exp_ref1: rec.hbl_exp_ref1,
          hbl_exp_ref2: rec.hbl_exp_ref2,
          hbl_exp_ref3: rec.hbl_exp_ref3,
          hbl_iata: rec.hbl_iata,
          hbl_by1: rec.hbl_by1,
          hbl_by2: rec.hbl_by2,
          hbl_rout3: rec.hbl_rout3,
          hbl_ins_amt: rec.hbl_ins_amt,
          hbl_customs_value: rec.hbl_customs_value,
          hbl_carriage_value: rec.hbl_carriage_value,
          hbl_format_id: rec.hbl_format_id,
          hbl_format_name: rec.hbl_format_name,
          rec_branch_id: rec.rec_branch_id,
          rec_company_id: rec.rec_company_id,
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
    this.ms.save(param, data, '/api/AirexportH/SaveAsync').subscribe({
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
        this.updateDesc(v);
        this.mform.patchValue({
          hbl_cfno: v.hbl_cfno,
          hbl_houseno: v.hbl_houseno,
          hbl_mbl_id: v.hbl_mbl_id,
          hbl_mbl_refno: v.hbl_mbl_refno,
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

  //function for find the total

  findTotal(action: any) {
    console.log(action);
    if (!action.isChanged) {
      return;
    }
    const data = <iAirexporth>this.mform.value;
    const chwt = data?.hbl_chwt || 0;
    const rate = data?.hbl_rate || 0;
    const amt = data?.hbl_total || 0;
    const rate1 = data?.hbl_rate1 || 0;
    const rate2 = data?.hbl_rate2 || 0;
    const rate3 = data?.hbl_rate3 || 0;
    const rate4 = data?.hbl_rate4 || 0;
    const rate5 = data?.hbl_rate5 || 0;
    const carrate1 = data?.hbl_carrate1 || 0;
    const carrate2 = data?.hbl_carrate2 || 0;
    const carrate3 = data?.hbl_carrate3 || 0;

    if (action.id == "hbl_chwt" || action.id == "hbl_rate") {
      let amount = chwt * rate;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total: amount,
      })
    }
    if (action.id == "hbl_total") {
      let amount = amt / chwt;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_rate: amount,
      })
    }
    if (action.id == "hbl_rate1") {
      let amount = 10 * rate1;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total1: amount,
      })
    }
    if (action.id == "hbl_rate2") {
      let amount = 10 * rate2;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total2: amount,
      })
    }
    if (action.id == "hbl_rate3") {
      let amount = 10 * rate3;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total3: amount,
      })
    }
    if (action.id == "hbl_rate4") {
      let amount = 10 * rate4;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total4: amount,
      })
    }
    if (action.id == "hbl_rate5") {
      let amount = 10 * rate5;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total5: amount,
      })
    }
    if (action.id == "hbl_carrate1") {
      let amount = 10 * carrate1;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_cartotal1: amount,
      })
    }
    if (action.id == "hbl_carrate2") {
      let amount = 10 * carrate2;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_cartotal2: amount,
      })
    }
    if (action.id == "hbl_carrate3") {
      let amount = 10 * carrate3;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_cartotal3: amount,
      })
    }
  }


  callBack(action: any ) {
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
    if (action.name == 'hbl_shipper_code') {
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
          hbl_by1_carrier: action.rec.cust_name,
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
          hbl_by1_carrier: '',
        });
      }
    }
    if (action.name == 'hbl_consignee_code') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          hbl_consignee_id: action.rec.cust_id,
          hbl_consignee_code: action.rec.cust_code,
          hbl_consignee_name: action.rec.cust_name,
          hbl_consignee_add1: action.rec.cust_address1,
          hbl_consignee_add2: action.rec.cust_address2,
          hbl_consignee_add3: action.rec.cust_address3,
          hbl_consignee_add4: action.rec.cust_address4,
          hbl_consignee_add5: action.rec.cust_tel,
          hbl_bltype: action.rec.cust_nomination,
        });
      }
      else {
        this.mform.patchValue({
          hbl_consignee_id: 0,
          hbl_consignee_code: '',
          hbl_consignee_name: '',
          hbl_consignee_add1: '',
          hbl_consignee_add2: '',
          hbl_consignee_add3: '',
          hbl_consignee_add4: '',
          hbl_consignee_add5: '',
          hbl_bltype: '',
        });
      }
    }

    if (action.id == 'hbl_handled_name') {
      console.log(action);
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
      console.log(action);
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
      console.log(action);
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

