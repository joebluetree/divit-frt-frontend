import { Component, Input } from '@angular/core';
import { CustomControls } from '../../app.config';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadmListComponent } from './fileupload-list/fileuploadm-list.component';
import { FileUploadmEditComponent } from './fileupload-edit/fileuploadm-edit.component';


@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [...CustomControls],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileUploadComponent {

  data: any;

  @Input('inputdata') set inputdata(v: any) {
    this.data = v;
  }

  constructor(
    public dialog: MatDialog
  ) { }

  openAttachment(): void {
    const dialogRef = this.dialog.open(FileUploadmEditComponent, {
      hasBackdrop: true,
      width: '1500px',
      data: this.data
    });
  }

}
