import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { iShipmentLog_Search } from '../../models/ishipmentlog';
import { ShipmentLogService } from '../../services/shipmentlog.service';

@Component({
  selector: 'app-shipmentlog-search',
  templateUrl: './shipmentlog-search.component.html',
  styleUrls: ['./shipmentlog-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})

//Name : Sourav V
//Created Date : 19/03/2026
//Remark : this component manages searching of Shipment Log Report records

export class ShipmentLogSearchComponent {

  mform: FormGroup;
  record!: iShipmentLog_Search;

  @Input() print: boolean = false;
  @Input() IsDetail: boolean = false;
  @Input('search_url') search_url = '';

  @Input('input') set input(v: iShipmentLog_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    public gs: GlobalService,
    public ms: ShipmentLogService) {
    this.buildForm();
  }

  groupList = [
    { key: 'AIR EXPORT', value: 'AIR EXPORT' },
    { key: 'AIR IMPORT', value: 'AIR IMPORT' },
    { key: 'SEA EXPORT', value: 'SEA EXPORT' },
    { key: 'SEA IMPORT', value: 'SEA IMPORT' },
    { key: 'OTHERS', value: 'OTHERS' },
  ]

  sortList = [
    { key: 'REFNO', value: 'REFNO' },
    { key: 'MASTER', value: 'MASTER' },
    { key: 'HOUSE', value: 'HOUSE' },
    { key: 'SHIPMENT-STAGE', value: 'SHIPMENT-STAGE' },
    { key: 'CARRIER', value: 'CARRIER' },
    { key: 'CONSIGNEE', value: 'CONSIGNEE' },
    { key: 'ETA', value: 'ETA' },
    { key: 'CLIENT-PAID', value: 'CLIENT-PAID' },
    { key: 'FINAL-DESTINATION', value: 'FINAL-DESTINATION' },
    { key: 'A/N RECEIVED', value: 'A/N RECEIVED' },
    { key: 'A/N SENT', value: 'A/N SENT' }
  ];

   FormatList = [
    { key: 'F1', value: 'FORMAT 1' },
    { key: 'F2', value: 'FORMAT 2' },
    { key: 'F3', value: 'FORMAT 3' },
  ];

  HandleList = [
    { key: 'Handled By', value: 'Handled By' },
    { key: 'Sales. Rep', value: 'Sales. Rep' },
  ];
  
  DateTypeList = [
    { key: 'REF. DATE', value: 'REF. DATE' },
    { key: 'ETD', value: 'ETD' },
    { key: 'ETA', value: 'ETA' },
    { key: 'A/N Received', value: 'A/N Received' },
    { key: 'A/N Sent', value: 'A/N Sent' },
  ];

  deliveryTerms = [
    { key: 'ALL', value: 'ALL' },
    { key: 'NA', value: 'NA' },
    { key: 'CUSTOMS ONLY', value: 'CUSTOMS ONLY' },
    { key: 'DAP', value: 'DAP' },
    { key: 'DDP', value: 'DDP' },
    { key: 'DDU', value: 'DDU' }
  ];

  private modeMap: any = {
    'AIR EXPORT': 'SHIPSTAGE-AE',
    'AIR IMPORT': 'SHIPSTAGE-AI',
    'SEA EXPORT': 'SHIPSTAGE-OE',
    'SEA IMPORT': 'SHIPSTAGE-OI'
  };

  stageList: any[] = [];
  selectedStages: string[] = [];

  buildForm() {
    this.mform = this.fb.group({
      mbl_date_type: [''],
      mbl_from_date: [''],
      mbl_to_date: [''],
      mbl_mode: [''],
      mbl_is_master: [''],
      mbl_is_house: [''],
      mbl_stages: [''],
      mbl_shipper_name: [''],
      mbl_consignee_name: [''],
      mbl_agent_name: [''],
      mbl_handled_name: [''],
      mbl_user_role: [''],
      rec_created_name: [''],
      mbl_incoterm: [''],
      mbl_sort_order: [''],
      mbl_list_format: [''],
      mbl_eta_within: [0],
      mbl_pending_ams: [''],
    })

  }
  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    const defaultMbl_Mode = this.record?.mbl_mode || 'AIR EXPORT';
    this.mform.setValue({
      mbl_date_type: this.record.mbl_date_type || 'REF. DATE',
      mbl_from_date: this.record.mbl_from_date,
      mbl_to_date: this.record.mbl_to_date,
      mbl_mode: defaultMbl_Mode,
      mbl_is_master: this.record.mbl_is_master || 'Y',
      mbl_is_house: this.record.mbl_is_house,
      mbl_stages: this.record.mbl_stages,
      mbl_shipper_name: this.record.mbl_shipper_name,
      mbl_consignee_name: this.record.mbl_consignee_name,
      mbl_agent_name: this.record.mbl_agent_name,
      mbl_handled_name: this.record.mbl_handled_name,
      mbl_user_role: this.record.mbl_user_role || 'Handled By',
      rec_created_name: this.record.rec_created_name,
      mbl_incoterm: this.record.mbl_incoterm || 'ALL',
      mbl_sort_order: this.record.mbl_sort_order || 'REFNO',
      mbl_list_format: this.record.mbl_list_format || 'F1',
      mbl_eta_within: this.record.mbl_eta_within,
      mbl_pending_ams: this.record.mbl_pending_ams,
    });
    if (this.record.mbl_stages) {
      this.loadStages(this.modeMap[defaultMbl_Mode], true);
    } else {
      this.loadStages(this.modeMap[defaultMbl_Mode], false);
    }
    this.mform.get('mbl_mode')?.valueChanges.subscribe(mode => {
      this.onModeChange(mode);
    });
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.mbl_date_type = this.mform.value.mbl_date_type;
      this.record.mbl_from_date = this.mform.value.mbl_from_date;
      this.record.mbl_to_date = this.mform.value.mbl_to_date;
      this.record.mbl_mode = this.mform.value.mbl_mode;
      this.record.mbl_stages = this.mform.value.mbl_stages;
      this.record.mbl_is_master = this.mform.value.mbl_is_master;
      this.record.mbl_is_house = this.mform.value.mbl_is_house;
      this.record.mbl_shipper_name = this.mform.value.mbl_shipper_name;
      this.record.mbl_consignee_name = this.mform.value.mbl_consignee_name;
      this.record.mbl_agent_name = this.mform.value.mbl_agent_name;
      this.record.mbl_handled_name = this.mform.value.mbl_handled_name;
      this.record.mbl_user_role = this.mform.value.mbl_user_role;
      this.record.rec_created_name = this.mform.value.rec_created_name;
      this.record.mbl_incoterm = this.mform.value.mbl_incoterm;
      this.record.mbl_sort_order = this.mform.value.mbl_sort_order;
      this.record.mbl_list_format = this.mform.value.mbl_list_format;
      this.record.mbl_eta_within = this.mform.value.mbl_eta_within;
      this.record.mbl_pending_ams = this.mform.value.mbl_pending_ams;

      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url });
    }
  }

  callBack(action: any) {
    if (action.id == 'mbl_shipper_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_shipper_id: null,
          mbl_shipper_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_shipper_id: action.rec.cust_id,
          mbl_shipper_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_consignee_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_consignee_id: null,
          mbl_consignee_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_consignee_id: action.rec.cust_id,
          mbl_consignee_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_agent_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_agent_id: null,
          mbl_agent_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_agent_id: action.rec.cust_id,
          mbl_agent_name: action.rec.cust_name,
        });
      }
    }
    if (action.id == 'mbl_handled_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          mbl_handled_id: null,
          mbl_handled_name: '',
        });
      } else {
        this.mform.patchValue({
          mbl_handled_id: action.rec.param_id,
          mbl_handled_name: action.rec.param_name,
        });
      }
    }
    if (action.id == 'rec_created_name') {
      if (action.rec == null) {
        this.mform.patchValue({
          rec_created_id: null,
          rec_created_name: '',
        });
      } else {
        this.mform.patchValue({
          rec_created_id: action.rec.user_id,
          rec_created_name: action.rec.user_name,
        });
      }
    }
  }
  onModeChange(mode: string) {

    const subtable = this.modeMap[mode];

    if (subtable) {
      this.loadStages(subtable);
    }

    this.selectedStages = [];
    this.mform.get('mbl_stages')?.setValue('');
    // let temp_mode = mode;
  }

  loadStages(subtable: string, restore: boolean = false) {

    const param = { table: 'param', subtable: subtable, company_id: this.getCompanyId() };

    this.ms.postData(param, '/api/search/GetListAsync').subscribe(res => {
      this.stageList = res.records || [];
      if (restore) {
        this.selectedStages = this.record.mbl_stages.split(',');
        this.mform.get('mbl_stages')?.setValue(this.record.mbl_stages);
      }
    });
  }

  onStageChange(checked: boolean, code: string) {
    if (!this.selectedStages.includes(code)) {
      this.selectedStages.push(code);
    }
    else {
      this.selectedStages = this.selectedStages.filter(x => x !== code);
    }

    this.mform.get('mbl_stages')?.setValue(this.selectedStages.join(','));
  }

  selectAll() {
    this.selectedStages = this.stageList.map(x => x.param_code);
    this.mform.get('mbl_stages')?.setValue(this.selectedStages.join(','));
  }

  clearAll() {
    this.selectedStages = [];
    this.mform.get('mbl_stages')?.setValue('');
  }
}