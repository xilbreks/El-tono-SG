import { Component, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  materia: string = '';
  demandante: string = '';
  demandado: string = '';
  juzgado: string = '';
  fechaInicio: string = '';

  frmData: FormGroup;
  lUpdating: boolean = false;
  lstMaterias: Array<ObjMateria> = [];

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmData = new FormGroup({
      materia: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      juzgado: new FormControl(null, Validators.required),
      fechaInicio: new FormControl(null, Validators.required),
    });

    this.getMaterias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.materia = this.expediente.materia;
      this.demandante = this.expediente.demandante;
      this.demandado = this.expediente.demandado;
      this.juzgado = this.expediente.juzgado;
      this.fechaInicio = this.expediente.fechaInicio;
    }
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
    this.frmData.setValue({
      materia: this.materia,
      demandado: this.demandado,
      demandante: this.demandante,
      juzgado: this.juzgado,
      fechaInicio: this.fechaInicio,
    });

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  setData() {
    this.lUpdating = true;

    this.db
      .collection('expedientes')
      .doc(this.expediente?.idExpediente)
      .update({
        materia: this.frmData.value['materia'].trim().toUpperCase(),
        demandado: this.frmData.value['demandado'].trim().toUpperCase(),
        demandante: this.frmData.value['demandante'].trim().toUpperCase(),
        juzgado: this.frmData.value['juzgado'].trim().toUpperCase(),
        fechaInicio: this.frmData.value['fechaInicio'].trim(),
      })
      .then(() => {
        // success
        this.materia = this.frmData.value['materia'];
        this.demandado = this.frmData.value['demandado'].trim().toUpperCase();
        this.demandante = this.frmData.value['demandante'].trim().toUpperCase();
        this.juzgado = this.frmData.value['juzgado'].trim().toUpperCase();
        this.fechaInicio = this.frmData.value['fechaInicio'].trim();
      })
      .catch(err => {
        // error
        window.alert('Error al actualizar' + err)
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      })
  }
}
