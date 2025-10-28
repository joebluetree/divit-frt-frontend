import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iAccLedgerd, iAccLedgerh } from '../../models/iaccledger';
import { data_ledgerd } from '../../models/iacctrans';
import { AccTransService } from '../../services/acctrans.service';

@Component({
  selector: 'app-acctransd-edit',
  templateUrl: './acctransd-edit.component.html',
  styleUrls: ['./acctransd-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 17/10/2025
//Remark : this component manages creation, editing and saving of acc-trans(detail table) records

export class AccTransdEditComponent {

  mform: FormGroup;
  record!: iAccLedgerd;
  mode = 'new';
  index = 0;

  TypeList = [
    { key: 'CR', value: 'CR' },
    { key: 'DR', value: 'DR' },
  ];

  DocTypeList = [
    { key: 'CHEQUE', value: 'CHEQUE' },
    { key: 'CARD', value: 'CARD' },
    { key: 'NEFT', value: 'NEFT' },
  ];

  @Input('input') set input(v: data_ledgerd) {
    this.record = v.record;
    this.mode = v.mode;
    this.index = v.index;
    this.addRow();
  }

  @Output('output') output = new EventEmitter<any>();
  
  constructor(
    private fb: FormBuilder,
    public gs: GlobalService,
    private ms: AccTransService

  ) {
    this.buildForm();
    this.getDefaultData();
  }

  buildForm() {
    this.mform = this.fb.group({
      jv_id: [0],
      jv_header_id: [0],
      jv_year: [0],
      jv_vrno: [''],
      jv_docno: [''],
      jv_type: [''],
      jv_date: [''],
      jv_refno: [''],
      jv_refdate: [''],
      jv_acc_id: [0],
      jv_acc_code: [''],
      jv_acc_name: [''],
      jv_status: [''],
      jv_famt: [0],
      jv_cur_id: [0],
      jv_cur_code: [''],
      jv_exrate: [0],
      jv_drcr: ['CR'],
      jv_dcamt: [0],
      jv_debit: [0],
      jv_credit: [0],
      jv_inv_id: [0],
      jv_inv_code: [''],
      jv_remarks: [''],
      jv_narration: [''],
      jv_doc_type: ['CHEQUE'],
      jv_bank: [''],
      jv_chqno: [''],
      jv_chq_date: [''],
      jv_master_date: [''],
      jv_is_payroll: [''],
      jv_tax_amt: [0],
      jv_tax_per: [0],
      rec_company_id: [0],
      rec_branch_id: [0],
    });
  }

  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {

  }

  addRow() {
    this.mform.setValue({
      jv_id: this.record?.jv_id || 0,
      jv_header_id: this.record?.jv_header_id || 0,
      jv_year: this.record?.jv_year || 0,
      jv_vrno: this.record?.jv_vrno || '',
      jv_docno: this.record?.jv_docno || '',
      jv_type: this.record?.jv_type || '',
      jv_date: this.record?.jv_date || '',
      jv_refno: this.record?.jv_refno || '',
      jv_refdate: this.record?.jv_refdate || '',
      jv_acc_id: this.record?.jv_acc_id || 0,
      jv_acc_code: this.record?.jv_acc_code || '',
      jv_acc_name: this.record?.jv_acc_name || '',
      jv_status: this.record?.jv_status || '',
      jv_famt: this.record?.jv_famt || 0,
      jv_cur_id: this.record?.jv_cur_id || 0,
      jv_cur_code: this.record?.jv_cur_code || '',
      jv_exrate: this.record?.jv_exrate || 0,
      jv_drcr: this.record?.jv_drcr || 'CR',
      jv_dcamt: this.record?.jv_dcamt || 0,
      jv_debit: this.record?.jv_debit || 0,
      jv_credit: this.record?.jv_credit || 0,
      jv_inv_id: this.record?.jv_inv_id || 0,
      jv_inv_code: this.record?.jv_inv_code || '',
      jv_remarks: this.record?.jv_remarks || '',
      jv_narration: this.record?.jv_narration || '',
      jv_doc_type: this.record?.jv_doc_type || 'CHEQUE',
      jv_bank: this.record?.jv_bank || '',
      jv_chqno: this.record?.jv_chqno || '',
      jv_chq_date: this.record?.jv_chq_date || '',
      jv_master_date: this.record?.jv_master_date || '',
      jv_is_payroll: this.record?.jv_is_payroll || '',
      jv_tax_amt: this.record?.jv_tax_amt || 0,
      jv_tax_per: this.record?.jv_tax_per || 0,

      rec_company_id: this.record?.rec_company_id || 0,
      rec_branch_id: this.record?.rec_branch_id || 0,
    });
  }
  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  newRecord() {
    this.mode = 'new';
    this.buildForm();
    this.getDefaultData();
  }

  getDefaultData() {
  const param = {
    company_id: this.gs.user.user_company_id,
    branch_id: this.gs.user.user_branch_id,
  };

  this.ms.getRecord(param, '/api/accounts/acctrans/GetDefaultData').subscribe({
    next: (rec: iAccLedgerh) => {
      this.mform.patchValue({
        jv_cur_id: rec.ledger_detail.jv_cur_id,
        jv_cur_code: rec.ledger_detail.jv_cur_code,
        jv_exrate: this.gs.roundNumber(
          rec.ledger_detail.jv_exrate,
          this.gs.globalConstants.global_exrate_decimal
        ),
        rec_branch_id: rec.rec_branch_id,
        rec_company_id: rec.rec_company_id,
      });
    },
    error: (e) => {
      this.gs.showError(e);
    }
  });
}


  search(_action: string) {
    console.log('Form Value:', this.mform.value);
    if (this.output) {
      this.record.jv_id = this.mform.value.jv_id;
      this.record.jv_header_id = this.mform.value.jv_header_id;
      this.record.jv_year = this.mform.value.jv_year;
      this.record.jv_vrno = this.mform.value.jv_vrno;
      this.record.jv_docno = this.mform.value.jv_docno;
      this.record.jv_type = this.mform.value.jv_type;
      this.record.jv_date = this.mform.value.jv_date;
      this.record.jv_refno = this.mform.value.jv_refno;
      this.record.jv_refdate = this.mform.value.jv_refdate;
      this.record.jv_acc_id = this.mform.value.jv_acc_id;
      this.record.jv_acc_code = this.mform.value.jv_acc_code;
      this.record.jv_acc_name = this.mform.value.jv_acc_name;
      this.record.jv_status = this.mform.value.jv_status;
      this.record.jv_famt = this.mform.value.jv_famt;
      this.record.jv_cur_id = this.mform.value.jv_cur_id;
      this.record.jv_cur_code = this.mform.value.jv_cur_code;
      this.record.jv_exrate = this.mform.value.jv_exrate;
      this.record.jv_drcr = this.mform.value.jv_drcr;
      this.record.jv_dcamt = this.mform.value.jv_dcamt;
      this.record.jv_debit = this.mform.value.jv_debit;
      this.record.jv_credit = this.mform.value.jv_credit;
      this.record.jv_inv_id = this.mform.value.jv_inv_id;
      this.record.jv_inv_code = this.mform.value.jv_inv_code;
      this.record.jv_remarks = this.mform.value.jv_remarks;
      this.record.jv_narration = this.mform.value.jv_narration;
      this.record.jv_doc_type = this.mform.value.jv_doc_type;
      this.record.jv_bank = this.mform.value.jv_bank;
      this.record.jv_chqno = this.mform.value.jv_chqno;
      this.record.jv_chq_date = this.mform.value.jv_chq_date;
      this.record.jv_master_date = this.mform.value.jv_master_date;
      this.record.jv_is_payroll = this.mform.value.jv_is_payroll;
      this.record.jv_tax_amt = this.mform.value.jv_tax_amt;
      this.record.jv_tax_per = this.mform.value.jv_tax_per;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, mode: this.mode, index: this.index });
    }
    this.newRecord();
    
  }

  callBack(action: { id: string, rec: any }) {
    if (action.id == 'jv_acc_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          jv_acc_id: null,
          jv_acc_code: '',
          jv_acc_name: '',
        });
      } else {
        this.mform.patchValue({
          jv_acc_id: action.rec.acc_id,
          jv_acc_code: action.rec.acc_code,
          jv_acc_name: action.rec.acc_name,
        });
      }
    }
    if (action.id == 'jv_cur_code') {
      if (action.rec == null) {
        this.mform.patchValue({
          jv_cur_id: null,
          jv_cur_code: '',
          jv_exrate: 0,
        });
      } else {
        this.mform.patchValue({
          jv_cur_id: action.rec.param_id,
          jv_cur_code: action.rec.param_code,
          jv_exrate: this.gs.roundNumber(
            parseFloat(action.rec.param_value1),
            this.gs.globalConstants.global_exrate_decimal
          ),
        });
      }
      this.findTotal({
        name: 'jv_exrate',
        rowIndex: action.id,
        isChanged: true,
      });
    }
  }

  findTotal(action: any) {
    if (!action.isChanged) {
      return;
    }

    const data = <iAccLedgerd>this.mform.value;

    const jv_famt = data?.jv_famt || 0;
    const jv_exrate = data?.jv_exrate || 0;

    if (action.name === 'jv_famt' || action.name === 'jv_exrate') {
      let jv_dcamt = jv_famt * jv_exrate;
      jv_dcamt = this.gs.roundNumber(jv_dcamt, this.gs.globalConstants.global_dec_places);

      this.mform.patchValue({
        jv_dcamt: jv_dcamt
      });
    }
  }

}
