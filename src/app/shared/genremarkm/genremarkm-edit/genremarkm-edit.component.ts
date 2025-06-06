import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { MatDialog } from '@angular/material/dialog';
import { GenRemarkmService } from '../services/genremarkm.service';
import { iGenRemarkm } from '../../models/igenremarkm';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { baseEditComponent } from '../../base-class/baseEditComponent';

@Component({
  selector: 'app-genremarkm-edit',
  templateUrl: './genremarkm-edit.component.html',
  styleUrls: ['./genremarkm-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Alen Cherian
//Date : 02/06/2025
//Command : Create the Common Remark Components.
//version 1.0

export class GenRemarkmEditComponent extends baseEditComponent {

  data: any;
  record!: iGenRemarkm;

  @Input('inputdata') set inputdata(v: any) {
    this.data = v;
  }

  constructor(
    private ms: GenRemarkmService,
    public dialog: MatDialog,
  ) {
    super();
    this.mform = this.fb.group({
      remk_remarks: this.fb.array([])
    });
  }


  ngOnInit() {
  }

  getRemarksArray(): FormArray {
    return this.mform.get('remk_remarks') as FormArray;
  }

  addRemarkRow(rec: iGenRemarkm) {
    return this.fb.group({
      remk_id: [rec?.remk_id || 0],
      remk_parent_id: [rec?.remk_parent_id || this.data.id || 0],
      remk_parent_type: [rec?.remk_parent_type || this.data.parent_type || ''],
      remk_desc: [rec?.remk_desc || ''],
      remk_order: [rec?.remk_order || 0],

      rec_company_id: [rec?.rec_company_id || 0],
      rec_branch_id: [rec?.rec_branch_id || 0],

    });
  }

  addDetails(iRow: iGenRemarkm = <iGenRemarkm>{}) {
    this.getRemarksArray().push(this.addRemarkRow(iRow));
  }

  deleteDetails(idx: number) {
    const nidx = idx + 1;
    if (window.confirm(`Delete ${nidx} y/n`)) {
      this.getRemarksArray().removeAt(idx);
    }
  }

  fillRemarkDetails(iremark_list: iGenRemarkm[]) {
    this.getRemarksArray().clear();
    iremark_list.forEach(rec => {
      this.addDetails(rec)
    });
  }


  onBlur(action: any) {
    console.log('onBlur Action', action);
  }

}

