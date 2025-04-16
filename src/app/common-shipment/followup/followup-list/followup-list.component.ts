import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { FollowUpSearchComponent } from '../followup-search/followup-search.component';
import { FollowUpService } from '../../services/followup.service';



@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',
  styleUrls: ['./followup-list.component.css'],
  standalone: true,
  imports: [...CustomControls, FollowUpSearchComponent]
})

//Name : Alen Cherian
//Date : 09/04/2025
//Command : Create the Follow Up to list.

export class FollowUpListComponent extends baseListComponent {

  constructor(
    public ms: FollowUpService,

  ) {
    super(ms);
  }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/followup/followupEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "cf_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "cf_mbl_id", col_caption: "MASTER ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "cf_mbl_refno", col_caption: "REF#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cf_assigned_name", col_caption: "ASSIGNED", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cf_followup_date", col_caption: "FOLLOWUP-DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "cf_remarks", col_caption: "Notes", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }
}
