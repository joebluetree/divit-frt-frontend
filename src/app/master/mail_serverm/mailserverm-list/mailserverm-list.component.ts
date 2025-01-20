import { Component } from '@angular/core';
import { MailServermSearchComponent } from '../mailserverm-search/mailserverm-search.component';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { MailServermService } from '../../services/mailserverm.service';

@Component({
  selector: 'app-mailserverm-list',
  templateUrl: './mailserverm-list.component.html',
  styleUrls: ['./mailserverm-list.component.css'],
  standalone: true,
  imports: [...CustomControls, MailServermSearchComponent]
})
export class MailServermListComponent extends baseListComponent {
  constructor(
    public ms: MailServermService,

  ) {
    super(ms);
  }


  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/mailserver/customerEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "mail_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mail_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mail_smtp_name", col_caption: "SMTP-SERVER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


  }




