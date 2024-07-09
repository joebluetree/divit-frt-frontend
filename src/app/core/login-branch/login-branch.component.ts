import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { LoginService } from '../services/login.service';
import { CustomControls } from '../../app.config';
import { iBranchm } from '../models/branchm';

@Component({
  selector: 'app-login-branch',
  templateUrl: './login-branch.component.html',
  styleUrls: ['./login-branch.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class LoginBranchComponent {

  source = '';
  mForm: FormGroup;

  records: iBranchm[] = [];

  loginError$ = this.gs.getError();

  constructor(
    private ls: LoginService,
    public gs: GlobalService,
    private router: Router,
    private mainService: LoginService,
    private route: ActivatedRoute) {

    this.mForm = new FormGroup({
      branch_id: new FormControl(this.gs.user.user_branch_id),
    })

    this.route.queryParams.forEach(rec => {
      this.source = rec["source"];
    })
    this.loadRecords();

  }

  loadRecords() {

    const search_record = {
      company_id: this.gs.user.user_company_id,
      user_id: this.gs.user.user_id
    }

    this.mainService.loadBranches(search_record).subscribe({
      next: (v) => {
        this.records = v.records;
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      }
    })

  }

  login() {

    if (!this.mForm.value.branch_id)
      return;
    const data = {
      user_id: this.gs.user.user_id,
      company_id: this.gs.user.user_company_id,
      branch_id: this.mForm.value.branch_id,
    }
    this.ls.branchLogin(data);

  }

  cancel() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
