import { Component, Input, OnChanges, SimpleChanges, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Expediente } from './../_interfaces/expediente';
import { Checkpoint } from '../_interfaces/checkpoint';
import { AppService } from '../app.service';
import { JsonPipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-roadmap',
  templateUrl: './exp-item-roadmap.component.html',
  styleUrl: './exp-item-roadmap.component.scss',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIcon,
  ]
})
export class ExpItemRoadmapComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  @ViewChild('modalCambioCheckpoint', { static: true }) modalCambioIter!: TemplateRef<any>;
  @ViewChild('modalAvanceCheckpoint', { static: true }) modalAvanceIter!: TemplateRef<any>;

  appService = inject(AppService);
  http = inject(HttpClient);

  frmCheckpoint: FormGroup;
  checkpoints: Checkpoint[] = [];

  actualizando = false;

  constructor(
    private modalService: NgbModal,
  ) {
    this.frmCheckpoint = new FormGroup({
      id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.cargarIters(this.expediente.proceso, this.expediente.idCheckpoint);
    }
  }

  cargarIters(proceso: string, idCheckpoint: string) {
    this.http.get('assets/iters.csv', { responseType: 'text' }).subscribe({
      next: (csvText) => {
        Papa.parse<Checkpoint>(csvText, {
          header: true,
          dynamicTyping: function (field) {
            if (field === "elegible" || field === "mostrar") {
              return true;
            }

            if (field === 'orden') {
              return true;
            }

            return false;
          },
          skipEmptyLines: true,
          complete: (result) => {
            let checkpoints = result.data;

            let iters = checkpoints
              .filter(a => a.mostrar)
              .filter(a => a.proceso == proceso)
              .sort((a, b) => a.orden - b.orden)
              .map(c => ({ ...c, pintar: true }));

            // Agregar el atributo de pintar segun avance
            for (let i = iters.length - 1; i >= 0; i--) {
              if (iters[i].idCheckpoint == idCheckpoint) {
                break;
              } else {
                iters[i].pintar = false;
              }
            }

            this.checkpoints = iters;
          },
          error: (error: any) => {
            console.error('Error al parsear el CSV:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar el archivo CSV:', error);
      }
    });
  }

  iniciarCambioCheckpoint() {
    this.modalService.dismissAll();
    this.mostrarModalEdicion();
  }

  mostrarModalEdicion() {
    this.frmCheckpoint.reset();

    let especialidad = this.expediente?.especialidad.toLocaleLowerCase();
    let size = especialidad == 'penal' ? 'lg' : 'md';

    this.modalService.open(this.modalCambioIter, {
      size: size,
      backdrop: 'static',
    });
  }

  seleccionarCheckpoint() {
    let idCheckpoint = this.frmCheckpoint.controls['id'].value;
    let checkpointSeleccionado = this.checkpoints.filter(a => a.idCheckpoint == idCheckpoint)[0];
    this.frmCheckpoint.patchValue({
      nombre: checkpointSeleccionado.nombre,
    })
  }

  async concretarCambioCheckpoint() {
    if (!this.expediente) return;

    this.actualizando = true;

    let idCheckpoint = this.frmCheckpoint.controls['id'].value;
    let nombreCheckpoint = this.frmCheckpoint.controls['nombre'].value;
    let fechaCheckpoint = this.frmCheckpoint.controls['fecha'].value;

    // agregar el nuevo checkpoint
    const timestamp = Date.now();
    const letraAleatoria = this.generarLetraAleatoria();
    const idGenerado = `ID${timestamp}${letraAleatoria}`;
    // const usuarioActivo = this.auth.currentUser;
    const usuario = localStorage.getItem('nombre') ?? 'Usuario anonimo';
    // const usuario = usuarioActivo?.displayName;

    const payload = {
      idChangelog: idGenerado,
      idExpediente: this.expediente.idExpediente,

      idCheckpoint: idCheckpoint,
      nombreCheckpoint: nombreCheckpoint,
      fecha: fechaCheckpoint,

      actualizadoPor: usuario,
      fechaCreacion: timestamp,
    };

    await this.appService.registrarChangelog(idGenerado, payload);

    await this.appService.actualizarExpediente(this.expediente.idExpediente, {
      idCheckpoint: idCheckpoint,
      nombreCheckpoint: nombreCheckpoint,
    });

    this.expediente.nombreCheckpoint = nombreCheckpoint;
    this.expediente.idCheckpoint = idCheckpoint;
    this.frmCheckpoint.reset();
    this.modalService.dismissAll();
    this.actualizando = false;

    // Re pintar el avance
    let iters = this.checkpoints
      .map(c => ({ ...c, pintar: true }));

    for (let i = iters.length - 1; i >= 0; i--) {
      if (iters[i].idCheckpoint == idCheckpoint) {
        break;
      } else {
        iters[i].pintar = false;
      }
    }

    this.checkpoints = iters;
  }

  generarLetraAleatoria() {
    const codigoASCII_A = 65;
    const codigoASCII_Z = 90;

    const codigoAleatorio = Math.floor(Math.random() * (codigoASCII_Z - codigoASCII_A + 1)) + codigoASCII_A;

    // Convierte el código ASCII a su carácter correspondiente
    const letraAleatoria = String.fromCharCode(codigoAleatorio);

    return letraAleatoria;
  }

  mostrarModalAvance() {
    this.modalService.dismissAll();
    this.modalService.open(this.modalAvanceIter, {
      size: 'lg',
      backdrop: 'static',
    });
  }

}
