import { Routes } from "@angular/router";

//Name : Sourav V
//Date : 03/01/2025
//Command : Create the routes for define the path of the components

export const routes: Routes = [
  { path: 'qtnmfclList', loadComponent: () => import('./qtnmfcl/qtnmfcl-list/qtnmfcl-list.component').then(c => c.QtnmFclListComponent) },
  { path: 'qtnmfclEdit', loadComponent: () => import('./qtnmfcl/qtnmfcl-edit/qtnmfcl-edit.component').then(c => c.QtnmFclEditComponent) },

  { path: 'qtnmlclList', loadComponent: () => import('./qtnmlcl/qtnmlcl-list/qtnmlcl-list.component').then(c => c.QtnmLclListComponent) },
  { path: 'qtnmlclEdit', loadComponent: () => import('./qtnmlcl/qtnmlcl-edit/qtnmlcl-edit.component').then(c => c.QtnmLclEditComponent) },
  { path: 'qtnmairList', loadComponent: () => import('./qtnmair/qtnmair-list/qtnmair-list.component').then(c => c.QtnmAirListComponent) },
  { path: 'qtnmairEdit', loadComponent: () => import('./qtnmair/qtnmair-edit/qtnmair-edit.component').then(c => c.QtnmAirEditComponent) },


]

