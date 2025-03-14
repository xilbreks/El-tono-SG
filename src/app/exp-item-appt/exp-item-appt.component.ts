import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-appt',
  templateUrl: './exp-item-appt.component.html',
  styleUrl: './exp-item-appt.component.scss'
})
export class ExpItemApptComponent implements OnChanges {
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
    private db: AngularFirestore,
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

  getCitas() {
    this.lLoading = true;
    this.lstCitas = [];

    let obs = this.db.collection('citas', ref => {
      return ref.where('sexpediente', '==', this.expediente?.numero)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstCitas = res.map(aud => {
          let sDay = aud.sfecha.slice(8, 10);
          let sMonth = aud.sfecha.slice(5, 7);
          let sYear = aud.sfecha.slice(0, 4);
          return {
            ...aud,
            sfechauser: sDay + '/' + sMonth + '/' + sYear
          }
        }).sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 > sfecha2 ? -1 : 1;
        });

        this.lLoading = false;
        obs.unsubscribe();
      })
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

  addCita() {
    this.lAdding = true;

    let sfecha = this.frmNewAppt.value['sfecha'];
    const sid = (new Date().getTime()).toString().slice(7);
    const idcita = [sfecha, sid].join('-');

    this.db
      .collection('citas')
      .doc(idcita)
      .set({
        idcita: idcita,
        sexpediente: this.expediente?.numero,
        sespecialidad: this.expediente?.especialidad,
        sdemandante: this.expediente?.demandante,
        sdemandado: this.expediente?.demandado,
        scliente: this.frmNewAppt.value['scliente'],
        sfecha: this.frmNewAppt.value['sfecha'],
        shora: this.frmNewAppt.value['shora'],
        stipo: this.frmNewAppt.value['stipo'],
        sencargados: this.frmNewAppt.value['sencargados'],
        stema: this.frmNewAppt.value['stema'],
        sacuerdos: '-'
      })
      .then((x) => {
        this.getCitas();
        this.modalService.dismissAll();
        this.frmNewAppt.reset();
      })
      .catch(() => {
        window.alert('ERROR al registrar cita')
      })
      .finally(() => {
        this.lAdding = false;
      })
  }

  editCita() {
    this.lUpdating = true;
    let idcita = this.frmEditAppt.value['idcita'];

    this.db
      .collection('citas')
      .doc(idcita)
      .update({
        sfecha: this.frmEditAppt.value['sfecha'],
        shora: this.frmEditAppt.value['shora'],
        scliente: this.frmEditAppt.value['scliente'],
        stipo: this.frmEditAppt.value['stipo'],
        sencargados: this.frmEditAppt.value['sencargados'],
        stema: this.frmEditAppt.value['stema'],
      })
      .then((x) => {
        this.getCitas();
        this.modalService.dismissAll();
        this.frmEditAppt.reset();
      })
      .catch(() => {
        window.alert('ERROR al actualizar cita')
      })
      .finally(() => {
        this.lUpdating = false;
      })
  }

  deleteCita() {
    this.lDeleting = true;
    let idcita = this.frmDeleteAppt.value['idcita'];

    this.db.collection('citas')
      .doc(idcita)
      .delete()
      .then(() => {
        this.getCitas();
        this.modalService.dismissAll();
        this.frmDeleteAppt.reset();
      })
      .catch(err => {
        window.alert('ERROR al quitar cita')
      })
      .finally(() => {
        this.lDeleting = false;
      })
  }

  // Cambia de modo

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }
} 
