import { Component } from '@angular/core';
import { MenuSearchComponent } from '../menu-search/menu-search.component';
import { baseListComponent } from '../../../shared/base-class/baseListComponent';
import { CustomControls } from '../../../app.config';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  standalone: true,
  imports: [...CustomControls, MenuSearchComponent]
})
export class MenuListComponent extends baseListComponent {

  constructor(public ms: MenuService) {
    super(ms);
  }

  ngOnInit(): void {

    this.init();

    const param = { id: 0, mode: 'edit', menuid: this.menuid, type: this.type, appid: this.appid }

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/admin/menuEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "menu_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_route", col_caption: "ROUTE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_param", col_caption: "PARAM", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_visible", col_caption: "VISIBLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_module_name", col_caption: "MODULE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "menu_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete }
    ];

  }

}
