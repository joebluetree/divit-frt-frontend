import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { SeaExportmService } from '../../services/seaexportm.service';
import { iContainer,iSea_expHouse,iSea_exportm } from '../../models/iseaexportm';
import { iSea_exportH } from '../../models/iseaexporth';

//Name : Sourav V
//Created Date : 04/01/2025
//Remark : this component manages creation,editing and saving of qtnm-lcl(parent table) records

@Component({
  selector: 'app-seaexportm-edit',
  templateUrl: './seaexportm-edit.component.html',
  styleUrls: ['./seaexportm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class SeaExportmEditComponent extends baseEditComponent {

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

  constructor(
    public ms: SeaExportmService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      mbl_id: [0],
      mbl_cfno: [0],
      mbl_mode: [''],
      mbl_refno: [''],
      mbl_ref_date: [date],
      mbl_shipment_stage_id: [0],
      mbl_shipment_stage_name: [''],
      mbl_no: [''],
      mbl_sub_houseno: [''],
      mbl_liner_bookingno: [''],
      mbl_agent_id: [0],
      mbl_agent_name: [''],
      mbl_liner_id: [0],
      mbl_liner_name: [''],
      mbl_handled_id: [0],
      mbl_handled_name: [''],
      mbl_salesman_id: [0],
      mbl_salesman_name: [''],
      mbl_frt_status_name: [''],
      mbl_ship_term_id: [0],
      mbl_ship_term_name: [''],
      mbl_cntr_type: [''],
      mbl_direct: [''],
      mbl_place_delivery: [''],
      mbl_pol_id: [0],
      mbl_pol_name: [''],
      mbl_pol_etd: [''],
      mbl_pod_id: [0],
      mbl_pod_name: [''],
      mbl_pod_eta: [''],
      mbl_pofd_id: [0],
      mbl_pofd_name: [''],
      mbl_pofd_eta: [''],
      mbl_country_id: [0],
      mbl_country_name: [''],
      mbl_vessel_id: [0],
      mbl_vessel_code: [''],
      mbl_vessel_name: [''],
      mbl_voyage: [''],
      mbl_book_slno: [0],
      rec_files_count: [0],
      rec_files_attached: [''],
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

  addHouseRow(rec: iSea_expHouse) {
    const _rec = this.fb.group({
      hbl_id: [rec?.hbl_id || 0],
      hbl_mbl_id: [rec?.hbl_mbl_id || 0],
      hbl_houseno: [rec?.hbl_houseno || ""],
      hbl_shipper_name: [rec?.hbl_shipper_name || ""],
      hbl_consignee_name: [rec?.hbl_consignee_name || ""],
      hbl_pcs: [rec?.hbl_pcs || null],
      hbl_handled_name: [rec?.hbl_handled_name || ""],
      hbl_frt_status_name: [rec?.hbl_frt_status_name || ""],
      rec_created_by: [rec?.rec_created_by || ""],
      rec_created_date: [rec?.rec_created_date || ""],
    });
    return _rec;
  }

  addHouse(iRow: iSea_expHouse = <iSea_expHouse>{}) {
    this.formArray('master_house')?.push(this.addHouseRow(iRow));
  }

  fillHouse(ihouse_list: iSea_expHouse[]) {
    this.formArray('master_house').clear();
    ihouse_list.forEach(rec_house => {
      this.addHouse(rec_house);
    });
  }
  
  deleteHouse(idx: number,house: string, hbl_id: number) {
    if (!hbl_id) {
      alert("Invalid Record ID");
      return;
    }
  
    if (window.confirm(`Delete House no ${house} y/n`)) {
      const param = { id: hbl_id, url : '/api/seaexport/seaexporth/DeleteAsync' };
  
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
    this.ms.getRecord(param, '/api/seaexport/seaexportm/GetRecordAsync').subscribe({
      next: (rec: iSea_exportm) => {
        this.mform.patchValue({
          mbl_id: rec.mbl_id,
          mbl_cfno: rec.mbl_cfno,
          mbl_mode: rec.mbl_mode,
          mbl_refno: rec.mbl_refno,
          mbl_ref_date: rec.mbl_ref_date,
          mbl_shipment_stage_id: rec.mbl_shipment_stage_id,
          mbl_shipment_stage_name: rec.mbl_shipment_stage_name,
          mbl_no: rec.mbl_no,
          mbl_sub_houseno: rec.mbl_sub_houseno,
          mbl_liner_bookingno: rec.mbl_liner_bookingno,
          mbl_agent_id: rec.mbl_agent_id,
          mbl_agent_name: rec.mbl_agent_name,
          mbl_liner_id: rec.mbl_liner_id,
          mbl_liner_name: rec.mbl_liner_name,
          mbl_handled_id: rec.mbl_handled_id,
          mbl_handled_name: rec.mbl_handled_name,
          mbl_salesman_id: rec.mbl_salesman_id,
          mbl_salesman_name: rec.mbl_salesman_name,
          mbl_frt_status_name: rec.mbl_frt_status_name,
          mbl_ship_term_id: rec.mbl_ship_term_id,
          mbl_ship_term_name: rec.mbl_ship_term_name,
          mbl_cntr_type: rec.mbl_cntr_type,
          mbl_direct: rec.mbl_direct,
          mbl_place_delivery: rec.mbl_place_delivery,
          mbl_pol_id: rec.mbl_pol_id,
          mbl_pol_name: rec.mbl_pol_name,
          mbl_pol_etd: rec.mbl_pol_etd,
          mbl_pod_id: rec.mbl_pod_id,
          mbl_pod_name: rec.mbl_pod_name,
          mbl_pod_eta: rec.mbl_pod_eta,
          mbl_pofd_id: rec.mbl_pofd_id,
          mbl_pofd_name: rec.mbl_pofd_name,
          mbl_pofd_eta: rec.mbl_pofd_eta,
          mbl_country_id: rec.mbl_country_id,
          mbl_country_name: rec.mbl_country_name,
          mbl_vessel_id: rec.mbl_vessel_id,
          mbl_vessel_code: rec.mbl_vessel_code,
          mbl_vessel_name: rec.mbl_vessel_name,
          mbl_voyage: rec.mbl_voyage,
          mbl_book_slno: rec.mbl_book_slno,
          rec_files_count: rec.rec_files_count,
          rec_files_attached: rec.rec_files_attached,
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
    const data = <iSea_exportm>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.mbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/seaexport/seaexportm/SaveAsync').subscribe({
      next: (v: iSea_exportm) => {
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
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_shipment_stage_id: rec.param_id || 0,
        mbl_shipment_stage_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_agent_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_agent_id: rec.cust_id || 0,
        mbl_agent_name: rec.cust_name || '',
      });
    }
  
    if (action.id == 'mbl_liner_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_liner_id: rec.param_id || 0,
        mbl_liner_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_handled_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_handled_id: rec.param_id || 0,
        mbl_handled_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_salesman_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_salesman_id: rec.param_id || 0,
        mbl_salesman_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_frt_status_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_frt_status_id: rec.param_id || 0,
        mbl_frt_status_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_ship_term_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_ship_term_id: rec.param_id || 0,
        mbl_ship_term_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_pol_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_pol_id: rec.param_id || 0,
        mbl_pol_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_pod_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_pod_id: rec.param_id || 0,
        mbl_pod_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_pofd_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_pofd_id: rec.param_id || 0,
        mbl_pofd_name: rec.param_name || '',
      });
    }
  
    if (action.id == 'mbl_vessel_code') {
      //let rec: any = {};
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
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbl_country_id: rec.param_id || 0,
        mbl_country_name: rec.param_name || '',
      });
    }
  
    if (action.name == 'cntr_type_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.formArrayRecord('master_cntr', action.rowIndex)?.patchValue({
        cntr_type_id: rec.param_id || 0,
        cntr_type_name: rec.param_name || '',
      });
    }
  
    if (action.name == 'cntr_packages_unit_name') {
      //let rec: any = {};
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.formArrayRecord('master_cntr', action.rowIndex)?.patchValue({
        cntr_packages_unit_id: rec.param_id || 0,
        cntr_packages_unit_name: rec.param_name || '',
      });
    }
  }


  // onBlur(action: any) {
  //   console.log('onBlur Action', action);
  // }

}

