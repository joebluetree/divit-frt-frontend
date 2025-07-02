import { Component } from '@angular/core';
import { CustomControls } from '../../../app.config';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { CustomHoldService } from '../../services/customhold.service';
import { CustomHoldSearchComponent } from '../customhold-search/customhold-search.component';

@Component({
  selector: 'app-customhold-list',
  templateUrl: './customhold-list.component.html',
  styleUrls: ['./customhold-list.component.css'],
  standalone: true,
  imports: [...CustomControls, CustomHoldSearchComponent],
})

//Name : Sourav V
//Created Date : 01/07/2025
//Remark : this component display relevant details of each custom hold records
//version : v1 - 01/07/2025

export class CustomHoldListComponent extends baseListComponent {

  constructor(public ms: CustomHoldService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid };

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/customhold/customholdEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "custom_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: this.showModel },
      { col_name: "custom_remarks", col_caption: "Remarks", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];
  }


}
