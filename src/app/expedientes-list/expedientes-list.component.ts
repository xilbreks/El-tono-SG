import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from './../app.service';

import { Expediente } from '../_interfaces/expediente';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
    selector: 'app-expedientes-list',
    templateUrl: './expedientes-list.component.html',
    styleUrls: ['./expedientes-list.component.scss'],
    imports: [
      RouterLink,
      NgIcon,
      AsyncPipe,
      JsonPipe,
    ]
})
export class ExpedientesListComponent implements AfterViewInit, OnInit {
  isReady: boolean = false;

  expedientes: Expediente[] = [];
  expedientesFiltered: Array<any> = [];
  limitSearch: number = 15;

  viewMode = true;
  laborales: Expediente[] = [];
  familias: Expediente[] = [];
  civiles: Expediente[] = [];
  notariales: Expediente[] = [];
  penales: Expediente[] = [];
  constitucionales: Expediente[] = [];
  carpetas: Expediente[] = [];
  curadurias: Expediente[] = [];

  usuario$: Observable<any | null>;

  constructor(
    private service: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.usuario$ = service.usuario$;
  }

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
    this.laborales = this.expedientes.filter(e => e.especialidad == 'LABORAL');
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

  /**
   * DESCARGAR CSV (NATIVO - SINOPSIS DE EXCEL)
   */
  async descargarExcel() {
    let todo_Excel: Array<any> = [];

    this.expedientes.forEach(expediente => {
      const fechaTmp = new Date(expediente['fechaCreacion']);
      const dia = String(fechaTmp.getDate()).padStart(2, '0');
      const mes = String(fechaTmp.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const anio = fechaTmp.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;

      todo_Excel.push({
        "Expediente": expediente['numero'],
        "Clase": expediente['clase'],
        "Area": expediente['especialidad'],
        "Materia": expediente['materia'],
        "Demandante": expediente['demandante'],
        "Demandado": expediente['demandado'],
        "ITER": expediente['nombreCheckpoint'],
        "Fecha creacion": fechaFormateada,
        "Tiene contrato?": expediente['tieneContrato'] ? 'Si' : null,
        "Casacion": expediente['numeroCasacion'],
        "Sala casacion": expediente['salaCasacion'],
      });
    });

    if (todo_Excel.length === 0) return;

    // 1. Obtener las cabeceras (las llaves del primer objeto)
    const headers = Object.keys(todo_Excel[0]);

    // 2. Construir las filas del CSV envolviendo cada celda en comillas dobles y separando por punto y coma (;)
    // El punto y coma ayuda a que Excel en español reconozca las columnas directamente
    const rows = todo_Excel.map(obj =>
      headers.map(header => `"${obj[header] ?? ''}"`).join(';')
    );

    // 3. Unir cabeceras y filas con saltos de línea
    const csvContent = [headers.join(';'), ...rows].join('\n');

    // 4. Crear el archivo Blob agregando el BOM (\uFEFF) para soporte de tildes y eñes en Excel
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });

    // 5. Crear un enlace de descarga invisible en el navegador y dispararlo
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Cartera de expedientes ' + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
