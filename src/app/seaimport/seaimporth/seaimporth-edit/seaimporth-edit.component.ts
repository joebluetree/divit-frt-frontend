import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { iContainer, iSea_importH } from '../../models/iseaimporth';
import { SeaImportHService } from '../../services/seaimporth.service';


//Name : Sourav V
//Created Date : 28/02/2025
//Remark : this component manages creation,editing and saving of sea import house(parent table) records

@Component({
  selector: 'app-seaimporth-edit',
  templateUrl: './seaimporth-edit.component.html',
  styleUrls: ['./seaimporth-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class SeaImportHEditComponent extends baseEditComponent {

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
  MovdadList = [
    { key: 'N', value: 'NO' },
    { key: 'Y', value: 'YES' },
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
  BlStatuslList = [
    { key: 'NIL', value: 'NIL' },
    { key: 'RECIVED', value: 'RECIVED' },
    { key: 'NOT RECIVED', value: 'NOT RECIVED' },
    { key: 'TELEX RELEASED', value: 'TELEX RELEASED' },
  ]
  frtStatuslList = [
    { key: 'NIL', value: 'NIL' },
    { key: 'RELEASED', value: 'RELEASED' },
    { key: 'NOT RELEASED', value: 'NOT RELEASED' },
  ]

  mbl_id: number;

  constructor(
    private ms: SeaImportHService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    this.mform = this.createform();
  }

  createform() {
    let date = this.gs.getToday();
    return this.fb.group({
      hbl_id: [0],
      hbl_mbl_id: [0],
      hbl_cfno: [0],
      hbl_mbl_refno: [''],
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
      hbl_location_id: [0],
      hbl_location_code: [''],
      hbl_location_name: [''],
      hbl_location_add1: [''],
      hbl_location_add2: [''],
      hbl_location_add3: [''],
      hbl_location_add4: [''],
      hbl_notify_id: [0],
      hbl_notify_code: [''],
      hbl_notify_name: [''],
      hbl_notify_add1: [''],
      hbl_notify_add2: [''],
      hbl_notify_add3: [''],
      hbl_notify_add4: [''],
      hbl_careof_id: [0],
      hbl_careof_name: [''],
      hbl_agent_id: [0],
      hbl_agent_name: [''],
      hbl_cha_id: [0],
      hbl_cha_code: [''],
      hbl_cha_name: [''],
      hbl_cha_attn: [''],
      hbl_cha_tel: [''],
      hbl_cha_fax: [''],
      hbl_place_delivery: [''],
      hbl_pld_eta: [''],
      hbl_place_final: [''],
      hbl_plf_eta: [''],
      hbl_it_no: [''],
      hbl_is_itshipment: [''],
      hbl_it_port: [''],
      hbl_it_date: [''],
      hbl_packages: [0],
      hbl_uom_id: [0],
      hbl_uom_name: [''],
      hbl_lbs: [0],
      hbl_weight: [0],
      hbl_cft: [0],
      hbl_cbm: [0],
      hbl_commodity: [''],
      hbl_ship_term_id: [0],
      hbl_ship_term_name: [''],
      hbl_incoterm_id: [0],
      hbl_incoterm_name: [''],
      hbl_pono: [''],
      hbl_invoiceno: [''],
      hbl_ams_fileno: [''],
      hbl_sub_house: [''],
      hbl_isf_no: [''],
      hbl_telex_released_id: [0],
      hbl_telex_released_name: [''],
      hbl_mov_dad: [''],
      hbl_bl_req: [''],
      hbl_book_slno: [''],
      hbl_is_pl: [''],
      hbl_is_ci: [''],
      hbl_is_carr_an: [''],
      hbl_custom_reles_status: ['N/A'],
      hbl_custom_clear_date: [''],
      hbl_is_delivery: ['N/A'],
      hbl_paid_status_id: [0],
      hbl_paid_status_name: [''],
      hbl_paid_remarks: [''],
      hbl_bl_status: ['NIL'],
      hbl_cargo_release_status: ['NIL'],
      hbl_frt_status_name: ['TBA'],
      hbl_handled_id: [0],
      hbl_handled_name: [''],
      hbl_salesman_id: [0],
      hbl_salesman_name: [''],
      hbl_remark1: [''],
      hbl_remark2: [''],
      hbl_remark3: [''],
      hbl_lfd_date: [''],
      hbl_go_date: [''],
      hbl_pickup_date: [''],
      hbl_empty_ret_date: [''],
      hbl_delivery_date: [''],

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
      hbl_isf_attached: [''],
      rec_memo_count: [0],
      rec_memo_attached: [''],
      rec_telex_count: [0],
      rec_telex_attached: [''],
      house_cntr: this.fb.array([]),
      rec_version: [0],
    })
  }

  ngOnInit() {
    this.id = 0;
    // this.mbl_id =0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
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
      cntr_pick_date: [rec?.cntr_pick_date || ""],
      cntr_return_date: [rec?.cntr_return_date || ""],
      cntr_lfd: [rec?.cntr_lfd || ""],
      cntr_discharge_date: [rec?.cntr_discharge_date || ""],
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
    this.ms.getRecord(param, '/api/seaimport/seaimporth/GetDefaultData').subscribe({
      next: (rec: iSea_importH) => {
        this.mform.patchValue({
          hbl_mbl_id: rec.hbl_mbl_id,
          hbl_shipment_stage_id: rec.hbl_shipment_stage_id,
          hbl_shipment_stage_name: rec.hbl_shipment_stage_name,
          hbl_location_id: rec.hbl_location_id,
          hbl_location_code: rec.hbl_location_code,
          hbl_location_name: rec.hbl_location_name,
          hbl_location_add1: rec.hbl_location_add1,
          hbl_location_add2: rec.hbl_location_add2,
          hbl_location_add3: rec.hbl_location_add3,
          hbl_location_add4: rec.hbl_location_add4,
          hbl_mbl_refno: rec.hbl_mbl_refno,
          hbl_agent_id: rec.hbl_agent_id,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_place_delivery: rec.hbl_place_delivery,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,
          hbl_bl_req: rec.hbl_bl_req,
          hbl_uom_id: rec.hbl_uom_id,
          hbl_uom_name: rec.hbl_uom_name,
          hbl_packages: rec.hbl_packages,
          hbl_weight: rec.hbl_weight,
          hbl_lbs: this.gs.roundNumber(this.ConvertUnit(rec.hbl_weight, 'weight'), this.gs.globalConstants.global_dec_places),
          hbl_cbm: rec.hbl_cbm,
          hbl_cft: this.gs.roundNumber(this.ConvertUnit(rec.hbl_cbm, 'cbm'), this.gs.globalConstants.global_dec_places),


          marks9: rec.marks9 ? rec.marks9 : "",
          marks10: rec.marks10 ? rec.marks10 : ""

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
    this.ms.getRecord(param, '/api/seaimport/seaimporth/GetRecordAsync').subscribe({
      next: (rec: iSea_importH) => {
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
          hbl_location_id: rec.hbl_location_id,
          hbl_location_code: rec.hbl_location_code,
          hbl_location_name: rec.hbl_location_name,
          hbl_location_add1: rec.hbl_location_add1,
          hbl_location_add2: rec.hbl_location_add2,
          hbl_location_add3: rec.hbl_location_add3,
          hbl_location_add4: rec.hbl_location_add4,
          hbl_notify_id: rec.hbl_notify_id,
          hbl_notify_code: rec.hbl_notify_code,
          hbl_notify_name: rec.hbl_notify_name,
          hbl_notify_add1: rec.hbl_notify_add1,
          hbl_notify_add2: rec.hbl_notify_add2,
          hbl_notify_add3: rec.hbl_notify_add3,
          hbl_notify_add4: rec.hbl_notify_add4,
          hbl_careof_id: rec.hbl_careof_id,
          hbl_careof_name: rec.hbl_careof_name,
          hbl_agent_id: rec.hbl_agent_id,
          hbl_agent_name: rec.hbl_agent_name,
          hbl_cha_id: rec.hbl_cha_id,
          hbl_cha_code: rec.hbl_cha_code,
          hbl_cha_name: rec.hbl_cha_name,
          hbl_cha_attn: rec.hbl_cha_attn,
          hbl_cha_tel: rec.hbl_cha_tel,
          hbl_cha_fax: rec.hbl_cha_fax,
          hbl_place_delivery: rec.hbl_place_delivery,
          hbl_pld_eta: rec.hbl_pld_eta,
          hbl_place_final: rec.hbl_place_final,
          hbl_plf_eta: rec.hbl_plf_eta,
          hbl_it_no: rec.hbl_it_no,
          hbl_is_itshipment: rec.hbl_is_itshipment,
          hbl_it_port: rec.hbl_it_port,
          hbl_it_date: rec.hbl_it_date,
          hbl_packages: rec.hbl_packages,
          hbl_uom_id: rec.hbl_uom_id,
          hbl_uom_name: rec.hbl_uom_name,
          hbl_lbs: rec.hbl_lbs,
          hbl_weight: rec.hbl_weight,
          hbl_cft: rec.hbl_cft,
          hbl_cbm: rec.hbl_cbm,
          hbl_pcs: rec.hbl_pcs,
          hbl_commodity: rec.hbl_commodity,
          hbl_ship_term_id: rec.hbl_ship_term_id,
          hbl_ship_term_name: rec.hbl_ship_term_name,
          hbl_incoterm_id: rec.hbl_incoterm_id,
          hbl_incoterm_name: rec.hbl_incoterm_name,
          hbl_pono: rec.hbl_pono,
          hbl_invoiceno: rec.hbl_invoiceno,
          hbl_ams_fileno: rec.hbl_ams_fileno,
          hbl_sub_house: rec.hbl_sub_house,
          hbl_isf_no: rec.hbl_isf_no,
          hbl_telex_released_id: rec.hbl_telex_released_id,
          hbl_telex_released_name: rec.hbl_telex_released_name,
          hbl_mov_dad: rec.hbl_mov_dad,
          hbl_bl_req: rec.hbl_bl_req,
          hbl_book_slno: rec.hbl_book_slno,
          hbl_is_pl: rec.hbl_is_pl,
          hbl_is_ci: rec.hbl_is_ci,
          hbl_is_carr_an: rec.hbl_is_carr_an,
          hbl_custom_reles_status: rec.hbl_custom_reles_status,
          hbl_custom_clear_date: rec.hbl_custom_clear_date,
          hbl_is_delivery: rec.hbl_is_delivery,
          hbl_paid_status_id: rec.hbl_paid_status_id,
          hbl_paid_status_name: rec.hbl_paid_status_name,
          hbl_paid_remarks: rec.hbl_paid_remarks,
          hbl_bl_status: rec.hbl_bl_status,
          hbl_cargo_release_status: rec.hbl_cargo_release_status,
          hbl_frt_status_name: rec.hbl_frt_status_name,
          hbl_handled_id: rec.hbl_handled_id,
          hbl_handled_name: rec.hbl_handled_name,
          hbl_salesman_id: rec.hbl_salesman_id,
          hbl_salesman_name: rec.hbl_salesman_name,
          hbl_remark1: rec.hbl_remark1,
          hbl_remark2: rec.hbl_remark2,
          hbl_remark3: rec.hbl_remark3,
          hbl_lfd_date: rec.hbl_lfd_date,
          hbl_go_date: rec.hbl_go_date,
          hbl_pickup_date: rec.hbl_pickup_date,
          hbl_empty_ret_date: rec.hbl_empty_ret_date,
          hbl_delivery_date: rec.hbl_delivery_date,
          hbl_isf_attached: rec.hbl_isf_attached,
          rec_memo_count: rec.rec_memo_count,
          rec_memo_attached: rec.rec_memo_attached,
          rec_telex_count: rec.rec_telex_count,
          rec_telex_attached: rec.rec_telex_attached,
          rec_version: rec.rec_version,

        })

        this.updateDesc(rec);

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
    const data = <iSea_importH>this.mform.value;
    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.hbl_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/seaimport/seaimporth/SaveAsync').subscribe({
      next: (v: iSea_importH) => {
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

  updateDesc(data: iSea_importH) {
    if (!data)
      return;

    for (let i = 1; i <= 17; i++) {
      this.mform.patchValue({ [`marks${i}`]: (data as any)[`marks${i}`] ?? this.CreateFormDesc() });
    }
  }

  fillCustomer(customerData: any = {}) {
    this.mform.patchValue({
      hbl_cha_id: customerData.cust_id || 0,
      hbl_cha_code: customerData.cust_code || '',
      hbl_cha_name: customerData.cust_name || '',
      hbl_cha_attn: customerData.cust_contact || '',
      hbl_cha_tel: customerData.cust_tel || '',
      hbl_cha_fax: customerData.cust_fax || '',
    });
  }

  getCustomerData(id: any) {
    if (!id) {
      this.fillCustomer();
      return;
    }
    const param = { 'id': id };
    this.ms.getRecord(param, 'api/search/GetCustomerAsync').subscribe({
      next: (rec: any) => this.fillCustomer(rec || {}),
      error: (error) => {
        this.gs.showError(error);
        this.fillCustomer();
      }
    });
  }

  callBack(action: any) {
    if (action.id == 'hbl_shipment_stage_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_shipment_stage_id: null,
          hbl_shipment_stage_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_shipment_stage_id: action.rec.param_id,
          hbl_shipment_stage_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_shipper_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_shipper_id: null,
          hbl_shipper_code: '',
          hbl_shipper_name: '',
          hbl_shipper_add1: '',
          hbl_shipper_add2: '',
          hbl_shipper_add3: '',
          hbl_shipper_add4: '',
          hbl_shipper_add5: '',
        });
      } else {
        this.mform.patchValue({
          hbl_shipper_id: action.rec.cust_id,
          hbl_shipper_code: action.rec.cust_code,
          hbl_shipper_name: action.rec.cust_name,
          hbl_shipper_add1: action.rec.cust_address1,
          hbl_shipper_add2: action.rec.cust_address2,
          hbl_shipper_add3: action.rec.cust_address3,
          hbl_shipper_add4: this.gs.getAttention(action.rec),
          hbl_shipper_add5: this.gs.getTelFax(action.rec),
        });
      }
    }

    if (action.id == 'hbl_consignee_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_consignee_id: null,
          hbl_consignee_code: '',
          hbl_consignee_name: '',
          hbl_consignee_add1: '',
          hbl_consignee_add2: '',
          hbl_consignee_add3: '',
          hbl_consignee_add4: '',
          hbl_consignee_add5: '',
          hbl_bltype: '',
          hbl_cha_id: null,
        });
      } else {
        this.mform.patchValue({
          hbl_consignee_id: action.rec.cust_id,
          hbl_consignee_code: action.rec.cust_code,
          hbl_consignee_name: action.rec.cust_name,
          hbl_consignee_add1: action.rec.cust_address1,
          hbl_consignee_add2: action.rec.cust_address2,
          hbl_consignee_add3: action.rec.cust_address3,
          hbl_consignee_add4: this.gs.getAttention(action.rec),
          hbl_consignee_add5: this.gs.getTelFax(action.rec),
          hbl_bltype: action.rec.cust_nomination,
          hbl_cha_id: action.rec.cust_chb_id,
        });
        this.getCustomerData(action.rec.cust_chb_id);
      }
    }

    if (action.id == 'hbl_location_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_location_id: null,
          hbl_location_code: '',
          hbl_location_name: '',
          hbl_location_add1: '',
          hbl_location_add2: '',
          hbl_location_add3: '',
          hbl_location_add4: '',
        });
      } else {
        this.mform.patchValue({
          hbl_location_id: action.rec.cust_id,
          hbl_location_code: action.rec.cust_code,
          hbl_location_name: action.rec.cust_name,
          hbl_location_add1: action.rec.cust_address1,
          hbl_location_add2: action.rec.cust_address2,
          hbl_location_add3: action.rec.cust_address3,
          hbl_location_add4: this.gs.getTelFax(action.rec),
        });
      }
    }

    if (action.id == 'hbl_notify_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_notify_id: null,
          hbl_notify_code: '',
          hbl_notify_name: '',
          hbl_notify_add1: '',
          hbl_notify_add2: '',
          hbl_notify_add3: '',
          hbl_notify_add4: '',
          hbl_notify_add5: '',
        });
      } else {
        this.mform.patchValue({
          hbl_notify_id: action.rec.cust_id,
          hbl_notify_code: action.rec.cust_code,
          hbl_notify_name: action.rec.cust_name,
          hbl_notify_add1: action.rec.cust_address1,
          hbl_notify_add2: action.rec.cust_address2,
          hbl_notify_add3: action.rec.cust_address3,
          hbl_notify_add4: this.gs.getTelFax(action.rec),
        });
      }
    }

    if (action.id == 'hbl_careof_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_careof_id: null,
          hbl_careof_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_careof_id: action.rec.cust_id,
          hbl_careof_name: action.rec.cust_name,
        });
      }
    }

    if (action.id == 'hbl_agent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_agent_id: null,
          hbl_agent_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_agent_id: action.rec.cust_id,
          hbl_agent_name: action.rec.cust_name,
        });
      }
    }

    if (action.id == 'hbl_paid_status_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_paid_status_id: null,
          hbl_paid_status_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_paid_status_id: action.rec.param_id,
          hbl_paid_status_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_cha_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_cha_id: null,
          hbl_cha_code: '',
          hbl_cha_name: '',
          hbl_cha_attn: '',
          hbl_cha_tel: '',
          hbl_cha_fax: '',
        });
      } else {
        this.mform.patchValue({
          hbl_cha_id: action.rec.cust_id,
          hbl_cha_code: action.rec.cust_code,
          hbl_cha_name: action.rec.cust_name,
          hbl_cha_attn: action.rec.cust_contact,
          hbl_cha_tel: action.rec.cust_chb_tel,
          hbl_cha_fax: action.rec.cust_chb_fax,
        });
      }
    }

    if (action.id == 'hbl_handled_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_handled_id: null,
          hbl_handled_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_handled_id: action.rec.param_id,
          hbl_handled_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_salesman_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_salesman_id: null,
          hbl_salesman_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_salesman_id: action.rec.param_id,
          hbl_salesman_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_ship_term_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_ship_term_id: null,
          hbl_ship_term_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_ship_term_id: action.rec.param_id,
          hbl_ship_term_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_incoterm_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_incoterm_id: null,
          hbl_incoterm_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_incoterm_id: action.rec.param_id,
          hbl_incoterm_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_format_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_format_id: null,
          hbl_format_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_format_id: action.rec.param_id,
          hbl_format_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_draft_format_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_draft_format_id: null,
          hbl_draft_format_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_draft_format_id: action.rec.param_id,
          hbl_draft_format_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_uom_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_uom_id: null,
          hbl_uom_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_uom_id: action.rec.param_id,
          hbl_uom_name: action.rec.param_name,
        });
      }
    }

    if (action.id == 'hbl_telex_released_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          hbl_telex_released_id: null,
          hbl_telex_released_name: '',
        });
      } else {
        this.mform.patchValue({
          hbl_telex_released_id: action.rec.param_id,
          hbl_telex_released_name: action.rec.param_name,
        });
      }
    }

    if (action.name == 'cntr_type_name') {
      if (action.rec == null) {
        this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
          cntr_type_id: null,
          cntr_type_name: '',
        });
      } else {
        this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
          cntr_type_id: action.rec.param_id,
          cntr_type_name: action.rec.param_name,
        });
      }
    }
    if (action.name == 'cntr_packages_unit_name') {
      if (action.rec == null) {
        this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
          cntr_packages_unit_id: null,
          cntr_packages_unit_name: '',
        });
      } else {
        this.formArrayRecord('house_cntr', action.rowIndex)?.patchValue({
          cntr_packages_unit_id: action.rec.param_id,
          cntr_packages_unit_name: action.rec.param_name,
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
  onBlur(action: any) {
    console.log('onBlur Action', action);
  }


  findUnit(action: any) {

    console.log(action);

    if (!action.isChanged) {
      return;
    }

    const data = <iSea_importH>this.mform.value

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

