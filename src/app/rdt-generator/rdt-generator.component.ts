import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class clsUser {
  id: string;
  snombre: string;
  constructor(data: {
    id: string,
    snombre: string
  }) {
    this.id = data.id;
    this.snombre = data.snombre;
  }
}

@Component({
  selector: 'app-rdt-generator',
  templateUrl: './rdt-generator.component.html',
  styleUrls: ['./rdt-generator.component.scss']
})
export class RdtGeneratorComponent {
  lstUsers: Array<clsUser> = [];
  lLoadingUsers = false;

  dDate: Date;
  nDate: number = 0;
  sDate: string = '';
  nWeek: number = 0;
  nDay: number = 0;

  lGeneratingRDTs = false;

  constructor(private db: AngularFirestore) {
    this.getColaboradores();
    this.dDate = new Date();
    this.setNDate();
    this.setSDate();
    this.setNWeek();
    this.setNDay();
  }

  getColaboradores(): void {
    this.lLoadingUsers = true;
    let obs = this.db
      .collection('colaboradores', (ref) => {
        return ref.where('lactive', '==', true);
      })
      .valueChanges()
      .subscribe((users: Array<any>) => {
        users.forEach((u) => {
          this.lstUsers.push(
            new clsUser({
              id: u.id,
              snombre: u.snombre
            })
          );
        })
        this.lLoadingUsers = false;
        obs.unsubscribe();
      });
  }

  setNDate() {
    this.nDate = this.dDate.getTime();
  }

  setSDate() {
    let d = this.dDate;
    var year = '' + d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    this.sDate = [year, month, day].join('-');
  }

  setNWeek() {
    let d: any = this.dDate;
    let startDate: any = new Date(d.getFullYear(), 0, 1);
    var days = Math.floor((d - startDate) /
      (24 * 60 * 60 * 1000));

    this.nWeek = Math.ceil(days / 7);
  }

  setNDay() {
    let d = this.dDate;
    this.nDay = Math.floor(
      (d.getTime() - (new Date(d.getFullYear(), 0, 0)).getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  crearRdts(): void {
    this.lGeneratingRDTs = true;
    this.lstUsers.forEach((user) => {
      let idrdt = this.sDate + '-' + user.id;
      this.db
        .collection('rdts')
        .doc(idrdt)
        .set({
          idrdt: idrdt,
          nfecha: this.nDate,
          sfecha: this.sDate,
          nsemana: this.nWeek,
          ndia: this.nDay,
          idcolaborador: user.id,
          scolaborador: user.snombre,
          leditable: true,
          shoraingreso: '--',
          shorasalida: '--',
          sminutoingreso: '--',
          sminutosalida: '--',
          observaciones: '',
        })
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          window.alert('Ocurrió un ERROR');
        })
        .finally(() => {
          this.lGeneratingRDTs = false;
        });
    });
  }

}
