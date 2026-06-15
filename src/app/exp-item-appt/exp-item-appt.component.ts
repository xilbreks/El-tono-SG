import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-appt',
  templateUrl: './exp-item-appt.component.html',
  styleUrl: './exp-item-appt.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIcon,
  ]
})
export class ExpItemApptComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;
  lstCitas: any[] = [];
  lViewMode = true;

  lLoading = false;
  lAdding = false;
  lUpdating = false;
  lDeleting = false;

  frmNewAppt: FormGroup;
  frmEditAppt: FormGroup;
  frmDeleteAppt: FormGroup;

  constructor(
    private modalService: NgbModal,
  ) {
    /***********************************
     ****** FORMULARIO NUEVA CITA ******
     **********************************/
    this.frmNewAppt = new FormGroup({
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sencargados: new FormControl(null, Validators.required),
      stema: new FormControl(null, Validators.required),
    });

    /************************************
     ****** FORMULARIO EDITAR CITA ******
     ***********************************/
    this.frmEditAppt = new FormGroup({
      idcita: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sencargados: new FormControl(null, Validators.required),
      stema: new FormControl(null, Validators.required),
    });

    /************************************
     ***** FORMULARIO ELIMINAR CITA *****
     ***********************************/
    this.frmDeleteAppt = new FormGroup({
      idcita: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      stema: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getCitas()
    }
  }

  async getCitas() {
    if (!this.expediente) return;

    this.lLoading = true;
    const citas = await this.appService.citasPorExpediente(this.expediente.numero);
    this.lstCitas = citas;

    this.lLoading = false;
  }

  // Funciones para iniciar los Modals

  openModalAddCita(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  openModalEditCita(cita: any, modal: any) {
    this.frmEditAppt.setValue({
      idcita: cita.idcita,
      sfecha: cita.sfecha,
      shora: cita.shora,
      scliente: cita.scliente,
      stipo: cita.stipo,
      sencargados: cita.sencargados,
      stema: cita.stema,
    })

    this.modalService.open(modal, {
      size: 'md'
    });
  }

  openModalDeleteCita(cita: any, modal: any) {
    this.frmDeleteAppt.setValue({
      idcita: cita.idcita,
      sfecha: cita.sfecha,
      stema: cita.stema,
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  // Funciones para ejecutar cambios en la base de datos

  async addCita() {
    if (!this.expediente) return;

    this.lAdding = true;

    let sfecha = this.frmNewAppt.value['sfecha'];
    const sid = (new Date().getTime()).toString().slice(7);
    const idcita = [sfecha, sid].join('-');
    const payload = {
      idcita: idcita,
      sexpediente: this.expediente.numero,
      sespecialidad: this.expediente.especialidad,
      sdemandante: this.expediente.demandante,
      sdemandado: this.expediente.demandado,
      scliente: this.frmNewAppt.value['scliente'],
      sfecha: this.frmNewAppt.value['sfecha'],
      shora: this.frmNewAppt.value['shora'],
      stipo: this.frmNewAppt.value['stipo'],
      sencargados: this.frmNewAppt.value['sencargados'],
      stema: this.frmNewAppt.value['stema'],
      sacuerdos: '-',
    }

    const ok = await this.appService.registrarCita(idcita, payload);

    this.getCitas();
    this.modalService.dismissAll();
    this.frmNewAppt.reset();
    this.lAdding = false;
  }

  async editCita() {
    if (!this.expediente) return;

    this.lUpdating = true;
    let idcita = this.frmEditAppt.value['idcita'];
    const payload = {
      sfecha: this.frmEditAppt.value['sfecha'],
      shora: this.frmEditAppt.value['shora'],
      scliente: this.frmEditAppt.value['scliente'],
      stipo: this.frmEditAppt.value['stipo'],
      sencargados: this.frmEditAppt.value['sencargados'],
      stema: this.frmEditAppt.value['stema'],
    }

    const ok = await this.appService.actualizarCita(idcita, payload);

    this.getCitas();
    this.modalService.dismissAll();
    this.frmEditAppt.reset();
    this.lUpdating = false;
  }

  async deleteCita() {
    this.lDeleting = true;
    let idcita = this.frmDeleteAppt.value['idcita'];

    const ok = await this.appService.eliminarCita(idcita);
    this.getCitas();
    this.modalService.dismissAll();
    this.frmDeleteAppt.reset();
    this.lDeleting = false;
  }

  // Cambia de modo

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }
} 
