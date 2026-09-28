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
  descargando: boolean = false;
  timestampUltimaDescarga: number = 9999999999999;
  fechaUltimaDescarga: string = '9999-01-01';
  habilitarDescarga: boolean = false;
  textoBotonDescarga: string = 'cargando...';

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

    this.obtenerFechaUltimaDescarga();
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

  // Obtener ultima fecha de descarga del excel
  async obtenerFechaUltimaDescarga() {
    const ojbFecha = await this.service.obtenerUltimaDescargaExcel();
    if (!ojbFecha) return;
    
    this.timestampUltimaDescarga = ojbFecha.timestamp;
    this.fechaUltimaDescarga = (new Date(ojbFecha.timestamp)).toLocaleDateString('en-CA');


    // Evaluar si se habilita el boton de descarga
    const AHORA = (new Date()).getTime();
    const TIEMPO_ESPERA_MS = 23 * 60 * 60 * 1000;
    const tiempoLiberacion = this.timestampUltimaDescarga + TIEMPO_ESPERA_MS;
    if (AHORA >= tiempoLiberacion) {
      this.habilitarDescarga = true;
      this.textoBotonDescarga = '';
    } else {
      const diferencia = tiempoLiberacion - AHORA;
      const horas = Math.floor(diferencia / (60 * 60 * 1000));
      const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));

      this.habilitarDescarga = false;
      this.textoBotonDescarga = `Espera ${horas}h ${minutos}m para volver a descargar Excel Completo`;
    }
  }

  /**
   * DESCARGAR CSV (NATIVO - SINOPSIS DE EXCEL)
   */
  async descargarExcelSimple() {
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

  /**
   * DESCARGAR CSV (NATIVO - SINOPSIS DE EXCEL) COMPLEJO
   */
  async descargarExcelCompleto() {
    const res = window.confirm('¿Descargar Excel completo?\nSolo se puede descargar una vez cada 23 horas.\nDemora un minuto en descargar, esperar pacientemente.');
    if (!res) return;

    this.descargando = true;

    // validar que se puede descargar
    const fhoy = (new Date()).getTime();
    const ojbFecha = await this.service.obtenerUltimaDescargaExcel();
    if (ojbFecha.timestamp + 23 * 60 * 60 * 1000 > fhoy) {
      this.descargando = false;
      console.log('vivo eh xd');
      this.obtenerFechaUltimaDescarga();
      return;
    }

    // Actualizar nueva fecha de descarga
    await this.service.actualizarFechaUltimaDescarga(fhoy);

    // Obtener todos los abonos y cuotas activos
    const ABONOS = await this.service.abonosTodosNoDepurados();
    const CUOTAS = await this.service.cuotasTodasNoDepuradas();
    let todo_Excel: Array<any> = [];

    this.expedientes.forEach(expediente => {
      const fechaTmp = new Date(expediente['fechaCreacion']);
      const dia = String(fechaTmp.getDate()).padStart(2, '0');
      const mes = String(fechaTmp.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const anio = fechaTmp.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;

      let contratos = 0;
      let pagos = 0;
      let ultimoPago = null;
      let fechaPago = null;

      ABONOS.filter(a => a.idExpediente == expediente.idExpediente).forEach(a => {
        pagos += a.monto;
        ultimoPago = a.monto;
        fechaPago = a.fecha;
      });
      CUOTAS.filter(c => c.idExpediente == expediente.idExpediente).forEach(c => {
        contratos += c.monto;
      });

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
        "Monto contrato": contratos == 0 ? null : contratos,
        "Monto cancelado": pagos == 0 ? null : pagos,
        "Último pago": ultimoPago,
        "Fecha ultimo pago": fechaPago,
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
    link.setAttribute('download', 'Cartera de expedientes completo' + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await this.obtenerFechaUltimaDescarga();

    this.descargando = false;
  }

}
