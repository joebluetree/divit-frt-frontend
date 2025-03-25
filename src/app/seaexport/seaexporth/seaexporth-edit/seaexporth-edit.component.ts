import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { SeaExportmService } from '../../services/seaexportm.service';
import { iContainer, iSea_exportm } from '../../models/iseaexportm';
import { SeaExportHService } from '../../services/seaexporth.service';
import { iSea_exportH } from '../../models/iseaexporth';

//Name : Sourav V
//Created Date : 28/02/2025
//Remark : this component manages creation,editing and saving of sea export house(parent table) records

@Component({
  selector: 'app-seaexporth-edit',
  templateUrl: './seaexporth-edit.component.html',
  styleUrls: ['./seaexporth-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class SeaExportHEditComponent extends baseEditComponent {

  print_frt_status_type = "TBA";

  frtList = [
    { key: 'COLLECT', value: 'COLLECT' },
    { key: 'PREPAID', value: 'PREPAID' },
    { key: 'TBA', value: 'TBA' },
  ]
  clientList = [
    { key: 'FREEHAND', value: 'FREEHAND' },
    { key: 'MUTUAL', value: 'MUTUAL' },
    { key: 'NOMINATION', value: 'NOMINATION' },
  ]
  telexList = [
    { key: 'N/A', value: 'N/A' },
    { key: 'OBL ISSUES', value: 'OBL ISSUES' },
    { key: 'TELEX RELEASE', value: 'TELEX RELEASE' },
  ]

  mbl_id:number;
  
  constructor(
    private ms: SeaExportHService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = true;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      hbl_id: [0],
      hbl_mbl_id: [0],
      hbl_mbl_refno: [''],
      hbl_cfno: [0],
      hbl_houseno: [''],
      hbl_shipment_stage_id: [0],
      hbl_shipment_stage_name: [''],
      hbl_bltype: [''],
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
      hbl_notify_id: [0],
      hbl_notify_code: [''],
      hbl_notify_name: [''],
      hbl_notify_add1: [''],
      hbl_notify_add2: [''],
      hbl_notify_add3: [''],
      hbl_notify_add4: [''],
      hbl_notify_add5: [''],
      hbl_exp_ref1: [''],
      hbl_exp_ref2: [''],
      hbl_exp_ref3: [''],
      hbl_agent_id: [0],
      hbl_agent_name: [''],
      hbl_origin: [''],
      hbl_rout1: [''],
      hbl_rout2: [''],
      hbl_rout3: [''],
      hbl_rout4: [''],
      hbl_pre_carriage: [''],
      hbl_place_receipt: [''],
      hbl_pol_name: [''],
      hbl_pod_name: [''],
      hbl_place_delivery: [''],
      hbl_pofd_name: [''],
      hbl_type_move: [''],
      hbl_is_cntrized: [''],
      hbl_frt_status_name: [''],
      hbl_handled_id: [0],
      hbl_handled_name: [''],
      hbl_salesman_id: [0],
      hbl_salesman_name: [''],
      hbl_goods_nature: [''],
      hbl_commodity: [''],
      hbl_is_arranged: [''],
      hbl_obl_telex: ['N/A'],
      hbl_obl_slno: [''],
      hbl_format_id: [46],
      hbl_format_name: ['MOTHERLINES BLANK'],//default
      hbl_draft_format_id: [47],
      hbl_draft_format_name: ['MOTHERLINES DRAFT'],//
      hbl_lbs: [0],
      hbl_weight: [0],
      hbl_cft: [0],
      hbl_cbm: [0],
      hbl_pcs: [0],
      hbl_packages: [0],
      hbl_uom_id: [0],
      hbl_uom_name: [''],
      hbl_print_kgs: [''],
      hbl_print_lbs: [''],
      hbl_clean: [''],
      hbl_remark1: [''],
      hbl_remark2: [''],
      hbl_remark3: [''],
      hbl_by1: [''],
      hbl_by2: [''],
      hbl_issued_place: [''],
      hbl_issued_date: [''],
      hbl_delivery_date: [''],
      hbl_originals: [0],
      
      marks1: this.formDesc(),
      marks2: this.formDesc(),
      marks3: this.formDesc(),
      marks4: this.formDesc(),
      marks5: this.formDesc(),
      marks6: this.formDesc(),
      marks7: this.formDesc(),
      marks8: this.formDesc(),
      marks9: this.formDesc(),
      marks10: this.formDesc(),
      marks11: this.formDesc(),
      marks12: this.formDesc(),
      marks13: this.formDesc(),
      marks14: this.formDesc(),
      marks15: this.formDesc(),
      marks16: this.formDesc(),
      marks17: this.formDesc(),

      house_cntr: this.fb.array([]),
      rec_version: [0],

    })
  }

  ngOnInit() {
    this.id = 0;
    // this.mbl_id =0;
    this.init();
    this.route.queryParams.forEach ((rec:any) => {
      this.mbl_id = rec["mbl_id"]; 
    }); 

    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      hbl_id: this.id,
      hbl_mbl_id: this.mbl_id,

    })
    // this.formDesc();
    this.getDefaultData();
  }
  
  formDesc() {
    return this.fb.group({
      desc_id: [0],
      desc_parent_id: [0],
      desc_parent_type: [''],
      desc_ctr: [0],
      desc_mark: [''],
      desc_package: [''],
      desc_description: ['']
    });
  }

  addRow(rec: iContainer) {

    // let a = this.gs.getToday();

    const _rec = this.fb.group({
      cntr_id: [rec?.cntr_id || 0],
      cntr_hbl_id: [rec?.cntr_hbl_id || 0],
      cntr_mbl_id: [rec?.cntr_mbl_id || 0],
      cntr_catg: [rec?.cntr_catg || ""],
      cntr_no: [rec?.cntr_no || ""],
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
    this.formArray('house_cntr')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('house_cntr').removeAt(idx);
    }
  }

  fillCntr(icntr_list: iContainer[]) {
    this.formArray('house_cntr').clear();
    icntr_list.forEach(rec_cntr => {
      this.addCntr(rec_cntr);
    });
  }

  getDefaultData() {

    const param = { 'id': this.mbl_id };
    this.ms.getRecord(param, '/api/seaexport/seaexporth/GetDefaultData').subscribe({
      next: (rec: iSea_exportH) => {
        this.mform.patchValue({
          hbl_mbl_id: rec.hbl_mbl_id,
          hbl_mbl_refno: rec.hbl_mbl_refno,
          hbl_agent_id: rec.hbl_agent_id,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_pol_name: rec.hbl_pol_name,
          hbl_pod_name: rec.hbl_pod_name,
          hbl_place_delivery: rec.hbl_place_delivery,
          hbl_handled_id : rec.hbl_handled_id,
          hbl_handled_name : rec.hbl_handled_name,
          hbl_salesman_id : rec.hbl_salesman_id,
          hbl_salesman_name : rec.hbl_salesman_name,
          hbl_by1 : rec.hbl_handled_name,
          hbl_issued_date: rec.hbl_issued_date,
//add desc default value
        });
        this.fillCntr(rec.house_cntr);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/seaexport/seaexporth/GetRecordAsync').subscribe({
      next: (rec: iSea_exportH) => {
        this.mform.patchValue({
          hbl_id: rec.hbl_id,
          hbl_mbl_id: rec.hbl_mbl_id,
          hbl_mbl_refno: rec.hbl_mbl_refno,
          hbl_cfno: rec.hbl_cfno,
          hbl_houseno: rec.hbl_houseno,
          hbl_shipment_stage_id: rec.hbl_shipment_stage_id,
          hbl_shipment_stage_name: rec.hbl_shipment_stage_name,
          hbl_bltype: rec.hbl_bltype,
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
          hbl_notify_id: rec.hbl_notify_id,
          hbl_notify_code: rec.hbl_notify_code,
          hbl_notify_name: rec.hbl_notify_name,
          hbl_notify_add1: rec.hbl_notify_add1,
          hbl_notify_add2: rec.hbl_notify_add2,
          hbl_notify_add3: rec.hbl_notify_add3,
          hbl_notify_add4: rec.hbl_notify_add4,
          hbl_notify_add5: rec.hbl_notify_add5,
          hbl_exp_ref1: rec.hbl_exp_ref1,
          hbl_exp_ref2: rec.hbl_exp_ref2,
          hbl_exp_ref3: rec.hbl_exp_ref3,
          hbl_agent_id: rec.hbl_agent_id,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_origin: rec.hbl_origin,
          hbl_rout1: rec.hbl_rout1,
          hbl_rout2: rec.hbl_rout2,
          hbl_rout3: rec.hbl_rout3,
          hbl_rout4: rec.hbl_rout4,
          hbl_pre_carriage: rec.hbl_pre_carriage,
          hbl_place_receipt: rec.hbl_place_receipt,
          hbl_pol_name: rec.hbl_pol_name,
          hbl_pod_name: rec.hbl_pod_name,
          hbl_place_delivery: rec.hbl_place_delivery,
          hbl_pofd_name: rec.hbl_pofd_name,
          hbl_type_move: rec.hbl_type_move,
          hbl_is_cntrized: rec.hbl_is_cntrized,
          hbl_frt_status_name: rec.hbl_frt_status_name,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,
          hbl_goods_nature: rec.hbl_goods_nature,
          hbl_commodity: rec.hbl_commodity,
          hbl_is_arranged: rec.hbl_is_arranged,
          hbl_obl_telex: rec.hbl_obl_telex,
          hbl_obl_slno: rec.hbl_obl_slno,
          hbl_format_id: rec.hbl_format_id,
          hbl_format_name: rec.hbl_format_name,
          hbl_draft_format_id: rec.hbl_draft_format_id,
          hbl_draft_format_name: rec.hbl_draft_format_name,
          hbl_lbs: rec.hbl_lbs,
          hbl_weight: rec.hbl_weight,
          hbl_cft: rec.hbl_cft,
          hbl_cbm: rec.hbl_cbm,
          hbl_pcs: rec.hbl_pcs,
          hbl_packages: rec.hbl_packages,
          hbl_uom_id: rec.hbl_uom_id,
          hbl_uom_name: rec.hbl_uom_name,
          hbl_print_kgs: rec.hbl_print_kgs,
          hbl_print_lbs: rec.hbl_print_lbs,
          hbl_clean: rec.hbl_clean,
          hbl_remark1: rec.hbl_remark1,
          hbl_remark2: rec.hbl_remark2,
          hbl_remark3: rec.hbl_remark3,
          hbl_by1: rec.hbl_by1,
          hbl_by2: rec.hbl_by2,
          hbl_issued_place: rec.hbl_issued_place,
          hbl_issued_date: rec.hbl_issued_date,
          hbl_delivery_date: rec.hbl_delivery_date,
          hbl_originals: rec.hbl_originals,

          rec_version: rec.rec_version,

        });
        // for (let i = 1; i <= 17; i++) {
        //   this.mform.patchValue({ [`marks${i}`]: (rec as any)[`marks${i}`] ?? this.formDesc() });
        // }
        this.updateDescIds(rec);

        this.mbl_id = rec.hbl_mbl_id;
        this.fillCntr(rec.house_cntr);
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
    const data = <iSea_exportH>this.mform.value;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.hbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/seaexport/seaexporth/SaveAsync').subscribe({
      next: (v: iSea_exportH) => {
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

        this.updateDescIds(v);

        this.mform.patchValue({
          rec_version: v.rec_version,
          hbl_cfno: v.hbl_cfno,
          hbl_houseno: v.hbl_houseno,
          hbl_mbl_refno: v.hbl_mbl_refno
        });
        this.fillCntr(v.house_cntr);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  updateDescIds(data: iSea_exportH) {
    if (!data) return;

    for (let i = 1; i <= 17; i++) {
      this.mform.patchValue({ [`marks${i}`]: (data as any)[`marks${i}`] ?? this.formDesc() });
    }
  
    // this.mform.patchValue(patchValues);
  }
  callBack(action: any) {
    if (action.id == 'hbl_shipment_stage_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_shipment_stage_id: action.rec ? action.rec.param_id : 0,
          hbl_shipment_stage_name: action.rec ? action.rec.param_name : '',
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
      if (action.rec) {
        this.mform.patchValue({
          hbl_shipper_id: action.rec ? action.rec.cust_id : 0,
          hbl_shipper_code: action.rec ? action.rec.cust_code : '',
          hbl_shipper_name: action.rec ? action.rec.cust_name : '',
          hbl_shipper_add1: action.rec ? action.rec.cust_address1 : '',
          hbl_shipper_add2: action.rec ? action.rec.cust_address2 : '',
          hbl_shipper_add3: action.rec ? action.rec.cust_address3 : '',
          hbl_shipper_add4: action.rec ? action.rec.cust_address4 : '',
          hbl_shipper_add5: action.rec ? (action.rec.cust_tel ? 'TEL : ' + action.rec.cust_tel : '') +
                                         (action.rec.cust_fax ? ' FAX : ' + action.rec.cust_fax : '') : '',
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
          hbl_shipper_add5: '',
        });
      }
    }
    if (action.id == 'hbl_consignee_code') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_consignee_id: action.rec ? action.rec.cust_id : 0,
          hbl_consignee_code: action.rec ? action.rec.cust_code : '',
          hbl_consignee_name: action.rec ? action.rec.cust_name : '',
          hbl_consignee_add1: action.rec ? action.rec.cust_address1 : '',
          hbl_consignee_add2: action.rec ? action.rec.cust_address2 : '',
          hbl_consignee_add3: action.rec ? action.rec.cust_address3 : '',
          hbl_consignee_add4: action.rec ? action.rec.cust_address4 : '',
          hbl_consignee_add5: action.rec ? (action.rec.cust_tel ? 'TEL : ' + action.rec.cust_tel : '') +
          (action.rec.cust_fax ? ' FAX : ' + action.rec.cust_fax : '') : '',
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
        });
      }
    }
    if (action.id == 'hbl_notify_code') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_notify_id: action.rec ? action.rec.cust_id : 0,
          hbl_notify_code: action.rec ? action.rec.cust_code : '',
          hbl_notify_name: action.rec ? action.rec.cust_name : '',
          hbl_notify_add1: action.rec ? action.rec.cust_address1 : '',
          hbl_notify_add2: action.rec ? action.rec.cust_address2 : '',
          hbl_notify_add3: action.rec ? action.rec.cust_address3 : '',
          hbl_notify_add4: action.rec ? action.rec.cust_address4 : '',
          hbl_notify_add5: action.rec ? (action.rec.cust_tel ? 'TEL : ' + action.rec.cust_tel : '') +
          (action.rec.cust_fax ? ' FAX : ' + action.rec.cust_fax : '') : '',
        });
      }
      else {
        this.mform.patchValue({
          hbl_notify_id: 0,
          hbl_notify_code: '',
          hbl_notify_name: '',
          hbl_notify_add1: '',
          hbl_notify_add2: '',
          hbl_notify_add3: '',
          hbl_notify_add4: '',
          hbl_notify_add5: '',
        });
      }
    }
    if (action.id == 'hbl_agent_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_agent_id: action.rec ? action.rec.cust_id : 0,
          hbl_agent_name: action.rec ? action.rec.cust_name : '',
        });
      }
      else {
        this.mform.patchValue({
          hbl_agent_id: 0,
          hbl_agent_name: '',
        });
      }
    }
    if (action.id == 'hbl_handled_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_handled_id: action.rec ? action.rec.param_id : 0,
          hbl_handled_name: action.rec ? action.rec.param_name : '',
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
          hbl_salesman_id: action.rec ? action.rec.param_id : 0,
          hbl_salesman_name: action.rec ? action.rec.param_name : '',
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
          hbl_format_id: action.rec ? action.rec.param_id : 0,
          hbl_format_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          hbl_format_id: 0,
          hbl_format_name: '',
        });
      }
    }
    if (action.id == 'hbl_draft_format_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_draft_format_id: action.rec ? action.rec.param_id : 0,
          hbl_draft_format_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          hbl_draft_format_id: 0,
          hbl_draft_format_name: '',
        });
      }
    }
    if (action.id == 'hbl_uom_name') {
      if (action.rec) {
        this.mform.patchValue({
          hbl_uom_id: action.rec ? action.rec.param_id : 0,
          hbl_uom_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          hbl_uom_id: 0,
          hbl_uom_name: '',
        });
      }
    }
    if (action.name == 'cntr_type_name') {
      if (action.rec) {
        this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
          cntr_type_id: action.rec ? action.rec.param_id : 0,
          cntr_type_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          cntr_type_id: 0,
          cntr_type_name: '',
        });
      }
    }
    if (action.name == 'cntr_packages_unit_name') {
      if (action.rec) {
        this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
          cntr_packages_unit_id: action.rec ? action.rec.param_id : 0,
          cntr_packages_unit_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          cntr_packages_unit_id: 0,
          cntr_packages_unit_name: '',
        });
      }
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
  // onBlur(action: any) {
  //   console.log('onBlur Action', action);
  // }


  findUnit(action: any) {

    console.log(action);

    if (!action.isChanged) {
      return;
    }

    const data = <iSea_exportH>this.mform.value

    const nhbl_weight = data?.hbl_weight || 0;
    const nhbl_lbs = data?.hbl_lbs || 0;
    const nhbl_cbm = data?.hbl_cbm || 0;
    const nhbl_cft = data?.hbl_cft || 0;


    if (action.name == 'hbl_weight') {
      let nlbs = this.ConvertUnit(nhbl_weight, 'weight');
      this.mform.patchValue({
        hbl_lbs: this.gs.roundNumber(nlbs, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'hbl_lbs') {
      let nweight = this.ConvertUnit(nhbl_lbs, 'lbs');
      this.mform.patchValue({
        hbl_weight: this.gs.roundNumber(nweight, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'hbl_cbm') {
      let ncft = this.ConvertUnit(nhbl_cbm, 'cbm');
      this.mform.patchValue({
        hbl_cft: this.gs.roundNumber(ncft, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'hbl_cft') {
      let ncbm = this.ConvertUnit(nhbl_cft, 'cft');
      this.mform.patchValue({
        hbl_cbm: this.gs.roundNumber(ncbm, this.gs.globalConstants.global_dec_places),
      });
    }
  }


}

