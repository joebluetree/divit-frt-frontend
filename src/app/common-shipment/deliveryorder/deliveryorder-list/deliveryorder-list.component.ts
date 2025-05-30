import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { DeliveryOrderSearchComponent } from '../deliveryorder-search/deliveryorder-search.component';
import { DeliveryOrderService } from '../../services/deliveryorder.service';

@Component({
  selector: 'app-deliveryorder-list',
  templateUrl: './deliveryorder-list.component.html',
  styleUrls: ['./deliveryorder-list.component.css'],
  standalone: true,
  imports: [...CustomControls, DeliveryOrderSearchComponent],
})

//Name : Sourav V
//Created Date : 19/04/2025
//Remark : this component display relevant details of each delivery order records
//version : v1 - 19-04-2025

export class DeliveryOrderListComponent extends baseListComponent {
  parent_type: string = '';
  constructor(public ms: DeliveryOrderService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();
    this.route.queryParams.forEach((rec: any) => {
      this.parent_type = rec["parent_type"];
    });
    

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid,parent_type: 'GENERAL'};

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/common-shipment/deliveryorderEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "do_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "do_order_no", col_caption: "REF-NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "do_order_date", col_caption: "REF-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "do_truck_name", col_caption: "TRUCKER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "do_from_name", col_caption: "FROM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "do_to_name", col_caption: "TO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
