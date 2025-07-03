import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Arancel } from '../_interfaces/arancel';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item-econ-aran',
  templateUrl: './exp-item-econ-aran.component.html',
  styleUrl: './exp-item-econ-aran.component.scss'
})
export class ExpItemEconAranComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  idusuario: string | null;

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
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.idusuario = localStorage.getItem('idusuario');

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
    this.cargando = true;
    this.gastosComplementarios = await this.recuperarGastos(this.expediente?.idExpediente);
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
  // listo
  abrirModalAgregarGasto(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }
  // listo
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
  // listo
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

    let gasto: Arancel = {
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

    await this.registrarNuevoGasto(idArancel, gasto);

    this.guardando = false;
    this.modalService.dismissAll();
    this.frmNuevoGasto.reset()

    this.obtenerGastosComplementarios();
  }

  async modificarGastoComplementario() {
    this.actualizando = true;

    let idArancel = this.frmEditaGasto.value['idArancel'];
    const gasto = this.frmEditaGasto.value;

    await this.actualizarGasto(idArancel, gasto);

    this.actualizando = false;
    this.modalService.dismissAll();
    this.frmEditaGasto.reset()

    this.obtenerGastosComplementarios();
  }

  async removerGastoComplementario() {
    this.quitando = true;

    let idArancel = this.frmQuitaGasto.value['idArancel'];

    await this.quitarGasto(idArancel);

    this.quitando = false;
    this.modalService.dismissAll();
    this.frmQuitaGasto.reset()

    this.obtenerGastosComplementarios();
  }

  // OPERACIONES A LA BASE DE DATOS

  recuperarGastos(idExpediente: string | undefined): Promise<any[]> {
    let query = this.db.collection('aranceles', ref => {
      return ref.where('idExpediente', '==', idExpediente);
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

  registrarNuevoGasto(idGasto: string, gasto: Arancel): Promise<any> {
    let query = this.db.collection('aranceles').doc(idGasto).set(gasto);

    return query;
  }

  actualizarGasto(idgasto: string, gasto: Arancel): Promise<void> {
    let query = this.db.collection('aranceles').doc(idgasto).update(gasto);

    return query;
  }

  quitarGasto(idGasto: string): Promise<void> {
    let query = this.db.collection('aranceles').doc(idGasto).delete();

    return query;
  }

}
