import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

class ObjUser {
  id: string = '';
  snombre: string = '';
  constructor() { }
}

interface ObjRdt {
  idrdt: string;
  sfecha: string;
  leditable: boolean;
  shoraingreso: string;
  shorasalida: string;
  sminutoingreso: string;
  sminutosalida: string;
  observaciones: string;
}

@Component({
  selector: 'app-colaborador-rdt',
  templateUrl: './colaborador-rdt.component.html',
  styleUrls: ['./colaborador-rdt.component.scss']
})
export class ColaboradorRdtComponent {
  idColaborador: any = '';
  objUser: ObjUser = new ObjUser();
  lstRDTs: Array<ObjRdt> = [];
  lLoading: boolean = false;

  constructor(
    private db: AngularFirestore,
  ) {
    this.idColaborador = localStorage.getItem('idusuario');
    this.getUser();
    this.getRdts();
  }

  getUser() {
    let obs = this.db
      .collection('colaboradores', ref => {
        return ref.where('id', '==', this.idColaborador)
      }).get();

    firstValueFrom(obs).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      });

      const usuario = lista[0];
      this.objUser.id = usuario.id;
      this.objUser.snombre = usuario.snombre.toUpperCase();
    });
  }

  getRdts() {
    this.lLoading = true;
    let obs = this.db
      .collection('rdts', (ref) => {
        return ref.where('idcolaborador', '==', this.idColaborador)
          .orderBy('sfecha', 'desc')
          .limit(26);
      }).get();

    firstValueFrom(obs).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      });
      return lista
    }).then((data: Array<any>) => {
      this.lstRDTs = data.map((x: any) => {
        let sday = x.sfecha.slice(8, 10);
        let smonth = x.sfecha.slice(5, 7);
        let syear = x.sfecha.slice(0, 4);
        let sfechalocal = sday + '/' + smonth + '/' + syear;

        return {
          idrdt: x.idrdt,
          sfecha: sfechalocal,
          leditable: x.leditable,
          shoraingreso: x.shoraingreso,
          shorasalida: x.shorasalida,
          sminutoingreso: x.sminutoingreso,
          sminutosalida: x.sminutosalida,
          observaciones: x.observaciones,
        }
      });
      this.lLoading = false;
    });
  }

}
