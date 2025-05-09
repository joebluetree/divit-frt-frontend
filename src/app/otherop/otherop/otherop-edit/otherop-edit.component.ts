import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { OtherOpService } from '../../services/otherop.service';
import { iContainer, iOtherOp } from '../../models/iotherop';

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component manages creation,editing and saving of Other-Operation (parent table) records

@Component({
  selector: 'app-otherop-edit',
  templateUrl: './otherop-edit.component.html',
  styleUrls: ['./otherop-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class OtherOpEditComponent extends baseEditComponent {

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
    public ms: OtherOpService,
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
      oth_refno: [''],
      oth_ref_date: [date],
      oth_shipment_stage_id: [0],
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
      oth_custom_reles_status: [''],
      oth_is_delivery: [''],
      oth_lfd_date: [''],
      oth_it_no: [''],
      oth_it_date: [''],
      oth_it_port: [''],

      otherop_cntr: this.fb.array([]),
      // otherop_house: this.fb.array([]),
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

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      oth_id: this.id
    })

  }

  addRow(rec: iContainer) {

    // let a = this.gs.getToday();

    const _rec = this.fb.group({
      cntr_id: [rec?.cntr_id || 0],
      cntr_hbl_id: [rec?.cntr_hbl_id || 0],
      cntr_catg: [rec?.cntr_catg || ""],
      cntr_no: [rec?.cntr_no || ""],  //,[Validators.required, Validators.pattern(/^[A-Z]{4}\d{7}$/)]
      cntr_type_id: [rec?.cntr_type_id || 0],
      cntr_type_name: [rec?.cntr_type_name || ""],
      cntr_sealno: [rec?.cntr_sealno || ""],
      cntr_pieces: [rec?.cntr_pieces || 0],
      cntr_packages_unit_id: [rec?.cntr_packages_unit_id || 0],
      cntr_packages_unit_name: [rec?.cntr_packages_unit_name || ""],
      cntr_cbm: [rec?.cntr_cbm || 0],
      cntr_weight: [rec?.cntr_weight || 0],
      cntr_pick_date: [rec?.cntr_pick_date || ""],
      cntr_return_date: [rec?.cntr_return_date || ""],
      cntr_lfd: [rec?.cntr_lfd || ""],
      cntr_discharge_date: [rec?.cntr_discharge_date || ""],
      cntr_order: [rec?.cntr_order || 0],
    });
    return _rec;
  }

  addCntr(iRow: iContainer = <iContainer>{}) {
    this.formArray('otherop_cntr')?.push(this.addRow(iRow));
  }
  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('otherop_cntr').removeAt(idx);
    }
  }
  fillCntr(icntr_list: iContainer[]) {
    this.formArray('otherop_cntr').clear();
    icntr_list.forEach(rec_cntr => {
      this.addCntr(rec_cntr);
    });
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/otherop/otherop/GetRecordAsync').subscribe({
      next: (rec: iOtherOp) => {
        this.mform.patchValue({
          oth_id: rec.oth_id,
          oth_hbl_id: rec.oth_hbl_id,
          oth_parent_id: rec.oth_parent_id,
          oth_cfno: rec.oth_cfno,
          oth_refno: rec.oth_refno,
          oth_ref_date: rec.oth_ref_date,
          oth_shipment_stage_id: rec.oth_shipment_stage_id,
          oth_shipment_stage_name: rec.oth_shipment_stage_name,
          oth_mbl_no: rec.oth_mbl_no,
          oth_agent_id: rec.oth_agent_id,
          oth_agent_name: rec.oth_agent_name,
          oth_liner_id: rec.oth_liner_id,
          oth_liner_name: rec.oth_liner_name,
          oth_handled_id: rec.oth_handled_id,
          oth_handled_name: rec.oth_handled_name,
          oth_salesman_id: rec.oth_salesman_id,
          oth_salesman_name: rec.oth_salesman_name,
          oth_mbl_frt_status: rec.oth_mbl_frt_status,
          oth_pol_id: rec.oth_pol_id,
          oth_pol_name: rec.oth_pol_name,
          oth_pol_etd: rec.oth_pol_etd,
          oth_pod_id: rec.oth_pod_id,
          oth_pod_name: rec.oth_pod_name,
          oth_pod_eta: rec.oth_pod_eta,
          oth_place_delivery: rec.oth_place_delivery,
          oth_country_id: rec.oth_country_id,
          oth_country_name: rec.oth_country_name,
          oth_vessel_id: rec.oth_vessel_id,
          oth_vessel_code: rec.oth_vessel_code,
          oth_vessel_name: rec.oth_vessel_name,
          oth_voyage: rec.oth_voyage,         

          rec_version: rec.rec_version,

        });
        this.getHouseRecord(rec.otherop_house)
        this.fillCntr(rec.otherop_cntr);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }
  getHouseRecord(house: iOtherOp) {
    this.mform.patchValue({
      oth_hbl_id: house.oth_hbl_id,
      oth_hbl_no: house.oth_hbl_no,
      oth_bltype: house.oth_bltype,
  
      oth_shipper_id: house.oth_shipper_id,
      oth_shipper_name: house.oth_shipper_name,
      oth_shipper_add1: house.oth_shipper_add1,
      oth_shipper_add2: house.oth_shipper_add2,
      oth_shipper_add3: house.oth_shipper_add3,
      oth_shipper_add4: house.oth_shipper_add4,
  
      oth_consignee_id: house.oth_consignee_id,
      oth_consignee_name: house.oth_consignee_name,
      oth_consignee_add1: house.oth_consignee_add1,
      oth_consignee_add2: house.oth_consignee_add2,
      oth_consignee_add3: house.oth_consignee_add3,
      oth_consignee_add4: house.oth_consignee_add4,
  
      oth_location_id: house.oth_location_id,
      oth_location_name: house.oth_location_name,
      oth_location_add1: house.oth_location_add1,
      oth_location_add2: house.oth_location_add2,
      oth_location_add3: house.oth_location_add3,
      oth_location_add4: house.oth_location_add4,
  
      oth_it_no: house.oth_it_no,
      oth_it_date: house.oth_it_date,
      oth_it_port: house.oth_it_port,
  
      oth_hbl_frt_status: house.oth_hbl_frt_status,
      oth_packages: house.oth_packages,
      oth_cbm: house.oth_cbm,
      oth_weight: house.oth_weight,
      oth_chwt: house.oth_chwt,
      oth_lbs: house.oth_lbs,
      oth_cft: house.oth_cft,
      oth_chwt_lbs: house.oth_chwt_lbs,
      oth_commodity: house.oth_commodity,
  
      oth_isf_no: house.oth_isf_no,
      oth_lfd_date: house.oth_lfd_date,
      oth_is_pl: house.oth_is_pl,
      oth_is_ci: house.oth_is_ci,
      oth_is_carr_an: house.oth_is_carr_an,
      oth_custom_reles_status: house.oth_custom_reles_status,
      oth_is_delivery: house.oth_is_delivery,
    });
  }


  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iOtherOp>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.oth_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/otherop/otherop/SaveAsync').subscribe({
      next: (v: iOtherOp) => {
        if (this.mode == "add") {
          this.id = v.oth_id;
          this.mode = "edit";
          this.mform.patchValue({ oth_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version,
          oth_cfno: v.oth_cfno,
          oth_refno: v.oth_refno,
          oth_hbl_id: v.oth_hbl_id
        });
        this.fillCntr(v.otherop_cntr);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  callBack(action: any) {
    let rec: any = {};
    if (action?.rec != null) {
      rec = action.rec;
    }

    if (action.id == 'oth_shipper_code') {
      
      this.mform.patchValue({
        oth_shipper_id: rec.cust_id || 0,
        oth_shipper_code: rec.cust_code || '',
        oth_shipper_name: rec.cust_name || '',
        oth_shipper_add1: rec.cust_address1 || '',
        oth_shipper_add2: rec.cust_address2 || '',
        oth_shipper_add3: this.gs.getAttention(rec),
        oth_shipper_add4: this.gs.getTelFax(rec),
      });
    }
    
    if (action.id == 'oth_consignee_code') {

      this.mform.patchValue({
        oth_consignee_id: rec.cust_id || 0,
        oth_consignee_code: rec.cust_code || '',
        oth_consignee_name: rec.cust_name || '',
        oth_consignee_add1: rec.cust_address1 || '',
        oth_consignee_add2: rec.cust_address2 || '',
        oth_consignee_add3: this.gs.getAttention(rec),
        oth_consignee_add4: this.gs.getTelFax(rec),
      });
    }

    if (action.id == 'oth_location_code') {

      this.mform.patchValue({
        oth_location_id: rec.cust_id || 0,
        oth_location_code: rec.cust_code || '',
        oth_location_name: rec.cust_name || '',
        oth_location_add1: rec.cust_address1 || '',
        oth_location_add2: rec.cust_address2 || '',
        oth_location_add3: this.gs.getAttention(rec),
        oth_location_add4: this.gs.getTelFax(rec),
      });
    }

    if (action.id == 'oth_shipment_stage_name') {

      this.mform.patchValue({
        oth_shipment_stage_id: rec.param_id || 0,
        oth_shipment_stage_name: rec.param_name || '',
      });
    }

    if (action.id == 'oth_agent_name') {
      
      this.mform.patchValue({
        oth_agent_id: rec.cust_id || 0,
        oth_agent_name: rec.cust_name || '',
      });
    }

    if (action.id == 'oth_liner_name') {
      
      this.mform.patchValue({
        oth_liner_id: rec.param_id || 0,
        oth_liner_name: rec.param_name || '',
      });
    }

    if (action.id == 'oth_handled_name') {
      
      this.mform.patchValue({
        oth_handled_id: rec.param_id || 0,
        oth_handled_name: rec.param_name || '',
      });
    }

    if (action.id == 'oth_salesman_name') {
      
      this.mform.patchValue({
        oth_salesman_id: rec.param_id || 0,
        oth_salesman_name: rec.param_name || '',
      });
    }
    
    if (action.id == 'oth_pol_name') {
      
      this.mform.patchValue({
        oth_pol_id: rec.param_id || 0,
        oth_pol_name: rec.param_name || '',
      });
    }

    if (action.id == 'oth_pod_name') {
      
      this.mform.patchValue({
        oth_pod_id: rec.param_id || 0,
        oth_pod_name: rec.param_name || '',
      });
    }

    if (action.id == 'oth_vessel_code') {
      
      this.mform.patchValue({
        oth_vessel_id: rec.param_id || 0,
        oth_vessel_code: rec.param_code || '',
        oth_vessel_name: rec.param_name || '',
      });
    }

    if (action.id == 'oth_country_name') {
      
      this.mform.patchValue({
        oth_country_id: rec.param_id || 0,
        oth_country_name: rec.param_name || '',
      });
    }

    if (action.name == 'cntr_type_name') {
      
      this.formArrayRecord('otherop_cntr', action.rowIndex)?.patchValue({
        cntr_type_id: rec.param_id || 0,
        cntr_type_name: rec.param_name || '',
      });
    }

    if (action.name == 'cntr_packages_unit_name') {
      
      this.formArrayRecord('otherop_cntr', action.rowIndex)?.patchValue({
        cntr_packages_unit_id: rec.param_id || 0,
        cntr_packages_unit_name: rec.param_name || '',
      });
    }
  }

  ConvertUnit(value: number, cUnit: 'weight' | 'lbs' | 'cbm' | 'cft'): number {
    const convertionValue = {
      weight: 2.20462,
      lbs: 0.453592,
      cbm: 35.3147,
      cft: 0.0283168
    };
    const changedValue = convertionValue[cUnit];
    return changedValue * value;
  }
  findUnit(action: any) {
  
      console.log(action);
  
      if (!action.isChanged) {
        return;
      }
  
      const data = <iOtherOp>this.mform.value
  
      const n_weight = data?.oth_weight || 0;
      const n_lbs = data?.oth_lbs || 0;
      const n_cbm = data?.oth_cbm || 0;
      const n_cft = data?.oth_cft || 0;
  
  
      if (action.name == 'oth_weight') {
        let nlbs = this.ConvertUnit(n_weight, 'weight');
        this.mform.patchValue({
          oth_lbs: this.gs.roundNumber(nlbs, this.gs.globalConstants.global_dec_places),
        });
      }
      if (action.name == 'oth_lbs') {
        let nweight = this.ConvertUnit(n_lbs, 'lbs');
        this.mform.patchValue({
          oth_weight: this.gs.roundNumber(nweight, this.gs.globalConstants.global_dec_places),
        });
      }
      if (action.name == 'oth_cbm') {
        let ncft = this.ConvertUnit(n_cbm, 'cbm');
        this.mform.patchValue({
          oth_cft: this.gs.roundNumber(ncft, this.gs.globalConstants.global_dec_places),
        });
      }
      if (action.name == 'oth_cft') {
        let ncbm = this.ConvertUnit(n_cft, 'cft');
        this.mform.patchValue({
          oth_cbm: this.gs.roundNumber(ncbm, this.gs.globalConstants.global_dec_places),
        });
      }
    }


}

