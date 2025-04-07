import { Routes } from "@angular/router";

//Name : Alen Cherian
//Date : 29/03/2025
//Command : Create the routes for define the path of the components

export const routes: Routes = [
  { path: 'airimportList', loadComponent: () => import('./airimport/airimport-list/airimport-list.component').then(c => c.AirImportListComponent) },
  { path: 'airimportEdit', loadComponent: () => import('./airimport/airimport-edit/airimport-edit.component').then(c => c.AirImportEditComponent) },
  { path: 'airimporthList', loadComponent: () => import('./airimporth/airimporth-list/airimporth-list.component').then(c => c.AirImporthListComponent) },
  { path: 'airimporthEdit', loadComponent: () => import('./airimporth/airimporth-edit/airimporth-edit.component').then(c => c.AirImporthEditComponent) },

]

