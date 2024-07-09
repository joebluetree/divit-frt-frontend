import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: 'moduleList', loadComponent: () => import('./module/module-list/module-list.component').then(c => c.ModuleListComponent) },
  { path: 'moduleEdit', loadComponent: () => import('./module/module-edit/module-edit.component').then(c => c.ModuleEditComponent) },
  { path: 'menuList', loadComponent: () => import('./menum/menu-list/menu-list.component').then(c => c.MenuListComponent) },
  { path: 'menuEdit', loadComponent: () => import('./menum/menu-edit/menu-edit.component').then(c => c.MenuEditComponent) },
  { path: 'companyList', loadComponent: () => import('./company/company-list/company-list.component').then(c => c.CompanyListComponent) },
  { path: 'companyEdit', loadComponent: () => import('./company/company-edit/company-edit.component').then(c => c.CompanyEditComponent) },
  { path: 'branchList', loadComponent: () => import('./branch/branch-list/branch-list.component').then(c => c.BranchListComponent) },
  { path: 'branchEdit', loadComponent: () => import('./branch/branch-edit/branch-edit.component').then(c => c.BranchEditComponent) },
  { path: 'userList', loadComponent: () => import('./user/user-list/user-list.component').then(c => c.UserListComponent) },
  { path: 'userEdit', loadComponent: () => import('./user/user-edit/user-edit.component').then(c => c.UserEditComponent) },
  { path: 'rightsList', loadComponent: () => import('./rights/rights-list/rights-list.component').then(c => c.RightsListComponent) },
  { path: 'rightsEdit', loadComponent: () => import('./rights/rights-edit/rights-edit.component').then(c => c.RightsEditComponent) },
  { path: 'settingsList', loadComponent: () => import('./settings/settings-list/settings-list.component').then(c => c.SettingsListComponent) },
]
