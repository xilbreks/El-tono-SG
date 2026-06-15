import { Component, inject, OnInit } from '@angular/core';

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
    imports: []
})
export class TestingComponent implements OnInit {
  appService = inject(AppService);

  constructor() { }

  ngOnInit(): void {

  }

}
