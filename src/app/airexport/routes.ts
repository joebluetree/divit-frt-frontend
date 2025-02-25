import { Routes } from "@angular/router";

//Name : Alen Cherian
//Date : 25/02/2025
//Command : Create the routes for define the path of the components

export const routes: Routes = [
  { path: 'airexportList', loadComponent: () => import('./airexport/airexport-list/airexport-list.component').then(c => c.AirExportListComponent) },
  { path: 'airexportEdit', loadComponent: () => import('./airexport/airexport-edit/airexport-edit.component').then(c => c.AirExportEditComponent) },

]

