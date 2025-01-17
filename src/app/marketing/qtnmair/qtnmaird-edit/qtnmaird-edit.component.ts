import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iQtnm_lcl_Search } from '../../models/iqtnmlcl';
import { data_qtnmair, iQtnd_air, iQtnm_airModel } from '../../models/iqtnmair';

@Component({
  selector: 'app-qtnmaird-edit',
  templateUrl: './qtnmaird-edit.component.html',
  styleUrls: ['./qtnmaird-edit.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 03/01/2025
//Remark : this component manages creation,editing and saving of qtnm-air(detail table) records

export class QtnmAirdEditComponent {

  mform: FormGroup;
  record!: iQtnd_air;
  mode = 'new';
  index = 0;

  // @Input('search_url') search_url = '';

  @Input('input') set input(v: data_qtnmair) {
    this.record = v.record;
    this.mode = v.mode;
    this.index = v.index;
    this.addRow();
  }

  @Output('output') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      qtnd_id: [0],
      qtnd_qtnm_id: [0],
      qtnd_pol_id: [0],
      qtnd_pol_code: [''],
      qtnd_pol_name: [''],
      qtnd_pod_id: [0],
      qtnd_pod_code: [''],
      qtnd_pod_name: [''],
      qtnd_carrier_id: [0],
      qtnd_carrier_code: [''],
      qtnd_carrier_name: [''],
      qtnd_trans_time: [''],
      qtnd_routing: [''],
      qtnd_etd: [''],
      qtnd_min: [''],
      qtnd_45k: [''],
      qtnd_100k: [''],
      qtnd_300k: [''],
      qtnd_500k: [''],
      qtnd_1000k: [''],
      qtnd_fsc: [''],
      qtnd_war: [''],
      qtnd_sfc: [''],
      qtnd_hac: [''],
      qtnd_order: [0],

    })

  }
  public get url() {
    return this.gs.url;
  }
  ngOnInit(): void {
    
  }
  addRow(){
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
      qtnd_etd: this.record?.qtnd_etd || '',
      qtnd_min: this.record?.qtnd_min || '',
      qtnd_45k: this.record?.qtnd_45k || '',
      qtnd_100k: this.record?.qtnd_100k || '',
      qtnd_300k: this.record?.qtnd_300k || '',
      qtnd_500k: this.record?.qtnd_500k || '',
      qtnd_1000k: this.record?.qtnd_1000k || '',
      qtnd_fsc: this.record?.qtnd_fsc || '',
      qtnd_war: this.record?.qtnd_war || '',
      qtnd_sfc: this.record?.qtnd_sfc || '',
      qtnd_hac: this.record?.qtnd_hac || '',
      qtnd_order: this.record?.qtnd_order || 0,
    })
  }
  getCompanyId() {
    return this.gs.user.user_company_id;
  }
  newRecord(){
    this.mode = 'new';  
    this.mform.reset();      
  }

  search(_action: string) {
    if (this.output) {
      this.record.qtnd_id= this.mform.value.qtnd_id ;
      this.record.qtnd_qtnm_id= this.mform.value.qtnd_qtnm_id ;
      this.record.qtnd_pol_id= this.mform.value.qtnd_pol_id ;
      this.record.qtnd_pol_code= this.mform.value.qtnd_pol_code ;
      this.record.qtnd_pol_name= this.mform.value.qtnd_pol_name ;
      this.record.qtnd_pod_id= this.mform.value.qtnd_pod_id ;
      this.record.qtnd_pod_code= this.mform.value.qtnd_pod_code ;
      this.record.qtnd_pod_name= this.mform.value.qtnd_pod_name ;
      this.record.qtnd_carrier_id= this.mform.value.qtnd_carrier_id ;
      this.record.qtnd_carrier_code= this.mform.value.qtnd_carrier_code ;
      this.record.qtnd_carrier_name= this.mform.value.qtnd_carrier_name ;
      this.record.qtnd_trans_time= this.mform.value.qtnd_trans_time ;
      this.record.qtnd_routing= this.mform.value.qtnd_routing ;
      this.record.qtnd_etd= this.mform.value.qtnd_etd ;
      this.record.qtnd_min= this.mform.value.qtnd_min ;
      this.record.qtnd_45k= this.mform.value.qtnd_45k ;
      this.record.qtnd_100k= this.mform.value.qtnd_100k ;
      this.record.qtnd_300k= this.mform.value.qtnd_300k ;
      this.record.qtnd_500k= this.mform.value.qtnd_500k ;
      this.record.qtnd_1000k= this.mform.value.qtnd_1000k ;
      this.record.qtnd_fsc= this.mform.value.qtnd_fsc ;
      this.record.qtnd_war= this.mform.value.qtnd_war ;
      this.record.qtnd_sfc= this.mform.value.qtnd_sfc ;
      this.record.qtnd_hac= this.mform.value.qtnd_hac ;
      this.record.qtnd_order= this.mform.value.qtnd_order ;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, mode : this.mode, index : this.index });
    }
    this.newRecord();
  }
  callBack(action: any) {
    if (action.id == 'qtnd_pol_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnd_pol_id: action.rec ? action.rec.param_id : 0,
          qtnd_pol_code: action.rec ? action.rec.param_code : '',
          qtnd_pol_name: action.rec ? action.rec.param_name : '',
        })
      }
      else {
        this.mform.patchValue({
          qtnd_pol_id: 0,
          qtnd_pol_code: '',
          qtnd_pol_name: '',
        })
      }
    }
    if (action.id == 'qtnd_pod_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnd_pod_id: action.rec ? action.rec.param_id : 0,
          qtnd_pod_code: action.rec ? action.rec.param_code : '',
          qtnd_pod_name: action.rec ? action.rec.param_name : '',
        })
      }
      else {
        this.mform.patchValue({
          qtnd_pod_id: 0,
          qtnd_pod_code: '',
          qtnd_pod_name: '',
        })
      }
    }
    if (action.id == 'qtnd_carrier_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnd_carrier_id: action.rec ? action.rec.param_id : 0,
          qtnd_carrier_code: action.rec ? action.rec.param_code : '',
          qtnd_carrier_name: action.rec ? action.rec.param_name : '',
        })
      }
      else {
        this.mform.patchValue({
          qtnd_carrier_id: 0,
          qtnd_carrier_code: '',
          qtnd_carrier_name: '',
        })
      }
    }
  }
  
}
