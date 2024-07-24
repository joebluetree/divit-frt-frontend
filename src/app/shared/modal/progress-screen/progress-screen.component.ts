import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable, tap } from 'rxjs';
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
