import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjExpediente {
  sfechainicio: string = '';
  sexpediente: string = '';
  sdemandado: string = '';
  sdemandante: string = '';
  sespecialidad: string = '';
  sdistritojuris: string = '';
  sorganojuris: string = '';
  sespecialista: string = '';
  sjuez: string = '';
  smateria: string = '';
  ssumilla: string = '';
  sfechamodificacion: string = '';
  constructor() {}
}

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
})
export class ExpedientesComponent {
  lstExpedientes: Array<ObjExpediente> = [];

  constructor(private db: AngularFirestore) {
    this.getExpedientes();
  }

  getExpedientes(): void {
    this.db.collection('expedientes', ref => {
      return ref.limit(10);
    })
    .valueChanges()
    .subscribe((val: Array<any>) => {
      this.lstExpedientes = val;
      console.log(val);
    });
  }

}
