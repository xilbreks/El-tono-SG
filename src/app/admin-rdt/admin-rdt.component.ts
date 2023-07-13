import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as XLSX from 'xlsx';

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
  public nTiempoOficina: number = 0;
  public nTiempoTareas: number = 0;
  constructor(a: {
    idrdt: string,
    idcolaborador: string,
    dfecha: string,
    shoraingreso: string,
    shorasalida: string,
    sminutoingreso: string,
    sminutosalida: string,
    leditable: boolean,
    nsemana: number
  }) {
    this.idrdt = a.idrdt;
    this.idcolaborador = a.idcolaborador;
    this.dfecha = a.dfecha;
    this.shoraingreso = a.shoraingreso;
    this.shorasalida = a.shorasalida;
    this.sminutoingreso = a.sminutoingreso;
    this.sminutosalida = a.sminutosalida;
    this.leditable = a.leditable;
    this.nsemana = a.nsemana;

    let horasTrabajadas = Number(a.shorasalida) - Number(a.shoraingreso);
    let minutosTrbajados = Number(a.sminutosalida) - Number(a.sminutoingreso);
    this.nTiempoOficina = horasTrabajadas * 60 + minutosTrbajados;
  }
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
  nSemana: number = 0;
  lstColaboradores: Array<ObjColaborador> = [];
  lstRdts: Array<ObjRdt> = [];
  lPermitirGenerarRtd: boolean = false;

  constructor(private db: AngularFirestore) {
    this.sFechaHoy = this.getFechaHoy();
    this.nSemana = this.getSemanaHoy();
    this.getColaboradores();
    this.getRdts(this.nSemana);
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

  public getSemanaHoy(): number {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    
    return Math.ceil(days / 7);
  }

  public cambiarSemana(objSemana: any): void {
    this.nSemana = objSemana.value;
    this.getRdts(this.nSemana);
  }

  public getRdts(nSemana:number): void {
    this.db
      .collection('rdts', (ref) => {
        return ref.where('nsemana','==',Number(nSemana))
      })
      .valueChanges()
      .subscribe((rdts: Array<any>) => {
        this.lstRdts = [];
        rdts.forEach((rdt)=>{
          this.lstRdts.unshift(
            new ObjRdt(rdt)
          );
        })
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
    let nSemanaHoy = this.getSemanaHoy();
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
          nsemana: nSemanaHoy
        });
    });
  }

  public descargarExcel(): void {
    let todo_Excel: Array<any> = [];

    let observable1 = this.db.collection('tareas', (ref) => {
      return ref.where('nsemana', '==', Number(this.nSemana))
    })
    .valueChanges()
    .subscribe((tarrr: Array<any>)=>{
      let tareas = tarrr;
      // Encontrar tareas hijos del RDT
      this.lstRdts.forEach(rdt => {
        let horas = 0;
        let minutos = 0;
        tareas.forEach(tarea => {
          if (rdt.idrdt == tarea['idrdt']) {
            horas = horas + Number(tarea['nhorasatencion']);
            minutos = minutos + Number(tarea['nminutosatencion']);
          }
        });
        rdt.nTiempoTareas = horas * 60 + minutos;
        tareas.forEach(tarea => {
          if (rdt.idrdt == tarea['idrdt']) {
            tarea['realtime'] = (Number(tarea['nhorasatencion']) * 60 + Number(tarea['nminutosatencion'])) * (rdt.nTiempoOficina / rdt.nTiempoTareas);
            tarea['productidad1'] = (Number(tarea['nhorasatencion']) * 60 + Number(tarea['nminutosatencion'])) / rdt.nTiempoTareas;
            tarea['productidad2'] = (Number(tarea['nhorasatencion']) * 60 + Number(tarea['nminutosatencion'])) / rdt.nTiempoOficina;
          }
        });
      });

      // Adjuntar registros al excel

      tareas.forEach(tarea=>{
        todo_Excel.push({
          "Usuario":tarea['idrdt'],
          "Tipo cliente":tarea['ntipocliente'],
          "Tipo de Atencion":tarea['ntipoatencion'],
          "Delegado por":tarea['sdelegadopor'],
          "Expediente":tarea['sexpediente'],
          "Tipo de Proceso":tarea['ntipoproceso'],
          "Descripcion de la tarea":tarea['sdestarea'],
          "Cliente":tarea['scliente'],
          "Demandado":tarea['sdemandado'],
          "ITER":tarea['niter'],
          "Avance":tarea['navance'],
          "Fecha de culminacion":tarea['fculminacion'],
          "Tiempo de Atencion": tarea['stiempoatencion']?tarea['stiempoatencion']:tarea['nhorasatencion']+':'+tarea['nminutosatencion'],
          // "Tiempo real": tarea['realtime'], // added
          "Prod. Segun RDT": tarea['productidad1'], // added
          "Prod. Segun horario": tarea['productidad2'], // added
          "Codigo ejecutivo":tarea['ncodeje'],
          "Descipcion ejecutiva":tarea['sdeseje'],
          "Acciones ejecutivas":tarea['sacceje']
        })
      });

      const worksheet = XLSX.utils.json_to_sheet(todo_Excel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");
      XLSX.writeFile(workbook, 'RDTs - semana '+this.nSemana+'.xlsx', { compression: true });

      observable1.unsubscribe();
    });
    
  }

}
