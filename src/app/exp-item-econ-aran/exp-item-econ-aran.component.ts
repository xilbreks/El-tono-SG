import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Arancel } from '../_interfaces/arancel';
import { DecimalPipe } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-econ-aran',
  templateUrl: './exp-item-econ-aran.component.html',
  styleUrl: './exp-item-econ-aran.component.scss',
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
  ]
})
export class ExpItemEconAranComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;
  nick: string | null;
  rol: string | null;

  gastosComplementarios: Arancel[] = [];
  sumaGastosComplementarios: number = 0;
  esEditable: boolean = false;

  frmNuevoGasto: FormGroup;
  frmEditaGasto: FormGroup;
  frmQuitaGasto: FormGroup;

  cargando: boolean = false;
  guardando: boolean = false;
  actualizando: boolean = false;
  quitando: boolean = false;

  constructor(
    private modalService: NgbModal,
  ) {
    this.nick = localStorage.getItem('nick');
    this.rol = localStorage.getItem('rol');

    this.frmNuevoGasto = new FormGroup({
      concepto: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
    });

    this.frmEditaGasto = new FormGroup({
      idArancel: new FormControl(null, Validators.required),
      concepto: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
    });

    this.frmQuitaGasto = new FormGroup({
      idArancel: new FormControl(null, Validators.required),
      concepto: new FormControl(null, Validators.required),
      monto: new FormControl(null, Validators.required),
    });
  }

  // FUNCIONES AUTOMATICAS

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.obtenerGastosComplementarios();
    }
  }

  async obtenerGastosComplementarios() {
    if (!this.expediente) return;
    this.cargando = true;
    const aranceles = await this.appService.arancelesPorExpediente(this.expediente?.idExpediente);
    this.gastosComplementarios = aranceles;
    this.sumaGastosComplementarios = 0;
    this.gastosComplementarios.forEach(gasto => {
      this.sumaGastosComplementarios += gasto.monto;
    })
    this.cargando = false;
  }

  cambiarEstadoEditable() {
    this.esEditable = !this.esEditable;
  }

  // MODAL ACCIONES DEL USUARIO

  abrirModalAgregarGasto(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  abrirModalEditarGasto(gasto: Arancel, modal: any) {
    this.frmEditaGasto.setValue({
      idArancel: gasto.idArancel,
      concepto: gasto.concepto,
      monto: gasto.monto,
      fecha: gasto.fecha,
    });

    this.modalService.open(modal, {
      size: 'md'
    });
  }

  abrirModalQuitarGasto(gasto: Arancel, modal: any) {
    this.frmQuitaGasto.setValue({
      idArancel: gasto.idArancel,
      concepto: gasto.concepto,
      monto: gasto.monto,
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  async guardarNuevoGastoComplementario() {
    this.guardando = true;

    const idArancel = (new Date()).getTime().toString();

    let payload = {
      idArancel: idArancel,
      idExpediente: this.expediente ? this.expediente.idExpediente : 'void',
      concepto: this.frmNuevoGasto.value['concepto'].trim(),
      monto: this.frmNuevoGasto.value['monto'],
      fecha: this.frmNuevoGasto.value['fecha'],

      numeroExpediente: this.expediente ? this.expediente.numero : 'void',
      demandante: this.expediente ? this.expediente.demandante : 'void',
      demandado: this.expediente ? this.expediente.demandado : 'void',
      especialidad: this.expediente ? this.expediente.especialidad : 'void',
      materia: this.expediente ? this.expediente.materia : 'void',
    }

    const ok = await this.appService.registrarArancel(idArancel, payload);

    this.guardando = false;
    this.modalService.dismissAll();
    this.frmNuevoGasto.reset()

    this.obtenerGastosComplementarios();
  }

  async modificarGastoComplementario() {
    this.actualizando = true;

    let idArancel = this.frmEditaGasto.value['idArancel'];
    const payload = this.frmEditaGasto.value;

    const ok = await this.appService.actualizarArancel(idArancel, payload);

    this.actualizando = false;
    this.modalService.dismissAll();
    this.frmEditaGasto.reset()

    this.obtenerGastosComplementarios();
  }

  async removerGastoComplementario() {
    this.quitando = true;

    let idArancel = this.frmQuitaGasto.value['idArancel'];

    const ok = await this.appService.eliminarArancel(idArancel);

    this.quitando = false;
    this.modalService.dismissAll();
    this.frmQuitaGasto.reset()

    this.obtenerGastosComplementarios();
  }

}
