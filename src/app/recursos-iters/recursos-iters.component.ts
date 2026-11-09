import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Checkpoint } from '../_interfaces/checkpoint';

@Component({
  selector: 'app-recursos-iters',
  templateUrl: './recursos-iters.component.html',
  styleUrls: ['./recursos-iters.component.scss'],
  imports: [
    NgClass
  ]
})
export class RecursosItersComponent implements OnInit {
  http = inject(HttpClient);

  checkpoints: Checkpoint[] = [];

  lstIterLaboral: Checkpoint[] = [];
  lstIterFamilia: Checkpoint[] = [];
  lstIterCivilConocimiento: Checkpoint[] = [];
  lstIterCivilAbreviado: Checkpoint[] = [];
  lstIterCivilSumarisimo: Checkpoint[] = [];
  lstIterPenal: Checkpoint[] = [];
  lstIterConstitucional: Checkpoint[] = [];
  lstIterNotarial: Checkpoint[] = [];
  lstIterAdministrativo: Checkpoint[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cargarIters();
  }

  cargarIters() {
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

            let iters = checkpoints.filter(a => a.mostrar)

            this.checkpoints = iters;

            this.separarPorProceso();
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

  separarPorProceso() {
    this.lstIterLaboral = this.checkpoints.filter(c => c.proceso == 'LABORAL').sort((a, b) => a.orden - b.orden);
    this.lstIterFamilia = this.checkpoints.filter(c => c.proceso == 'FAMILIA').sort((a, b) => a.orden - b.orden);
    this.lstIterCivilConocimiento = this.checkpoints.filter(c => c.proceso == 'CIVIL_CONOCIMIENTO').sort((a, b) => a.orden - b.orden);
    this.lstIterCivilAbreviado = this.checkpoints.filter(c => c.proceso == 'CIVIL_ABREVIADO').sort((a, b) => a.orden - b.orden);
    this.lstIterCivilSumarisimo = this.checkpoints.filter(c => c.proceso == 'CIVIL_SUMARISIMO').sort((a, b) => a.orden - b.orden);
    this.lstIterPenal = this.checkpoints.filter(c => c.proceso == 'PENAL').sort((a, b) => a.orden - b.orden);
    this.lstIterConstitucional = this.checkpoints.filter(c => c.proceso == 'CONSTITUCIONAL').sort((a, b) => a.orden - b.orden);
    this.lstIterNotarial = this.checkpoints.filter(c => c.proceso == 'NOTARIAL').sort((a, b) => a.orden - b.orden);
    this.lstIterAdministrativo = this.checkpoints.filter(c => c.proceso == 'ADMINISTRATIVO').sort((a, b) => a.orden - b.orden);
  }

}
