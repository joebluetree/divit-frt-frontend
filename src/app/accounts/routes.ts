import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: 'accgroupList', loadComponent: () => import('./accgroup/accgroup-list/accgroup-list.component').then(c => c.AccGroupListComponent) },
  { path: 'accgroupEdit', loadComponent: () => import('./accgroup/accgroup-edit/accgroup-edit.component').then(c => c.AccGroupEditComponent) },
  { path: 'acctmList', loadComponent: () => import('./acctm/acctm-list/acctm-list.component').then(c => c.AcctmListComponent) },
  { path: 'acctmEdit', loadComponent: () => import('./acctm/acctm-edit/acctm-edit.component').then(c => c.AcctmEditComponent) },
]
