import { CommonModule } from '@angular/common';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouteReuseStrategy, RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutusComponent } from './core/aboutus/aboutus.component';
import { ContactusComponent } from './core/contactus/contactus.component';

import { CustomRouteReuseStrategy } from './core/customReuseStrategy';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptor } from './core/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent, CheckboxComponent, ComboboxComponent, DateComponent, InputComponent, PageComponent, TableComponent } from 'ngx-jrt-controls';
import { ProgressScreenComponent } from './core/progress-screen/progress-screen.component';
import { MenuComponent } from './core/menu/menu.component';
import { ToastComponent } from './core/toast/toast.component';
import { AuthGuard, AuthGuardLogin } from './core/auth.guard.service';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MainmenuComponent } from './core/mainmenu/mainmenu.component';
import { HistoryComponent } from './shared/history/history.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', loadComponent: () => import('./core/login/login.component').then(c => c.LoginComponent), canActivate: [AuthGuardLogin] },
  { path: 'loginBranch', loadComponent: () => import('./core/login-branch/login-branch.component').then(c => c.LoginBranchComponent), canActivate: [AuthGuardLogin] },
  { path: 'accounts', loadChildren: () => import('./accounts/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'masters', loadChildren: () => import('./master/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./user-admin/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'tnt', loadChildren: () => import('./tnt/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'marketing', loadChildren: () => import('./marketing1/routes').then(m => m.routes), canActivate: [AuthGuard] },

  { path: 'seaexport', loadChildren: () => import('./seaexport/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'seaimport', loadChildren: () => import('./seaimport/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'airexport', loadChildren: () => import('./airexport/routes').then(m => m.routes), canActivate: [AuthGuard] },
  { path: 'airimport', loadChildren: () => import('./airimport/routes').then(m => m.routes), canActivate: [AuthGuard] },
  
  { path: 'common-shipment', loadChildren: () => import('./common-shipment/routes').then(m => m.routes), canActivate: [AuthGuard] },

  { path: 'common-shipment', loadChildren: () => import('./common-shipment/routes').then(m => m.routes), canActivate: [AuthGuard] },

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }, provideAnimationsAsync(), provideAnimationsAsync()
  ]
};

export const CustomControls = [
  AutoCompleteComponent,
  InputComponent,
  DateComponent,
  ComboboxComponent,
  CheckboxComponent,
  PageComponent,
  TableComponent,
  ProgressScreenComponent,
  ToastComponent,

  HistoryComponent,

  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule,

  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,

  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

];


