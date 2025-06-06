import { Component, Input } from '@angular/core';
import { CustomControls } from '../../app.config';
import { MatDialog } from '@angular/material/dialog';
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
      width: '1500px',     // Constant width
      maxHeight: '80vh',    // Constant height
      disableClose: false, // Optional: disables closing the dialog by clicking outside
      data: this.data
    });
  }
  
  isMemoType(): boolean {
    const type = (this.data?.parent_type || '').toUpperCase();
    const memoTypes = [
      'AIREXP-CNTR-MEMO',
      'AIRIMP-CNTR-MEMO',
      'AIRIMP-SHIP-MEMO',
      'OTH-CNTR-MEMO',
      'SEAEXP-CNTR-MEMO',
      'SEAIMP-CNTR-MEMO',
      'SEAIMP-SHIP-MEMO',
    ];

    for (const t of memoTypes) {
      if (t === type) {
        return true;
      }
    }

    return false;
  }


}