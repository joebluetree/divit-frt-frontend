import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: 'qtnmlclList', loadComponent: () => import('./qtnmlcl/qtnmlcl-list/qtnmlcl-list.component').then(c => c.QtnmLclListComponent) },
  { path: 'qtnmlclEdit', loadComponent: () => import('./qtnmlcl/qtnmlcl-edit/qtnmlcl-edit.component').then(c => c.QtnmLclEditComponent) },
]
