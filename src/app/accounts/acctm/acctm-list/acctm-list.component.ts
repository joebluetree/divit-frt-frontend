import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { AcctmService } from '../../services/acctm.service';
import { AcctmSearchComponent } from '../acctm-search/acctm-search.component';
import { baseComponent } from '../../../shared/baseComponent';

@Component({
  selector: 'app-acctm-list',
  templateUrl: './acctm-list.component.html',
  styleUrls: ['./acctm-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AcctmSearchComponent],
})
export class AcctmListComponent extends baseComponent {

  constructor(public ms: AcctmService) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/accounts/acctmEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "acc_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "acc_code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "acc_short_name", col_caption: "SHORT-NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "acc_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "acc_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "acc_grp_name", col_caption: "GROUP", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "acc_maincode", col_caption: "MAIN CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.type == 'ACC-CODE' },
      { col_name: "acc_maincode_name", col_caption: "MAIN CODE DESC", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.type == 'ACC-CODE' },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }

  deleteRecord(data: any) {
    if (!confirm(`Delete ${data.rec.acc_name} y/n`))
      return;
    this.ms.delete(data.rec.acc_id)
  }
}
