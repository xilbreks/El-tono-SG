import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from './../app.service';

import { Expediente } from '../_interfaces/expediente';
import { filter, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-expedientes-list',
  templateUrl: './expedientes-list.component.html',
  styleUrls: ['./expedientes-list.component.scss']
})
export class ExpedientesListComponent implements AfterViewInit, OnInit {
  isReady: boolean = false;

  expedientes: Expediente[] = [];
  expedientesFiltered: Array<any> = [];
  limitSearch: number = 15;

  viewMode = true;
  casaciones2da: Expediente[] = [];
  casaciones4ta: Expediente[] = [];
  laborales: Expediente[] = [];
  familias: Expediente[] = [];
  civiles: Expediente[] = [];
  notariales: Expediente[] = [];
  penales: Expediente[] = [];
  constitucionales: Expediente[] = [];
  carpetas: Expediente[] = [];
  curadurias: Expediente[] = [];

  constructor(
    private service: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const query = this.route.snapshot.queryParams['q'];

    let obs = this.service.expedientes.pipe(filter(x => x.length > 0));
    const expedientes = await firstValueFrom(obs);

    this.expedientes = expedientes.filter((e: any) => e.estado == 'EN PROCESO')
      .sort((a: any, b: any) => a.numero < b.numero ? -1 : 1);

    this.separarAreas();

    if (query) this.buscar(query);

    this.isReady = true;
  }

  ngAfterViewInit(): void {
    const input: any = document.getElementById('texto-busqueda');
    const query = this.route.snapshot.queryParams['q'];
    if (input) input.focus();
    if (query) input.value = query;
  }

  separarAreas() {
    this.casaciones2da = this.expedientes.filter(e => e.numeroCasacion != null).filter(e => e.salaCasacion == '2DA SALA');
    this.casaciones4ta = this.expedientes.filter(e => e.numeroCasacion != null).filter(e => e.salaCasacion == '4TA SALA');
    this.laborales = this.expedientes.filter(e => e.numeroCasacion == null).filter(e => e.especialidad == 'LABORAL');
    this.familias = this.expedientes.filter(e => e.especialidad == 'FAMILIA');
    this.civiles = this.expedientes.filter(e => e.especialidad == 'CIVIL');
    this.notariales = this.expedientes.filter(e => e.especialidad == 'NOTARIAL');
    this.penales = this.expedientes.filter(e => e.especialidad == 'PENAL').filter(e => e.clase != 'CF')
    this.constitucionales = this.expedientes.filter(e => e.especialidad == 'CONSTITUCIONAL');
    this.carpetas = this.expedientes.filter(e => e.clase == 'CF');
    this.curadurias = this.expedientes.filter(e => e.clase == 'CURADURIA');
  }

  cambiarURL(query: string) {
    this.router.navigate(['/expedientes-listing'], { queryParams: { q: query } });
    this.buscar(query);
  }

  buscar(query: string) {
    let sterms = query.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    if (sterms.length == 0) {
      this.expedientesFiltered = [];
      this.viewMode = true;
      return;
    }
    this.viewMode = false;

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

        sterms.forEach(sterm => {
          if (exp.numeroProvisional?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;

        return lMatch;
      }).filter((v, i) => i < this.limitSearch);
  }

}
