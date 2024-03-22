import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjExpediente {
  sfechainicio: string = '';
  sexpediente: string = '';
  smatchexp: string = '';
  sdemandado: string = '';
  sdemandante: string = '';
  idtipodoc: string = '';
  sespecialidad: string = '';
  sdistritojuris: string = '';
  sorganojuris: string = '';
  sespecialista: string = '';
  smateria: string = '';
  ssumilla: string = '';
  sfechamodificacion: string = '';
  lcontrato: boolean = false;
  scodigo: string = '';
}

@Component({
  selector: 'app-exp-item-cover',
  templateUrl: './exp-item-cover.component.html',
  styleUrls: ['./exp-item-cover.component.scss']
})
export class ExpItemCoverComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  objExpediente: ObjExpediente = new ObjExpediente();
  lLoading: boolean = false;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getExpediente();
  }

  getExpediente(): void {
    this.lLoading = true;
    let obs = this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((val: any) => {
        this.objExpediente = new ObjExpediente();
        if (!!val) {
          this.objExpediente = val;
          let idtipodoc = val['idtipodoc'];
          if (idtipodoc == 'EXPEDIENTE-ORIGEN') {
            this.objExpediente['idtipodoc'] = 'EXPEDIENTE'
          } else if (idtipodoc == 'CASACION-2DA-SALA') {
            this.objExpediente['idtipodoc'] = 'CASACIÓN 2DA SALA'
          } else if (idtipodoc == 'CASACION-4TA-SALA') {
            this.objExpediente['idtipodoc'] = 'CASACIÓN 4TA SALA'
          } else if (idtipodoc == 'CARPETA-FISCAL') {
            this.objExpediente['idtipodoc'] = 'CARPETA FISCAL'
          } else if (idtipodoc == 'EXPEDIENTE-PROVISIONAL') {
            this.objExpediente['idtipodoc'] = 'EXPEDIENTE PROVISIONAL'
          } else if (idtipodoc == 'EXPEDIENTE-CAUTELAR') {
            this.objExpediente['idtipodoc'] = 'EXPEDIENTE CAUTELAR'
          }
        } else {
          window.alert('expediente no existe')
        }

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

}
