import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: 'accgroupList', loadComponent: () => import('./accgroup/accgroup-list/accgroup-list.component').then(c => c.AccGroupListComponent) },
  { path: 'accgroupEdit', loadComponent: () => import('./accgroup/accgroup-edit/accgroup-edit.component').then(c => c.AccGroupEditComponent) },
  { path: 'acctmList', loadComponent: () => import('./acctm/acctm-list/acctm-list.component').then(c => c.AcctmListComponent) },
  { path: 'acctmEdit', loadComponent: () => import('./acctm/acctm-edit/acctm-edit.component').then(c => c.AcctmEditComponent) },
  { path: 'invoicemList', loadComponent: () => import('./invoicem/invoicem-list/invoicem-list.component').then(c => c.InvoicemListComponent) },
  { path: 'invoicemEdit', loadComponent: () => import('./invoicem/invoicem-edit/invoicem-edit.component').then(c => c.InvoicemEditComponent) },
  { path: 'openbalanceList', loadComponent: () => import('./openbalance/openbalance-list/openbalance-list.component').then(c => c.OpenBalanceListComponent) },
  { path: 'openbalanceEdit', loadComponent: () => import('./openbalance/openbalance-edit/openbalance-edit.component').then(c => c.OpenBalanceEditComponent) },
  { path: 'acctransList', loadComponent: () => import('./acctrans/acctrans-list/acctrans-list.component').then(c => c.acctransListComponent) },
  { path: 'acctransEdit', loadComponent: () => import('./acctrans/acctrans-edit/acctrans-edit.component').then(c => c.AccTransEditComponent) },
]
