import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Audiencia } from '../_interfaces/audiencia';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-trial',
  templateUrl: './exp-item-trial.component.html',
  styleUrl: './exp-item-trial.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIcon,
  ]
})
export class ExpItemTrialComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;
  lstAudiencias: Audiencia[] = [];
  lViewMode = true;

  lLoading = false;
  lAdding = false;
  lUpdating = false;
  lDeleting = false;

  frmNewAudience: FormGroup;
  frmEditAudience: FormGroup;
  frmDeleteAudience: FormGroup;

  constructor(
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
      sasistente: new FormControl(null, Validators.required),
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
      sasistente: new FormControl(null, Validators.required),
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

  async getAudiencias() {
    if (!this.expediente) return;

    this.lLoading = true;
    this.lstAudiencias = [];

    const audiencias = await this.appService.audienciasPorExpediente(this.expediente.numero);

    this.lstAudiencias = audiencias;

    this.lLoading = false;
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
      sasistente: audiencia.sasistente ? audiencia.sasistente : null,
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

  async addAudiencia() {
    if (!this.expediente) return;

    this.lAdding = true;

    let sfecha = this.frmNewAudience.value['sfecha'];
    const sid = (new Date().getTime()).toString().slice(7);
    const idaudiencia = [sfecha, sid].join('-');
    const payload = {
      idaudiencia: idaudiencia,
      sexpediente: this.expediente.numero,
      sespecialidad: this.expediente.especialidad,
      sdemandante: this.expediente.demandante,
      sdemandado: this.expediente.demandado,
      sfecha: this.frmNewAudience.value['sfecha'],
      shora: this.frmNewAudience.value['shora'],
      stipo: this.frmNewAudience.value['stipo'].trim(),
      sencargados: this.frmNewAudience.value['sencargados'].trim(),
      sasistente: this.frmNewAudience.value['sasistente'].trim(),
      surl: this.frmNewAudience.value['surl'].trim(),
    }

    const ok = await this.appService.registrarAudiencia(idaudiencia, payload);

    this.getAudiencias();
    this.modalService.dismissAll();
    this.frmNewAudience.reset();

    this.lAdding = false;
  }

  async editAudiencia() {
    this.lUpdating = true;
    let idaudiencia = this.frmEditAudience.value['idaudiencia'];
    const payload = {
      sfecha: this.frmEditAudience.value['sfecha'],
      shora: this.frmEditAudience.value['shora'],
      stipo: this.frmEditAudience.value['stipo'].trim(),
      sencargados: this.frmEditAudience.value['sencargados'].trim(),
      sasistente: this.frmEditAudience.value['sasistente'].trim(),
      surl: this.frmEditAudience.value['surl'].trim(),
    }

    const ok = await this.appService.actualizarAudiencia(idaudiencia, payload);

    this.getAudiencias();
    this.modalService.dismissAll();
    this.frmEditAudience.reset();

    this.lUpdating = false;
  }

  async deleteAudiencia() {
    this.lDeleting = true;
    let idaudiencia = this.frmDeleteAudience.value['idaudiencia'];

    const ok = await this.appService.eliminarAudiencia(idaudiencia);

    this.getAudiencias();
    this.modalService.dismissAll();
    this.frmDeleteAudience.reset();

    this.lDeleting = false;
  }

  // Cambia de modo

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }
}
