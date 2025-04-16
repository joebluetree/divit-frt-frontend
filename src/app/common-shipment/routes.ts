import { Routes } from "@angular/router";

export const routes: Routes = [

  
  
  { path: 'memoEdit', loadComponent: () => import('./memo/memo-edit/memo-edit.component').then(c => c.MemoEditComponent) },    

   
  { path: 'followupEdit', loadComponent: () => import('./followup/followup-edit/followup-edit.component').then(c => c.FollowUpEditComponent) },


  ]