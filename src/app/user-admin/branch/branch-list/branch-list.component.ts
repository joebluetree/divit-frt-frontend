import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { BranchSearchComponent } from '../branch-search/branch-search.component';
import { baseComponent } from '../../../shared/baseComponent';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css'],
  standalone: true,
  imports: [...CustomControls, BranchSearchComponent]
})
export class BranchListComponent extends baseComponent {

  constructor(public ms: BranchService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/admin/branchEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "branch_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "branch_code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "branch_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "branch_address1", col_caption: "ADDRESS1", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "branch_address2", col_caption: "ADDRESS2", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "branch_address3", col_caption: "ADDRESS3", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }

  deleteRecord(data: any) {
    if (!confirm(`Delete ${data.rec.branch_name} y/n`))
      return;
    this.ms.delete(data.rec.acc_id)
  }

}
