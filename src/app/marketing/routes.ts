import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: 'qtnmlclList', loadComponent: () => import('./qtnmlcl/qtnmlcl-list/qtnmlcl-list.component').then(c => c.QtnmLclListComponent) },
  { path: 'qtnmlclEdit', loadComponent: () => import('./qtnmlcl/qtnmlcl-edit/qtnmlcl-edit.component').then(c => c.QtnmLclEditComponent) },
  { path: 'qtnmairList', loadComponent: () => import('./qtnmair/qtnmair-list/qtnmair-list.component').then(c => c.QtnmAirListComponent) },
  { path: 'qtnmairEdit', loadComponent: () => import('./qtnmair/qtnmair-edit/qtnmair-edit.component').then(c => c.QtnmAirEditComponent) },
  { path: 'qtnmairdEdit', loadComponent: () => import('./qtnmair/qtnmaird-edit/qtnmaird-edit.component').then(c => c.QtnmAirdEditComponent) },
]
