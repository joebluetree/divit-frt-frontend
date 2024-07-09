import { NgModule } from '@angular/core';

import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleEffects } from './store/module/module.effects';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSearchComponent } from './module/module-search/module-search.component';
import * as moduleReducer from './store/module/module.reducer';
import { MenuSearchComponent } from './menum/menu-search/menu-search.component';
import { MenuEditComponent } from './menum/menu-edit/menu-edit.component';
import { MenuListComponent } from './menum/menu-list/menu-list.component';
import * as menuReducer from './store/menu/menu.reducer';
import { MenuEffects } from './store/menu/menu.effects';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanySearchComponent } from './company/company-search/company-search.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyEffects } from './store/company/company.effects';
import * as companyReducer from './store/company/company.reducer';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchEditComponent } from './branch/branch-edit/branch-edit.component';
import { BranchSearchComponent } from './branch/branch-search/branch-search.component';
import { BranchEffects } from './store/branch/branch.effects';
import * as branchReducer from './store/branch/branch.reducer';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserSearchComponent } from './user/user-search/user-search.component';

import * as userReducer from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';

import * as  rightsReducer from './store/rights/rights.reducer';
import { RightsEffects } from './store/rights/rights.effects';

import * as settingsReducer from './store/settings/settings.reducer';
import { SettingsEffects } from './store/settings/settings.effects';

import { RightsSearchComponent } from './rights/rights-search/rights-search.component';
import { RightsListComponent } from './rights/rights-list/rights-list.component';
import { RightsEditComponent } from './rights/rights-edit/rights-edit.component';
import { SettingsSearchComponent } from './settings/settings-search/settings-search.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { SettingsEditComponent } from './settings/settings-edit/settings-edit.component';

const routes: Routes = [
  { path: 'moduleList', component: ModuleListComponent },
  { path: 'moduleEdit', component: ModuleEditComponent },
  { path: 'menuList', component: MenuListComponent },
  { path: 'menuEdit', component: MenuEditComponent },
  { path: 'companyList', component: CompanyListComponent },
  { path: 'companyEdit', component: CompanyEditComponent },
  { path: 'branchList', component: BranchListComponent },
  { path: 'branchEdit', component: BranchEditComponent },
  { path: 'userList', component: UserListComponent },
  { path: 'userEdit', component: UserEditComponent },
  { path: 'rightsList', component: RightsListComponent },
  { path: 'rightsEdit', component: RightsEditComponent },
  { path: 'settingsList', component: SettingsListComponent },

]

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(companyReducer.FeatureName, companyReducer.Reducer),
    StoreModule.forFeature(branchReducer.FeatureName, branchReducer.Reducer),
    StoreModule.forFeature(userReducer.FeatureName, userReducer.Reducer),
    StoreModule.forFeature(moduleReducer.FeatureName, moduleReducer.Reducer),
    StoreModule.forFeature(menuReducer.FeatureName, menuReducer.Reducer),
    StoreModule.forFeature(rightsReducer.FeatureName, rightsReducer.Reducer),
    StoreModule.forFeature(settingsReducer.FeatureName, settingsReducer.Reducer),
    EffectsModule.forFeature([CompanyEffects, BranchEffects, UserEffects, ModuleEffects, MenuEffects, RightsEffects, SettingsEffects]),
    ModuleListComponent,
    ModuleEditComponent,
    ModuleSearchComponent,
    MenuSearchComponent,
    MenuEditComponent,
    MenuListComponent,
    CompanyListComponent,
    CompanySearchComponent,
    CompanyEditComponent,
    BranchListComponent,
    BranchEditComponent,
    BranchSearchComponent,
    UserListComponent,
    UserEditComponent,
    UserSearchComponent,
    RightsSearchComponent,
    RightsListComponent,
    RightsEditComponent,
    SettingsSearchComponent,
    SettingsListComponent,
    SettingsEditComponent,
]
})
export class UserAdminModule { }
