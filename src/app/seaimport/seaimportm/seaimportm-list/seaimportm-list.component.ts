import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { SeaImportmSearchComponent } from '../seaimportm-search/seaimportm-search.component';
import { SeaImportmService } from '../../services/seaimportm.service';

@Component({
  selector: 'app-seaimportm-list',
  templateUrl: './seaimportm-list.component.html',
  styleUrls: ['./seaimportm-list.component.css'],
  standalone: true,
  imports: [...CustomControls, SeaImportmSearchComponent],
})

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : this component display relevant details of each sea export master records
//version : v1 - 29-03-2025

export class SeaImportmListComponent extends baseListComponent {

  constructor(public ms: SeaImportmService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/seaimport/seaimportmEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "mbl_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "mbl_refno", col_caption: "REF #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_ref_date", col_caption: "DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_no", col_caption: "MBL #", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_agent_name", col_caption: "MASTER AGENT", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_liner_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pol_etd", col_caption: "ETD", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_pod_eta", col_caption: "ETA", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_cntr_type", col_caption: "SHIP TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "mbl_handled_name", col_caption: "HANDLED", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
