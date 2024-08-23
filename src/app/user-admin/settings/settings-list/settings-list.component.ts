import { Component } from '@angular/core';
import { SettingsEditComponent } from '../settings-edit/settings-edit.component';
import { SettingsSearchComponent } from '../settings-search/settings-search.component';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css'],
  standalone: true,
  imports: [...CustomControls, SettingsSearchComponent, SettingsEditComponent]
})
export class SettingsListComponent extends baseListComponent {
  format = 'READ';

  selected_row_id = 0;

  constructor(public ms: SettingsService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    this.title = this.getTitle() || this.title;



    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "caption", col_caption: "CAPTION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      // { col_name: "table", col_caption: "TABLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "value", col_caption: "VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];
  }

  save() {

    const params = {
      'category': this.type,
      'company_id': this.gs.user.user_company_id,
      'branch_id': this.gs.user.user_branch_id,
      'param_id': this.getParamId(),
      'user_code': this.gs.user.user_code
    }

    this.ms.ReUpdate(params, '/api/settings/ReUpdateAsync').subscribe({
      next: (v) => {
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error || e.message]);
      },
      complete: () => { }
    });

  }

  changeFormat() {
    this.format = this.format == 'READ' ? 'WRITE' : 'READ';
  }

  selectRow(rec: any) {
    this.selected_row_id = rec.id;
  }

  override search(_record: any) {
    if (this.type == 'COMPANY-SETTINGS')
      _record.record = { ..._record.record, 'branch_id': this.gs.user.user_branch_id, 'param_id': 0 };
    else if (this.type == 'BRANCH-SETTINGS')
      _record.record = { ..._record.record, 'branch_id': this.gs.user.user_branch_id, 'param_id': 0 };
    else
      _record.record = { ..._record.record, 'branch_id': this.gs.user.user_branch_id, 'param_id': this.getParamId(), title: this.getTitle() };
    super.search(_record);
  }

  getParamId() {
    let param_id = 0;
    if (this.type != 'COMPANY-SETTINGS' && this.type != 'BRANCH-SETTINGS')
      param_id = this.url_param.param_id;
    return param_id;
  }

  getTitle() {
    let _title = "";
    if (this.type != 'COMPANY-SETTINGS' && this.type != 'BRANCH-SETTINGS')
      _title = this.url_param.title;
    return _title;
  }

}



