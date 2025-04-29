import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iDeliveryOrder_Search } from '../../models/ideliveryorder';

@Component({
  selector: 'app-deliveryorder-search',
  templateUrl: './deliveryorder-search.component.html',
  styleUrls: ['./deliveryorder-search.component.css'],
  standalone: true, 
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 19/04/2025
//Remark : this component manages searching of Delivery Order records

export class DeliveryOrderSearchComponent {

  mform: FormGroup;
  record!: iDeliveryOrder_Search;

  @Input('search_url') search_url = '';
  @Input('parent_type') parent_type = '';

  @Input('input') set input(v: iDeliveryOrder_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      do_from_date: [''],
      do_to_date: [''],
      do_order_no: [''],    
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      do_from_date: this.record.do_from_date,
      do_to_date: this.record.do_to_date,
      do_order_no: this.record.do_order_no,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.do_from_date = this.mform.value.do_from_date;
      this.record.do_to_date = this.mform.value.do_to_date;
      this.record.do_order_no = this.mform.value.do_order_no;

      this.record.parent_type = this.parent_type;
      // this.record.parent_id = this.parent_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
