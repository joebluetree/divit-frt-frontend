import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomControls } from '../../app.config';
import { Route, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { iMenum } from '../models/imenum';
import { ReturnStatement } from '@angular/compiler';


@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [...CustomControls],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {

  title = "CARGOMAR PVT LTD";

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile = false;
  isCollapsed = false;

  constructor(private observer: BreakpointObserver,
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.Renderer2.setStyle(this.sidenav._content.nativeElement, 'scrollbar-width', 'none')
  }

  toggleMenu() {

    if (!this.gs.isAutherised())
      return false;

    if (this.isMobile) {
      this.sidenav.toggle();
      //this.isCollapsed = false;
      this.isCollapsed = !this.isCollapsed;
    } else {
      //this.sidenav.open();
      this.sidenav.toggle();
      this.isCollapsed = !this.isCollapsed;
    }
    return true;
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

  ngOnDestroy(): void {
  }

  logout() {
    //this.store.dispatch(auth_logout());
    this.gs.logout();
    this.router.navigate(['login']);
  }



}
