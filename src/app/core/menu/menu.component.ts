import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { LoginService } from '../services/login.service';
import { iMenum } from '../models/imenum';
import { CustomControls } from '../../app.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class MenuComponent {
  title = "Cargomar Pvt Ltd";

  constructor(
    private ls: LoginService,
    private router: Router,
    public gs: GlobalService
  ) {
  }

  isOk(module: any, menu: any) {
    return module.name == menu.menu_module_name
  }

  getParam(menu: iMenum) {
    const param = JSON.parse(menu.menu_param.replaceAll("'", '"'));
    param.menuid = menu.menu_code;
    param.appid = this.gs.app_id;

    return param;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  logout() {
    //this.store.dispatch(auth_logout());
    this.gs.logout();
    this.router.navigate(['login']);
  }

}
