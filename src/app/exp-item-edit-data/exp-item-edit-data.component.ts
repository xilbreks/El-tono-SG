import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input('sexpediente') sexpediente: string = '';

  objData: any = null;
  frmData: FormGroup;
  lUpdating: boolean = false;
  lstMateriasTodos: Array<ObjMateria> = [];
  lstMaterias: Array<ObjMateria> = [];

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmData = new FormGroup({
      idtipodoc: new FormControl(null, Validators.required),
      idmateria: new FormControl(null, Validators.required),
      smateria: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      sespecialista: new FormControl(null, Validators.required),
      sfechainicio: new FormControl(null, Validators.required),
    });

    this.getMaterias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }

  getMaterias() {
    let obs = this.db
      .collection('materias')
      .valueChanges()
      .subscribe((lstMat: Array<any>) => {
        this.lstMateriasTodos = lstMat;

        obs.unsubscribe();
      });
  }

  setLstMaterias() {
    let sespecialidad = this.frmData.controls['sespecialidad'].value;
    this.frmData.controls['idmateria'].reset();

    this.lstMaterias = this.lstMateriasTodos.filter((a) => {
      if (a.sespecialidad == sespecialidad) {
        return true;
      } else {
        return false;
      }
    })
  }

  setSMateria() {
    let idmateria = this.frmData.controls['idmateria'].value;
    let smateria = '--';
    this.lstMaterias.forEach((a) => {
      if (idmateria == a.idmateria) {
        smateria = a.smateria;
      }
    })
    this.frmData.controls['smateria'].setValue(smateria);
  }

  getData() {
    let obs = this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((exp: any) => {
        this.objData = exp;

        obs.unsubscribe();
      });
  }

  openModal(modal: any) {
    // SETTING LIST MATERIAS
    this.lstMaterias = this.lstMateriasTodos.filter((a) => {
      if (a.sespecialidad == this.objData.sespecialidad) {
        return true;
      } else {
        return false;
      }
    })

    this.frmData.setValue({
      idtipodoc: this.objData.idtipodoc,
      idmateria: this.objData.idmateria,
      smateria: this.objData.smateria,
      sdemandado: this.objData.sdemandado,
      sdemandante: this.objData.sdemandante,
      sespecialidad: this.objData.sespecialidad,
      sespecialista: this.objData.sespecialista,
      sfechainicio: this.objData.sfechainicio,
    });

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  setData() {
    this.lUpdating = true;
    
    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        idtipodoc: this.frmData.value['idtipodoc'],
        idmateria: this.frmData.value['idmateria'],
        smateria: this.frmData.value['smateria'],
        sdemandado: this.frmData.value['sdemandado'].trim().toUpperCase(),
        sdemandante: this.frmData.value['sdemandante'].trim().toUpperCase(),
        sespecialidad: this.frmData.value['sespecialidad'],
        sespecialista: this.frmData.value['sespecialista'].trim().toUpperCase(),
        sfechainicio: this.frmData.value['sfechainicio'].trim().toUpperCase(),
      })
      .then(() => {
        // success
        this.getData();
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
