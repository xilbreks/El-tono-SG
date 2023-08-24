import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-rdt-generator',
  templateUrl: './rdt-generator.component.html',
  styleUrls: ['./rdt-generator.component.scss']
})
export class RdtGeneratorComponent {
  sFechaHoy: string = '';
  nSemana: number = 0;
  lstColaboradores: Array<any> = [];

  constructor(private db: AngularFirestore) {
    this.nSemana = this.getSemanaHoy();
    this.sFechaHoy = this.getFechaHoy();
    this.getColaboradores();
  }

  public crearRdts(): void {


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
          nsemana: this.nSemana,
          nday: this.nDay
        });
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

  public getSemanaHoy(): number {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
  }

  get nDay(): number {
    let date = new Date();
    return Math.floor(
      (date.getTime() - (new Date(date.getFullYear(), 0, 0)).getTime()) / (1000 * 60 * 60 * 24)
    );
  }

}
