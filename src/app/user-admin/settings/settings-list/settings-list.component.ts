import { Component } from '@angular/core';
import { SettingsEditComponent } from '../settings-edit/settings-edit.component';
import { SettingsSearchComponent } from '../settings-search/settings-search.component';
import { CustomControls } from '../../../app.config';
import { baseComponent } from '../../../shared/baseComponent';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css'],
  standalone: true,
  imports: [...CustomControls, SettingsSearchComponent, SettingsEditComponent]
})
export class SettingsListComponent extends baseComponent {
  format = 'READ';

  selected_row_id = 0;

  constructor(public ms: SettingsService) {
    super(ms);
  }

  deleteRecord(data: any) {
    if (!confirm(`Delete ${data.rec.grp_name} y/n`))
      return;
    this.ms.delete(data.rec.acc_id)
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "caption", col_caption: "CAPTION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "table", col_caption: "TABLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "value", col_caption: "VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];
  }



  save() {
    this.ms.ReUpdate(this.type, this.gs.user.user_company_id, this.gs.user.user_branch_id, this.gs.user.user_code).subscribe({
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
    //this.store.dispatch(allActions.update_format({ category: this.type }));
  }

  selectRow(rec: any) {
    this.selected_row_id = rec.id;
    //this.store.dispatch(allActions.update_selected_rowid({ id: rec.id, category: this.type }));
  }

}



