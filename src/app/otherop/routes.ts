import { Routes } from "@angular/router";

//Name : Sourav
//Date : 07/05/2025
//Remark : Create the routes for define the path of the components
//version : v1 - 07/05/2025

export const routes: Routes = [
  { path: 'otheropList', loadComponent: () => import('./otherop/otherop-list/otherop-list.component').then(c => c.OtherOpListComponent) },
  { path: 'otheropEdit', loadComponent: () => import('./otherop/otherop-edit/otherop-edit.component').then(c => c.OtherOpEditComponent) },
]

