import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public dfecha: string = '';
  public shoraingreso: string = '';
  public shorasalida: string = '';
  public sminutoingreso: string = '';
  public sminutosalida: string = '';
  public leditable: boolean = true;
  constructor() {}
}

class ObjColaborador {
  public id: string = '';
  public lactive: string = '';
  public scargo: string = '';
  public snombre: string = '';
  constructor() {}
}

class ObjFecha {
  public sdia: string = '-';
  public smes: string = '-';
  public syear: string = '-';
  constructor() {}
}

@Component({
  selector: 'app-admin-rdt',
  templateUrl: './admin-rdt.component.html',
  styleUrls: ['./admin-rdt.component.scss'],
})
export class AdminRdtComponent {
  objFechaHoy: ObjFecha = new ObjFecha();
  sFechaHoy: string = '';
  lstColaboradores: Array<ObjColaborador> = [];
  lstRdts: Array<ObjRdt> = [];
  lPermitirGenerarRtd: boolean = false;

  constructor(private db: AngularFirestore) {
    this.sFechaHoy = this.getFechaHoy();
    this.getColaboradores();
    this.getRdts();
    this.verificarRdtsHoy();
  }

  public getFechaHoy(): string {
    const d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = '' + d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  public getRdts(): void {
    this.db
      .collection('rdts', (ref) => {
        return ref.orderBy('dfecha', 'desc').limit(50);
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.lstRdts = val;
      });
  }

  public toggleEditable(idrdt: string, leditable: boolean): void {
    this.db.collection('rdts').doc(idrdt).update({
      leditable: !leditable,
    });
  }

  public getColaboradores(): void {
    this.db
      .collection('colaboradores', (ref) => {
        return ref.where('lactive', '==', true);
      })
      .valueChanges()
      .subscribe((val: Array<any>) => {
        this.lstColaboradores = val;
      });
  }

  public verificarRdtsHoy(): void {
    // Funcion destinada a verificar si se han generado RDT para el día de hoy
    this.db
      .collection('rdts', (ref) => {
        return ref.orderBy('dfecha', 'desc').limit(1);
      })
      .valueChanges()
      .subscribe((val: any) => {
        const sFechaUltimoRdt = val[0].dfecha;
        if (this.sFechaHoy == sFechaUltimoRdt) {
          this.lPermitirGenerarRtd = false;
        } else {
          this.lPermitirGenerarRtd = true;
        }
      });
  }

  public crearRdts(): void {
    this.lPermitirGenerarRtd = false;
    this.lstColaboradores.forEach((colaborador) => {
      this.db
        .collection('rdts')
        .doc(this.sFechaHoy + '-' + colaborador.id)
        .set({
          dfecha: this.sFechaHoy,
          idcolaborador: colaborador.id,
          idrdt: this.sFechaHoy + '-' + colaborador.id,
          leditable: true,
          shoraingreso: '--',
          shorasalida: '--',
          sminutoingreso: '--',
          sminutosalida: '--',
        });
    });
  }

}
