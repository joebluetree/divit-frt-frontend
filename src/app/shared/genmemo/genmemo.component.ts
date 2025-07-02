import { Component, Input } from '@angular/core';
import { CustomControls } from '../../app.config';
import { MatDialog } from '@angular/material/dialog';
import { GenMemoEditComponent } from './genmemo-edit/genmemo-edit.component';

@Component({
  selector: 'app-genmemo',
  standalone: true,
  imports: [...CustomControls],
  templateUrl: './genmemo.component.html',
  styleUrl: './genmemo.component.css'
})

//Name : Sourav V
//Date : 12/06/2025
//Command : Create the General Remark Components.
//version 1.0

export class GenMemoComponent {

  data: any;
  buttonLabel: string = 'GENMEMO';

  @Input('inputdata') set inputdata(v: any) {
    this.data = v;
  }
  @Input() set button_name(name: string) {
    this.buttonLabel = name || 'GENMEMO';
  }
  constructor(public dialog: MatDialog) { }

  openGenMemo(): void {
    const dialogRef = this.dialog.open(GenMemoEditComponent, {
      hasBackdrop: true,
      width: '1500px',     // Constant width
      maxHeight: '80vh',    // Constant height
      disableClose: false, // Optional: disables closing the dialog by clicking outside
      data: this.data,
    });
  }
}