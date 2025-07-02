import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { CoOService } from '../../services/coo.service';
import { iCoO } from '../../models/icoo';

//Name : Sourav V
//Created Date : 20/06/2025
//Remark : this component manages creation,editing and saving of sea export house(parent table) records

@Component({
  selector: 'app-coo-edit',
  templateUrl: './coo-edit.component.html',
  styleUrls: ['./coo-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class CoOEditComponent extends baseEditComponent {

  parent_id: number = 0;
  parent_type: string = '';

  constructor(
    private ms: CoOService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      mbld_id: [0],
      mbld_parent_id: [0],
      mbld_exp_ref: [''],
      mbld_mode: [''],
      mbld_shipper_id: [0],
      mbld_shipper_code: [''],
      mbld_shipper_name: [''],
      mbld_shipper_add1: [''],
      mbld_shipper_add2: [''],
      mbld_shipper_add3: [''],
      mbld_shipper_add4: [''],
      mbld_shipper_add5: [''],
      mbld_consignee_id: [0],
      mbld_consignee_code: [''],
      mbld_consignee_name: [''],
      mbld_consignee_add1: [''],
      mbld_consignee_add2: [''],
      mbld_consignee_add3: [''],
      mbld_consignee_add4: [''],
      mbld_consignee_add5: [''],
      mbld_notify_id: [null],
      mbld_notify_code: [''],
      mbld_notify_name: [''],
      mbld_notify_add1: [''],
      mbld_notify_add2: [''],
      mbld_notify_add3: [''],
      mbld_notify_add4: [''],
      mbld_notify_add5: [''],
      mbld_agent_id: [0],
      mbld_agent_name: [''],
      mbld_place_receipt: [''],
      mbld_pol_name: [''],
      mbld_pod_name: [''],
      mbld_place_delivery: [''],
      mbld_move_type: [''],
      mbld_is_cntrized: ['Y'],
      mbld_handled_id: [0],
      mbld_handled_name: [''],
      mbld_print_vsl_voy: [''],
      mbld_lbs: [0],
      mbld_weight: [0],
      mbld_cft: [0],
      mbld_cbm: [0],
      mbld_print_kgs: [''],
      mbld_print_lbs: [''],
      mbld_clean: [''],
      mbld_remark1: [''],
      mbld_remark2: [''],
      mbld_remark3: [''],

      marks1: this.CreateFormDesc(),
      marks2: this.CreateFormDesc(),
      marks3: this.CreateFormDesc(),
      marks4: this.CreateFormDesc(),
      marks5: this.CreateFormDesc(),
      marks6: this.CreateFormDesc(),
      marks7: this.CreateFormDesc(),
      marks8: this.CreateFormDesc(),
      marks9: this.CreateFormDesc(),
      marks10: this.CreateFormDesc(),
      marks11: this.CreateFormDesc(),
      marks12: this.CreateFormDesc(),
      marks13: this.CreateFormDesc(),
      marks14: this.CreateFormDesc(),
      marks15: this.CreateFormDesc(),
      marks16: this.CreateFormDesc(),
      marks17: this.CreateFormDesc(),

      rec_version: [0],

    })
  }

  ngOnInit() {
    this.id = 0;
    // this.mbl_id =0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"] || 0;
      this.parent_type = rec["parent_type"] || '';
    });

    if (this.mode == "add")      
      this.getRecord()
    else      
      this.newRecord();
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      mbld_id: this.id,
      mbld_parent_id: this.parent_id,
      mbld_parent_type: this.parent_type

    })
    // this.CreateFormDesc();
    this.getDefaultData();
  }

  CreateFormDesc() {
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

  getDefaultData() {

    const param = { 'id': this.parent_id,'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/seaexport/cargocoo/GetDefaultData').subscribe({
      next: (rec: iCoO) => {
        this.mform.patchValue({
          mbld_exp_ref: rec.mbld_exp_ref,
          mbld_place_delivery: rec.mbld_place_delivery,
          // mbld_handled_id: rec.mbld_handled_id,
          // mbld_handled_name: rec.mbld_handled_name,
          mbld_move_type: rec.mbld_move_type,
          mbld_notify_name: rec.mbld_notify_name,

        });
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  loadCntr(){
    const param = { 'id': this.parent_id};
    this.ms.getRecord(param, '/api/seaexport/cargocoo/GetCntrDetails').subscribe({
      next: (rec: iCoO) => {
        this.mform.patchValue({
          marks6: rec.marks6 ? rec.marks6 : "",
          marks7: rec.marks7 ? rec.marks7 : ""

        });
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }
  getRecord() {
    const param = { 'id': this.parent_id,'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/seaexport/cargocoo/GetRecordAsync').subscribe({
      next: (rec: iCoO) => {
        if (rec.mbld_id == 0) {
          this.newRecord();
          this.mode = "add";
        }
        else 
        {
          this.mode = "edit";
          this.mform.patchValue({
            mbld_id: rec.mbld_id,
            mbld_parent_id: rec.mbld_parent_id,
            mbld_exp_ref: rec.mbld_exp_ref,
            mbld_mode: rec.mbld_mode,
            mbld_shipper_id: rec.mbld_shipper_id,
            mbld_shipper_code: rec.mbld_shipper_code,
            mbld_shipper_name: rec.mbld_shipper_name,
            mbld_shipper_add1: rec.mbld_shipper_add1,
            mbld_shipper_add2: rec.mbld_shipper_add2,
            mbld_shipper_add3: rec.mbld_shipper_add3,
            mbld_shipper_add4: rec.mbld_shipper_add4,
            mbld_shipper_add5: rec.mbld_shipper_add5,
            mbld_consignee_id: rec.mbld_consignee_id,
            mbld_consignee_code: rec.mbld_consignee_code,
            mbld_consignee_name: rec.mbld_consignee_name,
            mbld_consignee_add1: rec.mbld_consignee_add1,
            mbld_consignee_add2: rec.mbld_consignee_add2,
            mbld_consignee_add3: rec.mbld_consignee_add3,
            mbld_consignee_add4: rec.mbld_consignee_add4,
            mbld_consignee_add5: rec.mbld_consignee_add5,
            mbld_notify_id: rec.mbld_notify_id,
            mbld_notify_code: rec.mbld_notify_code,
            mbld_notify_name: rec.mbld_notify_name,
            mbld_notify_add1: rec.mbld_notify_add1,
            mbld_notify_add2: rec.mbld_notify_add2,
            mbld_notify_add3: rec.mbld_notify_add3,
            mbld_notify_add4: rec.mbld_notify_add4,
            mbld_notify_add5: rec.mbld_notify_add5,
            mbld_agent_id: rec.mbld_agent_id,
            mbld_agent_name: rec.mbld_agent_name,
            mbld_place_receipt: rec.mbld_place_receipt,
            mbld_pol_name: rec.mbld_pol_name,
            mbld_pod_name: rec.mbld_pod_name,
            mbld_place_delivery: rec.mbld_place_delivery,

            mbld_move_type: rec.mbld_move_type,
            mbld_is_cntrized: rec.mbld_is_cntrized,
            mbld_handled_id: rec.mbld_handled_id,
            mbld_handled_name: rec.mbld_handled_name,
            mbld_print_vsl_voy: rec.mbld_print_vsl_voy,

            mbld_lbs: rec.mbld_lbs,
            mbld_weight: rec.mbld_weight,
            mbld_cft: rec.mbld_cft,
            mbld_cbm: rec.mbld_cbm,
            mbld_print_kgs: rec.mbld_print_kgs,
            mbld_print_lbs: rec.mbld_print_lbs,
            mbld_clean: rec.mbld_clean,
            mbld_remark1: rec.mbld_remark1,
            mbld_remark2: rec.mbld_remark2,
            mbld_remark3: rec.mbld_remark3,

            rec_version: rec.rec_version,

          });

          this.updateDesc(rec);

          this.parent_id = rec.mbld_parent_id;
        }
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
    const data = <iCoO>this.mform.value;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.mbld_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/seaexport/cargocoo/SaveAsync').subscribe({
      next: (v: iCoO) => {
        if (this.mode == "add") {
          this.id = v.mbld_id;
          this.mode = "edit";
          this.mform.patchValue({ mbld_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };

        this.updateDesc(v);

        this.mform.patchValue({
          rec_version: v.rec_version,
          // mbld_cfno: v.mbld_cfno,
          // mbld_houseno: v.mbld_houseno,
          mbld_exp_ref: v.mbld_exp_ref
        });
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    })
  }

  updateDesc(data: iCoO) {
    if (!data)
      return;

    for (let i = 1; i <= 17; i++) {
      this.mform.patchValue({ [`marks${i}`]: (data as any)[`marks${i}`] ?? this.CreateFormDesc() });
    }
  }

  callBack(action: any) {
    let rec: any = {};

    if (action.id == 'mbld_shipper_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_shipper_id: rec.cust_id || 0,
        mbld_shipper_code: rec.cust_code || '',
        mbld_shipper_name: rec.cust_name || '',
        mbld_shipper_add1: rec.cust_address1 || '',
        mbld_shipper_add2: rec.cust_address2 || '',
        mbld_shipper_add3: rec.cust_address3 || '',
        mbld_shipper_add4: this.gs.getAttention(rec),
        mbld_shipper_add5: this.gs.getTelFax(rec),
      });
    }

    if (action.id == 'mbld_consignee_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_consignee_id: rec.cust_id || 0,
        mbld_consignee_code: rec.cust_code || '',
        mbld_consignee_name: rec.cust_name || '',
        mbld_consignee_add1: rec.cust_address1 || '',
        mbld_consignee_add2: rec.cust_address2 || '',
        mbld_consignee_add3: rec.cust_address3 || '',
        mbld_consignee_add4: this.gs.getAttention(rec),
        mbld_consignee_add5: this.gs.getTelFax(rec),
        mbld_bltype: rec.cust_nomination || '',
      });
    }

    if (action.id == 'mbld_notify_code') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_notify_id: rec.cust_id || 0,
        mbld_notify_code: rec.cust_code || '',
        mbld_notify_name: rec.cust_name || '',
        mbld_notify_add1: rec.cust_address1 || '',
        mbld_notify_add2: rec.cust_address2 || '',
        mbld_notify_add3: rec.cust_address3 || '',
        mbld_notify_add4: this.gs.getAttention(rec),
        mbld_notify_add5: this.gs.getTelFax(rec),
      });
    }

    if (action.id == 'mbld_agent_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_agent_id: rec.cust_id || 0,
        mbld_agent_name: rec.cust_name || '',
      });
    }

    if (action.id == 'mbld_handled_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_handled_id: rec.param_id || 0,
        mbld_handled_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbld_salesman_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_salesman_id: rec.param_id || 0,
        mbld_salesman_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbld_format_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_format_id: rec.param_id || 0,
        mbld_format_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbld_draft_format_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_draft_format_id: rec.param_id || 0,
        mbld_draft_format_name: rec.param_name || '',
      });
    }

    if (action.id == 'mbld_uom_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.mform.patchValue({
        mbld_uom_id: rec.param_id || 0,
        mbld_uom_name: rec.param_name || '',
      });
    }

    if (action.name == 'cntr_type_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
        cntr_type_id: rec.param_id || 0,
        cntr_type_name: rec.param_name || '',
      });
    }

    if (action.name == 'cntr_packages_unit_name') {
      if (action?.rec != null) {
        rec = action.rec;
      }
      this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
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
  // onBlur(action: any) {
  //   console.log('onBlur Action', action);
  // }


  findUnit(action: any) {

    console.log(action);

    if (!action.isChanged) {
      return;
    }

    const data = <iCoO>this.mform.value

    const nmbld_weight = data?.mbld_weight || 0;
    const nmbld_lbs = data?.mbld_lbs || 0;
    const nmbld_cbm = data?.mbld_cbm || 0;
    const nmbld_cft = data?.mbld_cft || 0;


    if (action.name == 'mbld_weight') {
      let nlbs = this.ConvertUnit(nmbld_weight, 'weight');
      this.mform.patchValue({
        mbld_lbs: this.gs.roundNumber(nlbs, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'mbld_lbs') {
      let nweight = this.ConvertUnit(nmbld_lbs, 'lbs');
      this.mform.patchValue({
        mbld_weight: this.gs.roundNumber(nweight, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'mbld_cbm') {
      let ncft = this.ConvertUnit(nmbld_cbm, 'cbm');
      this.mform.patchValue({
        mbld_cft: this.gs.roundNumber(ncft, this.gs.globalConstants.global_dec_places),
      });
    }
    if (action.name == 'mbld_cft') {
      let ncbm = this.ConvertUnit(nmbld_cft, 'cft');
      this.mform.patchValue({
        mbld_cbm: this.gs.roundNumber(ncbm, this.gs.globalConstants.global_dec_places),
      });
    }
  }

}

