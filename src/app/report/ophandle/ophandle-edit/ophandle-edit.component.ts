import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { MemoEditComponent } from "../../../common-shipment/memo/memo-edit/memo-edit.component";
import { OpHandleService } from '../../services/ophandle.service';
import { iOpHandle } from '../../models/iophandle';

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component manages creation,editing and saving of Other-Operation (parent table) records

@Component({
  selector: 'app-ophandle-edit',
  templateUrl: './ophandle-edit.component.html',
  styleUrls: ['./ophandle-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class OpHandleEditComponent extends baseEditComponent {

  frtList = [
    { key: 'COLLECT', value: 'COLLECT' },
    { key: 'PREPAID', value: 'PREPAID' },
    { key: 'TBA', value: 'TBA' },
  ]
  ShiptypeList = [
    { key: 'FCL', value: 'FCL' },
    { key: 'LCL', value: 'LCL' },
    { key: 'CONSOLE', value: 'CONSOLE' },
    { key: 'OTHERS', value: 'OTHERS' },
  ]
  clientList = [
    { key: 'FREEHAND', value: 'FREEHAND' },
    { key: 'MUTUAL', value: 'MUTUAL' },
    { key: 'NOMINATION', value: 'NOMINATION' },
  ]
  customRelList = [
    { key: 'N/A', value: 'N/A' },
    { key: 'PENDING', value: 'PENDING' },
    { key: 'EXAM', value: 'EXAM' },
    { key: 'COMPLETED', value: 'COMPLETED' },
    { key: 'SUBMITTED', value: 'SUBMITTED' },
  ]
  DeliveryList = [
    { key: 'N/A', value: 'N/A' },
    { key: 'N', value: 'NO' },
    { key: 'Y', value: 'YES' },
  ]
  constructor(
    public ms: OpHandleService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      oth_id: [0],
      oth_hbl_id: [0],
      oth_parent_id: [0],
      oth_cfno: [0],
      oth_mode: [''],
      oth_refno: [''],
      oth_ref_date: [date],
      oth_shipment_stage_id: [null],
      oth_shipment_stage_name: [''],
      oth_mbl_no: [''],
      oth_agent_id: [0],
      oth_agent_name: [''],
      oth_liner_id: [0],
      oth_liner_name: [''],
      oth_handled_id: [0],
      oth_handled_name: [''],
      oth_salesman_id: [0],
      oth_salesman_name: [''],
      oth_mbl_frt_status: [''],
      oth_pol_id: [0],
      oth_pol_name: [''],
      oth_pol_etd: [''],
      oth_pod_id: [0],
      oth_pod_name: [''],
      oth_pod_eta: [''],
      oth_place_delivery: [''],
      oth_country_id: [0],
      oth_country_name: [''],
      oth_vessel_id: [0],
      oth_vessel_code: [''],
      oth_vessel_name: [''],
      oth_voyage: [''],
      oth_hbl_no: [''],
      oth_shipper_id: [0],
      oth_shipper_code: [''],
      oth_shipper_name: [''],
      oth_shipper_add1: [''],
      oth_shipper_add2: [''],
      oth_shipper_add3: [''],
      oth_shipper_add4: [''],
      oth_consignee_id: [0],
      oth_consignee_code: [''],
      oth_consignee_name: [''],
      oth_consignee_add1: [''],
      oth_consignee_add2: [''],
      oth_consignee_add3: [''],
      oth_consignee_add4: [''],
      oth_bltype: [''],
      oth_hbl_frt_status: [''],
      oth_commodity: [''],
      oth_isf_no: [''],
      oth_packages: [0],
      oth_cbm: [0],
      oth_weight: [0],
      oth_lbs: [0],
      oth_cft: [0],
      oth_chwt: [0],
      oth_chwt_lbs: [0],
      oth_location_id: [0],
      oth_location_code: [''],
      oth_location_name: [''],
      oth_location_add1: [''],
      oth_location_add2: [''],
      oth_location_add3: [''],
      oth_location_add4: [''],
      oth_is_pl: [''],
      oth_is_ci: [''],
      oth_is_carr_an: [''],
      oth_custom_reles_status: ['N/A'],
      oth_is_delivery: ['N/A'],
      oth_lfd_date: [''],
      oth_it_no: [''],
      oth_it_date: [''],
      oth_it_port: [''],
      rec_files_count: [0],
      rec_files_attached: [''],
      rec_memo_count: [0],
      rec_memo_attached: [''],
      otherop_cntr: this.fb.array([]),
      rec_version: [0],

    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();

    if (this.mode == "add")
      this.newRecord();
    // else
    //   this.getRecord();
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      oth_id: this.id
    })
  }

  // getRecord() {
  //   const param = { 'id': this.id };
  //   this.ms.getRecord(param, '/api/otherop/otherop/GetRecordAsync').subscribe({
  //     next: (rec: iOpHandle) => {
  //       this.mform.patchValue({
  //         oth_id: rec.oth_id,
  //         oth_hbl_id: rec.oth_hbl_id,
  //         oth_parent_id: rec.oth_parent_id,
  //         oth_cfno: rec.oth_cfno,
  //         oth_mode: rec.oth_mode,
  //         oth_refno: rec.oth_refno,
  //         oth_ref_date: rec.oth_ref_date,
  //         oth_shipment_stage_id: rec.oth_shipment_stage_id,
  //         oth_shipment_stage_name: rec.oth_shipment_stage_name,
  //         oth_mbl_no: rec.oth_mbl_no,
  //         oth_agent_id: rec.oth_agent_id,
  //         oth_agent_name: rec.oth_agent_name,
  //         oth_liner_id: rec.oth_liner_id,
  //         oth_liner_name: rec.oth_liner_name,
  //         oth_handled_id: rec.oth_handled_id,
  //         oth_handled_name: rec.oth_handled_name,
  //         oth_salesman_id: rec.oth_salesman_id,
  //         oth_salesman_name: rec.oth_salesman_name,
  //         oth_mbl_frt_status: rec.oth_mbl_frt_status,
  //         oth_pol_id: rec.oth_pol_id,
  //         oth_pol_name: rec.oth_pol_name,
  //         oth_pol_etd: rec.oth_pol_etd,
  //         oth_pod_id: rec.oth_pod_id,
  //         oth_pod_name: rec.oth_pod_name,
  //         oth_pod_eta: rec.oth_pod_eta,
  //         oth_place_delivery: rec.oth_place_delivery,
  //         oth_country_id: rec.oth_country_id,
  //         oth_country_name: rec.oth_country_name,
  //         oth_vessel_id: rec.oth_vessel_id,
  //         oth_vessel_code: rec.oth_vessel_code,
  //         oth_vessel_name: rec.oth_vessel_name,
  //         oth_voyage: rec.oth_voyage,
  //         rec_files_count: rec.rec_files_count,
  //         rec_files_attached: rec.rec_files_attached,
  //         rec_memo_count: rec.rec_memo_count,
  //         rec_memo_attached: rec.rec_memo_attached,
  //         rec_version: rec.rec_version,

  //       });
  //     },
  //     error: (e) => {
  //       this.gs.showError(e);
  //     }
  //   })
  // }

  // save() {
  //   if (this.mform.invalid) {
  //     alert('Invalid Form')
  //     return;
  //   }
  //   const data = <iOpHandle>this.mform.value;

  //   data.rec_company_id = this.gs.user.user_company_id;
  //   data.rec_branch_id = this.gs.user.user_branch_id;
  //   data.rec_created_by = this.gs.user.user_code;

  //   let _mode = this.mode;

  //   const param = {
  //     'id': data.oth_id,
  //     'mode': this.mode
  //   }
  //   this.ms.save(param, data, '/api/otherop/otherop/SaveAsync').subscribe({
  //     next: (v: iOpHandle) => {
  //       if (this.mode == "add") {
  //         this.id = v.oth_id;
  //         this.mode = "edit";
  //         this.mform.patchValue({ oth_id: this.id });
  //         const param = {
  //           id: this.id.toString(),
  //           mode: this.mode
  //         };
  //         this.gs.updateURL(param);
  //       };
  //       this.mform.patchValue({
  //         rec_version: v.rec_version,
  //         oth_cfno: v.oth_cfno,
  //         oth_mode: v.oth_mode,
  //         oth_refno: v.oth_refno,
  //         oth_hbl_id: v.oth_hbl_id
  //       });
  //       this.fillCntr(v.otherop_cntr);
  //       this.ms.UpdateRecord(v, _mode);
  //       this.gs.showAlert(["Save Complete"]);
  //     },
  //     error: (e) => {
  //       this.gs.showAlert([e.error]);
  //     },
  //     complete: () => { }
  //   })
  // }

  callBack(action: any) {
    if (action.id == 'oth_shipper_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_shipper_id: null,
          oth_shipper_code: '',
          oth_shipper_name: '',
          oth_shipper_add1: '',
          oth_shipper_add2: '',
          oth_shipper_add3: '',
          oth_shipper_add4: '',
        });
      } else {
        this.mform.patchValue({
          oth_shipper_id: action.rec.cust_id,
          oth_shipper_code: action.rec.cust_code,
          oth_shipper_name: action.rec.cust_name,
          oth_shipper_add1: action.rec.cust_address1,
          oth_shipper_add2: action.rec.cust_address2,
          oth_shipper_add3: this.gs.getAttention(action.rec),
          oth_shipper_add4: this.gs.getTelFax(action.rec),
        });
      }
    }

    if (action.id == 'oth_consignee_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_consignee_id: null,
          oth_consignee_code: '',
          oth_consignee_name: '',
          oth_consignee_add1: '',
          oth_consignee_add2: '',
          oth_consignee_add3: '',
          oth_consignee_add4: '',
        });
      } else {
        this.mform.patchValue({
          oth_consignee_id: action.rec.cust_id,
          oth_consignee_code: action.rec.cust_code,
          oth_consignee_name: action.rec.cust_name,
          oth_consignee_add1: action.rec.cust_address1,
          oth_consignee_add2: action.rec.cust_address2,
          oth_consignee_add3: this.gs.getAttention(action.rec),
          oth_consignee_add4: this.gs.getTelFax(action.rec),
        });
      }
    }

    if (action.id == 'oth_location_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_location_id: null,
          oth_location_code: '',
          oth_location_name: '',
          oth_location_add1: '',
          oth_location_add2: '',
          oth_location_add3: '',
          oth_location_add4: '',
        });
      } else {
        this.mform.patchValue({
          oth_location_id: action.rec.cust_id,
          oth_location_code: action.rec.cust_code,
          oth_location_name: action.rec.cust_name,
          oth_location_add1: action.rec.cust_address1,
          oth_location_add2: action.rec.cust_address2,
          oth_location_add3: this.gs.getAttention(action.rec),
          oth_location_add4: this.gs.getTelFax(action.rec),
        });
      }
    }

    if (action.id == 'oth_shipment_stage_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_shipment_stage_id: null,
          oth_shipment_stage_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_shipment_stage_id: action.rec.param_id,
          oth_shipment_stage_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_agent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_agent_id: null,
          oth_agent_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_agent_id: action.rec.cust_id,
          oth_agent_name: action.rec.cust_name,
        });
      }
    }

    if (action.id == 'oth_liner_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_liner_id: null,
          oth_liner_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_liner_id: action.rec.param_id,
          oth_liner_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_handled_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_handled_id: null,
          oth_handled_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_handled_id: action.rec.param_id,
          oth_handled_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_salesman_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_salesman_id: null,
          oth_salesman_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_salesman_id: action.rec.param_id,
          oth_salesman_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_pol_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_pol_id: null,
          oth_pol_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_pol_id: action.rec.param_id,
          oth_pol_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_pod_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_pod_id: null,
          oth_pod_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_pod_id: action.rec.param_id,
          oth_pod_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_vessel_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_vessel_id: null,
          oth_vessel_code: '',
          oth_vessel_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_vessel_id: action.rec.param_id,
          oth_vessel_code: action.rec.param_code,
          oth_vessel_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'oth_country_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          oth_country_id: null,
          oth_country_name: '',
        });
      } else {
        this.mform.patchValue({
          oth_country_id: action.rec.param_id,
          oth_country_name: action.rec.param_name,
        });
      }
    }

    if (action.name == 'cntr_type_name') {
      if (action.rec == null) {
        this.formArrayRecord('otherop_cntr', action.rowIndex)?.patchValue({
          cntr_type_id: null,
          cntr_type_name: '',
        });
      } else {
        this.formArrayRecord('otherop_cntr', action.rowIndex)?.patchValue({
          cntr_type_id: action.rec.param_id,
          cntr_type_name: action.rec.param_name,
        });
      }
    }

    if (action.name == 'cntr_packages_unit_name') {
      if (action.rec == null) {
        this.formArrayRecord('otherop_cntr', action.rowIndex)?.patchValue({
          cntr_packages_unit_id: null,
          cntr_packages_unit_name: '',
        });
      } else {
        this.formArrayRecord('otherop_cntr', action.rowIndex)?.patchValue({
          cntr_packages_unit_id: action.rec.param_id,
          cntr_packages_unit_name: action.rec.param_name,
        });
      }
    }
  }

}

