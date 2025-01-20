import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'customerList', loadComponent: () => import('./customer/customer-list/customer-list.component').then(c => c.CustomerListComponent) },
  { path: 'customerEdit', loadComponent: () => import('./customer/customer-edit/customer-edit.component').then(c => c.CustomerEditComponent) },
  { path: 'paramList', loadComponent: () => import('./param/param-list/param-list.component').then(c => c.ParamListComponent) },
  { path: 'paramEdit', loadComponent: () => import('./param/param-edit/param-edit.component').then(c => c.ParamEditComponent) },
  { path: 'mailservermList', loadComponent: () => import('./mailserverm/mailserverm-list/mailserverm-list.component').then(c => c.MailServermListComponent) },
  { path: 'mailservermEdit', loadComponent: () => import('./mailserverm/mailserverm-edit/mailserverm-edit.component').then(c => c.MailServermEditComponent) },
]
