import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
    standalone: true,
    imports: [NgIf, NgFor]
})
export class ToastComponent {

  bShow: boolean = false;

  messages: string[] = [];

  sub: Subscription;

  _interval_id: any;
  _interval = 0;


  constructor(private gs: GlobalService) {

    this._interval_id = setInterval(() => {
      this._interval -= 1;
      if (this._interval <= 0)
        this.hide();
    }, 1000);

    this.sub = this.gs.toast$.subscribe({
      next: (msg: string[]) => {
        this.messages = msg;
        this._interval = 5;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearInterval(this._interval_id);
  }


  hide() {
    this.messages = [];
    this.bShow = false;

  }

}
