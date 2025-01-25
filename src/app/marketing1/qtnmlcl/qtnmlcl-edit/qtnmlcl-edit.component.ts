import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { QtnmLclService } from '../../services/qtnmlcl.service';
import { iQtnd_lcl, iQtnm_lcl } from '../../models/iqtnmlcl';

//Name : Sourav V
//Created Date : 04/01/2025
//Remark : this component manages creation,editing and saving of qtnm-lcl(parent table) records

@Component({
  selector: 'app-qtnmlcl-edit',
  templateUrl: './qtnmlcl-edit.component.html',
  styleUrls: ['./qtnmlcl-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class QtnmLclEditComponent extends baseEditComponent {

  iDec = 3;
  constructor(
    private ms: QtnmLclService,
    public dialog: MatDialog

  ) {

    super();
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

      qtnm_package: [''],
      qtnm_kgs: [0],
      qtnm_lbs: [0],
      qtnm_cbm: [0],
      qtnm_cft: [0],
      qtnm_por_id: [0],
      qtnm_por_code: [''],
      qtnm_por_name: [''],
      qtnm_pol_id: [0],
      qtnm_pol_code: [''],
      qtnm_pol_name: [''],
      qtnm_pod_id: [0],
      qtnm_pod_code: [''],
      qtnm_pod_name: [''],
      qtnm_pld_name: [''],
      qtnm_plfd_name: [''],
      qtnm_trans_time: [''],
      qtnm_routing: [''],
      qtnm_amt: [0],

      qtnd_lcl: this.fb.array([]),
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
      qtnm_id: this.id
    })

  }

  addRow(rec: iQtnd_lcl) {

    let a = this.gs.getToday();

    const _rec = this.fb.group({
      qtnd_id: [rec?.qtnd_id || 0],
      qtnd_qtnm_id: [rec?.qtnd_qtnm_id || 0],
      qtnd_acc_id: [rec?.qtnd_acc_id || 0],
      qtnd_acc_code: [rec?.qtnd_acc_code || ""],
      qtnd_acc_name: [rec?.qtnd_acc_name || ""],
      qtnd_amt: [rec?.qtnd_amt || 0],
      qtnd_per: [rec?.qtnd_per || ""],
      qtnd_order: [rec?.qtnd_order || 0],
    });
    return _rec;
  }

  addQuote(iRow: iQtnd_lcl = <iQtnd_lcl>{}) {
    this.formArray('qtnd_lcl')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    const nidx = idx + 1;
    const confirmDelete = window.confirm("Delete " + nidx + " y/n");
    if (confirmDelete) {
      this.formArray('qtnd_lcl').removeAt(idx);
      this.findGrandTotal();
    }
  }

  fillQuotes(iquote_list: iQtnd_lcl[]) {
    this.formArray('qtnd_lcl').clear();
    iquote_list.forEach(rec_quote => {
      this.addQuote(rec_quote);
    });
    this.findGrandTotal();
  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/marketing/qtnmlcl/GetRecordAsync').subscribe({
      next: (rec: iQtnm_lcl) => {
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
          qtnm_package: rec.qtnm_package,
          qtnm_kgs: rec.qtnm_kgs,
          qtnm_lbs: rec.qtnm_lbs,
          qtnm_cbm: rec.qtnm_cbm,
          qtnm_cft: rec.qtnm_cft,

          qtnm_por_id: rec.qtnm_por_id,
          qtnm_por_code: rec.qtnm_por_code,
          qtnm_por_name: rec.qtnm_por_name,
          qtnm_pol_id: rec.qtnm_pol_id,
          qtnm_pol_code: rec.qtnm_pol_code,
          qtnm_pol_name: rec.qtnm_pol_name,
          qtnm_pod_id: rec.qtnm_pod_id,
          qtnm_pod_code: rec.qtnm_pod_code,
          qtnm_pod_name: rec.qtnm_pod_name,
          qtnm_pld_name: rec.qtnm_pld_name,
          qtnm_plfd_name: rec.qtnm_plfd_name,

          qtnm_trans_time: rec.qtnm_trans_time,
          qtnm_routing: rec.qtnm_routing,
          qtnm_amt: rec.qtnm_amt ?? 0,

          rec_version: rec.rec_version,

        });
        this.fillQuotes(rec.qtnd_lcl);
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
    const data = <iQtnm_lcl>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.qtnm_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/marketing/qtnmlcl/SaveAsync').subscribe({
      next: (v: iQtnm_lcl) => {
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
        this.fillQuotes(v.qtnd_lcl);
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
    if (action.id == 'qtnm_por_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_por_id: action.rec ? action.rec.param_id : 0,
          qtnm_por_code: action.rec ? action.rec.param_code : '',
          qtnm_por_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          qtnm_por_id: 0,
          qtnm_por_code: '',
          qtnm_por_name: '',
        });
      }
    }
    if (action.id == 'qtnm_pol_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_pol_id: action.rec ? action.rec.param_id : 0,
          qtnm_pol_code: action.rec ? action.rec.param_code : '',
          qtnm_pol_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          qtnm_pol_id: 0,
          qtnm_pol_code: '',
          qtnm_pol_name: '',
        });
      }
    }
    if (action.id == 'qtnm_pod_code') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_pod_id: action.rec ? action.rec.param_id : 0,
          qtnm_pod_code: action.rec ? action.rec.param_code : '',
          qtnm_pod_name: action.rec ? action.rec.param_name : '',
        });
      }
      else {
        this.mform.patchValue({
          qtnm_pod_id: 0,
          qtnm_pod_code: '',
          qtnm_pod_name: '',
        });
      }
    }

    if (action.name == 'qtnd_acc_code') {
      if (action.rec) {
        this.formArrayRecord('qtnd_lcl', action.rowIndex)?.patchValue({
          qtnd_acc_id: action.rec ? action.rec.acc_id : 0,
          qtnd_acc_code: action.rec ? action.rec.acc_code : '',
          qtnd_acc_name: action.rec ? action.rec.acc_name : '',
        });
      }
      else {
        this.mform.patchValue({
          qtnd_acc_id: 0,
          qtnd_acc_code: '',
          qtnd_acc_name: '',
        });
      }
    }
  }

  ConvertUnit(value: number, cUnit: 'kgs' | 'lbs' | 'cbm' | 'cft'): number {
    const convertionValue = {
      kgs: 2.20462,
      lbs: 0.453592,
      cbm: 35.3147,
      cft: 0.0283168
    };
    const changedValue = convertionValue[cUnit];
    return changedValue * value;
  }

  findUnit(action: any) {

    console.log(action);

    if (!action.isChanged) {
      return;
    }

    const data = <iQtnm_lcl>this.mform.value

    const nqtnm_kgs = data?.qtnm_kgs || 0;
    const nqtnm_lbs = data?.qtnm_lbs || 0;
    const nqtnm_cbm = data?.qtnm_cbm || 0;
    const nqtnm_cft = data?.qtnm_cft || 0;


    if (action.name == 'qtnm_kgs') {      // always use if condition maximum
      let nlbs = this.ConvertUnit(nqtnm_kgs, 'kgs');
      this.mform.patchValue({
        qtnm_lbs: this.gs.roundNumber(nlbs, this.iDec),
      });
    }
    if (action.name == 'qtnm_lbs') {
      let nkgs = this.ConvertUnit(nqtnm_lbs, 'lbs');
      this.mform.patchValue({
        qtnm_kgs: this.gs.roundNumber(nkgs, this.iDec),
      });
    }
    if (action.name == 'qtnm_cbm') {
      let ncft = this.ConvertUnit(nqtnm_cbm, 'cbm');
      this.mform.patchValue({
        qtnm_cft: this.gs.roundNumber(ncft, this.iDec),
      });
    }
    if (action.name == 'qtnm_cft') {
      let ncbm = this.ConvertUnit(nqtnm_cft, 'cft');
      this.mform.patchValue({
        qtnm_cbm: this.gs.roundNumber(ncbm, this.iDec),
      });
    }
    if (action.name == 'qtnd_amt') {
      this.findGrandTotal();
    }
  }

  findGrandTotal() {
    const invoice = <iQtnd_lcl[]>this.formArray('qtnd_lcl').value;
    const amt = invoice.reduce((total, row) => {
      return total + row.qtnd_amt || 0; // here changed
    }, 0);
    this.mform.patchValue({
      qtnm_amt: amt
    });

  }
  // onBlur(action: any) {
  //   console.log('onBlur Action', action);
  // }



}

