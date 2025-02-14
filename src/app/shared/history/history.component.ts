import { Component, Input } from '@angular/core';
import { CustomControls } from '../../app.config';
import { MatDialog } from '@angular/material/dialog';
import { HistorymListComponent } from './history-list/historym-list.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [...CustomControls],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  data: any;

  @Input('inputdata') set inputdata(v: any) {
    this.data = v;
  }

  constructor(
    public dialog: MatDialog
  ) { }

  openHistory(): void {
    const dialogRef = this.dialog.open(HistorymListComponent, {
      hasBackdrop: true,
      width: '1500px',
      data: this.data
    });
  }

}
