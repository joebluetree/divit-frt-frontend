import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { TrackmService } from '../../services/trackm.service';
import { TrackSearchComponent } from '../track-search/track-search.component';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css'],
  standalone: true,
  imports: [...CustomControls, TrackSearchComponent]
})
export class TrackListComponent extends baseListComponent {

  constructor(
    public ms: TrackmService,
  ) { super(ms); }

  ngOnInit(): void {
    this.init();
    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/tnt/trackEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "track_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_book_no", col_caption: "BOOKING#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_cntr_no", col_caption: "CONTAINER#", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "track_carrier_name", col_caption: "CARRIER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_carrier_scac", col_caption: "SCAC", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "track_pol_code", col_caption: "POL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_pol_etd", col_caption: "ETD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_pod_code", col_caption: "POD", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_pod_eta", col_caption: "ETA", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "track_vessel_name", col_caption: "VESSEL", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_vessel_code", col_caption: "IMO", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "track_voyage", col_caption: "VOYAGE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }

}
