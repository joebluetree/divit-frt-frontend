import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CustomControls } from '../../app.config';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class LoginComponent {

  loginError$ = this.gs.getError();
  loginForm: FormGroup;

  constructor(
    private ls: LoginService,
    private gs: GlobalService
  ) {
    //this.loginError$ = this.store.select(selectLoginError)
    this.loginForm = new FormGroup({
      code: new FormControl('admin'),
      password: new FormControl('admin')
    })
  }

  login() {
    this.ls.login(this.loginForm.value);
    //this.store.dispatch(auth_login(this.loginForm.value))
  }

  cancel() {
    //this.store.dispatch(auth_login_failure({ error: '' }))
    this.loginForm.reset();
    this.loginForm.setValue({
      code: '',
      password: ''
    })
  }

}
