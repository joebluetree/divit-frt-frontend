import { Location } from '@angular/common';
import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { iUser } from '../models/user';
import { Router } from '@angular/router';
import { iMenum } from '../models/imenum';

import ShortUniqueId from 'short-unique-id';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url = "https:/jsonplaceholder.typicode.com";

  private _toast: Subject<string[]> = new Subject<string[]>();
  public readonly toast$ = this._toast.asObservable();

  private _loadScreenSignal = signal<boolean>(false);
  public readonly loadScreenSignal = computed(() => this._loadScreenSignal());


  public app_id = '';
  public user: iUser = <iUser>{};

  private authenticatedSignal = signal<Boolean>(false);
  private autherisedSignal = signal<Boolean>(false);
  private errorSignal = signal<string | null>('');


  public appStates: { [key: string]: any } = {};


  public pageSize = 25;


  constructor(
    private location: Location,
    private router: Router
  ) {
    this.url = "https:/jsonplaceholder.typicode.com";
    this.url = "http://localhost:5153";

    this.init();
  }

  init() {
    this.user = {
      user_id: 0, user_branch_id: 0, user_code: '', user_company_id: 0,
      user_email: '', user_module_list: [], user_menu_list: [], user_name: '', user_password: '',
      user_token: '',
    }
  }

  resetState() {
    this.appStates = {};
  }

  public Authenticate() {
    this.authenticatedSignal.set(true);

  }
  public Autherize() {
    this.autherisedSignal.set(true);
  }
  public setError(err: string) {
    this.errorSignal.set(err);
  }

  public isAuthenticated() {
    return this.authenticatedSignal();
  }

  public isAutherised() {
    return this.autherisedSignal();
  }

  public getError() {
    return this.errorSignal;
  }

  isLoggedIn() {
    return this.authenticatedSignal();
  }

  isLoggedOut() {
    return !this.authenticatedSignal();
  }



  getUserName() {
    if (this.user)
      return this.user.user_name;
    else
      return '';

  }



  processModuleList() {
    let list: any[] = [];

    if (this.user.user_menu_list.length <= 0)
      return [];
    const _list = this.user.user_menu_list.reduce((acc: any, value: iMenum) => {
      let id = value.menu_module_id;
      if (!acc[id]) {
        acc[id] = value.menu_module_name;
        list.push({ module_id: id, module_name: value.menu_module_name })
      }
      return acc;
    }, {});
    return list;
  }


  createModuleList() {
    this.user.user_module_list = this.processModuleList();
  }

  getModuleList() {
    if (this.user)
      return this.user.user_module_list;
    else
      return [];
  }

  getMenuList(id: number) {
    if (this.user)
      return this.user.user_menu_list.filter(f => f.menu_module_id == id);
    else
      return [];
  }

  public getUrl(path: string = '') {
    let sep = path.startsWith("/") ? "" : "/";
    const _url = this.url + sep + path;
    console.log(_url);
    return _url;
  }

  updateURL(param: any) {
    const qs = new URLSearchParams(location.search);
    for (var key in param) {
      qs.set(key, param[key]);
    }
    this.location.replaceState(location.pathname, qs.toString())
  }

  public IsValidToken(token: any) {
    const decodedToken = this.decodeToken(token);
    let bRet = true;
    if (Date.now() >= decodedToken.exp * 1000) {
      bRet = false;
    }
    return bRet;
  }

  public decodeToken(token: string) {

    const _decodeToken = (token: string) => {
      try {
        return JSON.parse(window.atob(token));
      } catch {
        return;
      }
    };

    return token
      .split('.')
      .map(token => _decodeToken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }

  //toast subject

  public showAlert(msg: string[]) {
    this._toast.next(msg);
  }
  public hideAlert() {
    this._toast.next([]);
  }

  public saveAuthState() {
    this.app_id = this.getShortUId();
    const token_name = this.getTokenName();
    localStorage.setItem(token_name, JSON.stringify(this.user));
  }

  public getTokenName() {
    if (this.app_id)
      return 'token-' + this.app_id;
    else
      return '';
  }

  public getToken() {
    if (this.user)
      return this.user.user_token;
    else
      return '';
  }

  public getGlobalConstants() {
    return {
      global_user_id: this.user.user_id,
      global_user_code: this.user.user_code,
      global_user_name: this.user.user_name,
      global_user_email: this.user.user_email,
      global_user_company_id: this.user.user_company_id,
      global_user_branch_id: this.user.user_branch_id,
    };
  }


  public readAuthState() {
    let bRet = false;
    const _app_id = this.getURLParam('appid');
    if (_app_id)
      this.app_id = _app_id;
    else
      return bRet;
    const token_name = this.getTokenName();
    if (localStorage.getItem(token_name)) {
      let user = JSON.parse(localStorage.getItem(token_name) || '{}');
      const _user: iUser = {
        user_id: user.user_id,
        user_code: user.user_code,
        user_name: user.user_name,
        user_email: user.user_email,
        user_token: user.user_token,
        user_company_id: user.user_company_id,
        user_branch_id: user.user_branch_id,
        user_password: '',
        user_module_list: user.user_module_list,
        user_menu_list: user.user_menu_list,
      }
      this.user = _user;

      bRet = true;
    }
    return bRet;
  }


  public getUserRights(menu_id: string) {
    const rec = this.user.user_menu_list.find(f => f.menu_code == menu_id);
    if (rec == null)
      return null;
    else
      return rec;
  }

  IsValidAppId(_app_id: string) {
    let bflag = true;
    if (_app_id == '')
      bflag = false;
    if (_app_id != this.app_id)
      bflag = false;
    if (bflag == false) {
      alert('Invalid App Id');
      this.logout();
    }
    return bflag;
  }

  logout() {
    this.authenticatedSignal.set(false);
    this.autherisedSignal.set(false);
    //this.store.dispatch(auth_logout());
    this.router.navigate(['home']);
  }

  getURLParam(param: string) {
    return new URLSearchParams(window.location.search).get(param);
  }

  public getShortUId() {
    const uid = new ShortUniqueId({ length: 10 });
    return uid.rnd();
  }

  public showProgressScreen() {
    this._loadScreenSignal.set(true);
  }
  public hideProgressScreen() {
    this._loadScreenSignal.set(false);

  }



}