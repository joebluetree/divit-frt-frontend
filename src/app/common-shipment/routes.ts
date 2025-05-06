import { Routes } from "@angular/router";

export const routes: Routes = [



  { path: 'memoEdit', loadComponent: () => import('./memo/memo-edit/memo-edit.component').then(c => c.MemoEditComponent) },


  { path: 'followupEdit', loadComponent: () => import('./followup/followup-edit/followup-edit.component').then(c => c.FollowUpEditComponent) },
  { path: 'deliveryorderEdit', loadComponent: () => import('./deliveryorder/deliveryorder-edit/deliveryorder-edit.component').then(c => c.DeliveryOrderEditComponent) },    
  { path: 'deliveryorderList', loadComponent: () => import('./deliveryorder/deliveryorder-list/deliveryorder-list.component').then(c => c.DeliveryOrderListComponent) },    

  { path: 'messengerslipEdit', loadComponent: () => import('./messengerslip/messengerslip-edit/messengerslip-edit.component').then(c => c.MessengerSlipEditComponent) },
  { path: 'messengerslipList', loadComponent: () => import('./messengerslip/messengerslip-list/messengerslip-list.component').then(c => c.MessengerSlipListComponent) },
  { path: 'messengerslipDetList', loadComponent: () => import('./messengerslip/messengerslip-detlist/messengerslip-detlist.component').then(c => c.MessengerSlipDetListComponent) },


]