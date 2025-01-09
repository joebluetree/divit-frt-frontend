import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'qtnmList', loadComponent: () => import('./qtnm/qtnm-list/qtnm-list.component').then(c => c.QtnmListComponent) },
  { path: 'qtnmEdit', loadComponent: () => import('./qtnm/qtnm-edit/qtnm-edit.component').then(c => c.QtnmEditComponent) },
]

