import { Component, Input } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { iSettings } from '../../models/isettings';
import { CustomControls } from '../../../app.config';
import { baseEditComponent } from '../../../shared/base-class/baseEditComponent';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.css'],
  standalone: true,
  imports: [...CustomControls]
})
export class SettingsEditComponent extends baseEditComponent {

  @Input() sappid: string = '';
  @Input() smenuid: string = '';
  @Input() stype: string = '';
  @Input() rec: any = {};

  inputType = 'text';

  format = "";

  //code = '';
  //name = '';
  //value = '';

  table_name = '';

  value_column = '';
  display_column1 = '';
  display_column2 = '';

  list_data = "";

  constructor(
    private ms: SettingsService,
  ) {
    super();
    this.mform = this.fb.group({
      code: [''],
      name: [''],
      value: [''],
    })
  }

  ngOnInit() {
    this.id = 0;

    this.init();

    //const mrec = JSON.parse(this.rec.value.replaceAll("'", '"'));

    if (this.rec.type == "INT" || this.rec.type == "NUMBER" || this.rec.type == "STRING") {
      this.format = 'input';
      if (this.rec.type == "INT" || this.rec.type == "NUMBER")
        this.inputType = 'number';
      if (this.rec.type == "STRING")
        this.inputType = 'text';
      //this.value = mrec.value;
      this.mform.patchValue({
        value: this.rec.value,
        code: this.rec.code,
        name: this.rec.name
      })
    }

    if (this.rec.type == "TABLE") {
      this.format = 'table';
      let col = this.rec.table.toString().split(",");

      this.table_name = col[0];
      this.value_column = col[1].trim();
      this.display_column1 = col[2].trim();
      this.display_column2 = col[3].trim();

      //this.value = this.rec.value;
      //this.code = this.rec.code;
      //this.name = this.rec.name;

      this.list_data = `[
        { 'caption': 'code', 'value': '${this.display_column1}' },
        { 'caption': 'name', 'value': '${this.display_column2}' }
      ]`;


      this.mform.patchValue({
        value: this.rec.value,
        code: this.rec.code,
        name: this.rec.name
      })
    }

    if (this.rec.type == "BOOLEAN") {
      this.format = 'boolean';
      this.inputType = 'boolean';
      //this.value = this.rec.value;
      this.mform.patchValue({
        value: this.rec.value,
        code: '',
        name: ''
      })
    }
  }

  callBack(action: { id: string, rec: any }) {

    let value = action.rec ? action.rec[this.value_column].toString() : '';
    let code = action.rec ? action.rec[this.display_column1].toString() : '';
    let name = action.rec ? action.rec[this.display_column2].toString() : '';

    if (action.rec) {
      value = action.rec[this.value_column].toString();
      code = action.rec[this.display_column1].toString();
      name = action.rec[this.display_column2].toString();
    }

    this.mform.patchValue({
      value: value,
      code: code,
      name: name,
    });
  }


  save() {

    let data = <iSettings>{ ...this.rec };

    /*
    if (this.format == 'input' || this.format == 'boolean') {
      const _value = { 'value': this.mform.value.value }
      data.value = JSON.stringify(_value);
    }

    if (this.format == 'table') {
      const _value = { 'value': this.mform.value.value, 'code': this.mform.value.code, 'name': this.mform.value.name }
      data.value = JSON.stringify(_value);
    }
    */

    data.value = this.mform.value.value;
    data.code = this.mform.value.code;
    data.name = this.mform.value.name;

    //data.rec_company_id = this.gs.user.user_company_id;
    data.rec_edited_by = this.gs.user.user_code;

    const param = {
      'id': data.id,
      'mode': "edit"
    }

    console.log(data);

    this.ms.save(param, data, '/api/settings/SaveAsync').subscribe({
      next: (v: iSettings) => {
        //this.store.dispatch(upsert_row({ record: data, category: data.category }));
      },
      error: (e) => {
        this.gs.showAlert([e.error]);
      },
      complete: () => { }

    })
  }

}
