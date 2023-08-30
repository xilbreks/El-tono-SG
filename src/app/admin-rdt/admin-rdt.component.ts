import { AfterViewInit, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';

import * as XLSX from 'xlsx';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public scolaborador: string = '';
  public sfecha: string = '';
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
    scolaborador: string,
    sfecha: string,
    shoraingreso: string,
    shorasalida: string,
    sminutoingreso: string,
    sminutosalida: string,
    leditable: boolean,
    nsemana: number
  }) {
    this.idrdt = a.idrdt;
    this.idcolaborador = a.idcolaborador;
    this.scolaborador = a.scolaborador;
    this.sfecha = a.sfecha;
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

@Component({
  selector: 'app-admin-rdt',
  templateUrl: './admin-rdt.component.html',
  styleUrls: ['./admin-rdt.component.scss'],
})
export class AdminRdtComponent implements AfterViewInit {
  dFechaBusqueda: FormControl = new FormControl(null);
  lstRdts: Array<ObjRdt> = [];

  constructor(private db: AngularFirestore) {
  }

  ngAfterViewInit() {
    let d = new Date();
    var year = '' + d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    let s = [year, month, day].join('-');

    this.dFechaBusqueda.setValue(s);
    this.getRdts();
  }

  public getRdts(): void {
    let observable1 = this.db
      .collection('rdts', (ref) => {
        return ref.where('sfecha', '==', this.dFechaBusqueda.value)
      })
      .valueChanges()
      .subscribe((rdts: Array<any>) => {
        this.lstRdts = [];
        rdts.forEach((rdt) => {
          this.lstRdts.unshift(
            new ObjRdt(rdt)
          );
        })

        observable1.unsubscribe();
      });
  }

  public toggleEditable(idrdt: string, leditable: boolean): void {
    this.db.collection('rdts').doc(idrdt).update({
      leditable: !leditable,
    });
  }

  public descargarExcel(): void {
    let todo_Excel: Array<any> = [];

    let observable1 = this.db
      .collection('tareas', (ref) => {
        return ref.where('sfecha', '==', this.dFechaBusqueda.value)
      })
      .valueChanges()
      .subscribe((tarrr: Array<any>) => {
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

              // Calcular el tiempo en oficina pero en formato horas
              let sHorasOficina = Math.floor(rdt.nTiempoOficina / 60);
              let sMinutosOficina = rdt.nTiempoOficina - (sHorasOficina * 60);
              // tarea['nTiempoOficina'] = sHorasOficina + ':' + sMinutosOficina;
              tarea['nTiempoOficina'] = rdt.nTiempoOficina;

              let sHorasTarea = Math.floor(rdt.nTiempoTareas / 60);
              let sMinutosTarea = rdt.nTiempoTareas - (sHorasTarea * 60);
              // tarea['nTiempoTareas'] = sHorasTarea + ':' + sMinutosTarea;
              tarea['nTiempoTareas'] = rdt.nTiempoTareas;

              let minutosReales = (Number(tarea['nhorasatencion']) * 60 + Number(tarea['nminutosatencion'])) * (rdt.nTiempoOficina / rdt.nTiempoTareas);
              let sHorasReales = Math.floor(minutosReales / 60);
              let sMinutosReales = Math.round(minutosReales - sHorasReales * 60);
              tarea['srealtime'] = '';
              if (sHorasReales < 10) {
                tarea['srealtime'] = '0' + sHorasReales;
              } else {
                tarea['srealtime'] = '' + sHorasReales;
              }
              if (sMinutosReales < 10) {
                tarea['srealtime'] += ':0' + sMinutosReales;
              } else {
                tarea['srealtime'] += ':' + sMinutosReales;
              }

              tarea['productidad1'] = (Number(tarea['nhorasatencion']) * 60 + Number(tarea['nminutosatencion'])) / rdt.nTiempoTareas;
              tarea['productidad2'] = (Number(tarea['nhorasatencion']) * 60 + Number(tarea['nminutosatencion'])) / rdt.nTiempoOficina;

              tarea['productidad1'] = Number.parseFloat(tarea['productidad1']).toFixed(2);
              tarea['productidad2'] = Number.parseFloat(tarea['productidad2']).toFixed(2);
            }
          });
        });

        // Adjuntar registros al excel

        tareas.sort((a, b) => {
          if (a.idrdt > b.idrdt) return 1;
          else return -1;
        }).forEach(tarea => {
          todo_Excel.push({
            "Usuario": tarea['idrdt'],
            "Tipo cliente": tarea['ntipocliente'],
            "Tipo de Atencion": tarea['ntipoatencion'],
            "Delegado por": tarea['sdelegadopor'],
            "Expediente": tarea['sexpediente'],
            "Tipo de Proceso": tarea['ntipoproceso'],
            "Cliente": tarea['scliente'],
            "Demandado": tarea['sdemandado'],
            "ITER": tarea['niter'],
            "Avance": tarea['navance'],
            "Fecha de culminacion": tarea['fculminacion'],
            "Suma Tiempo Atencion": { t: 'n', f: '=' + tarea['nTiempoTareas'] + '/1440' },
            "Tiempo de Atencion": tarea['nhorasatencion'] + ':' + tarea['nminutosatencion'],
            "Codigo ejecutivo": tarea['ncodeje'],
            "Horas en el estudio": { t: 'n', f: '=' + tarea['nTiempoOficina'] + '/1440' },
            "Tiempo real": tarea['srealtime'],
            "Prod. Segun RDT": tarea['productidad1'],
            "Prod. Segun horario": tarea['productidad2'],
            "Descripción de la tarea": tarea['sdeseje'],
            "Acciones por realizar": tarea['sacceje']
          })
        });

        const worksheet = XLSX.utils.json_to_sheet(todo_Excel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");
        XLSX.writeFile(workbook, 'RDTs - fecha ' + this.dFechaBusqueda.value + '.xlsx', { compression: true });

        observable1.unsubscribe();
      });

  }



}
