import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { MemoEditComponent } from "../../../common-shipment/memo/memo-edit/memo-edit.component";
import { OpHandleService } from '../../services/ophandle.service';
import { iOpHandle } from '../../models/iophandle';
import { AgentShipmentService } from '../../services/agentshipment.service';

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component manages creation,editing and saving of Other-Operation (parent table) records

@Component({
  selector: 'app-agentshipment-edit',
  templateUrl: './agentshipment-edit.component.html',
  styleUrls: ['./agentshipment-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class AgentShipmentEditComponent extends baseEditComponent {

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
    public ms: AgentShipmentService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      hbl_id: [0],
      hbl_hbl_id: [0],
      hbl_parent_id: [0],
      hbl_cfno: [0],
      hbl_mode: [''],
      hbl_refno: [''],
      hbl_ref_date: [date],
      hbl_shipment_stage_id: [null],
      hbl_shipment_stage_name: [''],
      hbl_mbl_no: [''],
      hbl_agent_id: [0],
      hbl_agent_name: [''],
      hbl_liner_id: [0],
      hbl_liner_name: [''],
      hbl_handled_id: [0],
      hbl_handled_name: [''],
      hbl_salesman_id: [0],
      hbl_salesman_name: [''],
      hbl_mbl_frt_status: [''],
      hbl_pol_id: [0],
      hbl_pol_name: [''],
      hbl_pol_etd: [''],
      hbl_pod_id: [0],
      hbl_pod_name: [''],
      hbl_pod_eta: [''],
      hbl_place_delivery: [''],
      hbl_country_id: [0],
      hbl_country_name: [''],
      hbl_vessel_id: [0],
      hbl_vessel_code: [''],
      hbl_vessel_name: [''],
      hbl_voyage: [''],
      hbl_hbl_no: [''],
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
      hbl_bltype: [''],
      hbl_hbl_frt_status: [''],
      hbl_commodity: [''],
      hbl_isf_no: [''],
      hbl_packages: [0],
      hbl_cbm: [0],
      hbl_weight: [0],
      hbl_lbs: [0],
      hbl_cft: [0],
      hbl_chwt: [0],
      hbl_chwt_lbs: [0],
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
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      hbl_id: this.id
    })
  }
}

