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

    })

  }

  ngOnInit(): void {
    this.mform.setValue({

    })
  }
 
  search(_action: string) {
    if (this.output) {

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
