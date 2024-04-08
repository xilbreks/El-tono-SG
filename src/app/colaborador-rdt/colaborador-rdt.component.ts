import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    this.db
      .collection('colaboradores')
      .doc(this.idColaborador)
      .valueChanges()
      .subscribe((u: any) => {
        this.objUser.id = u.id;
        this.objUser.snombre = u.snombre.toUpperCase();
      })
  }

  getRdts() {
    this.lLoading = true;
    this.db
      .collection('rdts', (ref) => {
        return ref.where('idcolaborador', '==', this.idColaborador)
          .orderBy('sfecha', 'desc')
          .limit(22);
      })
      .valueChanges()
      .subscribe((data: Array<any>) => {
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
          }
        });
        this.lLoading = false;
      });
  }

}
