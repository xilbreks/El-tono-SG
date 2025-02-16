import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from '../_interfaces/expediente';
import { firstValueFrom } from 'rxjs';

class ObjMateria {
  idmateria: string = '';
  smateria: string = '';
  sespecialidad: string = '';
  constructor() { }
}

@Component({
  selector: 'app-exp-item-edit-data',
  templateUrl: './exp-item-edit-data.component.html',
  styleUrls: ['./exp-item-edit-data.component.scss']
})
export class ExpItemEditDataComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  frmExpediente: FormGroup;
  fcTieneCasacion: FormControl = new FormControl(false);
  fcTieneCodigo: FormControl = new FormControl(false);
  lUpdating: boolean = false;
  lstMaterias: Array<ObjMateria> = [];

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmExpediente = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      materia: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      juzgado: new FormControl(null, Validators.required),
      prioridad: new FormControl(null, Validators.required),
      fechaInicio: new FormControl(null, Validators.required),
      codigo: new FormControl(null, Validators.required),
      numeroCasacion: new FormControl(null, Validators.required),
      salaCasacion: new FormControl(null, Validators.required),
    });

    this.getMaterias();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getMaterias() {
    let obs = this.db.collection('materias').get();

    firstValueFrom(obs).then(snapshot => {
      let materias: any[] = [];
      snapshot.forEach(doc => {
        materias.push(doc.data());
      });

      this.lstMaterias = materias.filter(m => m.sespecialidad == this.expediente?.especialidad);
    })
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

  updateExpediente() {
    this.lUpdating = true;
    this.updateExpedienteDB().then(() => {
      if (this.expediente) {
        this.expediente.titulo = this.frmExpediente.value['titulo'].trim().toUpperCase();
        this.expediente.materia = this.frmExpediente.value['materia'].trim().toUpperCase();
        this.expediente.demandado = this.frmExpediente.value['demandado'].trim().toUpperCase();
        this.expediente.demandante = this.frmExpediente.value['demandante'].trim().toUpperCase();
        this.expediente.juzgado = this.frmExpediente.value['juzgado'].trim().toUpperCase();
        this.expediente.prioridad = this.frmExpediente.value['prioridad'];
        this.expediente.fechaInicio = this.frmExpediente.value['fechaInicio'].trim().toUpperCase();
        this.expediente.codigo = this.frmExpediente.value['codigo'];
        this.expediente.numeroCasacion = this.frmExpediente.value['numeroCasacion'];
        this.expediente.salaCasacion = this.frmExpediente.value['salaCasacion'];
      }
    }).catch(err => {
      // error
      window.alert('Error al actualizar' + err)
    }).finally(() => {
      this.modalService.dismissAll();
      this.lUpdating = false;
    })
  }

  // OPERACIONES A LA BASE DE DATOS

  updateExpedienteDB(): Promise<void> {
    return this.db
      .collection('expedientes')
      .doc(this.expediente?.idExpediente)
      .update({
        titulo: this.frmExpediente.value['titulo'].trim().toUpperCase(),
        materia: this.frmExpediente.value['materia'].trim().toUpperCase(),
        demandado: this.frmExpediente.value['demandado'].trim().toUpperCase(),
        demandante: this.frmExpediente.value['demandante'].trim().toUpperCase(),
        juzgado: this.frmExpediente.value['juzgado'].trim().toUpperCase(),
        prioridad: this.frmExpediente.value['prioridad'],
        fechaInicio: this.frmExpediente.value['fechaInicio'].trim().toUpperCase(),
        codigo: this.frmExpediente.value['codigo'],
        numeroCasacion: this.frmExpediente.value['numeroCasacion'],
        salaCasacion: this.frmExpediente.value['salaCasacion'],
      })

  }
}
