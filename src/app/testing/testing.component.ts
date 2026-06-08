import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  DocumentData
} from '@angular/fire/firestore';
import { AppService } from '../app.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-testing',
    templateUrl: './testing.component.html',
    styleUrls: ['./testing.component.scss'],
    imports: [CommonModule]
})
export class TestingComponent implements OnInit {
  appService = inject(AppService);

  constructor() { }

  ngOnInit(): void {

  }

}
