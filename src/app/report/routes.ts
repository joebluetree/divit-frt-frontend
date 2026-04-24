import { Routes } from "@angular/router";

//Name : Sourav
//Date : 26/12/2025
//Remark : Create the routes for define the path of the components
//version : v1 - 26/12/2025
//version : v2 - 08/01/2026 added Sea Volume
//version : v3 - 16/01/2026 added Air Volume
//version : v4 - 27/01/2026 added Agent Shipment
//version : v5 - 30/01/2026 added Consignee Shipment
//version : v6 - 04/02/2026 added DSR
//version : v7 - 09/02/2026 added IT Shipment
//version : v8 - 10/02/2026 added Master Profit
//version : v9 - 06/03/2026 added House Profit
//version : v10 - 14/03/2026 added Invoice Issue
//version : v11 - 19/03/2026 added Shipment Log

export const routes: Routes = [
  { path: 'ophandleList', loadComponent: () => import('./ophandle/ophandle-list/ophandle-list.component').then(c => c.OpHandleListComponent) },
  { path: 'customerlistList', loadComponent: () => import('./customerlist/customerlist-list/customerlist-list.component').then(c => c.CustomerListListComponent) },
  { path: 'seavolumeList', loadComponent: () => import('./seavolume/seavolume-list/seavolume-list.component').then(c => c.SeaVolumeListComponent) },
  { path: 'airvolumeList', loadComponent: () => import('./airvolume/airvolume-list/airvolume-list.component').then(c => c.AirVolumeListComponent) },
  { path: 'agentshipmentList', loadComponent: () => import('./agentshipment/agentshipment-list/agentshipment-list.component').then(c => c.AgentShipmentListComponent) },
  { path: 'consigneeshipmentList', loadComponent: () => import('./consigneeshipment/consigneeshipment-list/consigneeshipment-list.component').then(c => c.ConsigneeShipmentListComponent) },
  { path: 'dsrList', loadComponent: () => import('./dsr/dsr-list/dsr-list.component').then(c => c.DSRListComponent) },
  { path: 'itshipmentList', loadComponent: () => import('./itshipment/itshipment-list/itshipment-list.component').then(c => c.ITShipmentListComponent) },
  { path: 'masterprofitList', loadComponent: () => import('./masterprofit/masterprofit-list/masterprofit-list.component').then(c => c.MasterProfitListComponent) },
  { path: 'houseprofitList', loadComponent: () => import('./houseprofit/houseprofit-list/houseprofit-list.component').then(c => c.HouseProfitListComponent) },
  { path: 'invoiceissueList', loadComponent: () => import('./invoiceissue/invoiceissue-list/invoiceissue-list.component').then(c => c.InvoiceIssueListComponent) },
  { path: 'shipmentlogList', loadComponent: () => import('./shipmentlog/shipmentlog-list/shipmentlog-list.component').then(c => c.ShipmentLogListComponent) },
]

