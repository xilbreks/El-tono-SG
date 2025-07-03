import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Abono } from '../_interfaces/abono';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item-econ-abon',
  templateUrl: './exp-item-econ-abon.component.html',
  styleUrl: './exp-item-econ-abon.component.scss'
})
export class ExpItemEconAbonComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  idusuario: string | null;

  abonos: Abono[] = [];
  sumaAbonos: number = 0;
  esEditable: boolean = false;

  frmNuevoAbono: FormGroup;
  frmEditaAbono: FormGroup;
  frmQuitaAbono: FormGroup;

  cargando: boolean = false;
  guardando: boolean = false;
  actualizando: boolean = false;
  quitando: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.idusuario = localStorage.getItem('idusuario');

    this.frmNuevoAbono = new FormGroup({
      fecha: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
      metodo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
    });

    this.frmEditaAbono = new FormGroup({
      idAbono: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
      metodo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
    });

    this.frmQuitaAbono = new FormGroup({
      idAbono: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
    });
  }

  // FUNCIONES AUTOMATICAS

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.obtenerAbonos();
    }
  }

  async obtenerAbonos() {
    this.cargando = true;
    this.abonos = await this.recuperarAbonos(this.expediente?.idExpediente);
    this.sumaAbonos = 0;
    this.abonos.forEach(abono => {
      this.sumaAbonos += abono.monto;
    })
    this.cargando = false;
  }

  cambiarEstadoEditable() {
    this.esEditable = !this.esEditable;
  }

  // MODAL ACCIONES DEL USUARIO
  // listo
  abrirModalAgregarAbono(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }
  // listo
  abrirModalEditarAbono(abono: Abono, modal: any) {
    this.frmEditaAbono.setValue({
      idAbono: abono.idAbono,
      fecha: abono.fecha,
      monto: abono.monto,
      metodo: abono.metodo,
      observaciones: abono.observaciones,
    });

    this.modalService.open(modal, {
      size: 'md'
    });
  }
  // listo
  abrirModalQuitarAbono(abono: Abono, modal: any) {
    this.frmQuitaAbono.setValue({
      idAbono: abono.idAbono,
      fecha: abono.fecha,
      monto: abono.monto,
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  async guardarNuevoAbono() {
    this.guardando = true;

    const idAbono = (new Date()).getTime().toString();

    let abono: Abono = {
      idAbono: idAbono,
      idExpediente: this.expediente ? this.expediente.idExpediente : 'void',
      fecha: this.frmNuevoAbono.value['fecha'],
      monto: this.frmNuevoAbono.value['monto'],
      metodo: this.frmNuevoAbono.value['metodo'],
      observaciones: this.frmNuevoAbono.value['observaciones'].trim(),

      numeroExpediente: this.expediente ? this.expediente.numero : 'void',
      demandante: this.expediente ? this.expediente.demandante : 'void',
      demandado: this.expediente ? this.expediente.demandado : 'void',
      especialidad: this.expediente ? this.expediente.especialidad : 'void',
      materia: this.expediente ? this.expediente.materia : 'void',
    }

    await this.registrarNuevoAbono(idAbono, abono);

    this.guardando = false;
    this.modalService.dismissAll();
    this.frmNuevoAbono.reset()

    this.obtenerAbonos();
  }

  async modificarAbono() {
    this.actualizando = true;

    let idAbono = this.frmEditaAbono.value['idAbono'];
    const abono = this.frmEditaAbono.value;

    await this.actualizarAbono(idAbono, abono);

    this.actualizando = false;
    this.modalService.dismissAll();
    this.frmEditaAbono.reset()

    this.obtenerAbonos();
  }

  async removerAbono() {
    this.quitando = true;

    let idAbono = this.frmQuitaAbono.value['idAbono'];

    await this.quitarAbono(idAbono);

    this.quitando = false;
    this.modalService.dismissAll();
    this.frmQuitaAbono.reset()

    this.obtenerAbonos();
  }

  // OPERACIONES A LA BASE DE DATOS

  recuperarAbonos(idExpediente: string | undefined): Promise<any[]> {
    let query = this.db.collection('abonos', ref => {
      return ref.where('idExpediente', '==', idExpediente).orderBy('fecha', 'asc');
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });

      // console.log(items)
      return items;
    }).catch(err => {
      throw err;
    });
  }

  registrarNuevoAbono(idAbono: string, abono: Abono): Promise<any> {
    let query = this.db.collection('abonos').doc(idAbono).set(abono);

    return query;
  }

  actualizarAbono(idAbono: string, abono: Abono): Promise<void> {
    let query = this.db.collection('abonos').doc(idAbono).update(abono);

    return query;
  }

  quitarAbono(idAbono: string): Promise<void> {
    let query = this.db.collection('abonos').doc(idAbono).delete();

    return query;
  }

}
