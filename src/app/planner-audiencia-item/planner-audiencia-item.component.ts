import { Component, inject, input, signal, TemplateRef, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Audiencia } from '../_interfaces/audiencia';

@Component({
    selector: 'app-planner-audiencia-item',
    templateUrl: './planner-audiencia-item.component.html',
    styleUrl: './planner-audiencia-item.component.scss',
    imports: [NgClass, RouterLink, ReactiveFormsModule]
})
export class PlannerAudienciaItemComponent implements OnInit {
  // Injecciones
  audienciaI = input.required<Audiencia>();           // Audiencia desde el input
  audiencia = signal<Audiencia>(undefined as any);    // Copia local

  today = input.required<string>();
  modalService = inject(NgbModal);
  db = inject(Firestore);

  frmEditAudience: FormGroup;
  lUpdating = false;

  constructor() {
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

  }

  ngOnInit(): void {
    // Inicializar el valor de la copia local
    this.audiencia.set(this.audienciaI());
  }

  // Abrir Modal de detalles
  abrirDetalleAudiencia(content: TemplateRef<any>) {
    this.modalService.open(content, {
      centered: true,          // Lo centra verticalmente en la pantalla (UX óptimo)
      size: 'lg',              // Tamaño grande para distribuir las columnas cómodamente
      // backdrop: 'static',      // Evita que se cierre si el usuario hace clic afuera por error
      keyboard: true           // Permite cerrarlo con la tecla Escape
    });
  }

  // Abrir Modal de editar
  abrirModalEditar(audiencia: Audiencia, content: TemplateRef<any>) {
    this.frmEditAudience.setValue({
      idaudiencia: audiencia.idaudiencia,
      sfecha: audiencia.sfecha,
      shora: audiencia.shora,
      stipo: audiencia.stipo,
      sencargados: audiencia.sencargados,
      sasistente: audiencia.sasistente ? audiencia.sasistente : null,
      surl: audiencia.surl,
    })

    this.modalService.open(content, {
      centered: true,
      size: 'md',
      backdrop: 'static',      // Evita que se cierre si el usuario hace clic afuera por error
      keyboard: true           // Permite cerrarlo con la tecla Escape
    });
  }

  // Aplicar cambios a la base de datos
  async editAudiencia() {
    this.lUpdating = true;
    let idaudiencia = this.frmEditAudience.value['idaudiencia'];

    let payload = {
      sfecha: this.frmEditAudience.value['sfecha'],
      shora: this.frmEditAudience.value['shora'],
      stipo: this.frmEditAudience.value['stipo'].trim(),
      sencargados: this.frmEditAudience.value['sencargados'].trim(),
      sasistente: this.frmEditAudience.value['sasistente'].trim(),
      surl: this.frmEditAudience.value['surl'].trim(),
    }

    // console.log('actualizacion de audiencia', payload)

    const docRef = doc(this.db, 'audiencias', idaudiencia);
    await updateDoc(docRef, payload);

    // Detecion de enlace meet en el url
    const regexMeet = /meet\.google\.com\/[a-z]{3}-{0,1}[a-z]{4}-{0,1}[a-z]{3}/i;
    let prefijo = payload.surl;
    let cuerpo = '';
    let sufijo = '';
    const texto: string = payload.surl;
    const enlace: RegExpMatchArray | null = texto.match(regexMeet);

    // Existe link
    if (enlace) {
      let indiceInicio: number = texto.indexOf(enlace[0])

      prefijo = texto.slice(0, indiceInicio);
      cuerpo = texto.slice(indiceInicio, indiceInicio + 28).toLowerCase();
      sufijo = texto.slice(indiceInicio + 29);
    }

    this.audiencia.update(estadoActual => ({
      ...estadoActual,
      ...payload,
      sprefijolink: prefijo,
      scuerpolink: cuerpo,
      ssufijolink: sufijo,
    }))

    this.frmEditAudience.reset();
    this.lUpdating = false;

    this.modalService.dismissAll();
  }
}
