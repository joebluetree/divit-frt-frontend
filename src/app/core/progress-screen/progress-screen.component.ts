import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-progress-screen',
  templateUrl: './progress-screen.component.html',
  styleUrls: ['./progress-screen.component.css'],
  standalone: true,
  imports: [NgIf, AsyncPipe]
})
export class ProgressScreenComponent {

  constructor(public gs: GlobalService) {
  }

  ngOnInit(): void {
  }

}
