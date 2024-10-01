import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { iUser } from '../models/user';
import { Router } from '@angular/router';
import { iMenum } from '../models/imenum';
import { iModulem } from '../models/imodulem';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private authenticatedSingnal = signal<boolean>(false);
  //private errorSignal = signal<string | null>('');
  //private authorisedSingnal = signal<boolean>(false);



  constructor(
    private gs: GlobalService,
    private router: Router,
    private http: HttpClient) {
  }

  login(login: any) {

    const options = {
      params: {
        "code": login.code,
        "password": login.password
      }
    }

    const url = this.gs.getUrl('api/auth/login');
    this.http.get(url, options).subscribe({
      next: (user: any) => {
        const _user: iUser = {
          user_id: user.user_id,
          user_code: user.user_code,
          user_name: user.user_name,
          user_email: user.user_email,
          user_password: '',
          user_token: user.user_token,
          user_company_id: user.user_company_id,
          user_branch_id: user.user_branch_id,
          user_module_list: [],
          user_menu_list: [],
          //user_rights: []
        }
        this.gs.user = _user;
        this.gs.setError('');
        this.gs.Authenticate();
        this.gs.resetState();
        this.router.navigate(['/loginBranch'], { queryParams: { 'source': 'login' } });
      },
      error: (err: any) => {
        this.gs.setError(err.error);
      }
    })
  }

  loadBranches(search_record: any) {
    const url = this.gs.getUrl('/api/auth/GetBranchListAsync');
    return this.http.post<any>(url, search_record);
  }


  branchLogin(data: any) {
    this.http.post(this.gs.getUrl('api/auth/BranchLoginAsync'), data).subscribe({
      next: (result: any) => {
        this.gs.user.user_branch_id = result.branch_id;
        this.gs.user.user_module_list = <iModulem[]>result.module_list;
        this.gs.user.user_menu_list = <iMenum[]>result.menu_list;
        //this.gs.createModuleList();
        this.gs.saveAuthState();
        this.gs.Autherize();
        this.gs.resetState();
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.gs.setError(err.error);
      }
    });
  }



}
