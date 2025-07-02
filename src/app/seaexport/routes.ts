import { Routes } from "@angular/router";

//Name : Sourav
//Date : 24/02/2025
//Remark : Create the routes for define the path of the components
//version : v1 - 24-02-2025

export const routes: Routes = [
  { path: 'seaexportmList', loadComponent: () => import('./seaexportm/seaexportm-list/seaexportm-list.component').then(c => c.SeaExportListComponent) },
  { path: 'seaexportmEdit', loadComponent: () => import('./seaexportm/seaexportm-edit/seaexportm-edit.component').then(c => c.SeaExportmEditComponent) },
  { path: 'seaexporthList', loadComponent: () => import('./seaexporth/seaexporth-list/seaexporth-list.component').then(c => c.SeaExportHListComponent) },
  { path: 'seaexporthEdit', loadComponent: () => import('./seaexporth/seaexporth-edit/seaexporth-edit.component').then(c => c.SeaExportHEditComponent) },
  { path: 'cooEdit', loadComponent: () => import('./coo/coo-edit/coo-edit.component').then(c => c.CoOEditComponent) },
]

