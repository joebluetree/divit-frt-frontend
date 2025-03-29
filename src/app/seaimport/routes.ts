import { Routes } from "@angular/router";

//Name : Sourav
//Date : 29/03/2025
//Remark : Create the routes for define the path of the components
//version : v1 - 29/03/2025

export const routes: Routes = [
  { path: 'seaimportmList', loadComponent: () => import('./seaimportm/seaimportm-list/seaimportm-list.component').then(c => c.SeaImportmListComponent) },
  { path: 'seaimportmEdit', loadComponent: () => import('./seaimportm/seaimportm-edit/seaimportm-edit.component').then(c => c.SeaImportmEditComponent) },
  // { path: 'seaexporthList', loadComponent: () => import('./seaexporth/seaexporth-list/seaexporth-list.component').then(c => c.SeaExportHListComponent) },
  // { path: 'seaexporthEdit', loadComponent: () => import('./seaexporth/seaexporth-edit/seaexporth-edit.component').then(c => c.SeaExportHEditComponent) },
]

