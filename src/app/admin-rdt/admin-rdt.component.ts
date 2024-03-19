import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
export class AdminRdtComponent {
  dFechaBusqueda: FormControl = new FormControl(null);
  lstRdts: Array<ObjRdt> = [];
  frmEntrada: FormGroup;
  frmSalida: FormGroup;
  lUpdating: boolean = false;
  lLoading: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmEntrada = new FormGroup({
      idrdt: new FormControl(null, Validators.required),
      shoraingreso: new FormControl(null, Validators.required),
      sminutoingreso: new FormControl(null, Validators.required),
    });
    this.frmSalida = new FormGroup({
      idrdt: new FormControl(null, Validators.required),
      shorasalida: new FormControl(null, Validators.required),
      sminutosalida: new FormControl(null, Validators.required),
    });

    this.setFechaHoy();
    this.getRdts();
  }

  setFechaHoy() {
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
  }

  public getRdts(): void {
    this.lLoading = true;
    this.db
      .collection('rdts', (ref) => {
        return ref.where('sfecha', '==', this.dFechaBusqueda.value)
      })
      .valueChanges()
      .subscribe((rdts: Array<any>) => {
        this.lstRdts = [];
        rdts.forEach((rdt) => {
          this.lstRdts.push(
            new ObjRdt(rdt)
          );
        });
        this.lLoading = false;
      });
  }

  public toggleEditable(idrdt: string, leditable: boolean): void {
    this.db.collection('rdts').doc(idrdt).update({
      leditable: !leditable,
    });
  }

  public openEntradaModal(idrdt: string, modal: any): void {
    this.frmEntrada.setValue({
      idrdt: idrdt,
      shoraingreso: null,
      sminutoingreso: null
    })
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  public openSalidaModal(idrdt: string, modal: any): void {
    this.frmSalida.setValue({
      idrdt: idrdt,
      shorasalida: null,
      sminutosalida: null
    })
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  marcarEntrada(): void {
    this.lUpdating = true;
    let idrdt = this.frmEntrada.value['idrdt'];

    this.db
      .collection('rdts')
      .doc(idrdt)
      .update({
        shoraingreso: this.frmEntrada.value['shoraingreso'],
        sminutoingreso: this.frmEntrada.value['sminutoingreso'],
      })
      .then(() => {
        this.frmEntrada.reset();
      })
      .catch(() => {
        window.alert('ERROR al marcar entrada')
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      });
  }

  marcarSalida(): void {
    this.lUpdating = true;
    let idrdt = this.frmSalida.value['idrdt'];

    this.db
      .collection('rdts')
      .doc(idrdt)
      .update({
        shorasalida: this.frmSalida.value['shorasalida'],
        sminutosalida: this.frmSalida.value['sminutosalida'],
      })
      .then(() => {
        this.frmSalida.reset();
      })
      .catch(() => {
        window.alert('ERROR al marcar salida')
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      });
  }

  /**
   * DESCARGAR EXCEL
   */

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
              horas = horas + Number(tarea['shorasatencion']);
              minutos = minutos + Number(tarea['sminutosatencion']);
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

              let minutosReales = (Number(tarea['shorasatencion']) * 60 + Number(tarea['sminutosatencion'])) * (rdt.nTiempoOficina / rdt.nTiempoTareas);
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

              tarea['productidad1'] = (Number(tarea['shorasatencion']) * 60 + Number(tarea['sminutosatencion'])) / rdt.nTiempoTareas;
              tarea['productidad2'] = (Number(tarea['shorasatencion']) * 60 + Number(tarea['sminutosatencion'])) / rdt.nTiempoOficina;

              tarea['productidad1'] = Number.parseFloat(tarea['productidad1']).toFixed(2);
              tarea['productidad2'] = Number.parseFloat(tarea['productidad2']).toFixed(2);

              // Agregando la fecha de registro de la tarea
              let dfreg = new Date(Number(tarea.idtarea));
              tarea['sfechareg'] = dfreg.getDate() + '/' +
              (dfreg.getMonth() + 1) + '/' + dfreg.getFullYear() + ' ' +
              (dfreg.getHours()>10?dfreg.getHours():'0'+dfreg.getHours()) + ':' + 
              (dfreg.getMinutes()>10?dfreg.getMinutes():'0'+dfreg.getMinutes());

              // Agregar Hora de entrada y salida
              tarea['hentrada'] = rdt.shoraingreso + ':' + rdt.sminutoingreso;
              tarea['hsalida'] = rdt.shorasalida + ':' + rdt.sminutosalida;
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
            "Tipo cliente": tarea['stipocliente'],
            "Tipo de Atencion": tarea['stipoatencion'],
            "Delegado por": tarea['sdelegadopor'],
            "Expediente": tarea['sexpediente'],
            "Tipo de Proceso": tarea['sespecialidad'],
            "Demandante": tarea['sdemandante'],
            "Demandado": tarea['sdemandado'],
            "ITER": tarea['niter'],
            "Avance": tarea['navance'],
            "Cobro de Honorarios": tarea['ncobrohonorario'],
            "Ingreso para Aranceles": tarea['ningresoarancel'],
            "Salida para Aranceles": tarea['nsalidaarancel'],
            "Fecha de culminacion": tarea['sfculminacion'],
            "Suma Tiempo Atencion": { t: 'n', f: '=' + tarea['nTiempoTareas'] + '/1440' },
            "Tiempo de Atencion": tarea['shorasatencion'] + ':' + tarea['sminutosatencion'],
            "Codigo ejecutivo": tarea['ncodeje'],
            "Horas en el estudio": { t: 'n', f: '=' + tarea['nTiempoOficina'] + '/1440' },
            "Tiempo real": tarea['srealtime'],
            "Prod. Segun RDT": tarea['productidad1'],
            "Prod. Segun horario": tarea['productidad2'],
            "Hora Entrada": tarea['hentrada'],
            "Hora Salida": tarea['hsalida'],
            "Descripción de la tarea": tarea['sdeseje'].trim().slice(0,2500),
            "Acciones por realizar": tarea['sacceje'].trim().slice(0,2500),
            "Fecha y Hora de guardado": tarea['sfechareg']
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
