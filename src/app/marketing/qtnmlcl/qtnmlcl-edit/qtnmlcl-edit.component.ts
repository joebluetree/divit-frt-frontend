import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { QtnmLclService } from '../../services/qtnmlcl.service';
import { iQtnd_lcl, iQtnm_lcl } from '../../models/iqtnmlcl';

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
    this.showModel = true;
    this.mform = this.fb.group({
      qtnm_pkid: [0],
      qtnm_cfno: [0],
      qtnm_no: [''],
      qtnm_to_id: [0],
      qtnm_to_name : [''],
      qtnm_to_addr1: [''],
      qtnm_to_addr2: [''],
      qtnm_to_addr3: [''],
      qtnm_to_addr4: [''],
      qtnm_date: [''],
      qtnm_quot_by: [''],
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
      qtnm_por_name: [''],
      qtnm_pol_id: [0],
      qtnm_pol_name: [''],
      qtnm_pod_id: [0],
      qtnm_pod_name: [''],
      qtnm_pld_name: [''],
      qtnm_plfd_name: [''],
      qtnm_trans_time: [''],
      qtnm_routing: [''],
      qtnm_amt:[0],

      qtnm_qtnd_lcl: this.fb.array([]),
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
      qtnm_pkid: this.id
    })

  }

  addRow(rec: iQtnd_lcl) {
    const _rec = this.fb.group({
      qtnd_pkid: [rec?.qtnd_pkid || 0],
      qtnd_qtnm_id: [rec?.qtnd_qtnm_pkid || 0],
      qtnd_acc_id: [rec?.qtnd_acc_id || 0],
      qtnd_acc_name: [rec?.qtnd_acc_name || ""],
      qtnd_desc: [rec?.qtnd_desc || ""],
      qtnd_amt: [rec?.qtnd_amt || 0],
      qtnd_per: [rec?.qtnd_per || ""],
      qtnd_order: [rec?.qtnd_order || 0],
    });
    return _rec;
  }

  addQuote(iRow: iQtnd_lcl = <iQtnd_lcl>{}) {
    this.formArray('qtnm_qtnd_lcl')?.push(this.addRow(iRow));
  }

  deleteRow(idx: number) {
    this.formArray('qtnm_qtnd_lcl').removeAt(idx);
    this.findGrandTotal();
  }

  fillQuotes (iquote_list: iQtnd_lcl[]) {
    this.formArray('qtnm_qtnd_lcl').clear();
    iquote_list.forEach((rec_quote: iQtnd_lcl) => {
      this.addQuote(rec_quote);
    });

  }

  getRecord() {

    const param = { 'id': this.id };
    this.ms.getRecord(param, '/api/marketing/qtnmlcl/GetRecordAsync').subscribe({
      next: (rec: iQtnm_lcl) => {
        this.mform.patchValue({
          qtnm_pkid: rec.qtnm_pkid,
          qtnm_cfno: rec.qtnm_cfno,
          // qtnm_type: rec.qtnm_type,
          qtnm_no: rec.qtnm_no,
          qtnm_to_id: rec.qtnm_to_id,
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
          qtnm_por_name: rec.qtnm_por_name,
          qtnm_pol_id: rec.qtnm_pol_id,
          qtnm_pol_name: rec.qtnm_pol_name,
          qtnm_pod_id: rec.qtnm_pod_id,
          qtnm_pod_name: rec.qtnm_pod_name,
          qtnm_pld_name: rec.qtnm_pld_name,
          qtnm_plfd_name: rec.qtnm_plfd_name,

          qtnm_trans_time: rec.qtnm_trans_time,
          qtnm_routing: rec.qtnm_routing,
          qtnm_amt: rec.qtnm_amt,

          rec_version: rec.rec_version,

        });
        this.fillQuotes(rec.qtnm_qtnd_lcl);
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
      'id': data.qtnm_pkid,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/marketing/qtnmlcl/SaveAsync').subscribe({
      next: (v: iQtnm_lcl) => {
        if (this.mode == "add") {
          this.id = v.qtnm_pkid;
          this.mode = "edit";
          this.mform.patchValue({ qtnm_pkid: this.id });
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
        this.fillQuotes(v.qtnm_qtnd_lcl);
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
    if (action.id == 'qtnm_to_id') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_to_id: action.rec.cust_id,
          qtnm_to_name: action.rec.cust_name,
          // qtnm_to_addr1: action.rec.cust_address1,
          // qtnm_to_addr2: action.rec.cust_address2
        });
      }
      else {
        this.mform.patchValue({
          qtnm_to_id: null,
          qtnm_to_name: '',
          // qtnm_to_addr1:'',
          // qtnm_to_addr2:''
        });
      }
    }
    if (action.id == 'qtnm_salesman_name') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_salesman_id: action.rec.param_id,
          qtnm_salesman_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnm_salesman_id: null,
          qtnm_salesman_name: '',
        });
      }
    }
    if (action.id == 'qtnm_por_id') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_por_id: action.rec.param_id,
          qtnm_por_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnm_por_id: null,
          qtnm_por_name: '',
        });
      }
    }
    if (action.id == 'qtnm_pol_id') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_pol_id: action.rec.param_id,
          qtnm_pol_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnm_pol_id: null,
          qtnm_pol_name: '',
        });
      }
    }
    if (action.id == 'qtnm_pod_id') {
      if (action.rec) {
        this.mform.patchValue({
          qtnm_pod_id: action.rec.param_id,
          qtnm_pod_name: action.rec.param_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnm_pod_id: null,
          qtnm_pod_name: '',
        });
      }
    }

    if (action.name == 'qtnd_acc_id') {
      if (action.rec) {
        this.formArrayRecord('qtnm_qtnd_lcl', action.rowIndex)?.patchValue({
          qtnd_acc_id: action.rec.acc_id,
          qtnd_acc_name: action.rec.acc_name,
        });
      }
      else {
        this.mform.patchValue({
          qtnd_acc_id: null,
          qtnd_acc_name: '',
        });
      }
    }
  }

  KgsToLbs(kgs: number){
    // const kgs_lbs = 2.20462;
    const lbs = kgs * 2.20462;
    return this.gs.roundNumber(lbs, this.iDec);
  }

  LbsToKgs(lbs: number) {
    const kgs = lbs * 0.453592;
    return this.gs.roundNumber(kgs, this.iDec);
  }

  CbmToCft(cbm: number) {
    const cft = cbm * 35.3147;
    return this.gs.roundNumber(cft, this.iDec);
  }

  CftToCbm(cft: number) {
    const cbm = cft * 0.0283168;
    return this.gs.roundNumber(cbm, this.iDec);
  }
  
  findGrandTotal(){  
    const invoice  = <iQtnd_lcl[]>this.formArray('qtnm_qtnd_lcl').value;
    let amount = invoice.reduce((total,row) =>{
      return total + row.qtnd_amt || 0; // here changed
    },0);

    // amount = this.gs.roundNumber( amount, this.gs.globalConstants.global_dec_places);

    this.mform.patchValue({
      qtnm_amt: amount
    });

  }

  findAmt(action : any){
    
    console.log(action);
    
    if(!action.isChanged){
      return;
    }
    
    const data =<iQtnm_lcl>this.mform.value
    // const data1 = this.formArrayRecord('qtnm_qtnd_lcl',action.rowIndex);
    
    const nqtnm_kgs = data?.qtnm_kgs || 0;
    const nqtnm_lbs = data?.qtnm_lbs || 0;
    const nqtnm_cbm = data?.qtnm_cbm || 0;
    const nqtnm_cft = data?.qtnm_cft || 0;


    if(action.name == 'qtnm_kgs'){      // always use if condition maximum
      let nlbs =  this.KgsToLbs(nqtnm_kgs);
      this.mform.patchValue({
        qtnm_lbs: nlbs,
      }); 
    } 
    if(action.name == 'qtnm_lbs'){      // always use if condition maximum
      let nkgs =  this.LbsToKgs(nqtnm_lbs);
      this.mform.patchValue({
        qtnm_kgs: nkgs,
      }); 
    }
    if(action.name == 'qtnm_cbm'){      // always use if condition maximum
      let ncft =  this.CbmToCft(nqtnm_cbm);
      this.mform.patchValue({
        qtnm_cft: ncft,
      }); 
    } 
    if(action.name == 'qtnm_cft'){      // always use if condition maximum
      let ncbm =  this.CftToCbm(nqtnm_cft);
      this.mform.patchValue({
        qtnm_cbm: ncbm,
      }); 
    } 
  }
  // onBlur(action: any) {
  //   console.log('onBlur Action', action);
  // }



}

