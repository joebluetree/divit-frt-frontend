import { Routes } from "@angular/router";

export const routes: Routes = [
   
  { path: 'followupEdit', loadComponent: () => import('./followup/followup-edit/followup-edit.component').then(c => c.FollowUpEditComponent) },

  ]