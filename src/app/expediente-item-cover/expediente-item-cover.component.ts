import { Component, Input, OnInit } from '@angular/core';
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
  urlcontrato: string = '';
}

@Component({
  selector: 'app-expediente-item-cover',
  templateUrl: './expediente-item-cover.component.html',
  styleUrls: ['./expediente-item-cover.component.scss']
})
export class ExpedienteItemCoverComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  objExpediente: ObjExpediente = new ObjExpediente();

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.getExpediente();
  }

  getExpediente(): void {
    let observando =  this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((val: any) => {
        this.objExpediente = new ObjExpediente();
        if (!!val) {
          this.objExpediente = val;
          let idtipodoc = val['idtipodoc'];
          if(idtipodoc == 'EXPEDIENTE-ORIGEN') {
            this.objExpediente['idtipodoc'] = 'EXPEDIENTE'
          } else if (idtipodoc == 'CASACION-2DA-SALA') {
            this.objExpediente['idtipodoc'] = 'CASACIÓN 2DA SALA'
          } else if (idtipodoc == 'CASACION-4TA-SALA') {
            this.objExpediente['idtipodoc'] = 'CASACIÓN 4TA SALA'
          } else if (idtipodoc == 'CARPETA-FISCAL') {
            this.objExpediente['idtipodoc'] = 'CARPETA FISCAL'
          }
        } else {
          window.alert('expediente no existe')
        }
        observando.unsubscribe();
      });
  }

}
