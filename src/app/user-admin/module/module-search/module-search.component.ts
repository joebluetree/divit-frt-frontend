import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControls } from '../../../app.config';
import { iModule_Search } from '../../models/imodulem';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-module-search',
  templateUrl: './module-search.component.html',
  styleUrls: ['./module-search.component.css'],
  standalone: true,
  imports: [...CustomControls, ModuleSearchComponent]
})
export class ModuleSearchComponent {

  mform: FormGroup;
  record!: iModule_Search;

  @Input('input') set input(v: iModule_Search) {
    this.record = { ...v };
  }

  @Input('search_url') search_url = '';
  @Output('searchResult') output = new EventEmitter<any>();



  dataList = [{ key: 'NA', value: 'ALL' }, { key: 'Y', value: 'YES' }, { key: 'N', value: 'NO' }]

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      module_name: [''],
      module_is_installed: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      module_name: this.record.module_name,
      module_is_installed: this.record.module_is_installed,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.module_name = this.mform.value.module_name;
      this.record.module_is_installed = this.mform.value.module_is_installed;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit({ record: this.record, url: this.search_url });
    }
  }

}
