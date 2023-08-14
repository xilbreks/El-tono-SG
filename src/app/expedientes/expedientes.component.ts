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
    let obs = this.db.collection('expedientes')
    .valueChanges()
    .subscribe((val: Array<any>) => {
      console.log('Total de expedientes:', val.length);

      let nLaboral = 0;
      let nCivil = 0;
      let nPenal = 0;
      let nFamilia = 0;
      let nConstitucional = 0;
      let nOtros = 0;

      val.forEach(e => {
        switch(e.sespecialidad) {
          case 'LABORAL':
            nLaboral++;
            break;
          case 'CIVIL':
            nCivil++;
            break;
          case 'PENAL':
            nPenal++;
            break;
          case 'FAMILIA':
            nFamilia++;
            break;
          case 'CONSTITUCIONAL':
            nConstitucional++;
            break;
          default:
            nOtros++;
            console.log(e)
        }
      });

      console.log({
        nLaboral: nLaboral,
        nCivil: nCivil,
        nPenal: nPenal,
        nFamilia: nFamilia,
        nConstitucional: nConstitucional,
        nOtros: nOtros
      })

      this.lstExpedientes = val;

      obs.unsubscribe();
    });
  }

}
