import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Abono } from '../_interfaces/abono';
import { firstValueFrom } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';
import { Log } from '../_interfaces/log';

@Component({
  selector: 'app-exp-item-econ-abon',
  templateUrl: './exp-item-econ-abon.component.html',
  styleUrl: './exp-item-econ-abon.component.scss',
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    NgIcon,
  ]
})
export class ExpItemEconAbonComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;
  nick: string | null;
  rol: string | null;

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
    private modalService: NgbModal,
  ) {
    this.nick = localStorage.getItem('nick');
    this.rol = localStorage.getItem('rol');

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
    if (!this.expediente) return;
    this.cargando = true;
    const abonos = await this.appService.abonosPorExpediente(this.expediente.idExpediente);
    this.abonos = abonos;
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

    let payload = {
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

      estaDepurado: false,
    }

    const ok = await this.appService.registrarAbono(idAbono, payload);
    await this.registrarLogAuditoria(idAbono, 'CREACION');

    this.guardando = false;
    this.modalService.dismissAll();
    this.frmNuevoAbono.reset()

    this.obtenerAbonos();
  }

  async modificarAbono() {
    this.actualizando = true;

    let idAbono = this.frmEditaAbono.value['idAbono'];
    const payload = this.frmEditaAbono.value;

    const ok = await this.appService.actualizarAbono(idAbono, payload);
    await this.registrarLogAuditoria(idAbono, 'ACTUALIZACION');

    this.actualizando = false;
    this.modalService.dismissAll();
    this.frmEditaAbono.reset()

    this.obtenerAbonos();
  }

  async removerAbono() {
    this.quitando = true;

    let idAbono = this.frmQuitaAbono.value['idAbono'];

    const ok = await this.appService.eliminarAbono(idAbono);
    await this.registrarLogAuditoria(idAbono, 'ELIMINACION');

    this.quitando = false;
    this.modalService.dismissAll();
    this.frmQuitaAbono.reset()

    this.obtenerAbonos();
  }

  // LOG de AUDITORIA para cada cambio

  async registrarLogAuditoria(idAbono: string, accion: 'CREACION' | 'ACTUALIZACION' | 'ELIMINACION') {
    const nombreUsuario = localStorage.getItem('nombre');

    const fecha = new Date();
    const formatoLegible = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(fecha);

    const timestamp = fecha.getTime().toString();
    const idLog = `ID${timestamp}`;

    let descripcion = '';

    switch (accion) {
      case 'CREACION':
        descripcion = `${nombreUsuario} registró nuevo abono el ${formatoLegible}`;
        break;
      case 'ACTUALIZACION':
        descripcion = `${nombreUsuario} actualizó un abono el ${formatoLegible}`;
        break;
      case 'ELIMINACION':
        descripcion = `${nombreUsuario} eliminó un abono el ${formatoLegible}`;
        break;
    }

    const payload: Log = {
      idLog: idLog,
      idExpediente: this.expediente ? this.expediente.idExpediente : 'void',
      modulo: 'ECONOMIA',
      coleccion: 'abonos',
      idDocumento: idAbono,

      nombreUsuario: nombreUsuario,

      tipoAccion: accion,
      descripcion: descripcion,

      fechaCreacion: timestamp,
    }

    await this.appService.registrarLogAuditoria(idLog, payload);
  }

}
