import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iITShipment_Search } from '../../models/iitshipment';

@Component({
  selector: 'app-itshipment-search',
  templateUrl: './itshipment-search.component.html',
  styleUrls: ['./itshipment-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 09/02/2026
//Remark : this component manages searching of IT Shipment Report records

export class ITShipmentSearchComponent {

  mform: FormGroup;
  record!: iITShipment_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iITShipment_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService) {
    this.buildForm();
  }

  groupList = [
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
    { key: 'SEA EXPORT', value: 'SEA EXPORT' },
    { key: 'SEA IMPORT', value: 'SEA IMPORT' },
    { key: 'OTHERS', value: 'OTHERS' },
  ]

  buildForm() {
    this.mform = this.fb.group({
      hbl_from_date: [''],
      hbl_to_date: [''],
      hbl_mode: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      hbl_from_date: this.record.hbl_from_date,
      hbl_to_date: this.record.hbl_to_date,
      hbl_mode: this.record.hbl_mode,
    })
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.hbl_from_date = this.mform.value.hbl_from_date;
      this.record.hbl_to_date = this.mform.value.hbl_to_date;
      this.record.hbl_mode = this.mform.value.hbl_mode;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url, IsDetail: this.IsDetail});
    }
  }
}