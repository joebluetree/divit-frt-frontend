import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iModulem } from '../../models/imodulem';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iMenu_Search } from '../../models/imenum';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class MenuSearchComponent {

  mform: FormGroup;
  record!: iMenu_Search;

  @Input('input') set input(v: iMenu_Search) {
    this.record = { ...v };
  }

  @Output('searchResult') output = new EventEmitter<iMenu_Search>();

  dataList = [{ key: 'NA', value: 'ALL' }, { key: 'Y', value: 'YES' }, { key: 'N', value: 'NO' }]

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      menu_name: [''],
      module_id: [0],
      module_name: [''],
      menu_visible: [''],
    })
  }

  public get url() {
    return this.gs.url;
  }

  ngOnInit(): void {
    this.mform.setValue({
      menu_name: this.record.menu_name,
      module_id: this.record.module_id,
      module_name: this.record.module_name,
      menu_visible: this.record.menu_visible,
    })
  }


  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.menu_name = this.mform.value.menu_name;
      this.record.module_id = this.mform.value.module_id;
      this.record.module_name = this.mform.value.module_name;
      this.record.menu_visible = this.mform.value.menu_visible;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

  callBack(action: { id: string, rec: iModulem }) {
    if (action.id == 'module_name') {
      if (action.rec) {
        this.mform.patchValue({
          module_id: action.rec ? action.rec.module_id : 0,
          module_name: action.rec ? action.rec.module_name : '',
        })
      }
      else {
        this.mform.patchValue({
          module_id: 0,
          module_name: '',
        })
      }
    }
  }

}
