import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { QtnmLclService } from '../../services/qtnmlcl.service';
import { QtnmLclSearchComponent } from '../qtnmlcl-search/qtnmlcl-search.component';

@Component({
  selector: 'app-qtnmlcl-list',
  templateUrl: './qtnmlcl-list.component.html',
  styleUrls: ['./qtnmlcl-list.component.css'],
  standalone: true,
  imports: [...CustomControls, QtnmLclSearchComponent],
})

//Name : Sourav V
//Created Date : 04/01/2025
//Remark : this component display relevant details of each qtnm-lcl records

export class QtnmLclListComponent extends baseListComponent {

  constructor(public ms: QtnmLclService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/marketing/qtnmlclEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "qtnm_no", col_caption: "QUOTE#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_date", col_caption: "DATE", col_format: "date", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_to_name", col_caption: "QUOTE TO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_pol_name", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_pod_name", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_pld_name", col_caption: "PLACE OF DELIVERY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_move_type", col_caption: "MOVE TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_kgs", col_caption: "KGS", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "qtnm_cbm", col_caption: "CBM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}