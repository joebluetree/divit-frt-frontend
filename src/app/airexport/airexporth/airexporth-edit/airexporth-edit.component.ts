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
  dataList2 = [
    { key: 'SHIPPER', value: 'SHIPPER' },
    { key: 'CONSIGNEE', value: 'CONSIGNEE' },
    { key: 'CONSIGNOR', value: 'CONSIGNOR' },
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

      hbl_charges1: [''],
      hbl_charges2: [''],
      hbl_charges3: [''],
      hbl_charges4: [''],
      hbl_charges5: [''],

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

  //function for get a print list of elements

  // getCharges(hbl_group: string | undefined){
  //   if(hbl_group){
  //     const details = hbl_group.split(',');
  //     this.mform.patchValue({
  //       hbl_toagent1: details[0] || '',
  //       hbl_rate1: details[1] || 0,
  //       hbl_total1: details[2] || 0,
  //       hbl_printsc1: details[3] || '',
  //       hbl_printsc2: details[4] || '',
  //     });
  //   }
  // }

  getCharges(hbl_charges: string | undefined, index: number) {
    if (hbl_charges) {
      const details = hbl_charges.split(',');
      switch (index) {
        case 1:
          this.mform.patchValue({
            hbl_toagent1: details[0] || '',
            hbl_rate1: details[1] || 0,
            hbl_total1: details[2] || 0,
            hbl_printsc1: details[3] || '',
            hbl_printsc2: details[4] || '',
          });
          break;
        case 2:
          this.mform.patchValue({
            hbl_toagent2: details[0] || '',
            hbl_rate2: details[1] || 0,
            hbl_total2: details[2] || 0,
            hbl_printsc3: details[3] || '',
            hbl_printsc4: details[4] || '',
          });
          break;
        case 3:
          this.mform.patchValue({
            hbl_toagent3: details[0] || '',
            hbl_rate3: details[1] || 0,
            hbl_total3: details[2] || 0,
            hbl_printsc5: details[3] || '',
            hbl_printsc6: details[4] || '',
          });
          break;
        case 4:
          this.mform.patchValue({
            hbl_toagent4: details[0] || '',
            hbl_rate4: details[1] || 0,
            hbl_total4: details[2] || 0,
            hbl_printsc7: details[3] || '',
            hbl_printsc8: details[4] || '',
          });
          break;
        case 5:
          this.mform.patchValue({
            hbl_toagent5: details[0] || '',
            hbl_rate5: details[1] || 0,
            hbl_total5: details[2] || 0,
            hbl_printsc9: details[3] || '',
            hbl_printsc10: details[4] || '',
          });
          break;
      }
    }
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
          bhl_shipper_code: rec.hbl_shipper_code,
          hbl_shipper_name: rec.hbl_shipper_name,
          hbl_shipper_add1: rec.hbl_shipper_add1,
          hbl_shipper_add2: rec.hbl_shipper_add2,
          hbl_shipper_add3: rec.hbl_shipper_add3,
          hbl_shipper_add4: rec.hbl_shipper_add4,
          hbl_consignee_id: rec.hbl_consignee_id,
          hbl_consignee_code: rec.hbl_consigned_code,
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
        // this.getCharges(rec.hbl_group ?? '');
        // this.getCharges(rec.hbl_charges1 ?? '', 1);
        // this.getCharges(rec.hbl_charges2 ?? '', 2);
        // this.getCharges(rec.hbl_charges3 ?? '', 3);
        // this.getCharges(rec.hbl_charges4 ?? '', 4);
        // this.getCharges(rec.hbl_charges5 ?? '', 5);
        // console.log(rec.hbl_group);
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

    //function for save list of elements
    // data.hbl_group = `${data.hbl_toagent1},${data.hbl_rate1},${data.hbl_total1},${data.hbl_printsc1},${data.hbl_printsc2}`;

    // data.hbl_charges1 = `${data.hbl_toagent1},${data.hbl_rate1},${data.hbl_total1},${data.hbl_printsc1},${data.hbl_printsc2}`;
    // data.hbl_charges2 = `${data.hbl_toagent2},${data.hbl_rate2},${data.hbl_total2},${data.hbl_printsc3},${data.hbl_printsc4}`;
    // data.hbl_charges3 = `${data.hbl_toagent3},${data.hbl_rate3},${data.hbl_total3},${data.hbl_printsc5},${data.hbl_printsc6}`;
    // data.hbl_charges4 = `${data.hbl_toagent4},${data.hbl_rate4},${data.hbl_total4},${data.hbl_printsc7},${data.hbl_printsc8}`;
    // data.hbl_charges5 = `${data.hbl_toagent5},${data.hbl_rate5},${data.hbl_total5},${data.hbl_printsc9},${data.hbl_printsc10}`;

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
        // this.getCharges(v.hbl_group ?? '');

        // this.getCharges(v.hbl_charges1 ?? '', 1);             //The new function to patch the values
        // this.getCharges(v.hbl_charges2 ?? '', 2);
        // this.getCharges(v.hbl_charges3 ?? '', 3);
        // this.getCharges(v.hbl_charges4 ?? '', 4);
        // this.getCharges(v.hbl_charges5 ?? '', 5);

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

    if (action.id == "hbl_chwt" || action.id == "hbl_rate") {
      let amount = chwt * rate;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_total: amount,
      })
    }
  }

  //function for find total for agent and consignee

  getTotal(fieldName: string) {
    console.log(fieldName);
  
    const data = <iAirexporth>this.mform.value as any;
    const index = fieldName.replace(/[^\d]/g, ''); // Extract index from field name
    const rate = data[`hbl_rate${index}`] || 0;
  
    if (fieldName === `hbl_rate${index}`) {
      let amount = rate * 10; // Your logic here
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        [`hbl_total${index}`]: amount,
      });
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
    if (action.id == 'hbl_shipper_code') {
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
    if (action.id == 'hbl_consigned_code') {
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

