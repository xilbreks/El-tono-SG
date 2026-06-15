import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Cuota } from '../_interfaces/cuota';
import { firstValueFrom } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-econ-cuot',
  templateUrl: './exp-item-econ-cuot.component.html',
  styleUrl: './exp-item-econ-cuot.component.scss',
  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    NgIcon,
  ]
})
export class ExpItemEconCuotComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;
  nick: string | null;
  rol: string | null;

  cuotas: Cuota[] = [];
  sumaCuotas: number = 0;
  esEditable: boolean = false;

  frmNuevaCuota: FormGroup;
  frmEditaCuota: FormGroup;
  frmQuitaCuota: FormGroup;
  frmCliente: FormGroup;
  fcNoVenceNuevaCuota: FormControl = new FormControl(false);
  fcNoVenceEditaCuota: FormControl = new FormControl(false);

  cargando: boolean = false;
  guardando: boolean = false;
  actualizando: boolean = false;
  quitando: boolean = false;

  constructor(
    private modalService: NgbModal,
  ) {
    this.nick = localStorage.getItem('nick');
    this.rol = localStorage.getItem('rol');

    this.frmNuevaCuota = new FormGroup({
      numero: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
      vencimiento: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
    });

    this.frmEditaCuota = new FormGroup({
      idCuota: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
      vencimiento: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
    });

    this.frmQuitaCuota = new FormGroup({
      idCuota: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
    });

    this.frmCliente = new FormGroup({
      idExpediente: new FormControl(null, Validators.required),
      nombreCliente: new FormControl(null, Validators.required),
      dni: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required),
      detalleContrato: new FormControl(null, Validators.required),
    });
  }

  // FUNCIONES AUTOMATICAS

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.obtenerCuotas();
    }
  }

  async obtenerCuotas() {
    if (!this.expediente) return;
    this.cargando = true;
    const cuotas = await this.appService.cuotasPorExpediente(this.expediente.idExpediente);
    this.cuotas = cuotas;
    this.sumaCuotas = 0;
    this.cuotas.forEach(cuota => {
      this.sumaCuotas += cuota.monto;
    })
    this.cargando = false;
  }

  cambiarEstadoEditable() {
    this.esEditable = !this.esEditable;
  }

  // MODAL ACCIONES DEL USUARIO
  // listo
  abrirModalEditarCliente(modal: any) {
    this.frmCliente.setValue({
      idExpediente: this.expediente?.idExpediente,
      nombreCliente: this.expediente?.nombreCliente,
      dni: this.expediente?.dni,
      celular: this.expediente?.celular,
      detalleContrato: this.expediente?.detalleContrato,
    })

    this.modalService.open(modal, {
      size: 'md'
    });
  }

  // listo
  abrirModalAgregarCuota(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }
  // listo
  abrirModalEditarCuota(cuota: Cuota, modal: any) {
    if (!cuota.vencimiento) {
      this.fcNoVenceEditaCuota.setValue(true);
      this.revisarVencimientoEditaCuota();
    } else {
      this.fcNoVenceEditaCuota.setValue(false);
      this.revisarVencimientoEditaCuota();
    }

    this.frmEditaCuota.setValue({
      idCuota: cuota.idCuota,
      numero: cuota.numero,
      monto: cuota.monto,
      vencimiento: cuota.vencimiento,
      observaciones: cuota.observaciones,
      estado: cuota.estado,
    });

    this.modalService.open(modal, {
      size: 'md'
    });
  }
  // listo
  abrirModalQuitarCuota(cuota: Cuota, modal: any) {
    this.frmQuitaCuota.setValue({
      idCuota: cuota.idCuota,
      numero: cuota.numero,
      monto: cuota.monto,
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  async guardarDatosCliente() {
    this.guardando = true;

    const idExpediente = this.frmCliente.value['idExpediente'];
    const nombreCliente = this.frmCliente.value['nombreCliente'].trim();
    const dni = this.frmCliente.value['dni'].trim();
    const celular = this.frmCliente.value['celular'].trim();
    const detalleContrato = this.frmCliente.value['detalleContrato'].trim();

    const ok = await this.appService.actualizarExpediente(idExpediente, {
      nombreCliente,
      dni,
      celular,
      detalleContrato,
    })
    if (this.expediente) {
      this.expediente.nombreCliente = nombreCliente;
      this.expediente.dni = dni;
      this.expediente.celular = celular;
      this.expediente.detalleContrato = detalleContrato;
    }

    this.guardando = false;
    this.modalService.dismissAll();
    this.frmCliente.reset();
  }

  async guardarNuevaCuota() {
    if (!this.expediente) return;
    this.guardando = true;

    const idCuota = (new Date()).getTime().toString();

    const payload = {
      idCuota: idCuota,
      idExpediente: this.expediente ? this.expediente.idExpediente : 'void',
      numero: this.frmNuevaCuota.value['numero'],
      monto: this.frmNuevaCuota.value['monto'],
      vencimiento: this.frmNuevaCuota.value['vencimiento'],
      estado: 'EN-PLAZO',
      observaciones: this.frmNuevaCuota.value['observaciones'].trim(),

      numeroExpediente: this.expediente ? this.expediente.numero : 'void',
      demandante: this.expediente ? this.expediente.demandante : 'void',
      demandado: this.expediente ? this.expediente.demandado : 'void',
      especialidad: this.expediente ? this.expediente.especialidad : 'void',
      materia: this.expediente ? this.expediente.materia : 'void',
    }

    const ok = await this.appService.registrarCuota(idCuota, payload);

    this.guardando = false;
    this.modalService.dismissAll();
    this.frmNuevaCuota.reset()

    this.obtenerCuotas();
  }

  async modificarCuota() {
    this.actualizando = true;

    let idCuota = this.frmEditaCuota.value['idCuota'];
    const payload = this.frmEditaCuota.value;

    const ok = await this.appService.actualizarCuota(idCuota, payload);

    this.actualizando = false;
    this.modalService.dismissAll();
    this.frmEditaCuota.reset()

    this.obtenerCuotas();
  }

  async removerCuota() {
    this.quitando = true;

    let idCuota = this.frmQuitaCuota.value['idCuota'];

    const ok = await this.appService.eliminarCuota(idCuota);

    this.quitando = false;
    this.modalService.dismissAll();
    this.frmQuitaCuota.reset()

    this.obtenerCuotas();
  }

  // VALIDADORES DE LOS FORMULARIOS

  revisarVencimientoNuevaCuota() {
    let noVence = this.fcNoVenceNuevaCuota.value;
    if (noVence) {
      this.frmNuevaCuota.controls['vencimiento'].clearValidators();
      this.frmNuevaCuota.controls['vencimiento'].setValue(null);
      this.frmNuevaCuota.controls['vencimiento'].updateValueAndValidity();
    } else {
      this.frmNuevaCuota.controls['vencimiento'].setValidators(Validators.required);
      this.frmNuevaCuota.controls['vencimiento'].updateValueAndValidity();
    }
  }

  revisarVencimientoEditaCuota() {
    let noVence = this.fcNoVenceEditaCuota.value;
    if (noVence) {
      this.frmEditaCuota.controls['vencimiento'].clearValidators();
      this.frmEditaCuota.controls['vencimiento'].setValue(null);
      this.frmEditaCuota.controls['vencimiento'].updateValueAndValidity();
    } else {
      this.frmEditaCuota.controls['vencimiento'].setValidators(Validators.required);
      this.frmEditaCuota.controls['vencimiento'].updateValueAndValidity();
    }
  }

}
