import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { Expediente } from '../_interfaces/expediente';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-reporte-expedientes',
  imports: [
    NgIcon,
  ],
  templateUrl: './reporte-expedientes.component.html',
  styleUrl: './reporte-expedientes.component.scss',
})
export class ReporteExpedientesComponent implements OnInit {
  expedientes: Expediente[] = [];

  descargando: boolean = false;
  timestampUltimaDescarga: number = 9999999999999;
  fechaUltimaDescarga: string = '9999-01-01';
  habilitarDescarga: boolean = false;
  textoBotonDescarga: string = 'cargando...';

  constructor(private service: AppService) { }

  async ngOnInit() {
    let obs = this.service.expedientes.pipe(filter(x => x.length > 0));
    const expedientes = await firstValueFrom(obs);

    this.expedientes = expedientes.sort((a: any, b: any) => a.numero < b.numero ? -1 : 1);

    // console.log(this.expedientes);

    this.obtenerFechaUltimaDescarga();
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
        "Fecha registro en el sistema": fechaFormateada,
        "Tiene contrato?": expediente['tieneContrato'] ? 'Si' : null,
        "Casacion": expediente['numeroCasacion'],
        "Sala casacion": expediente['salaCasacion'],
        "Depurado": expediente['estado'] == 'FINALIZADO' ? 'Si' : null,
        "Motivo": expediente['motivoFinalizacion']
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
    const ahora = (new Date()).getTime();
    link.setAttribute('href', url);
    link.setAttribute('download', 'Cartera de expedientes '+ ahora + '.csv');
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
        "Fecha registro en el sistema": fechaFormateada,
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
    const ahora = (new Date()).getTime();
    link.setAttribute('href', url);
    link.setAttribute('download', 'Cartera de expedientes completo ' + ahora + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await this.obtenerFechaUltimaDescarga();

    this.descargando = false;
  }

}
