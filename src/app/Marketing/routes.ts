import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'qtnmfclList', loadComponent: () => import('./qtnmfcl/qtnmfcl-list/qtnmfcl-list.component').then(c => c.QtnmFclListComponent) },
  { path: 'qtnmfclEdit', loadComponent: () => import('./qtnmfcl/qtnmfcl-edit/qtnmfcl-edit.component').then(c => c.QtnmFclEditComponent) },
]

