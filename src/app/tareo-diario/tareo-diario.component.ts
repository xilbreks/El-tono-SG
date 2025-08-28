import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tareo } from '../_interfaces/tareo';
import { firstValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tareo-diario',
  templateUrl: './tareo-diario.component.html',
  styleUrl: './tareo-diario.component.scss'
})
export class TareoDiarioComponent {
  fcFecha: FormControl = new FormControl(null);
  tareos: Tareo[] = [];

  frmEntrada: FormGroup;
  frmSalida: FormGroup;
  frmObserv: FormGroup;

  cargando = false;
  guardando = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmEntrada = new FormGroup({
      idTareo: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      minuto: new FormControl(null, Validators.required),
    });

    this.frmSalida = new FormGroup({
      idTareo: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      minuto: new FormControl(null, Validators.required),
    });

    this.frmObserv = new FormGroup({
      idTareo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
    });

    this.colocarFechaHoy();
    this.obtenerTareos();
  }

  // Funciones internas

  colocarFechaHoy() {
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

    this.fcFecha.setValue(s);
  }

  // Modals

  abrirModalEntrada(idTareo: string, modal: any) {
    this.frmEntrada.setValue({
      idTareo: idTareo,
      hora: null,
      minuto: null,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  abrirModalSalida(idTareo: string, modal: any) {
    this.frmSalida.setValue({
      idTareo: idTareo,
      hora: null,
      minuto: null,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  abrirModalObservacion(idTareo: string, observ: string, modal: any) {
    this.frmObserv.setValue({
      idTareo: idTareo,
      observaciones: observ,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  // Acciones de usuario

  async obtenerTareos() {
    this.cargando = true;

    let fecha = this.fcFecha.value;
    let tareos = await this.recuperarTareos(fecha);
    this.tareos = tareos;

    this.cargando = false;
  }

  async guardarEntrada() {
    this.guardando = true;

    let idTareo = this.frmEntrada.value['idTareo'];
    let hora = this.frmEntrada.value['hora'];
    let minuto = this.frmEntrada.value['minuto'];

    await this.grabarEntrada(idTareo, hora, minuto);

    let tareo = this.tareos.find(t => t.idTareo == idTareo);
    if (tareo) {
      tareo.entradaHora = hora;
      tareo.entradaMinuto = minuto;
    }

    this.guardando = false;
    this.modalService.dismissAll();
  }

  async guardarSalida() {
    this.guardando = true;

    let idTareo = this.frmSalida.value['idTareo'];
    let hora = this.frmSalida.value['hora'];
    let minuto = this.frmSalida.value['minuto'];

    await this.grabarSalida(idTareo, hora, minuto);

    let tareo = this.tareos.find(t => t.idTareo == idTareo);
    if (tareo) {
      tareo.salidaHora = hora;
      tareo.salidaMinuto = minuto;
    }

    this.guardando = false;
    this.modalService.dismissAll();
  }

  async guardarObservacion() {
    this.guardando = true;

    let idTareo = this.frmObserv.value['idTareo'];
    let observacion = this.frmObserv.value['observaciones'];

    await this.grabarObservacion(idTareo, observacion);

    let tareo = this.tareos.find(t => t.idTareo == idTareo);
    if (tareo) tareo.observaciones = observacion

    this.guardando = false;
    this.modalService.dismissAll();
  }

  /**
   * DESCARGAR EXCEL
   */

  async descargarExcel() {
    let todo_Excel: Array<any> = [];
    const fecha = this.fcFecha.value;

    const query = this.db
      .collection('tareas', (ref) => {
        return ref.where('sfecha', '==', fecha)
      }).get();

    let tareas = await firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })
      return items;
    }).catch(err => {
      throw err;
    });

    // Agregar Hora de entrada y salida del tareo
    tareas = tareas.map(tarea => {
      const tareo = this.tareos.find(tareo => tareo.idTareo == tarea.idrdt);
      const entrada = `${tareo?.entradaHora}:${tareo?.entradaMinuto}`;
      const salida = `${tareo?.salidaHora}:${tareo?.salidaMinuto}`;

      return {
        ...tarea,
        entrada,
        salida,
      }
    })

    tareas.sort((a, b) => {
      if (a.idrdt > b.idrdt) return 1;
      else return -1;
    }).forEach(tarea => {
      console.log(tarea);
      const fechaTmp = new Date(Number(tarea.idtarea));
      const date = fechaTmp.toLocaleDateString();
      const time = fechaTmp.toLocaleTimeString();
      const fechaRegistro = `${date} - ${time}`;

      todo_Excel.push({
        "Usuario": tarea['idrdt'],
        "Hora de entrada": tarea['entrada'],
        "Hora de salida": tarea['salida'],
        "Tipo cliente": tarea['stipocliente'],
        "Tipo de Atencion": tarea['stipoatencion'],
        "Delegado por": tarea['sdelegadopor'],
        "Expediente": tarea['sexpediente'],
        "Tipo de Proceso": tarea['sespecialidad'],
        "Demandante": tarea['sdemandante'],
        "Demandado": tarea['sdemandado'],
        "ITER": tarea['niter'],
        "Contrato": tarea['lcontrato'],
        // "Saldo": tarea['nsaldo'],
        // "Avance": tarea['navance'],
        // "Cobro de Honorarios": tarea['ncobrohonorario'],
        // "Ingreso para Aranceles": tarea['ningresoarancel'],
        // "Salida para Aranceles": tarea['nsalidaarancel'],
        // "Fecha de culminacion": tarea['sfculminacion'],
        // "Suma Tiempo Atencion": { t: 'n', f: '=' + tarea['nTiempoTareas'] + '/1440' },
        "Tiempo de Atencion": tarea['shorasatencion'] + ':' + tarea['sminutosatencion'],
        "Codigo ejecutivo": tarea['ncodeje'],
        // "Horas en el estudio": { t: 'n', f: '=' + tarea['nTiempoOficina'] + '/1440' },
        // "Tiempo real": tarea['srealtime'],
        // "Prod. Segun RDT": tarea['productidad1'],
        // "Prod. Segun horario": tarea['productidad2'],
        // "Hora Entrada": tarea['hentrada'],
        // "Hora Salida": tarea['hsalida'],
        "Descripción de la tarea": tarea['sdeseje'].trim().slice(0, 2500),
        "Acciones por realizar": tarea['sacceje'].trim().slice(0, 2500),
        "Fecha y Hora de guardado": fechaRegistro,
        "Monto pactado": tarea['nmontocontrato'],
        "Pagos realizados": tarea['npagoshechos'],
        "Ultimo pago": tarea['nmontoultimopago'],
        "Fecha Ultimo Pago": tarea['sfechaultimopago'],
      })
    });

    const worksheet = XLSX.utils.json_to_sheet(todo_Excel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");
    XLSX.writeFile(workbook, 'RDTs - fecha ' + this.fcFecha.value + '.xlsx', { compression: true });

  }

  // Operaciones a la base de datos

  recuperarTareos(fecha: string): Promise<any[]> {
    const query = this.db.collection('tareo', (ref) => {
      return ref.where('fecha', '==', fecha)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });

      return items;
    }).catch(err => {
      throw err;
    })
  }

  grabarEntrada(idTareo: string, hora: string, minuto: string): Promise<void> {
    const query = this.db.collection('tareo').doc(idTareo)
      .update({
        entradaHora: hora,
        entradaMinuto: minuto,
      });

    return query;
  }

  grabarSalida(idTareo: string, hora: string, minuto: string): Promise<void> {
    const query = this.db.collection('tareo').doc(idTareo)
      .update({
        salidaHora: hora,
        salidaMinuto: minuto,
      });

    return query;
  }

  grabarObservacion(idTareo: string, observacion: string): Promise<void> {
    const query = this.db.collection('tareo').doc(idTareo)
      .update({
        observaciones: observacion,
      });

    return query;
  }

}
