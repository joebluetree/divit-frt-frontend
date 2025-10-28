import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iParam_Search } from '../../models/iparam';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { GlobalService } from '../../../core/services/global.service';
import { ParamService } from '../../services/param.service';


@Component({
  selector: 'app-param-search',
  templateUrl: './param-search.component.html',
  styleUrls: ['./param-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class ParamSearchComponent {

  mform: FormGroup;
  record!: iParam_Search;
  appid: string = '';
  // menu_id: string = '';

  @Input() showModel: boolean = false;

  @Input() print: boolean = false;

  @Input('search_url') search_url = '';

  @Input('input') set input(v: iParam_Search) {
    this.record = { ...v };
  }
  @Output('searchResult') output = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public gs: GlobalService,
  ) {
    this.buildForm();
  }


  buildForm() {
    this.mform = this.fb.group({
      param_name: [''],
    })
  }

  ngOnInit(): void {
    this.appid = this.gs.app_id
    // this.menu_id = this.menu_id
    this.mform.setValue({
      param_name: this.record.param_name,
    })
  }


  search(_action: string) {
    if (this.output) {
      this.record.param_name = this.mform.value.param_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.record.rec_branch_id = this.gs.user.user_branch_id;
      this.output.emit({ action: _action, record: this.record, url: this.search_url });  //action: _action 
    }
  }

}
