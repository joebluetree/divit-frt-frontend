import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomermService } from '../../services/customerm.service';
import { iContactm, iCustomerm } from '../../models/icustomerm';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class CustomerEditComponent extends baseEditComponent {
  
  // @ViewChild(CustRemarkmEditComponent) fs!: CustRemarkmEditComponent;

  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'PROSPECT', value: 'PROSPECT' },
    { key: 'NOMINATION', value: 'NOMINATION' },
    { key: 'MUTUAL', value: 'MUTUAL' },
    { key: 'FREEHAND', value: 'FREEHAND' },
    { key: 'AGENT', value: 'AGENT' },
  ]
  priorityList = [
    { key: 'NA', value: 'NA' },
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
  ]
  profitList = [
    { key: 'NIL', value: 'NIL' },
    { key: 'PROFIT =', value: 'PROFIT =' },
    { key: 'PROFIT <', value: 'PROFIT <' },
    { key: 'PROFIT >', value: 'PROFIT >' },
    { key: 'PROFIT PER =', value: 'PROFIT PER =' },
    { key: 'PROFIT PER<', value: 'PROFIT PER<' },
    { key: 'PROFIT PER>', value: 'PROFIT PER>' },
  ]
  groupList = [
    { key: 'LOCAL CREDITORS', value: 'LOCAL CREDITORS' },
    { key: 'LOCAL DEBTORS', value: 'LOCAL DEBTORS' },
  ]
  titleList = [
    { key: 'NA', value: 'NA' },
    { key: 'MR', value: 'MR' },
    { key: 'MRS', value: 'MRS' },
  ]

  constructor(
    private ms: CustomermService,
  ) {
    super();
    this.showModel = false;
    this.mform = this.fb.group({
      cust_id: [0],
      cust_code: ['', [Validators.required, Validators.maxLength(15)]],
      cust_short_name: ['', [Validators.maxLength(15)]],
      cust_name: ['', [Validators.required, Validators.maxLength(100)]],

      cust_official_name: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address1: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address2: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address3: [''],
      cust_city: [''],
      cust_state_id: [0],
      cust_state_name: [''],
      cust_country_id: [0],
      cust_country_name: [''],
      cust_zip_code: [''],
      cust_title: ['NA'],
      cust_contact: [''],
      cust_designation: [''],
      cust_tel: [''],
      cust_fax: [''],
      cust_mobile: [''],
      cust_web: [''],
      cust_email: [''],
      cust_refer_by: [''],
      cust_salesman_id: [0],
      cust_salesman_name: [''],
      cust_handled_id: [0],
      cust_handled_name: [''],
      cust_location_id: [0],
      cust_location_name: [''],
      cust_type: [''],
      cust_row_type: [this.type],
      cust_parent_id: [null],
      cust_parent_name: [''],
      cust_credit_limit: [0],
      cust_est_dt: [''],

      cust_is_shipper: ['N'],
      cust_is_consignee: ['N'],
      cust_is_importer: ['N'],
      cust_is_exporter: ['N'],
      cust_is_cha: ['N'],
      cust_is_forwarder: ['N'],
      cust_is_oagent: ['N'],
      cust_is_acarrier: ['N'],
      cust_is_scarrier: ['N'],
      cust_is_trucker: ['N'],
      cust_is_warehouse: ['N'],
      cust_is_sterminal: ['N'],
      cust_is_aterminal: ['N'],
      cust_is_shipvendor: ['N'],
      cust_is_gvendor: ['N'],
      cust_is_employee: ['N'],
      cust_is_contract: ['N'],
      cust_is_miscell: ['N'],
      cust_is_tbd: ['N'],
      cust_is_bank: ['N'],

      cust_nomination: ['NA'],
      cust_priority: ['NA'],
      cust_criteria: ['NIL'],
      cust_min_profit: [0],
      cust_firm_code: [''],
      cust_einirsno: [''],
      cust_days: [0],
      cust_is_splacc: ['N'],
      cust_is_actual_vendor: ['N'],
      cust_is_blackacc: ['N'],
      cust_splacc_memo: [''],
      cust_is_ctpat: ['N'],
      cust_ctpat_no: [''],
      cust_marketing_mail: ['N'],

      cust_chb_id: [0],
      cust_chb_code: [''],
      cust_chb_name: [''],
      cust_chb_address1: [''],
      cust_chb_address2: [''],
      cust_chb_address3: [''],
      cust_chb_group: [''],
      cust_chb_contact: [''],
      cust_chb_tel: [''],
      cust_chb_fax: [''],
      cust_chb_email: [''],
      cust_poa_customs_yn: ['N'],
      cust_poa_isf_yn: ['N'],
      cust_brokers: [''],
      cust_bond_yn: ['N'],
      cust_punch_from: [''],
      cust_bond_no: [''],
      cust_bond_expdt: [''],
      cust_branch_id: [0],
      cust_branch_name: [''],
      cust_protected: [''],
      cust_cur_id: [0],
      cust_cur_name: [''],

      cust_contacts: this.fb.array([]),
      rec_files_count: [0],
      rec_files_attached: [''],
      rec_memo_attached: [''],
      rec_sop_attached: [''],
      rec_qtnm_attached: [''],
      rec_acc_attached: [''],
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
      cust_id: this.id
    })

  }

  addRow(rec: iContactm) {
    return this.fb.group({
      cont_id: [rec?.cont_id || 0],
      cont_parent_id: [rec?.cont_parent_id || 0],
      cont_title: [rec?.cont_title || "NA"],
      cont_name: [rec?.cont_name || ""],
      cont_group_id: [rec?.cont_group_id || 0],
      cont_group_name: [rec?.cont_group_name || ""],
      cont_designation: [rec?.cont_designation || ""],
      cont_email: [rec?.cont_email || ""],
      cont_tel: [rec?.cont_tel || ""],
      cont_mobile: [rec?.cont_mobile || ""],
      cont_remarks: [rec?.cont_remarks || ""],
      cont_country_id: [rec?.cont_country_id || 0],
      cont_country_code: [rec?.cont_country_code || ""],
      cont_country_name: [rec?.cont_country_name || ""],
    });
  }

  addContact(iRow: iContactm = <iContactm>{}) {
    this.formArray('cust_contacts')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    this.formArray('cust_contacts').removeAt(idx);
  }

  fillContacts(icontact_list: iContactm[]) {
    this.formArray('cust_contacts').clear();
    icontact_list.forEach((rec_contact: iContactm) => {
      this.addContact(rec_contact);
    });

  }
  // set the address in city,state,zip code,country order
  setAddress() {
    const city = this.mform.get('cust_city')?.value || '';
    const state = this.mform.get('cust_state_name')?.value || '';
    const zip_code = this.mform.get('cust_zip_code')?.value || '';
    const country = this.mform.get('cust_country_name')?.value || '';
    let newAddress3 = "";

    if (city.length > 0) {
      newAddress3 += city + ' ';
      if (state.length > 0 || country.length > 0)
        newAddress3 += ',';
    }
    if (state.length > 0) {
      newAddress3 += state + ' ';
      if (zip_code.length == 0 && country.length > 0)
        newAddress3 += ',';
    }
    if (zip_code.length > 0) {
      newAddress3 += zip_code;
      if (country.length > 0)
        newAddress3 += ',';
    }
    if (country.length > 0) {
      newAddress3 += country;
    }
    if (newAddress3.length === 0) {
      newAddress3 = city || state || zip_code || country;
    }

    this.mform.patchValue({
      cust_address3: newAddress3
    });
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/customer/GetRecordAsync').subscribe({
      next: (rec: iCustomerm) => {
        this.mform.patchValue({
          cust_id: rec.cust_id,
          cust_code: rec.cust_code,
          cust_short_name: rec.cust_short_name,
          cust_name: rec.cust_name,
          cust_official_name: rec.cust_official_name,
          cust_address1: rec.cust_address1,
          cust_address2: rec.cust_address2,
          cust_address3: rec.cust_address3,
          cust_city: rec.cust_city,
          cust_state_id: rec.cust_state_id,
          cust_state_name: rec.cust_state_name,
          cust_country_id: rec.cust_country_id,
          cust_country_name: rec.cust_country_name,
          cust_zip_code: rec.cust_zip_code,
          cust_title: rec.cust_title,
          cust_contact: rec.cust_contact,
          cust_designation: rec.cust_designation,
          cust_tel: rec.cust_tel,
          cust_fax: rec.cust_fax,
          cust_mobile: rec.cust_mobile,
          cust_web: rec.cust_web,
          cust_email: rec.cust_email,
          cust_refer_by: rec.cust_refer_by,
          cust_salesman_id: rec.cust_salesman_id,
          cust_salesman_name: rec.cust_salesman_name,
          cust_handled_id: rec.cust_handled_id,
          cust_handled_name: rec.cust_handled_name,
          cust_location_id: rec.cust_location_id,
          cust_location_name: rec.cust_location_name,

          cust_type: rec.cust_type,
          cust_row_type: rec.cust_row_type,
          cust_parent_id: rec.cust_parent_id,
          cust_parent_name: rec.cust_parent_name,
          cust_credit_limit: rec.cust_credit_limit,
          cust_est_dt: rec.cust_est_dt,

          cust_is_shipper: rec.cust_is_shipper,
          cust_is_consignee: rec.cust_is_consignee,
          cust_is_importer: rec.cust_is_importer,
          cust_is_exporter: rec.cust_is_exporter,
          cust_is_cha: rec.cust_is_cha,
          cust_is_forwarder: rec.cust_is_forwarder,
          cust_is_oagent: rec.cust_is_oagent,
          cust_is_acarrier: rec.cust_is_acarrier,
          cust_is_scarrier: rec.cust_is_scarrier,
          cust_is_trucker: rec.cust_is_trucker,
          cust_is_warehouse: rec.cust_is_warehouse,
          cust_is_aterminal: rec.cust_is_aterminal,
          cust_is_sterminal: rec.cust_is_sterminal,
          cust_is_shipvendor: rec.cust_is_shipvendor,
          cust_is_gvendor: rec.cust_is_gvendor,
          cust_is_employee: rec.cust_is_employee,
          cust_is_contract: rec.cust_is_contract,
          cust_is_miscell: rec.cust_is_miscell,
          cust_is_tbd: rec.cust_is_tbd,
          cust_is_bank: rec.cust_is_bank,

          cust_nomination: rec.cust_nomination,
          cust_priority: rec.cust_priority,
          cust_criteria: rec.cust_criteria,
          cust_min_profit: rec.cust_min_profit,
          cust_firm_code: rec.cust_firm_code,
          cust_einirsno: rec.cust_einirsno,
          cust_days: rec.cust_days,
          cust_is_splacc: rec.cust_is_splacc,
          cust_is_actual_vendor: rec.cust_is_actual_vendor,
          cust_is_blackacc: rec.cust_is_blackacc,
          cust_splacc_memo: rec.cust_splacc_memo,
          cust_is_ctpat: rec.cust_is_ctpat,
          cust_ctpat_no: rec.cust_ctpat_no,
          cust_marketing_mail: rec.cust_marketing_mail,

          cust_chb_id: rec.cust_chb_id,
          cust_chb_code: rec.cust_chb_code,
          cust_chb_name: rec.cust_chb_name,
          cust_chb_address1: rec.cust_chb_address1,
          cust_chb_address2: rec.cust_chb_address2,
          cust_chb_address3: rec.cust_chb_address3,
          cust_chb_group: rec.cust_chb_group,
          cust_chb_contact: rec.cust_chb_contact,
          cust_chb_tel: rec.cust_chb_tel,
          cust_chb_fax: rec.cust_chb_fax,
          cust_chb_email: rec.cust_chb_email,
          cust_poa_customs_yn: rec.cust_poa_customs_yn,
          cust_poa_isf_yn: rec.cust_poa_isf_yn,
          cust_brokers: rec.cust_brokers,
          cust_bond_yn: rec.cust_bond_yn,
          cust_punch_from: rec.cust_punch_from,
          cust_bond_no: rec.cust_bond_no,
          cust_bond_expdt: rec.cust_bond_expdt,
          cust_branch_id: rec.cust_branch_id,
          cust_branch_name: rec.cust_branch_name,
          cust_protected: rec.cust_protected,
          cust_cur_code_id: rec.cust_cur_name,
          rec_files_count: rec.rec_files_count,
          rec_files_attached: rec.rec_files_attached,
          rec_memo_attached: rec.rec_memo_attached,
          rec_sop_attached: rec.rec_sop_attached,
          rec_qtnm_attached: rec.rec_qtnm_attached,
          rec_acc_attached: rec.rec_acc_attached,
          rec_version: rec.rec_version,

        });
        this.fillContacts(rec.cust_contacts);
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
    const data = <iCustomerm>this.mform.value;

    data.cust_row_type = this.type;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.cust_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/customer/SaveAsync').subscribe({
      next: (v: iCustomerm) => {
        if (this.mode == "add") {
          this.id = v.cust_id;
          this.mode = "edit";
          this.mform.patchValue({ cust_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version
        });
        this.fillContacts(v.cust_contacts);
        this.ms.UpdateRecord(v, _mode);
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })
  }

  callBack(action: any) {
    if (action.id == 'cust_parent_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_parent_id: action.rec.cust_id,
          cust_parent_name: action.rec.cust_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_parent_id: null,
          cust_parent_name: '',
        });
      }
    }
    if (action.id == 'cust_state_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_state_id: action.rec.param_id,
          cust_state_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_state_id: 0,
          cust_state_name: '',
        });
      }
    }
    if (action.id == 'cust_country_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_country_id: action.rec.param_id,
          cust_country_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_country_id: 0,
          cust_country_name: '',
        });
      }
    }
    if (action.id == 'cust_salesman_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_salesman_id: action.rec.param_id,
          cust_salesman_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_salesman_id: 0,
          cust_salesman_name: '',
        });
      }
    }
    if (action.id == 'cust_handled_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_handled_id: action.rec.param_id,
          cust_handled_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_handled_id: 0,
          cust_handled_name: '',
        });
      }
    }
    if (action.id == 'cust_location_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_location_id: action.rec.branch_id,
          cust_location_name: action.rec.branch_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_location_id: 0,
          cust_location_name: '',
        });
      }
    }
    if (action.id == 'cust_chb_code') {
      if (action.rec) {
        this.mform.patchValue({
          cust_chb_id: action.rec.cust_id,
          cust_chb_code: action.rec.cust_code,
          cust_chb_name: action.rec.cust_name,
          cust_chb_address1: action.rec.cust_address1,
          cust_chb_address2: action.rec.cust_address2,
          cust_chb_address3: action.rec.cust_address3,
          cust_chb_contact: action.rec.cust_contact,
          cust_chb_tel: action.rec.cust_tel,
          cust_chb_fax: action.rec.cust_fax,
          cust_chb_email: action.rec.cust_email,
        });
      }
      else {
        this.mform.patchValue({
          cust_chb_id: null,
          cust_chb_code: '',
          cust_chb_name: '',
          cust_chb_address1: '',
          cust_chb_address2: '',
          cust_chb_address3: '',
          cust_chb_contact: '',
          cust_chb_tel: '',
          cust_chb_fax: '',
          cust_chb_email: '',
        });
      }
    }
    if (action.id == 'cust_branch_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_branch_id: action.rec.branch_id,
          cust_branch_name: action.rec.branch_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_branch_id: 0,
          cust_branch_name: '',
        });
      }
    }
    if (action.id == 'cust_cur_name') {
      if (action.rec) {
        this.mform.patchValue({
          cust_cur_id: action.rec.param_id,
          cust_cur_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cust_cur_id: 0,
          cust_cur_name: '',
        });
      }
    }
    if (action.name == 'cont_country_name') {
      if (action.rec) {
        this.formArrayRecord('cust_contacts', action.rowIndex)?.patchValue({
          cont_country_id: action.rec.param_id,
          cont_country_code: action.rec.param_code,
          cont_country_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cont_country_id: null,
          cont_country_code: '',
          cont_country_name: '',
        });
      }
    }
    if (action.name == 'cont_group_name') {
      if (action.rec) {
        this.formArrayRecord('cust_contacts', action.rowIndex)?.patchValue({
          cont_group_id: action.rec.param_id,
          cont_group_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          cont_group_id: null,
          cont_group_name: '',
        });
      }
    }
  }


  onBlur(action: any) {
    console.log('onBlur Action', action);
  }

}
