import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { SeaImportmService } from '../../services/seaimportm.service';
import { iContainer, iSea_impHouse, iSea_importm } from '../../models/iseaimportm';

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component manages creation,editing and saving of sea import (parent table) records

@Component({
  selector: 'app-seaimportm-edit',
  templateUrl: './seaimportm-edit.component.html',
  styleUrls: ['./seaimportm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class SeaImportmEditComponent extends baseEditComponent {

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
  IncotermList = [
    { key: 'FCL', value: 'FCL' },
    { key: 'LCL', value: 'LCL' },
    { key: 'CONSOLE', value: 'CONSOLE' },
    { key: 'OTHERS', value: 'OTHERS' },
  ]
  TimeList = [
    { key: 'N/A', value: 'N/A' },
    { key: 'AM', value: 'AM' },
    { key: 'PM', value: 'PM' },
  ]
  BlStatusList = [
    { key: 'NIL', value: 'NIL' },
    { key: 'PENDING SEAWAY', value: 'PENDING SEAWAY' },
    { key: 'SEAWAY BILL', value: 'SEAWAY BILL' },
    { key: 'PENDING TELEX RELEASED', value: 'PENDING TELEX RELEASED' },
    { key: 'TELEX RELEASED', value: 'TELEX RELEASED' },
  ]
  constructor(
    public ms: SeaImportmService,
    public dialog: MatDialog

  ) {
    super();
    this.showModel = false;
    this.mform = this.createForm();
  }

  createForm(){
    let date = this.gs.getToday();
    return this.fb.group({
      mbl_id: [0],
      mbl_cfno: [0],
      mbl_mode: [''],
      mbl_refno: [''],
      mbl_ref_date: [date],
      mbl_shipment_stage_id: [0],
      mbl_shipment_stage_name: [''],
      mbl_no: [''],
      mbl_agent_id: [0],
      mbl_agent_name: [''],
      mbl_liner_id: [0],
      mbl_liner_name: [''],
      mbl_coloader_id: [0],
      mbl_coloader_name: [''],
      mbl_handled_id: [0],
      mbl_handled_name: [''],
      mbl_salesman_id: [0],
      mbl_salesman_name: [''],
      mbl_frt_status_name: [''],
      mbl_ship_term_id: [0],
      mbl_ship_term_name: [''],
      mbl_cntr_type: [''],
      mbl_incoterm_id: [0],
      mbl_incoterm_name: [''],
      mbl_pol_id: [0],
      mbl_pol_name: [''],
      mbl_pol_etd: [''],
      mbl_pod_id: [0],
      mbl_pod_name: [''],
      mbl_pod_eta: [''],
      mbl_place_delivery: [''],
      mbl_pofd_eta: [''],
      mbl_country_id: [0],
      mbl_country_name: [''],
      mbl_vessel_id: [0],
      mbl_vessel_code: [''],
      mbl_vessel_name: [''],
      mbl_voyage: [''],
      mbl_status_id: [0],
      mbl_status_name: [''],
      mbl_is_sea_waybill: ['NIL'],
      mbl_ombl_sent_on: [''],
      mbl_ombl_sent_ampm: ['N/A'],
      mbl_of_sent_on: [''],
      mbl_cargo_loc_id: [0],
      mbl_cargo_loc_code: [''],
      mbl_cargo_loc_name: [''],
      mbl_cargo_loc_add1: [''],
      mbl_cargo_loc_add2: [''],
      mbl_cargo_loc_add3: [''],
      mbl_cargo_loc_add4: [''],
      mbl_devan_loc_id: [0],
      mbl_devan_loc_code: [''],
      mbl_devan_loc_name: [''],
      mbl_devan_loc_add1: [''],
      mbl_devan_loc_add2: [''],
      mbl_devan_loc_add3: [''],
      mbl_devan_loc_add4: [''],
      rec_files_count: [0],
      rec_files_attached: [''],
      rec_memo_count: [0],
      rec_memo_attached: [''],

      master_cntr: this.fb.array([]),
      master_house: this.fb.array([]),
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
      mbl_id: this.id
    })

    this.getDefaultData();
  }

  getDefaultData() {
    this.ms.getRecord({}, '/api/seaimport/seaimportm/GetDefaultData').subscribe({
      next: (rec: iSea_importm) => {
        this.mform.patchValue({
          mbl_shipment_stage_id: rec.mbl_shipment_stage_id,
          mbl_shipment_stage_name: rec.mbl_shipment_stage_name
        });
      },
      error: (e) => {
        this.gs.showError(e);
      }
    });
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
    this.formArray('master_cntr')?.push(this.addRow(iRow));
  }
  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('master_cntr').removeAt(idx);
    }
  }
  fillCntr(icntr_list: iContainer[]) {
    this.formArray('master_cntr').clear();
    icntr_list.forEach(rec_cntr => {
      this.addCntr(rec_cntr);
    });
  }

  addHouseRow(rec: iSea_impHouse) {
    const _rec = this.fb.group({
      hbl_id: [rec?.hbl_id || 0],
      hbl_mbl_id: [rec?.hbl_mbl_id || 0],
      hbl_houseno: [rec?.hbl_houseno || ""],
      hbl_shipper_name: [rec?.hbl_shipper_name || ""],
      hbl_consignee_name: [rec?.hbl_consignee_name || ""],
      hbl_client_cat: [rec?.hbl_client_cat || ""],
      hbl_client_type: [rec?.hbl_client_type || ""],
      hbl_packages: [rec?.hbl_packages || 0],
      hbl_handled_name: [rec?.hbl_handled_name || ""],
      hbl_telex_released_code: [rec?.hbl_telex_released_code || ""],
      hbl_frt_status_name: [rec?.hbl_frt_status_name || ""],
      hbl_ship_term_name: [rec?.hbl_ship_term_name || ""],
      rec_created_by: [rec?.rec_created_by || ""],
      rec_created_date: [rec?.rec_created_date || ""],
    });
    return _rec;
  }

  addHouse(iRow: iSea_impHouse = <iSea_impHouse>{}) {
    this.formArray('master_house')?.push(this.addHouseRow(iRow));
  }

  fillHouse(ihouse_list: iSea_impHouse[]) {
    this.formArray('master_house').clear();
    ihouse_list.forEach(rec_house => {
      this.addHouse(rec_house);
    });
  }

  deleteHouse(idx: number, house: string, hbl_id: number) {
    if (!hbl_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Delete House no ${house} y/n`)) {
      const param = { id: hbl_id, url: '/api/seaimport/seaimporth/DeleteAsync' };

      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('master_house').removeAt(idx);
          }
        },
        error: (e) => {
          this.gs.showError(e);
        }
      });
    }
  }

  getRecord() {
    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/seaimport/seaimportm/GetRecordAsync').subscribe({
      next: (rec: iSea_importm) => {
        this.mform.patchValue({
          mbl_id: rec.mbl_id,
          mbl_cfno: rec.mbl_cfno,
          mbl_mode: rec.mbl_mode,
          mbl_refno: rec.mbl_refno,
          mbl_ref_date: rec.mbl_ref_date,
          mbl_shipment_stage_id: rec.mbl_shipment_stage_id,
          mbl_shipment_stage_name: rec.mbl_shipment_stage_name,
          mbl_no: rec.mbl_no,
          mbl_agent_id: rec.mbl_agent_id,
          mbl_agent_name: rec.mbl_agent_name,
          mbl_liner_id: rec.mbl_liner_id,
          mbl_liner_name: rec.mbl_liner_name,
          mbl_coloader_id: rec.mbl_coloader_id,
          mbl_coloader_name: rec.mbl_coloader_name,
          mbl_handled_id: rec.mbl_handled_id,
          mbl_handled_name: rec.mbl_handled_name,
          mbl_salesman_id: rec.mbl_salesman_id,
          mbl_salesman_name: rec.mbl_salesman_name,
          mbl_frt_status_name: rec.mbl_frt_status_name,
          mbl_ship_term_id: rec.mbl_ship_term_id,
          mbl_ship_term_name: rec.mbl_ship_term_name,
          mbl_cntr_type: rec.mbl_cntr_type,
          mbl_incoterm_id: rec.mbl_incoterm_id,
          mbl_incoterm_name: rec.mbl_incoterm_name,
          mbl_pol_id: rec.mbl_pol_id,
          mbl_pol_name: rec.mbl_pol_name,
          mbl_pol_etd: rec.mbl_pol_etd,
          mbl_pod_id: rec.mbl_pod_id,
          mbl_pod_name: rec.mbl_pod_name,
          mbl_pod_eta: rec.mbl_pod_eta,
          mbl_place_delivery: rec.mbl_place_delivery,
          mbl_pofd_eta: rec.mbl_pofd_eta,
          mbl_country_id: rec.mbl_country_id,
          mbl_country_name: rec.mbl_country_name,
          mbl_vessel_id: rec.mbl_vessel_id,
          mbl_vessel_code: rec.mbl_vessel_code,
          mbl_vessel_name: rec.mbl_vessel_name,
          mbl_voyage: rec.mbl_voyage,
          mbl_status_id: rec.mbl_status_id,
          mbl_status_name: rec.mbl_status_name,
          mbl_is_sea_waybill: rec.mbl_is_sea_waybill,
          mbl_ombl_sent_on: rec.mbl_ombl_sent_on,
          mbl_ombl_sent_ampm: rec.mbl_ombl_sent_ampm,
          mbl_of_sent_on: rec.mbl_of_sent_on,
          mbl_cargo_loc_id: rec.mbl_cargo_loc_id,
          mbl_cargo_loc_code: rec.mbl_cargo_loc_code,
          mbl_cargo_loc_name: rec.mbl_cargo_loc_name,
          mbl_cargo_loc_add1: rec.mbl_cargo_loc_add1,
          mbl_cargo_loc_add2: rec.mbl_cargo_loc_add2,
          mbl_cargo_loc_add3: rec.mbl_cargo_loc_add3,
          mbl_cargo_loc_add4: rec.mbl_cargo_loc_add4,
          mbl_devan_loc_id: rec.mbl_devan_loc_id,
          mbl_devan_loc_code: rec.mbl_devan_loc_code,
          mbl_devan_loc_name: rec.mbl_devan_loc_name,
          mbl_devan_loc_add1: rec.mbl_devan_loc_add1,
          mbl_devan_loc_add2: rec.mbl_devan_loc_add2,
          mbl_devan_loc_add3: rec.mbl_devan_loc_add3,
          mbl_devan_loc_add4: rec.mbl_devan_loc_add4,
          rec_files_count: rec.rec_files_count,
          rec_files_attached: rec.rec_files_attached,
          rec_memo_count: rec.rec_memo_count,
          rec_memo_attached: rec.rec_memo_attached,
          rec_version: rec.rec_version,

        });
        this.fillCntr(rec.master_cntr);
        this.fillHouse(rec.master_house);
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
    const data = <iSea_importm>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.mbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/seaimport/seaimportm/SaveAsync').subscribe({
      next: (v: iSea_importm) => {
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
          rec_version: v.rec_version,
          mbl_cfno: v.mbl_cfno,
          mbl_refno: v.mbl_refno
        });
        this.fillCntr(v.master_cntr);
        // this.fillHouse(v.master_house);
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

    if (action.id == 'mbl_shipment_stage_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_shipment_stage_id: rec.param_id || 0,
        mbl_shipment_stage_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_agent_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_agent_id: rec.cust_id || 0,
        mbl_agent_name: rec.cust_name || '',
      });
    }

    if (action.id == 'mbl_liner_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_liner_id: rec.param_id || 0,
        mbl_liner_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_coloader_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_coloader_id: rec.cust_id || 0,
        mbl_coloader_name: rec.cust_name || '',
      });
    }

    if (action.id == 'mbl_handled_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_handled_id: rec.param_id || 0,
        mbl_handled_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_salesman_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_salesman_id: rec.param_id || 0,
        mbl_salesman_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_frt_status_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_frt_status_id: rec.param_id || 0,
        mbl_frt_status_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_ship_term_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_ship_term_id: rec.param_id || 0,
        mbl_ship_term_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_incoterm_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_incoterm_id: rec.param_id || 0,
        mbl_incoterm_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_status_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_status_id: rec.param_id || 0,
        mbl_status_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_pol_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_pol_id: rec.param_id || 0,
        mbl_pol_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_pod_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_pod_id: rec.param_id || 0,
        mbl_pod_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_vessel_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_vessel_id: rec.param_id || 0,
        mbl_vessel_code: rec.param_code || '',
        mbl_vessel_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_country_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_country_id: rec.param_id || 0,
        mbl_country_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbl_cargo_loc_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_cargo_loc_id: rec.cust_id || 0,
        mbl_cargo_loc_code: rec.cust_code || '',
        mbl_cargo_loc_name: rec.cust_name || '',
        mbl_cargo_loc_add1: rec.cust_address1 || '',
        mbl_cargo_loc_add2: rec.cust_address2 || '',
        mbl_cargo_loc_add3: rec.cust_address3 || '',
        mbl_cargo_loc_add4: this.gs.getTelFax(rec),
      });
    }

    if (action.id == 'mbl_devan_loc_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_devan_loc_id: rec.cust_id || 0,
        mbl_devan_loc_code: rec.cust_code || '',
        mbl_devan_loc_name: rec.cust_name || '',
        mbl_devan_loc_add1: rec.cust_address1 || '',
        mbl_devan_loc_add2: rec.cust_address2 || '',
        mbl_devan_loc_add3: rec.cust_address3 || '',
        mbl_devan_loc_add4: this.gs.getTelFax(rec),
      });
    }

    if (action.name == 'cntr_type_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.formArrayRecord('master_cntr', action.rowIndex)?.patchValue({
        cntr_type_id: rec.param_id || 0,
        cntr_type_name: rec.param_name || '',
      });
    }

    if (action.name == 'cntr_packages_unit_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.formArrayRecord('master_cntr', action.rowIndex)?.patchValue({
        cntr_packages_unit_id: rec.param_id || 0,
        cntr_packages_unit_name: rec.param_name || '',
      });
    }
  }


}

