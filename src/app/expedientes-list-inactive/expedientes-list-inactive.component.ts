import { Component } from '@angular/core';
import { AppService } from './../app.service';

import { Expediente } from '../_interfaces/expediente';

@Component({
  selector: 'app-expedientes-list-inactive',
  templateUrl: './expedientes-list-inactive.component.html',
  styleUrl: './expedientes-list-inactive.component.scss'
})
export class ExpedientesListInactiveComponent {
  isLoading = false;

  expedientes: Expediente[] = [];
  expedientesFiltrados: Expediente[] = [];

  constructor(
    private service: AppService,
  ) {
    this.obtenerExpedientes();
  }

  obtenerExpedientes() {
    this.isLoading = true;
    this.service.expedientes.subscribe(res => {
      this.expedientes = res.filter((e: any) => e.estado == 'FINALIZADO').sort((a: any, b: any) => {
        if (a.especialidad > b.especialidad)
          return 1;
        else
          return -1;
      });
      this.expedientesFiltrados = this.expedientes;

      if (this.expedientes.length > 0) {
        this.isLoading = false;
      }
    });
  }

  filtrar(val: string) {
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    if (sterms.length == 0) {
      this.expedientesFiltrados = this.expedientes;
      return;
    }

    this.expedientesFiltrados = this.expedientes
      .filter(exp => {
        let lMatch = false;
        let nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.demandado.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.demandante.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.numero.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.codigo?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.numeroCautelar?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;

        return lMatch;
      }).slice(0, 7);

  }
}
