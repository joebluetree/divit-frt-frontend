import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './core/services/global.service';
import { CustomControls } from './app.config';
import { MainmenuComponent } from './core/mainmenu/mainmenu.component';
import { MenuComponent } from './core/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...CustomControls, MainmenuComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application';

  constructor(
    private router: Router,
    private gs: GlobalService,
  ) { }

  ngOnInit(): void {

    if (this.gs.readAuthState()) {
      this.gs.Authenticate();
      this.gs.Autherize();
    }
  }

}
