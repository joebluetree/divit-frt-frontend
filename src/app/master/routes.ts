import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'customerList', loadComponent: () => import('./customer/customer-list/customer-list.component').then(c => c.CustomerListComponent) },
  { path: 'customerEdit', loadComponent: () => import('./customer/customer-edit/customer-edit.component').then(c => c.CustomerEditComponent) },
  { path: 'paramList', loadComponent: () => import('./param/param-list/param-list.component').then(c => c.ParamListComponent) },
  { path: 'paramEdit', loadComponent: () => import('./param/param-edit/param-edit.component').then(c => c.ParamEditComponent) },
  { path: 'remarkList', loadComponent: () => import('./remark/remark-list/remark-list.component').then(c => c.RemarkListComponent) },
  { path: 'remarkEdit', loadComponent: () => import('./remark/remark-edit/remark-edit.component').then(c => c.RemarkEditComponent) },
  { path: 'wiretransmList', loadComponent: () => import('./wiretransm/wiretransm-list/wiretransm-list.component').then(c => c.WiretransmListComponent) },
  { path: 'wiretransmEdit', loadComponent: () => import('./wiretransm/wiretransm-edit/wiretransm-edit.component').then(c => c.WiretransmEditComponent) },
]
