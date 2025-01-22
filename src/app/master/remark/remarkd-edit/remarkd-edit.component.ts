import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { data_remark, iRemarkd } from '../../models/iremarkm';


@Component({
  selector: 'app-remarkd-edit',
  templateUrl: './remarkd-edit.component.html',
  styleUrls: ['./remarkd-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 22/01/2025

export class RemarkdEditComponent {

  mform: FormGroup;
  record!: iRemarkd;
  mode = 'new';
  index = 0;


  @Input('input') set input(v: data_remark) {
    this.record = { ...v.record };
    this.mode = v.mode;
    this.index = v.index;
    if (this.mode == "new")
      this.newRecord();
    if (this.mode == "edit")
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
      remd_id: [0],
      remd_remarkm_id: [0],
      remd_desc1: [''],
      remd_order: [0],
    })
  }

  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
  }

  fillData() {
    this.mform.setValue({
      remd_id: this.record?.remd_id || 0,
      remd_remarkm_id: this.record?.remd_remarkm_id || 0,
      remd_desc1: this.record?.remd_desc1 || '',
      remd_order: this.record?.remd_order || 0,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  newRecord() {
    this.mode = 'new';
    this.mform.reset();
    //this.mform.markAsPristine();
    //this.mform.markAsUntouched;

  }

  search(_action: string) {
    if (this.mform.invalid) {
      alert('form not valid');
      return;
    }
    
    if (this.output) {
      this.record.remd_id = this.mform.value.remd_id;
      this.record.remd_remarkm_id = this.mform.value.remd_remarkm_id;
      this.record.remd_desc1 = this.mform.value.remd_desc1;
      this.record.remd_order = this.mform.value.remd_order;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, mode: this.mode, index: this.index });
    }
    this.newRecord();
  }

}





