import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { data_fcl, iQtnd_fcl } from '../../models/iqtnm';

@Component({
  selector: 'app-qtnd-edit',
  templateUrl: './qtnd-edit.component.html',
  styleUrls: ['./qtnd-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class QtndEditComponent {

  mform: FormGroup;
  record!: iQtnd_fcl;
  mode = 'new';
  index = 0;
  iDec = 3;

  @Input('input') set input(v: data_fcl) {
    this.record = { ...v.record };
    this.mode = v.mode;
    this.index = v.index;
    if (this.mode == "new")
      this.newRecord();
    else
      this.fillData();
  }

  @Output('output') output = new EventEmitter<any>();
  constructor(
    public gs: GlobalService,
    private fb: FormBuilder,) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnd_id: [null],
      qtnd_qtnm_id: [null],
      qtnd_pol_id: [null],  //, [Validators.required]
      qtnd_pol_code: [''],
      qtnd_pol_name: [''],  //, [Validators.required, Validators.maxLength(100)]
      qtnd_pod_id: [null],   //, [Validators.required]
      qtnd_pod_code: [''],
      qtnd_pod_name: [''],
      qtnd_carrier_id: [0],
      qtnd_carrier_code: [''],
      qtnd_carrier_name: [''],
      qtnd_trans_time: [''],
      qtnd_routing: [''],
      qtnd_cntr_type: [''],
      qtnd_etd: [''],
      qtnd_cutoff: [''],
      qtnd_of: [null],
      qtnd_pss: [null],
      qtnd_baf: [null],
      qtnd_isps: [null],
      qtnd_haulage: [null],
      qtnd_ifs: [null],
      qtnd_tot_amt: [null],  //[Validators.required]
      qtnd_order: [null]
    })
  }

  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
  }

  fillData() {
    this.mform.setValue({
      qtnd_id: this.record?.qtnd_id || 0,
      qtnd_qtnm_id: this.record?.qtnd_qtnm_id || 0,
      qtnd_pol_id: this.record?.qtnd_pol_id || 0,
      qtnd_pol_code: this.record?.qtnd_pol_code || '',
      qtnd_pol_name: this.record?.qtnd_pol_name || '',
      qtnd_pod_id: this.record?.qtnd_pod_id || 0,
      qtnd_pod_code: this.record?.qtnd_pod_code || '',
      qtnd_pod_name: this.record?.qtnd_pod_name || '',
      qtnd_carrier_id: this.record?.qtnd_carrier_id || 0,
      qtnd_carrier_code: this.record?.qtnd_carrier_code || '',
      qtnd_carrier_name: this.record?.qtnd_carrier_name || '',
      qtnd_trans_time: this.record?.qtnd_trans_time || '',
      qtnd_routing: this.record?.qtnd_routing || '',
      qtnd_cntr_type: this.record?.qtnd_cntr_type || '',
      qtnd_etd: this.record?.qtnd_etd || '',
      qtnd_cutoff: this.record?.qtnd_cutoff || '',
      qtnd_of: this.record?.qtnd_of || 0,
      qtnd_pss: this.record?.qtnd_pss || 0,
      qtnd_baf: this.record?.qtnd_baf || 0,
      qtnd_isps: this.record?.qtnd_isps || 0,
      qtnd_haulage: this.record?.qtnd_haulage || 0,
      qtnd_ifs: this.record?.qtnd_ifs || 0,
      qtnd_tot_amt: this.record?.qtnd_tot_amt || 0,
      qtnd_order: this.record?.qtnd_order || 0,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  newRecord() {
    this.mode = 'new';
    this.mform.reset();
    this.mform.markAsPristine();
    //this.mform.markAsUntouched;

  }

  search(_action: string) {
    if (this.mform.invalid) {
      alert('form not valid');
      return;
    }
    if (this.output) {
      this.record.qtnd_id = this.mform.value.qtnd_id;
      this.record.qtnd_qtnm_id = this.mform.value.qtnd_qtnm_id;
      this.record.qtnd_pol_id = this.mform.value.qtnd_pol_id;
      this.record.qtnd_pol_code = this.mform.value.qtnd_pol_code;
      this.record.qtnd_pol_name = this.mform.value.qtnd_pol_name;
      this.record.qtnd_pod_id = this.mform.value.qtnd_pod_id;
      this.record.qtnd_pod_code = this.mform.value.qtnd_pod_code;
      this.record.qtnd_pod_name = this.mform.value.qtnd_pod_name;
      this.record.qtnd_carrier_id = this.mform.value.qtnd_carrier_id;
      this.record.qtnd_carrier_code = this.mform.value.qtnd_carrier_code;
      this.record.qtnd_carrier_name = this.mform.value.qtnd_carrier_name;
      this.record.qtnd_trans_time = this.mform.value.qtnd_trans_time;
      this.record.qtnd_routing = this.mform.value.qtnd_routing;
      this.record.qtnd_cntr_type = this.mform.value.qtnd_cntr_type;
      this.record.qtnd_etd = this.mform.value.qtnd_etd;
      this.record.qtnd_cutoff = this.mform.value.qtnd_cutoff;
      this.record.qtnd_of = this.mform.value.qtnd_of;
      this.record.qtnd_pss = this.mform.value.qtnd_pss;
      this.record.qtnd_baf = this.mform.value.qtnd_baf;
      this.record.qtnd_isps = this.mform.value.qtnd_isps;
      this.record.qtnd_haulage = this.mform.value.qtnd_haulage;
      this.record.qtnd_ifs = this.mform.value.qtnd_ifs;
      this.record.qtnd_tot_amt = this.mform.value.qtnd_tot_amt;
      this.record.qtnd_order = this.mform.value.qtnd_order;

      this.record.rec_company_id = this.gs.user.user_company_id;

      this.output.emit({ record: this.record, mode: this.mode, index: this.index });
    }
    this.newRecord();
  }

  //
  findTotal(action: any) {
    console.log(action);
    if (!action.isChanged) {
      return;
    }
    const data = <iQtnd_fcl>this.mform.value;
    const of = data?.qtnd_of || 0;
    const pss = data?.qtnd_pss || 0;
    const baf = data?.qtnd_baf || 0;
    const isps = data?.qtnd_isps || 0;
    const haul = data?.qtnd_haulage || 0;
    const ifs = data?.qtnd_ifs || 0;

    if (action.id == "qtnd_of" || action.id == "qtnd_pss" || action.id == "qtnd_baf" || action.id == "qtnd_isps" || action.id == "qtnd_haulage" || action.id == "qtnd_ifs") {
      let amount = of + pss + baf + isps + haul + ifs;
      amount = this.gs.roundNumber(amount, this.iDec);
      this.mform.patchValue({
        qtnd_tot_amt: amount,
      })
    }
  }

  callBack(action: any) {
    if (action.id == 'qtnd_pol_name') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          qtnd_pol_id: action.rec.param_id,
          qtnd_pol_code: action.rec.param_code,
          qtnd_pol_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnd_pol_id: 0,
          qtnd_pol_code: '',
          qtnd_pol_name: '',
        });
      }
    }
    if (action.id == 'qtnd_pod_name') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          qtnd_pod_id: action.rec.param_id,
          qtnd_pod_code: action.rec.param_code,
          qtnd_pod_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnd_pod_id: 0,
          qtnd_pod_code: '',
          qtnd_pod_name: '',
        });
      }
    }
    if (action.id == 'qtnd_carrier_name') {
      console.log(action);
      if (action.rec) {
        this.mform.patchValue({
          qtnd_carrier_id: action.rec.param_id,
          qtnd_carrier_code: action.rec.param_code,
          qtnd_carrier_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnd_carrier_id: 0,
          qtnd_carrier_code: '',
          qtnd_carrier_name: '',
        });
      }
    }
  }

}





