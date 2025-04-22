import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { DelvOrderService } from '../../services/delvorder.service';
import { iDelvOrder } from '../../models/idelvorder';

//Name : Sourav V
//Created Date : 19/04/2025
//Remark : this component manages creation,editing and saving of delivery order (parent table) records

@Component({
  selector: 'app-delvorder-edit',
  templateUrl: './delvorder-edit.component.html',
  styleUrls: ['./delvorder-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class DelvOrderEditComponent extends baseEditComponent {

  parent_id: number = 0;
  parent_type: string = '';
  // delvorder_id: number;

  goodsCat = [
    { key: 'NO', value: 'NO' },
    { key: 'YES', value: 'YES' },
  ]
  shipTerm = [
    { key: 'AIR', value: 'AIR' },
    { key: 'OCEAN', value: 'OCEAN' },
    { key: 'OCEAN,,AIR', value: 'OCEAN,AIR' },
  ]

  constructor(
    public ms: DelvOrderService,
    public dialog: MatDialog

  ) {

    super();
    this.showModel = false;
    let date = this.gs.getToday();
    this.mform = this.fb.group({
      do_id: [0],
      do_cfno: [0],
      do_order_no: [''],
      do_order_date: [date],
      do_parent_id: [0],
      do_truck_id: [0],
      do_truck_code: [''],
      do_truck_name: [''],
      do_truck_attn: [''],
      do_truck_tel: [''],
      do_truck_fax: [''],
      do_truck_cc: [''],
      do_pickup: [''],
      do_addr1: [''],
      do_addr2: [''],
      do_addr3: [''],
      do_date: [''],
      do_time: [''],
      do_attn: [''],
      do_tel: [''],

      do_from_id: [0],
      do_from_code: [''],
      do_from_name: [''],
      do_from_addr1: [''],
      do_from_addr2: [''],
      do_from_addr3: [''],
      do_from_addr4: [''],

      do_to_id: [0],
      do_to_code: [''],
      do_to_name: [''],
      do_to_addr1: [''],
      do_to_addr2: [''],
      do_to_addr3: [''],
      do_to_addr4: [''],

      do_uom1_id: [0],
      do_uom1_name: [''],
      do_desc1: [''],
      do_tot_piece1: [0],
      do_wt1: [0],
      do_cbm_cft1: [0],

      do_uom2_id: [0],
      do_uom2_name: [''],
      do_desc2: [''],
      do_tot_piece2: [0],
      do_wt2: [0],
      do_cbm_cft2: [0],

      do_uom3_id: [0],
      do_uom3_name: [''],
      do_desc3: [''],
      do_tot_piece3: [0],
      do_wt3: [0],
      do_cbm_cft3: [0],

      do_uom4_id: [0],
      do_uom4_name: [''],
      do_desc4: [''],
      do_tot_piece4: [0],
      do_wt4: [0],
      do_cbm_cft4: [0],

      do_remark_1: [''],
      do_remark_2: [''],
      do_remark_3: [''],
      do_remark_4: [''],
      do_danger_goods: [''],
      do_terms_ship: [''],
      do_vessel: [''],
      do_voyage: [''],

      do_freight: [''],
      do_is_exw: ['N'],
      do_is_fob: ['N'],
      do_is_fca: ['N'],
      do_is_cpu: ['N'],
      do_is_ddu: ['N'],
      do_is_frt_others: ['N'],
      do_freight_remark: [''],

      do_export_doc: [''],
      do_is_comm_inv: ['N'],
      do_is_lc: ['N'],
      do_is_coo: ['N'],
      do_is_pl: ['N'],
      do_is_expdec: ['N'],
      do_is_exp_others: ['N'],
      do_export_doc_remark: [''],

      do_category: [''],
      do_is_delivery_sent: ['N'],
      do_delivery_date: [''],
      rec_version: [0],

    })
  }

  ngOnInit() {
    this.id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"] || 0;
      this.parent_type = rec["parent_type"] || '';
    });
    if (this.mode == "add")
      this.newRecord();
    else
      this.getRecord();
    // this.getDetails();
  }

  newRecord() {
    this.id = 0;
    this.mform.patchValue({
      do_id: this.id,
      do_parent_id: this.parent_id
    })
    this.getDefaultData();
  }

  getDefaultData() {
    const param = { 'id': this.parent_id };
    this.ms.getRecord(param, '/api/CommonShipment/delvorder/GetDefaultDataAsync').subscribe({
      next: (rec: iDelvOrder) => {
        this.mform.patchValue({
          do_id:rec.do_id,
          do_parent_id: rec.do_parent_id,
          do_pickup: rec.do_pickup,
          do_addr1: rec.do_addr1,
          do_addr2: rec.do_addr2,
          do_addr3: rec.do_addr3,
          do_tel: rec.do_tel,
          do_vessel: rec.do_vessel,
          do_voyage: rec.do_voyage,

          rec_branch_id: rec.rec_branch_id,
          rec_company_id: rec.rec_company_id,
          rec_version: rec.rec_version,

        });
        console.log(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }

  getRecord() {
    const param = { id: this.id };
    this.ms.getRecord(param, '/api/CommonShipment/delvorder/GetRecordAsync').subscribe({
      next: (rec: iDelvOrder) => {
        this.mform.patchValue({
          do_id: rec.do_id,
          do_cfno: rec.do_cfno,
          do_parent_id: rec.do_parent_id,
          do_truck_id: rec.do_truck_id,
          do_truck_code: rec.do_truck_code,
          do_truck_name: rec.do_truck_name,
          do_truck_attn: rec.do_truck_attn,
          do_truck_tel: rec.do_truck_tel,
          do_truck_fax: rec.do_truck_fax,
          do_truck_cc: rec.do_truck_cc,
          do_pickup: rec.do_pickup,
          do_addr1: rec.do_addr1,
          do_addr2: rec.do_addr2,
          do_addr3: rec.do_addr3,
          do_date: rec.do_date,
          do_time: rec.do_time,
          do_attn: rec.do_attn,
          do_tel: rec.do_tel,

          do_from_id: rec.do_from_id,
          do_from_code: rec.do_from_code,
          do_from_name: rec.do_from_name,
          do_from_addr1: rec.do_from_addr1,
          do_from_addr2: rec.do_from_addr2,
          do_from_addr3: rec.do_from_addr3,
          do_from_addr4: rec.do_from_addr4,

          do_to_id: rec.do_to_id,
          do_to_code: rec.do_to_code,
          do_to_name: rec.do_to_name,
          do_to_addr1: rec.do_to_addr1,
          do_to_addr2: rec.do_to_addr2,
          do_to_addr3: rec.do_to_addr3,
          do_to_addr4: rec.do_to_addr4,

          do_uom1_id: rec.do_uom1_id,
          do_uom1_name: rec.do_uom1_name,
          do_desc1: rec.do_desc1,
          do_tot_piece1: rec.do_tot_piece1,
          do_wt1: rec.do_wt1,
          do_cbm_cft1: rec.do_cbm_cft1,

          do_uom2_id: rec.do_uom2_id,
          do_uom2_name: rec.do_uom2_name,
          do_desc2: rec.do_desc2,
          do_tot_piece2: rec.do_tot_piece2,
          do_wt2: rec.do_wt2,
          do_cbm_cft2: rec.do_cbm_cft2,

          do_uom3_id: rec.do_uom3_id,
          do_uom3_name: rec.do_uom3_name,
          do_desc3: rec.do_desc3,
          do_tot_piece3: rec.do_tot_piece3,
          do_wt3: rec.do_wt3,
          do_cbm_cft3: rec.do_cbm_cft3,

          do_uom4_id: rec.do_uom4_id,
          do_uom4_name: rec.do_uom4_name,
          do_desc4: rec.do_desc4,
          do_tot_piece4: rec.do_tot_piece4,
          do_wt4: rec.do_wt4,
          do_cbm_cft4: rec.do_cbm_cft4,

          do_remark_1: rec.do_remark_1,
          do_remark_2: rec.do_remark_2,
          do_remark_3: rec.do_remark_3,
          do_remark_4: rec.do_remark_4,
          do_danger_goods: rec.do_danger_goods,
          do_terms_ship: rec.do_terms_ship,
          do_vessel: rec.do_vessel,
          do_voyage: rec.do_voyage,

          do_freight: rec.do_freight,
          do_is_exw: rec.do_is_exw,
          do_is_fob: rec.do_is_fob,
          do_is_fca: rec.do_is_fca,
          do_is_cpu: rec.do_is_cpu,
          do_is_ddu: rec.do_is_ddu,
          do_is_frt_others: rec.do_is_frt_others,
          do_freight_remark: rec.do_freight_remark,

          do_export_doc: rec.do_export_doc,
          do_is_comm_inv: rec.do_is_comm_inv,
          do_is_lc: rec.do_is_lc,
          do_is_coo: rec.do_is_coo,
          do_is_pl: rec.do_is_pl,
          do_is_expdec: rec.do_is_expdec,
          do_is_exp_others: rec.do_is_exp_others,
          do_export_doc_remark: rec.do_export_doc_remark,

          do_order_no: rec.do_order_no,
          do_order_date: rec.do_order_date,
          do_category: rec.do_category,
          do_is_delivery_sent: rec.do_is_delivery_sent,
          do_delivery_date: rec.do_delivery_date,

          rec_version: rec.rec_version,

        });
        console.log(rec);
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
    const data = <iDelvOrder>this.mform.value;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_branch_id = this.gs.user.user_branch_id;
    data.rec_created_by = this.gs.user.user_code;

    let _mode = this.mode;

    const param = {
      'id': data.do_id,
      'mode': this.mode
    }
    this.ms.save(param, data, '/api/CommonShipment/delvorder/SaveAsync').subscribe({
      next: (v: iDelvOrder) => {
        if (this.mode == "add") {
          this.id = v.do_id;
          this.mode = "edit";
          this.mform.patchValue({ do_id: this.id });
          const param = {
            id: this.id.toString(),
            mode: this.mode
          };
          this.gs.updateURL(param);
        };
        this.mform.patchValue({
          rec_version: v.rec_version,
        });
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
    console.log(action);
    let rec: any = {};
    if (action?.rec != null) {
      rec = action.rec;
    }

    if (action.id === 'do_truck_code') {
      console.log(action);
      const telFax = this.gs.getTelFax(rec).split(',');
      
      const tel = telFax.length > 0 ? telFax[0].trim() : '';
      const fax = telFax.length > 1 ? telFax[1].trim() : '';

      this.mform.patchValue({
        do_truck_id: rec.cust_id || 0,
        do_truck_code: rec.cust_code || '',
        do_truck_name: rec.cust_name || '',
        do_truck_attn: this.gs.getAttention(rec),
        do_truck_tel: tel,
        do_truck_fax: fax,
      });
    }

    if (action.id === 'do_from_code') {
      console.log(action);
      this.mform.patchValue({
        do_from_id: rec.cust_id || 0,
        do_from_code: rec.cust_code || '',
        do_from_name: rec.cust_name || '',
        do_from_addr1: rec.cust_address1 || '',
        do_from_addr2: rec.cust_address2 || '',
        do_from_addr3: this.gs.getTelFax(rec),
        do_from_addr4: this.gs.getAttention(rec),
      });
    }

    if (action.id === 'do_to_code') {
      console.log(action);
      this.mform.patchValue({
        do_to_id: rec.cust_id || 0,
        do_to_code: rec.cust_code || '',
        do_to_name: rec.cust_name || '',
        do_to_addr1: rec.cust_address1 || '',
        do_to_addr2: rec.cust_address2 || '',
        do_to_addr3: this.gs.getTelFax(rec),
        do_to_addr4: this.gs.getAttention(rec),
      });
    }

    if (action.id === 'do_uom1_name') {
      console.log(action);
      this.mform.patchValue({
        do_uom1_id: rec.param_id || 0,
        do_uom1_name: rec.param_name || '',
      });
    }

    if (action.id === 'do_uom2_name') {
      console.log(action);
      this.mform.patchValue({
        do_uom2_id: rec.param_id || 0,
        do_uom2_name: rec.param_name || '',
      });
    }

    if (action.id === 'do_uom3_name') {
      console.log(action);
      this.mform.patchValue({
        do_uom3_id: rec.param_id || 0,
        do_uom3_name: rec.param_name || '',
      });
    }

    if (action.id === 'do_uom4_name') {
      console.log(action);
      this.mform.patchValue({
        do_uom4_id: rec.param_id || 0,
        do_uom4_name: rec.param_name || '',
      });
    }
  }


  openHistory(): void {
    const dialogRef = this.dialog.open(HistoryComponent, {
      hasBackdrop: false,
      width: '250px',
      data: { title: 'History', message: 'Edit Details' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onBlur(action: any) {
    console.log('onBlur Action', action);
  }

}

