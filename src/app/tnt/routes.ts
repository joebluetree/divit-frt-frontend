import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'trackList', loadComponent: () => import('./track/track-list/track-list.component').then(c => c.TrackListComponent) },
  // { path: 'trackEdit', loadComponent: () => import('./track/track-edit/track-edit.component').then(c => c.TrackEditComponent) },
]

