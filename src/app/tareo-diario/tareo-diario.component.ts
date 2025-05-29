import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tareo } from '../_interfaces/tareo';
import { firstValueFrom } from 'rxjs';

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
