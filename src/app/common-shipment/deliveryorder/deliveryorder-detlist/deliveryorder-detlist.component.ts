import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../../../shared/history/history.component';
import { MessengerSlipService } from '../../services/slip.service';
import { DeliveryOrderService } from '../../services/deliveryorder.service';
import { iDeliveryOrder } from '../../models/ideliveryorder';

@Component({
  selector: 'app-deliveryorder-detlist',
  templateUrl: './deliveryorder-detlist.component.html',
  styleUrls: ['./deliveryorder-detlist.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 12/05/2025
//Remark : this component manages creation,editing and saving of delivery order (parent table) records
//version : 1.0


export class DeliveryOrderDetListComponent extends baseEditComponent {
  parent_refno: string = '';
  parent_id: number = 0;
  mbl_mode: string = '';
  parent_type: string = '';

  constructor(
    private ms: DeliveryOrderService,
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

      do_category: [''],
      do_is_delivery_sent: ['N'],
      do_delivery_date: [''],

      deliveryorder_cntr: this.fb.array([]),
      do_detail: this.fb.array([]),

      rec_version: [0],
    })
  }


  ngOnInit() {
    this.id = 0;
    this.parent_id = 0;
    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_id = +rec["parent_id"];
      this.parent_refno = rec["parent_refno"];
      this.parent_type = rec["parent_type"];
    });
    this.getDetails();
  }


  getDetails() {
    const param = { 'id': this.parent_id, 'parent_type': this.parent_type };
    this.ms.getRecord(param, '/api/CommonShipment/deliveryorder/GetDetailsAsync').subscribe({
      next: (rec: iDeliveryOrder[]) => {
        this.fillDetails(rec);
      },
      error: (e) => {
        this.gs.showError(e);
      }
    })
  }


  addRow(rec: iDeliveryOrder) {
    return this.fb.group({
      do_id: [rec.do_id || 0],
      do_cfno: [rec.do_cfno || 0],
      do_order_no: [rec.do_order_no || ''],
      do_order_date: [rec.do_order_date || ''],
      do_parent_id: [rec.do_parent_id || 0],
      do_truck_id: [rec.do_truck_id || 0],
      do_truck_code: [rec.do_truck_code || ''],
      do_truck_name: [rec.do_truck_name || ''],
      do_truck_attn: [rec.do_truck_attn || ''],
      do_truck_tel: [rec.do_truck_tel || ''],
      do_truck_fax: [rec.do_truck_fax || ''],
      do_truck_cc: [rec.do_truck_cc || ''],
      do_pickup: [rec.do_pickup || ''],
      do_addr1: [rec.do_addr1 || ''],
      do_addr2: [rec.do_addr2 || ''],
      do_addr3: [rec.do_addr3 || ''],
      do_date: [rec.do_date || ''],
      do_time: [rec.do_time || ''],
      do_attn: [rec.do_attn || ''],
      do_tel: [rec.do_tel || ''],

      do_from_id: [rec.do_from_id || 0],
      do_from_code: [rec.do_from_code || ''],
      do_from_name: [rec.do_from_name || ''],
      do_from_addr1: [rec.do_from_addr1 || ''],
      do_from_addr2: [rec.do_from_addr2 || ''],
      do_from_addr3: [rec.do_from_addr3 || ''],
      do_from_addr4: [rec.do_from_addr4 || ''],

      do_to_id: [rec.do_to_id || 0],
      do_to_code: [rec.do_to_code || ''],
      do_to_name: [rec.do_to_name || ''],
      do_to_addr1: [rec.do_to_addr1 || ''],
      do_to_addr2: [rec.do_to_addr2 || ''],
      do_to_addr3: [rec.do_to_addr3 || ''],
      do_to_addr4: [rec.do_to_addr4 || ''],

      do_category: [rec.do_category || ''],
      do_is_delivery_sent: [rec.do_is_delivery_sent || 'N'],
      do_delivery_date: [rec.do_delivery_date || ''],
      rec_created_by: [rec.rec_created_by || ""],
      rec_created_date: [rec.rec_created_date || ""],
      rec_edited_by: [rec.rec_edited_by || ""],
      rec_edited_date: [rec.rec_edited_date || ""],

      deliveryorder_cntr: this.fb.array([]), // will be populated separately

    });
  }


  addDetails(iRow: iDeliveryOrder = <iDeliveryOrder>{}) {
    this.formArray('do_detail')?.push(this.addRow(iRow));
  }

  fillDetails(iDetail: iDeliveryOrder[] = []): void {
    const follow = this.formArray('do_detail');
    follow.clear();
    iDetail.forEach((rec_dodetail: iDeliveryOrder) => {
      this.addDetails(rec_dodetail);
    });
  }

  deleteRow(idx: number, house: string, hbl_id: number) {
    if (!hbl_id) {
      alert("Invalid Record ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete DO to ${house}?`)) {
      const param = { id: hbl_id, url: '/api/CommonShipment/deliveryorder/DeleteAsync' };

      this.ms.deleteRecord(param)?.subscribe({
        next: (response: any) => {
          if (response.status) {
            this.formArray('do_detail').removeAt(idx);
          }
        },
        error: (e) => {
          this.gs.showError(e);
        }
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

