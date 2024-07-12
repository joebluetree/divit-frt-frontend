import { Component } from '@angular/core';
import { RightsService } from '../../services/rights.service';
import { iRights_header, iRights } from '../../models/irights';
import { iBranchm } from '../../models/ibranchm';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/baseEditComponent';


@Component({
  selector: 'app-rights-edit',
  templateUrl: './rights-edit.component.html',
  styleUrls: ['./rights-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class RightsEditComponent extends baseEditComponent {

  constructor(
    private ms: RightsService
  ) {
    super();
    this.mform = this.fb.group({
      id: [0],
      comp_id: [0],
      branch_id: [0],
      user_id: [0],
      records: this.fb.array([]),
    })
  }

  addRow(rec: iRights) {
    return this.fb.group({
      rights_id: [rec ? rec.rights_id : 0],
      rights_parent_id: [rec ? rec.rights_parent_id : 0],
      rights_menu_id: [rec ? rec.rights_menu_id : 0],
      rights_menu_name: [rec ? rec.rights_menu_name : ''],
      rights_module_name: [rec ? rec.rights_module_name : ''],
      rights_selected: [rec ? rec.rights_selected : 'N'],
      rights_company: [rec ? rec.rights_company : 'N'],
      rights_admin: [rec ? rec.rights_admin : 'N'],
      rights_add: [rec ? rec.rights_add : 'N'],
      rights_edit: [rec ? rec.rights_edit : 'N'],
      rights_delete: [rec ? rec.rights_delete : 'N'],
      rights_view: [rec ? rec.rights_view : 'N'],
      rights_print: [rec ? rec.rights_print : 'N'],
      rights_doc_upload: [rec ? rec.rights_doc_upload : 'N'],
      rights_doc_view: [rec ? rec.rights_doc_view : 'N'],
      rights_approver: [rec ? rec.rights_approver : 'N'],
      rights_value: [rec ? rec.rights_value : 'N'],
      rec_company_id: [rec ? rec.rec_company_id : 0],
      rec_branch_id: [rec ? rec.rec_branch_id : 0],
    })
  }


  ngOnInit() {
    this.id = 0;
    this.init();
    this.getRecord();
  }


  getRecord() {
    if (this.id <= 0)
      return;
    this.ms.getRecord(this.id).subscribe({
      next: (rec) => {
        this.loaddata(rec);
      },
      error: (e) => {
        alert(e.message);
      }
    })
  }

  loaddata(rec: iRights_header) {
    this.mform.patchValue({
      id: rec.id,
      comp_id: rec.comp_id,
      branch_id: rec.branch_id,
      user_id: rec.user_id,
    });
    this.formArray('records').clear();
    rec.records.forEach(rec => {
      this.formArray('records').push(this.addRow(rec));
    });
  }



  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }

    const data = <iRights_header>this.mform.value;

    //data.rec_company_id = this.gs.user.user_company_id;
    //data.rec_created_by = this.gs.user.user_code;


    this.ms.save(this.id, data).subscribe({
      next: (rec: iRights_header) => {
        this.loaddata(rec);
        /*
        const param = {
          id: this.id.toString()
        };
        this.gs.updateURL(param);
        */
        this.gs.showAlert(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }
    });

  }

  callBack(action: { id: string, rec: iBranchm }) {

    if (action.id == 'rec_branch_name') {
      this.mform.patchValue({
        rec_branch_id: action.rec ? action.rec.branch_id : 0,
        rec_branch_name: action.rec ? action.rec.branch_name : '',
      })

    }
  }

}
