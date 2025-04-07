import { Location } from '@angular/common';
import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { iUser } from '../models/user';
import { Router } from '@angular/router';
import { iMenum } from '../models/imenum';

import ShortUniqueId from 'short-unique-id';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

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

  protected mform: FormGroup;
  private authenticatedSignal = signal<Boolean>(false);
  private autherisedSignal = signal<Boolean>(false);
  private errorSignal = signal<string | null>('');

  public appStates: { [key: string]: any } = {};

  public pageSize = 10;

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
      return this.user.user_menu_list.filter(f => f.menu_module_id == id && f.menu_visible == 'Y');
    else
      return [];
  }

  getSubMenuList(id: number) {
    if (this.user)
      return this.user.user_menu_list.filter(f => f.menu_submenu_id == id && f.menu_visible == 'Y');
    else
      return [];
  }

  public getUrl(path: string = '') {
    let sep = path.startsWith("/") ? "" : "/";
    const _url = this.url + sep + path;
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

  public get globalConstants() {
    return {
      global_user_id: this.user.user_id,
      global_user_code: this.user.user_code,
      global_user_name: this.user.user_name,
      global_user_email: this.user.user_email,
      global_user_company_id: this.user.user_company_id,
      global_user_branch_id: this.user.user_branch_id,
      global_dec_places: 3,
      global_date_format: 'mm/dd/yyyy',
      global_output_datetime_format: 'dd-MMM-yyyy HH:mm',
      global_display_date_format: 'dd-MMM-yyyy',
    };
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'global_user_id': this.user.user_id.toString(),
      'global_user_code': this.user.user_code,
      'global_user_name': this.user.user_name,
      'global_user_email': this.user.user_email,
      'global_user_company_id': this.user.user_company_id.toString(),
      'global_user_branch_id': this.user.user_branch_id.toString(),
      'global_dec_places': 2,
      'global_date_format': 'mm/dd/yyyy',
      'global_output_datetime_format': 'dd-MMM-yyyy HH:mm',
      'global_display_date_format': 'dd-MMM-yyyy',
    });

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


  public roundNumber(_number: number, _precision: number = 2): number {
    try {
      // Check if the input number is a valid number
      if (typeof _number !== 'number' || isNaN(_number)) {
        throw new Error('Invalid input: _number must be a valid number.');
      }
      // Check if the precision is a valid number and is a non-negative integer
      if (typeof _precision !== 'number' || isNaN(_precision) || _precision < 0 || !Number.isInteger(_precision)) {
        throw new Error('Invalid input: _precision must be a non-negative integer.');
      }
      // Round the number to the specified precision
      const roundedNumber = _number.toFixed(_precision);
      return parseFloat(roundedNumber);  // Use parseFloat to convert string back to number
    } catch (error: any) {
      // Return the error message for invalid input cases
      return 0;
    }
  }

  public roundNumber2(num: number, precision: number = 0): number {
    try {

      let _number = parseFloat(num.toString());
      const roundedNumber = _number.toFixed(precision);
      return parseFloat(roundedNumber);

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }

  }

  // Get ATTN
  public getAttention(data: any): string {
    const contact = data?.cust_contact;
    return contact ? `ATTN: ${contact}` : "";
  }

  // Get TEL & FAX
  public getTelFax(data: any): string {
    const tel = data?.cust_tel ? `TEL: ${data.cust_tel}` : "";
    const fax = data?.cust_fax ? `FAX: ${data.cust_fax}` : "";

    if (tel && fax) return `${tel}, ${fax}`;
    return tel || fax || "";
  }


  public getToday() {
    return this.getNewdate(0);
  }

  private getNewdate(_days: number) {
    var nDate = new Date();
    if (_days > 0)
      nDate.setDate(nDate.getDate() + _days);
    if (_days < 0)
      nDate.setDate(nDate.getDate() - Math.abs(_days));

    let yy = nDate.getFullYear();
    let mm = nDate.getMonth() + 1;
    let dd = nDate.getDate();

    let sRet = yy.toString();
    sRet += "-" + (mm <= 9 ? "0" + mm.toString() : mm.toString());
    sRet += "-" + (dd <= 9 ? "0" + dd.toString() : dd.toString());
    return sRet;
  }

  public showError(errorObj: any) {       // to show error and message together of error
    const errorMsg = [
      // `STATUS : ${errorObj.status+' - '+errorObj.statusText}`,
      `MESSAGE : ${errorObj.message}`,
      `ERROR : ${errorObj.error}`
    ];

    this.showAlert(errorMsg); // Show as alert
  }

}
