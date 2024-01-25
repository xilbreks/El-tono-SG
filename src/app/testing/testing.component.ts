import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';
import { AngularFireStorage } from '@angular/fire/compat/storage';

interface Pago {
  sdescripcion: string,
  sfecha: string,
  sexpediente: string,
  lactive: boolean,
  idpago: string,
  nmonto: number,
  smodificador: string
}

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {
  regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}/;
  fcText: FormControl = new FormControl([]);

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

}
