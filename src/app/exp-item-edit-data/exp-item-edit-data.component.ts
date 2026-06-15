import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from '../_interfaces/expediente';
import { firstValueFrom } from 'rxjs';
import { NgClass } from '@angular/common';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

class ObjMateria {
  idmateria: string = '';
  smateria: string = '';
  sespecialidad: string = '';
  constructor() { }
}

@Component({
  selector: 'app-exp-item-edit-data',
  templateUrl: './exp-item-edit-data.component.html',
  styleUrls: ['./exp-item-edit-data.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIcon,
  ]
})
export class ExpItemEditDataComponent implements OnInit {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;

  frmExpediente: FormGroup;
  fcTieneCasacion: FormControl = new FormControl(false);
  fcTieneCodigo: FormControl = new FormControl(false);
  lUpdating: boolean = false;
  lstMaterias: Array<ObjMateria> = [];

  constructor(
    private modalService: NgbModal,
  ) {
    this.frmExpediente = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      materia: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      juzgado: new FormControl(null, Validators.required),
      prioridad: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
      fechaInicio: new FormControl(null, Validators.required),
      codigo: new FormControl(null, Validators.required),
      numeroCasacion: new FormControl(null, Validators.required),
      salaCasacion: new FormControl(null, Validators.required),
    });

  }

  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    const materias = this.appService.materias();

    this.lstMaterias = materias.filter(m => m.sespecialidad == this.expediente?.especialidad);
  }

  openModal(modal: any) {
    const tieneCasacion = this.expediente?.numeroCasacion ? true : false;
    const tieneCodigo = this.expediente?.codigo ? true : false;
    this.fcTieneCasacion.setValue(tieneCasacion);
    this.fcTieneCodigo.setValue(tieneCodigo);
    this.setValidatorCasacion();
    this.setValidatorCodigo();

    this.frmExpediente.setValue({
      titulo: this.expediente?.titulo,
      materia: this.expediente?.materia,
      demandado: this.expediente?.demandado,
      demandante: this.expediente?.demandante,
      juzgado: this.expediente?.juzgado,
      prioridad: this.expediente?.prioridad,
      observaciones: this.expediente?.observaciones,
      fechaInicio: this.expediente?.fechaInicio,
      codigo: this.expediente?.codigo,
      numeroCasacion: this.expediente?.numeroCasacion,
      salaCasacion: this.expediente?.salaCasacion,
    });

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  setValidatorCasacion() {
    const regexp: RegExp = /^\d{5}-\d{4}-[0]-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
    const tieneCasacion = this.fcTieneCasacion.value;

    if (tieneCasacion) {
      this.frmExpediente.controls['numeroCasacion'].setValidators(Validators.compose([Validators.pattern(regexp), Validators.required]));
      this.frmExpediente.controls['salaCasacion'].setValidators(Validators.required);
    } else {
      this.frmExpediente.controls['numeroCasacion'].clearValidators();
      this.frmExpediente.controls['salaCasacion'].clearValidators();
      this.frmExpediente.controls['numeroCasacion'].setValue(null);
      this.frmExpediente.controls['salaCasacion'].setValue(null);
    }
    this.frmExpediente.controls['numeroCasacion'].updateValueAndValidity();
    this.frmExpediente.controls['salaCasacion'].updateValueAndValidity();
  }

  setValidatorCodigo() {
    const tieneCodigo = this.fcTieneCodigo.value;
    if (tieneCodigo) {
      this.frmExpediente.controls['codigo'].setValidators(Validators.required);
    } else {
      this.frmExpediente.controls['codigo'].clearValidators();
      this.frmExpediente.controls['codigo'].setValue(null);
    }
    this.frmExpediente.controls['codigo'].updateValueAndValidity();
  }

  async updateExpediente() {
    if (!this.expediente) return;

    this.lUpdating = true;
    const payload = {
      titulo: this.frmExpediente.value['titulo'].trim().toUpperCase(),
      materia: this.frmExpediente.value['materia'].trim().toUpperCase(),
      demandado: this.frmExpediente.value['demandado'].trim().toUpperCase(),
      demandante: this.frmExpediente.value['demandante'].trim().toUpperCase(),
      juzgado: this.frmExpediente.value['juzgado'].trim().toUpperCase(),
      prioridad: this.frmExpediente.value['prioridad'],
      observaciones: this.frmExpediente.value['observaciones'].trim(),
      fechaInicio: this.frmExpediente.value['fechaInicio'].trim().toUpperCase(),
      codigo: this.frmExpediente.value['codigo'],
      numeroCasacion: this.frmExpediente.value['numeroCasacion'],
      salaCasacion: this.frmExpediente.value['salaCasacion'] ? this.frmExpediente.value['salaCasacion'].trim().toUpperCase() : null,
    }
    const ok = await this.appService.actualizarExpediente(this.expediente.idExpediente, payload);

    this.expediente.titulo = this.frmExpediente.value['titulo'].trim().toUpperCase();
    this.expediente.materia = this.frmExpediente.value['materia'].trim().toUpperCase();
    this.expediente.demandado = this.frmExpediente.value['demandado'].trim().toUpperCase();
    this.expediente.demandante = this.frmExpediente.value['demandante'].trim().toUpperCase();
    this.expediente.juzgado = this.frmExpediente.value['juzgado'].trim().toUpperCase();
    this.expediente.prioridad = this.frmExpediente.value['prioridad'];
    this.expediente.observaciones = this.frmExpediente.value['observaciones'].trim();
    this.expediente.fechaInicio = this.frmExpediente.value['fechaInicio'].trim().toUpperCase();
    this.expediente.codigo = this.frmExpediente.value['codigo'];
    this.expediente.numeroCasacion = this.frmExpediente.value['numeroCasacion'];
    this.expediente.salaCasacion = this.frmExpediente.value['salaCasacion'] ? this.frmExpediente.value['salaCasacion'].trim().toUpperCase() : null;

    this.lUpdating = false;
    this.modalService.dismissAll();
  }
}
