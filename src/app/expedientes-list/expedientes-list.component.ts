import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppService } from './../app.service';

import { Expediente } from '../_interfaces/expediente';

@Component({
  selector: 'app-expedientes-list',
  templateUrl: './expedientes-list.component.html',
  styleUrls: ['./expedientes-list.component.scss']
})
export class ExpedientesListComponent implements AfterViewInit {
  @ViewChild('searchTerm') searchTerm: any;
  expedientes: Expediente[] = [];
  expedientesFiltered: Array<any> = [];
  lModeFiltering = false;
  sFecha: string = '';
  lLoading = true;

  casaciones2da: Expediente[] = [];
  casaciones4ta: Expediente[] = [];
  laborales: Expediente[] = [];
  familias: Expediente[] = [];
  civiles: Expediente[] = [];
  penales: Expediente[] = [];
  constitucionales: Expediente[] = [];
  curadurias: Expediente[] = [];
  carpetas: Expediente[] = [];
  provicionales: Expediente[] = [];

  constructor(
    private service: AppService,
  ) {
    this.obtenerExpedientes();
  }

  ngAfterViewInit(): void {
    this.searchTerm.nativeElement.focus();
  }

  obtenerExpedientes() {
    this.service.expedientes.subscribe(res => {
      this.expedientes = res.filter((e: any) => e.estado == 'EN PROCESO');

      this.separarAreas();

      if (this.expedientes.length > 0) {
        this.lLoading = false;
      }
      
    });
  }

  separarAreas() {
    this.casaciones2da = this.expedientes.filter(e => e.numeroCasacion != null).filter(e => e.salaCasacion == '2DA SALA');
    this.casaciones4ta = this.expedientes.filter(e => e.numeroCasacion != null).filter(e => e.salaCasacion == '4TA SALA');
    this.laborales = this.expedientes.filter(e => e.numeroCasacion == null).filter(e => e.especialidad == 'LABORAL');
    this.familias = this.expedientes.filter(e => e.especialidad == 'FAMILIA');
    this.civiles = this.expedientes.filter(e => e.especialidad == 'CIVIL');
    this.penales = this.expedientes.filter(e => e.especialidad == 'PENAL').filter(e => e.clase != 'CF')
    this.constitucionales = this.expedientes.filter(e => e.especialidad == 'CONSTITUCIONAL');
    this.carpetas = this.expedientes.filter(e => e.clase == 'CF');
    this.curadurias = this.expedientes.filter(e => e.clase == 'CURADURIA');
    this.provicionales = this.expedientes.filter(e => e.clase == 'PROVISIONAL');
  }

  filtrar(val: string) {
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    if (sterms.length == 0) {
      this.expedientesFiltered = this.expedientes;
      this.lModeFiltering = false;
      return;
    }

    this.expedientesFiltered = this.expedientes
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
          if (exp.numeroCasacion?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        // sterms.forEach(sterm => {
        //   if (exp.numeroCautelar?.toLowerCase().includes(sterm)) nMatchs++;
        // })
        // if (nMatchs == sterms.length) lMatch = true;

        return lMatch;
      });
    this.lModeFiltering = true;
  }

}
