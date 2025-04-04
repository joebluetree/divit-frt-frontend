import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { AirImportSearchComponent } from '../airimport-search/airimport-search.component';
import { AirImportService } from '../../services/airimport.service';

@Component({
  selector: 'app-airimport-list',
  templateUrl: './airimport-list.component.html',
  styleUrls: ['./airimport-list.component.css'],
  standalone: true,
  imports: [...CustomControls, AirImportSearchComponent]
})

//Name : Alen Cherian
//Date : 29/03/2025
//Command : Create the Air Import to list.

export class AirImportListComponent extends baseListComponent {

  constructor(public ms: AirImportService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/airimport/airimportEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "mbl_refno", col_caption: "REF NO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_ref_date", col_caption: "DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_agent_name", col_caption: "AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_handled_name", col_caption: "HANDLED BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }
}
