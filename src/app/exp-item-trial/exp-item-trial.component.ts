import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-trial',
  templateUrl: './exp-item-trial.component.html',
  styleUrl: './exp-item-trial.component.scss'
})
export class ExpItemTrialComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  lstAudiencias: any[] = [];
  lViewMode = true;

  lLoading = false;
  lAdding = false;
  lUpdating = false;
  lDeleting = false;

  frmNewAudience: FormGroup;
  frmEditAudience: FormGroup;
  frmDeleteAudience: FormGroup;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    /*******************************
     ****** FORM NEW AUDIENCE ******
     *******************************/
    this.frmNewAudience = new FormGroup({
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sencargados: new FormControl(null, Validators.required),
      surl: new FormControl(null, Validators.required),
    });

    /*******************************
     ****** FORM EDIT AUDIENCE ******
     *******************************/
    this.frmEditAudience = new FormGroup({
      idaudiencia: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sencargados: new FormControl(null, Validators.required),
      surl: new FormControl(null, Validators.required),
    });

    /*******************************
     ***** FORM DELETE AUDIENCE *****
     *******************************/
    this.frmDeleteAudience = new FormGroup({
      idaudiencia: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getAudiencias()
    }
  }

  getAudiencias() {
    this.lLoading = true;
    this.lstAudiencias = [];

    let obs = this.db.collection('audiencias', ref => {
      return ref.where('sexpediente', '==', this.expediente?.numero)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstAudiencias = res.map(aud => {
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

  openModalAddAudiencia(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  openModalEditAudiencia(audiencia: any, modal: any) {
    this.frmEditAudience.setValue({
      idaudiencia: audiencia.idaudiencia,
      sfecha: audiencia.sfecha,
      shora: audiencia.shora,
      stipo: audiencia.stipo,
      sencargados: audiencia.sencargados,
      surl: audiencia.surl,
    })

    this.modalService.open(modal, {
      size: 'md'
    });
  }

  openModalDeleteAudiencia(audiencia: any, modal: any) {
    this.frmDeleteAudience.setValue({
      idaudiencia: audiencia.idaudiencia,
      sfecha: audiencia.sfecha,
      shora: audiencia.shora,
      stipo: audiencia.stipo,
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  // Funciones para ejecutar cambios en la base de datos

  addAudiencia() {
    this.lAdding = true;

    let sfecha = this.frmNewAudience.value['sfecha'];
    const sid = (new Date().getTime()).toString().slice(7);
    const idaudiencia = [sfecha, sid].join('-');

    this.db
      .collection('audiencias')
      .doc(idaudiencia)
      .set({
        idaudiencia: idaudiencia,
        sexpediente: this.expediente?.numero,
        sespecialidad: this.expediente?.especialidad,
        sdemandante: this.expediente?.demandante,
        sdemandado: this.expediente?.demandado,
        sfecha: this.frmNewAudience.value['sfecha'],
        shora: this.frmNewAudience.value['shora'],
        stipo: this.frmNewAudience.value['stipo'],
        sencargados: this.frmNewAudience.value['sencargados'],
        surl: this.frmNewAudience.value['surl'],
      })
      .then((x) => {
        this.getAudiencias();
        this.modalService.dismissAll();
        this.frmNewAudience.reset();
      })
      .catch(() => {
        window.alert('ERROR al registrar audiencia')
      })
      .finally(() => {
        this.lAdding = false;
      })
  }

  editAudiencia() {
    this.lUpdating = true;
    let idaudiencia = this.frmEditAudience.value['idaudiencia'];

    this.db
      .collection('audiencias')
      .doc(idaudiencia)
      .update({
        sfecha: this.frmEditAudience.value['sfecha'],
        shora: this.frmEditAudience.value['shora'],
        stipo: this.frmEditAudience.value['stipo'],
        sencargados: this.frmEditAudience.value['sencargados'],
        surl: this.frmEditAudience.value['surl'],
      })
      .then((x) => {
        this.getAudiencias();
        this.modalService.dismissAll();
        this.frmEditAudience.reset();
      })
      .catch(() => {
        window.alert('ERROR al actualizar pago')
      })
      .finally(() => {
        this.lUpdating = false;
      })
  }

  deleteAudiencia() {
    this.lDeleting = true;
    let idaudiencia = this.frmDeleteAudience.value['idaudiencia'];

    this.db.collection('audiencias')
      .doc(idaudiencia)
      .delete()
      .then(() => {
        this.getAudiencias();
        this.modalService.dismissAll();
        this.frmDeleteAudience.reset();
      })
      .catch(err => {
        window.alert('ERROR al quitar audiencia')
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
