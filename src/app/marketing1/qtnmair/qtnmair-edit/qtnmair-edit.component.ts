import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { QtnmLclService } from '../../services/qtnmlcl.service';
import { iQtnd_lcl, iQtnm_lcl } from '../../models/iqtnmlcl';
import { QtnmAirService } from '../../services/qtnmair.service';
import { data_qtnmair, iQtnd_air, iQtnm_air } from '../../models/iqtnmair';
import { QtnmAirdEditComponent } from '../qtnmaird-edit/qtnmaird-edit.component';

@Component({
  selector: 'app-qtnmair-edit',
  templateUrl: './qtnmair-edit.component.html',
  styleUrls: ['./qtnmair-edit.component.css'],
  standalone: true,
  imports: [...CustomControls, QtnmAirdEditComponent]
})

//Name : Sourav V
//Created Date : 03/01/2025
//Remark : this component manages creation,editing and saving of qtnm-air records

export class QtnmAirEditComponent extends baseEditComponent {

  data_qtnmair: data_qtnmair;
  iDec = 3;
  constructor(
    private ms: QtnmAirService,
    public dialog: MatDialog

  ) {

    super();
    this.setQuoteData('new', <iQtnd_air>{}, 0);
    this.showModel = false;
    let date = this.gs.getToday();
    let user = this.gs.getUserName();
    this.mform = this.fb.group({
      qtnm_id: [0],
      qtnm_cfno: [0],
      qtnm_no: [''],
      qtnm_to_id: [0],
      qtnm_to_code: [''],
      qtnm_to_name: [''],
      qtnm_to_addr1: [''],
      qtnm_to_addr2: [''],
      qtnm_to_addr3: [''],
      qtnm_to_addr4: [''],
      qtnm_date: [date],
      qtnm_quot_by: [user],
      qtnm_valid_date: [''],
      qtnm_salesman_id: [0],
      qtnm_salesman_name: [''],
      qtnm_move_type: [''],
      qtnm_commodity: [''],

      qtnd_air: this.fb.array([]),
      rec_version: [0],

    })
  }
  setQuoteData(_mode: string, _record: iQtnd_air, index: number) {
    this.data_qtnmair = { mode: _mode, record: _record, index: index }
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
      qtnm_id: this.id
    })

  }

  addRow(rec: iQtnd_air) {

    let a = this.gs.getToday();

    const _rec = this.fb.group({
      qtnd_id: [rec?.qtnd_id || 0],
      qtnd_qtnm_id: [rec?.qtnd_qtnm_id || 0],
      qtnd_pol_id: [rec?.qtnd_pol_id || 0],
      qtnd_pol_code: [rec?.qtnd_pol_code || ""],
      qtnd_pol_name: [rec?.qtnd_pol_name || ""],
      qtnd_pod_id: [rec?.qtnd_pod_id || 0],
      qtnd_pod_code: [rec?.qtnd_pod_code || ""],
      qtnd_pod_name: [rec?.qtnd_pod_name || ""],
      qtnd_carrier_id: [rec?.qtnd_carrier_id || 0],
      qtnd_carrier_code: [rec?.qtnd_carrier_code || ""],
      qtnd_carrier_name: [rec?.qtnd_carrier_name || ""],
      qtnd_trans_time: [rec?.qtnd_trans_time || ""],
      qtnd_routing: [rec?.qtnd_routing || ""],
      qtnd_etd: [rec?.qtnd_etd || ""],
      qtnd_min: [rec?.qtnd_min || ""],
      qtnd_45k: [rec?.qtnd_45k || ""],
      qtnd_100k: [rec?.qtnd_100k || ""],
      qtnd_300k: [rec?.qtnd_300k || ""],
      qtnd_500k: [rec?.qtnd_500k || ""],
      qtnd_1000k: [rec?.qtnd_1000k || ""],
      qtnd_fsc: [rec?.qtnd_fsc || ""],
      qtnd_war: [rec?.qtnd_war || ""],
      qtnd_sfc: [rec?.qtnd_sfc || ""],
      qtnd_hac: [rec?.qtnd_hac || ""],
      qtnd_order: [rec?.qtnd_order || 0],
    });
    return _rec;
  }

  addQuote(iRow: iQtnd_air = <iQtnd_air>{}) {
    this.formArray('qtnd_air')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('qtnd_air').removeAt(idx);
    }
  }
  editQuotes(idx: number) {
    this.data_qtnmair = {
      mode: 'edit',
      record: <iQtnd_air>this.formArrayRecord('qtnd_air', idx)?.value,
      index: idx
    }
  }
  fillQuotes(iquote_list: iQtnd_air[]) {
    this.formArray('qtnd_air').clear();
    iquote_list.forEach(rec_quote => {
      this.addQuote(rec_quote);
    });
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/marketing/qtnmair/GetRecordAsync').subscribe({
      next: (rec: iQtnm_air) => {
        this.mform.patchValue({
          qtnm_id: rec.qtnm_id,
          qtnm_cfno: rec.qtnm_cfno,
          qtnm_no: rec.qtnm_no,
          qtnm_to_id: rec.qtnm_to_id,
          qtnm_to_code: rec.qtnm_to_code,
          qtnm_to_name: rec.qtnm_to_name,
          qtnm_to_addr1: rec.qtnm_to_addr1,
          qtnm_to_addr2: rec.qtnm_to_addr2,
          qtnm_to_addr3: rec.qtnm_to_addr3,
          qtnm_to_addr4: rec.qtnm_to_addr4,
          qtnm_date: rec.qtnm_date,
          qtnm_quot_by: rec.qtnm_quot_by,
          qtnm_valid_date: rec.qtnm_valid_date,
          qtnm_salesman_id: rec.qtnm_salesman_id,
          qtnm_salesman_name: rec.qtnm_salesman_name,
          qtnm_move_type: rec.qtnm_move_type,
          qtnm_commodity: rec.qtnm_commodity,
          rec_version: rec.rec_version,

        });
        this.fillQuotes(rec.qtnd_air);
      },
      error: (e) => {
        alert(e.message);
      }
    })
  }


  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iQtnm_air>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.qtnm_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/marketing/qtnmair/SaveAsync').subscribe({
      next: (v: iQtnm_air) => {
        if (this.mode == "add") {
          this.id = v.qtnm_id;
          this.mode = "edit";
          this.mform.patchValue({ qtnm_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version,
          qtnm_cfno: v.qtnm_cfno,
          qtnm_no: v.qtnm_no
        });
        this.fillQuotes(v.qtnd_air);
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
    if (action.id == 'qtnm_to_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_to_id: action.rec ? action.rec.cust_id : 0,
          qtnm_to_code: action.rec ? action.rec.cust_code : '',
          qtnm_to_name: action.rec ? action.rec.cust_name : '',
          qtnm_to_addr1: action.rec ? action.rec.cust_address1 : '',
          qtnm_to_addr2: action.rec ? action.rec.cust_address2 : '',
          qtnm_to_addr3: action.rec ? action.rec.cust_address3 : '',
        });
      }
      else {
        this.mform.patchValue({
          qtnm_to_id: 0,
          qtnm_to_code: '',
          qtnm_to_name: '',
          qtnm_to_addr1: '',
          qtnm_to_addr2: '',
          qtnm_to_addr3: ''
        });
      }
    }
    if (action.id == 'qtnm_salesman_name') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_salesman_id: action.rec ? action.rec.param_id : 0,
          qtnm_salesman_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          qtnm_salesman_id: 0,
          qtnm_salesman_name: '',
        });
      }
    }
    // if (action.name == 'qtnd_pol_code') {
    //   if (action.rec) {
    //     this.formArrayRecord('qtnd_air', action.rowIndex)?.patchValue({
    //       qtnd_pol_id: action.rec ? action.rec.pol_id : 0,
    //       qtnd_pol_code: action.rec ? action.rec.pol_code : '',
    //       qtnd_pol_name: action.rec ? action.rec.pol_name : '',
    //     });
    //   }
    //   else {
    //     this.mform.patchValue({
    //       qtnd_pol_id: 0,
    //       qtnd_pol_code: '',
    //       qtnd_pol_name: '',
    //     });
    //   }
    // }

    // if (action.name == 'qtnd_pod_code') {
    //   if (action.rec) {
    //     this.formArrayRecord('qtnd_air', action.rowIndex)?.patchValue({
    //       qtnd_pod_id: action.rec ? action.rec.pod_id : 0,
    //       qtnd_pod_code: action.rec ? action.rec.pod_code : '',
    //       qtnd_pod_name: action.rec ? action.rec.pod_name : '',
    //     });
    //   }
    //   else {
    //     this.mform.patchValue({
    //       qtnd_pod_id: 0,
    //       qtnd_pod_code: '',
    //       qtnd_pod_name: '',
    //     });
    //   }
    // }

    // if (action.name == 'qtnd_carrier_code') {
    //   if (action.rec) {
    //     this.formArrayRecord('qtnd_air', action.rowIndex)?.patchValue({
    //       qtnd_carrier_id: action.rec ? action.rec.carrier_id : 0,
    //       qtnd_carrier_code: action.rec ? action.rec.carrier_code : '',
    //       qtnd_carrier_name: action.rec ? action.rec.carrier_name : '',
    //     });
    //   }
    //   else {
    //     this.mform.patchValue({
    //       qtnd_carrier_id: 0,
    //       qtnd_carrier_code: '',
    //       qtnd_carrier_name: '',
    //     });
    //   }
    // }
  }
  output(action: any) {
    if (action.mode == "new")
      this.addQuote(<iQtnd_air>action.record);
    else {
      this.formArrayRecord('qtnd_air', action.index)?.patchValue({
        ...action.record
      })
    }
  }
}

