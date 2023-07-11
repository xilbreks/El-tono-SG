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
  public nsemana: number = 0;
  constructor() {}
}

@Component({
  selector: 'app-colaborador-rdt',
  templateUrl: './colaborador-rdt.component.html',
  styleUrls: ['./colaborador-rdt.component.scss']
})
export class ColaboradorRdtComponent {
  idColaborador: any = '';
  lstRDTs: Array<ObjRdt> = [];

  constructor(private db: AngularFirestore) {
    this.idColaborador = localStorage.getItem('idusuario');
    this.getRdts();
  }

  public getRdts(): void {
    console.log(this.idColaborador);
    this.db
      .collection('rdts', (ref) => {
        return ref.where('idcolaborador', '==', this.idColaborador);
      })
      .valueChanges()
      .subscribe((val: Array<any>) => {
        this.lstRDTs = val.reverse();
      });
  }

  updateHoraIngreso(objHora: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      shoraingreso: objHora.value
    });
  }

  updateMinutoIngreso(objMinuto: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      sminutoingreso: objMinuto.value
    });
  }

  updateHoraSalida(objHora: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      shorasalida: objHora.value
    });
  }

  updateMinutoSalida(objMinuto: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      sminutosalida: objMinuto.value
    });
  }

}
