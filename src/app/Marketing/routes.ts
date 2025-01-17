import { Routes } from "@angular/router";

  //Name : Alen Cherian
  //Date : 03/01/2025
  //Command : Create the routes for define the path of the components 

export const routes: Routes = [
  { path: 'qtnmfclList', loadComponent: () => import('./qtnmfcl/qtnmfcl-list/qtnmfcl-list.component').then(c => c.QtnmFclListComponent) },
  { path: 'qtnmfclEdit', loadComponent: () => import('./qtnmfcl/qtnmfcl-edit/qtnmfcl-edit.component').then(c => c.QtnmFclEditComponent) },
]

