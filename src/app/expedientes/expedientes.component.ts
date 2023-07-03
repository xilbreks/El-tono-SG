import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
})
export class ExpedientesComponent {
  lstExpedientes: Array<any> = [];

  constructor(private db: AngularFirestore) {
    this.getExpedientes();
  }

  getExpedientes(): void {
    this.db.collection('expedientes', ref => {
      return ref.where('sEspecialidad', 'not-in', ['LABORAL']);
    }).valueChanges().subscribe((val: Array<any>) => {
      this.lstExpedientes = val;
      console.log(val);
    });
  }

}
