import { Routes } from "@angular/router";

//Name : Sourav
//Date : 29/03/2025
//Remark : Create the routes for define the path of the components
//version : v1 - 29/03/2025
//        : v2 - 02-04-2025 added house route

export const routes: Routes = [
  { path: 'seaimportmList', loadComponent: () => import('./seaimportm/seaimportm-list/seaimportm-list.component').then(c => c.SeaImportmListComponent) },
  { path: 'seaimportmEdit', loadComponent: () => import('./seaimportm/seaimportm-edit/seaimportm-edit.component').then(c => c.SeaImportmEditComponent) },
  { path: 'seaimporthList', loadComponent: () => import('./seaimporth/seaimporth-list/seaimporth-list.component').then(c => c.SeaImportHListComponent) },
  { path: 'seaimporthEdit', loadComponent: () => import('./seaimporth/seaimporth-edit/seaimporth-edit.component').then(c => c.SeaImportHEditComponent) },
]

