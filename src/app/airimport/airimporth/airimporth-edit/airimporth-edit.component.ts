import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { AirImporthService } from '../../services/airimporth.service';
import { iAirimporth } from '../../models/iairimporth';
import { iCustomerm } from '../../../master/models/icustomerm';


@Component({
  selector: 'app-airimporth-edit',
  templateUrl: './airimporth-edit.component.html',
  styleUrls: ['./airimporth-edit.component.css'],
  standalone: true,
  imports: [...CustomControls,]
})

//Name : Alen Cherian
//Date : 31/03/2025
//Command : Create the AirImport House Components.
//version : 1.0


export class AirImporthEditComponent extends baseEditComponent {

  iDec = 3;
  mbl_id: number = 0;


  Frt_Status = [
    { key: 'PREPAID', value: 'PREPAID' },
    { key: 'COLLECT', value: 'COLLECT' },
    { key: 'TBA', value: 'TBA' },
  ]

  Client_Type = [
    { key: 'FREEHAND', value: 'FREEHAND' },
    { key: 'MUTUAL', value: 'MUTUAL' },
    { key: 'NOMINATION', value: 'NOMINATION' },
  ]

  frt_release_status = [
    { key: 'NIL', value: 'NIL' },
    { key: 'RELEASED', value: 'RELEASED' },
    { key: 'NOT RELEASED', value: 'NOT RELEASED' },
  ]

  cust_release_status = [
    { key: 'NA', value: 'NA' },
    { key: 'PENDING', value: 'PENDING' },
    { key: 'EXAM', value: 'EXAM' },
    { key: 'COMPLETE', value: 'COMPLETE' },
    { key: 'SUBMITTED', value: 'SUBMITTED' },
  ]

  delivery_status = [
    { key: 'NA', value: 'NA' },
    { key: 'YES', value: 'YES' },
    { key: 'NO', value: 'NO' },
  ]

  defaultPrintType = 'SHIPPER';

  constructor(
    private ms: AirImporthService,
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
      hbl_shipper_add5: [''],
      hbl_consignee_id: [0],
      hbl_consignee_code: [''],
      hbl_consignee_name: [''],
      hbl_consignee_add1: [''],
      hbl_consignee_add2: [''],
      hbl_consignee_add3: [''],
      hbl_consignee_add4: [''],
      hbl_consignee_add5: [''],

      hbl_agent_id: [0],
      hbl_agent_name: [''],
      hbl_cha_id: [0],
      hbl_cha_code: [''],
      hbl_cha_name: [''],
      hbl_cha_attn: [''],
      hbl_cha_tel: [''],
      hbl_cha_fax: [''],
      hbl_location_id: [0],
      hbl_location_code: [''],
      hbl_location_name: [''],
      hbl_location_add1: [''],
      hbl_location_add2: [''],
      hbl_location_add3: [''],
      hbl_location_add4: [''],

      hbl_it_no: [''],
      hbl_it_date: [''],
      hbl_it_port: [''],
      hbl_it_pcs: [0],
      hbl_it_wt: [0],
      hbl_it_no2: [''],
      hbl_it_date2: [''],
      hbl_it_port2: [''],
      hbl_it_pcs2: [0],
      hbl_it_wt2: [0],
      hbl_it_no3: [''],
      hbl_it_date3: [''],
      hbl_it_port3: [''],
      hbl_it_pcs3: [0],
      hbl_it_wt3: [0],
      hbl_bltype: [''],

      hbl_place_final: [''],
      hbl_plf_eta: [''],
      hbl_frt_status_name: [''],
      hbl_uom_id: [0],
      hbl_uom_name: [''],
      hbl_packages: [0],
      hbl_weight: [0],
      hbl_lbs: [0],
      hbl_chwt_lbs: [0],
      hbl_chwt: [0],
      hbl_commodity: [''],
      hbl_handled_id: [0],
      hbl_handled_name: [''],
      hbl_salesman_id: [0],
      hbl_salesman_name: [''],
      hbl_remark1: [''],
      hbl_remark2: [''],
      hbl_remark3: [''],
      hbl_lfd_date: [''],
      hbl_pickup_date: [''],
      hbl_careof_id: [0],
      hbl_careof_name: [''],
      hbl_pono: [''],
      hbl_paid_status_id: [0],
      hbl_paid_status_name: [''],
      hbl_cargo_release_status: [''],
      hbl_is_itshipment: [''],
      hbl_book_slno: [''],
      hbl_is_pl: [''],
      hbl_is_ci: [''],
      hbl_is_carr_an: [''],
      hbl_custom_reles_status: [''],
      hbl_is_delivery: [''],
      hbl_paid_remarks: [''],
      hbl_delivery_date: [''],
      hbl_incoterm_id: [0],
      hbl_incoterm: [''],
      hbl_invoiceno: [''],

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
    this.ms.getRecord(param, '/api/AirimportH/GetRecordAsync').subscribe({
      next: (rec: iAirimporth) => {
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
          hbl_shipper_add5: rec.hbl_shipper_add5,
          hbl_consignee_id: rec.hbl_consignee_id,
          hbl_consignee_code: rec.hbl_consignee_code,
          hbl_consignee_name: rec.hbl_consignee_name,
          hbl_consignee_add1: rec.hbl_consignee_add1,
          hbl_consignee_add2: rec.hbl_consignee_add2,
          hbl_consignee_add3: rec.hbl_consignee_add3,
          hbl_consignee_add4: rec.hbl_consignee_add4,
          hbl_consignee_add5: rec.hbl_consignee_add5,

          hbl_agent_id: rec.hbl_agent_id,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_cha_id: rec.hbl_cha_id,
          hbl_cha_code: rec.hbl_cha_code,
          hbl_cha_name: rec.hbl_cha_name,
          hbl_cha_attn: rec.hbl_cha_attn,
          hbl_cha_tel: rec.hbl_cha_tel,
          hbl_cha_fax: rec.hbl_cha_fax,
          hbl_location_id: rec.hbl_location_id,
          hbl_location_code: rec.hbl_location_code,
          hbl_location_name: rec.hbl_location_name,
          hbl_location_add1: rec.hbl_location_add1,
          hbl_location_add2: rec.hbl_location_add2,
          hbl_location_add3: rec.hbl_location_add3,
          hbl_location_add4: rec.hbl_location_add4,

          hbl_it_no: rec.hbl_it_no,
          hbl_it_date: rec.hbl_it_date,
          hbl_it_port: rec.hbl_it_port,
          hbl_it_pcs: rec.hbl_it_pcs,
          hbl_it_wt: rec.hbl_it_wt,
          hbl_it_no2: rec.hbl_it_no2,
          hbl_it_date2: rec.hbl_it_date2,
          hbl_it_port2: rec.hbl_it_port2,
          hbl_it_pcs2: rec.hbl_it_pcs2,
          hbl_it_wt2: rec.hbl_it_wt2,
          hbl_it_no3: rec.hbl_it_no3,
          hbl_it_date3: rec.hbl_it_date3,
          hbl_it_port3: rec.hbl_it_port3,
          hbl_it_pcs3: rec.hbl_it_pcs3,
          hbl_it_wt3: rec.hbl_it_wt3,
          hbl_bltype: rec.hbl_bltype,

          hbl_place_final: rec.hbl_place_final,
          hbl_plf_eta: rec.hbl_plf_eta,
          hbl_frt_status_name: rec.hbl_frt_status_name,
          hbl_uom_id: rec.hbl_uom_id,
          hbl_uom_name: rec.hbl_uom_name,
          hbl_packages: rec.hbl_packages,
          hbl_weight: rec.hbl_weight,
          hbl_lbs: rec.hbl_lbs,
          hbl_chwt_lbs: rec.hbl_chwt_lbs,
          hbl_chwt: rec.hbl_chwt,
          hbl_commodity: rec.hbl_commodity,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,

          hbl_remark1: rec.hbl_remark1,
          hbl_remark2: rec.hbl_remark2,
          hbl_remark3: rec.hbl_remark3,
          hbl_lfd_date: rec.hbl_lfd_date,
          hbl_pickup_date: rec.hbl_pickup_date,
          hbl_careof_id: rec.hbl_careof_id,
          hbl_careof_name: rec.hbl_careof_name,
          hbl_pono: rec.hbl_pono,
          hbl_paid_status_id: rec.hbl_paid_status_id,
          hbl_paid_status_name: rec.hbl_paid_status_name,
          hbl_cargo_release_status: rec.hbl_cargo_release_status,
          hbl_is_itshipment: rec.hbl_is_itshipment,
          hbl_book_slno: rec.hbl_book_slno,
          hbl_is_pl: rec.hbl_is_pl,
          hbl_is_ci: rec.hbl_is_ci,
          hbl_is_carr_an: rec.hbl_is_carr_an,
          hbl_custom_reles_status: rec.hbl_custom_reles_status,
          hbl_is_delivery: rec.hbl_is_delivery,
          hbl_paid_remarks: rec.hbl_paid_remarks,
          hbl_delivery_date: rec.hbl_delivery_date,
          hbl_incoterm_id: rec.hbl_incoterm_id,
          hbl_incoterm: rec.hbl_incoterm,
          hbl_invoiceno: rec.hbl_invoiceno,

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

  updateDesc(data: iAirimporth) {
    if (!data)
      return;
    for (let i = 1; i <= 17; i++) {
      this.mform.patchValue({ [`marks${i}`]: (data as any)[`marks${i}`] ?? this.createFormDesc() });
    }
  }

  getDefaultData() {
    const param = { 'id': this.mbl_id };
    this.ms.getRecord(param, '/api/AirimportH/GetDefaultDataAsync').subscribe({
      next: (rec: iAirimporth) => {
        this.mform.patchValue({
          hbl_mbl_id: rec.hbl_mbl_id,
          hbl_mbl_refno: rec.hbl_mbl_refno,
          hbl_shipment_stage_id: rec.hbl_shipment_stage_id,
          hbl_shipment_stage_name: rec.hbl_shipment_stage_name,
          hbl_agent_id: rec.hbl_agent_id,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_location_id: rec.hbl_location_id,
          hbl_location_code: rec.hbl_location_code,
          hbl_location_name: rec.hbl_location_name,
          hbl_location_add1: rec.hbl_location_add1,
          hbl_location_add2: rec.hbl_location_add2,
          hbl_location_add3: rec.hbl_location_add3,
          hbl_location_add4: rec.hbl_location_add4,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,
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
    const data = <iAirimporth>this.mform.value;
    let _mode = this.mode;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    console.log(data);

    const param = {
      'id': data.hbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/AirimportH/SaveAsync').subscribe({
      next: (v: iAirimporth) => {
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
    const data = <iAirimporth>this.mform.value;
    const chwt = data?.hbl_chwt || 0;
    const weight = data?.hbl_weight || 0;
    const chwt_lbs = data?.hbl_chwt_lbs || 0;
    const lbs = data?.hbl_lbs || 0;
    const value = 2.2046;
    if (action.id == "hbl_weight") {
      let amount = weight * value;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_lbs: amount,
      })
    }
    if (action.id == "hbl_chwt") {
      let amount = chwt * value;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_chwt_lbs: amount,
      })
    }
    if (action.id == "hbl_lbs") {
      let amount = lbs / value;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_weight: amount,
      })
    }
    if (action.id == "hbl_chwt_lbs") {
      let amount = chwt_lbs / value;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        hbl_chwt: amount,
      })
    }
  }

  fillCustomer(customerData: any = {}) {
    this.mform.patchValue({
      hbl_cha_id: customerData.cust_id || 0,
      hbl_cha_code: customerData.cust_code || "",
      hbl_cha_name: customerData.cust_name || "",
      hbl_cha_attn: customerData.cust_contact || "",
      hbl_cha_tel: customerData.cust_tel || "",
      hbl_cha_fax: customerData.cust_fax || "",
    });
  }

  getCustomerData(id: any) {
    if (!id) { // Reset form if no ID
      this.fillCustomer();
      return;
    }
    const param = { 'id': id };
    this.ms.getRecord(param, '/api/search/GetCustomerAsync').subscribe({
      next: (rec: any) => this.fillCustomer(rec || {}), // Update form or reset
      error: (error) => {
        this.gs.showError(error);
        this.fillCustomer(); // Reset form on error
      }
    });
  }

  callBack(action: any) {
    console.log(action);
    let rec: any = {};
    if (action?.rec != null) {
      rec = action.rec;
    }
  
    if (action.name === 'hbl_consignee_code') {
      console.log(action);
      this.mform.patchValue({
        hbl_consignee_id: rec.cust_id || 0,
        hbl_consignee_code: rec.cust_code || "",
        hbl_consignee_name: rec.cust_name || "",
        hbl_consignee_add1: rec.cust_address1 || "",
        hbl_consignee_add2: rec.cust_address2 || "",
        hbl_consignee_add3: rec.cust_address3 || "",
        hbl_consignee_add4: this.gs.getAttention(rec) || "",
        hbl_consignee_add5: this.gs.getTelFax(rec) || "",
        hbl_bltype: rec.cust_nomination || "",
        hbl_cha_id: rec.cust_chb_id || 0,
      });
      this.getCustomerData(rec.cust_chb_id);
    }
  
    if (action.id === 'hbl_shipment_stage_name') {
      console.log(action);
      this.mform.patchValue({
        hbl_shipment_stage_id: rec.param_id || 0,
        hbl_shipment_stage_name: rec.param_name || "",
      });
    }
  
    if (action.name === 'hbl_shipper_code') {
      console.log(action);
      this.mform.patchValue({
        hbl_shipper_id: rec.cust_id || 0,
        hbl_shipper_code: rec.cust_code || "",
        hbl_shipper_name: rec.cust_name || "",
        hbl_shipper_add1: rec.cust_address1 || "",
        hbl_shipper_add2: rec.cust_address2 || "",
        hbl_shipper_add3: rec.cust_address3 || "",
        hbl_shipper_add4: this.gs.getAttention(rec) || "",
        hbl_shipper_add5: this.gs.getTelFax(rec) || "",
        hbl_by1_carrier: rec.cust_name || "",
      });
    }
  
    if (action.id === 'hbl_agent_name') {
      console.log(action);
      this.mform.patchValue({
        hbl_agent_id: rec.cust_id || 0,
        hbl_agent_name: rec.cust_name || "",
      });
    }
  
    if (action.id === 'hbl_location_id') {
      console.log(action);
      this.mform.patchValue({
        hbl_location_id: rec.cust_id || 0,
        hbl_location_code: rec.cust_code || "",
        hbl_location_name: rec.cust_name || "",
        hbl_location_add1: rec.cust_address1 || "",
        hbl_location_add2: rec.cust_address2 || "",
        hbl_location_add3: rec.cust_address3 || "",
        hbl_location_add4: rec.cust_address4 || "",
      });
    }
  
    if (action.id === 'hbl_cha_id') {
      console.log(action);
      this.mform.patchValue({
        hbl_cha_id: rec.cust_id || 0,
        hbl_cha_code: rec.cust_code || "",
        hbl_cha_name: rec.cust_name || "",
        hbl_cha_attn: rec.cust_address1 || "",
        hbl_cha_tel: rec.cust_tel || "",
        hbl_cha_fax: rec.cust_fax || "",
      });
    }
  
    if (action.id === 'hbl_handled_name') {
      console.log(action);
      this.mform.patchValue({
        hbl_handled_id: rec.param_id || 0,
        hbl_handled_name: rec.param_name || "",
      });
    }
  
    if (action.id === 'hbl_salesman_name') {
      console.log(action);
      this.mform.patchValue({
        hbl_salesman_id: rec.param_id || 0,
        hbl_salesman_name: rec.param_name || "",
      });
    }
  
    if (action.id === 'hbl_careof_id') {
      console.log(action);
      this.mform.patchValue({
        hbl_careof_id: rec.cust_id || 0,
        hbl_careof_name: rec.cust_name || "",
      });
    }
  
    if (action.id === 'hbl_incoterm') {
      console.log(action);
      this.mform.patchValue({
        hbl_incoterm_id: rec.param_id || 0,
        hbl_incoterm: rec.param_name || "",
      });
    }
  
    if (action.id === 'hbl_uom_name') {
      console.log(action);
      this.mform.patchValue({
        hbl_uom_id: rec.param_id || 0,
        hbl_uom_name: rec.param_name || "",
      });
    }
  
    if (action.id === 'hbl_paid_status_name') {
      console.log(action);
      this.mform.patchValue({
        hbl_paid_status_id: rec.param_id || 0,
        hbl_paid_status_name: rec.param_name || "",
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
    });
  }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }
}

