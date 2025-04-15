import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'memoList', loadComponent: () => import('./memo/memo-list/memo-list.component').then(c => c.MemoListComponent) },    
  { path: 'memoEdit', loadComponent: () => import('./memo/memo-edit/memo-edit.component').then(c => c.MemoEditComponent) },    
  ]