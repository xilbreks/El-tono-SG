import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';

import { AppService } from '../app.service';
import { Tarea } from '../_interfaces/tarea';

@Component({
  selector: 'app-reporte-cobranza',
  imports: [
    ReactiveFormsModule,
    NgIconsModule,
  ],
  templateUrl: './reporte-cobranza.component.html',
  styleUrl: './reporte-cobranza.component.scss',
})
export class ReporteCobranzaComponent {
  appService = inject(AppService);

  fcTipoFecha: FormControl = new FormControl(null);
  fcMes: FormControl = new FormControl(null);
  fcSemana: FormControl = new FormControl(null);
  fcDia: FormControl = new FormControl(null);

  inicio: string = '--';
  final: string = '--';

  tareas: Tarea[] = [];
  generando = false;
  tituloDatos = '';

  constructor() { }

  ngOnInit(): void {

  }

  cambiarMes() {
    // Reset semana y dia
    this.fcSemana.reset();
    this.fcDia.reset();

    // Calcular inicio y final
    const mes = this.fcMes.value;
    const [inicio, final] = this.obtenerRangoMes(mes);
    this.inicio = inicio;
    this.final = final;
  }

  cambiarSemana() {
    // Reset mes y dia
    this.fcMes.reset();
    this.fcDia.reset();

    // Calcular inicio y final
    const semana = this.fcSemana.value;
    const [inicio, final] = this.obtenerRangoSemana(semana);
    this.inicio = inicio;
    this.final = final;
  }

  cambiarDia() {
    // Reset mes y semana
    this.fcMes.reset();
    this.fcSemana.reset();

    // Calcular inicio y final
    const dia = this.fcDia.value;
    const [inicio, final] = this.obtenerRangoDia(dia);
    this.inicio = inicio;
    this.final = final;
  }

  obtenerRangoMes(yyyyMm: string): [string, string] {
    const [yearStr, monthStr] = yyyyMm.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    // 1. El primer día siempre es 01
    const primerDia = `${yyyyMm}-01`;

    // 2. Calculamos el último día del mes
    // new Date(año, mes, 0) devuelve el último día del mes anterior al indicado.
    // Como pasamos 'month' (1 a 12), JavaScript lo interpreta como el mes siguiente (0 a 11), 
    // por lo que el día 0 de ese mes corresponde al último día de nuestro mes objetivo.
    const ultimoDiaDate = new Date(year, month, 0);
    const diaUltimo = String(ultimoDiaDate.getDate()).padStart(2, '0');

    const ultimoDia = `${yyyyMm}-${diaUltimo}`;

    return [primerDia, ultimoDia];
  }

  obtenerRangoSemana(yyyyWww: string): [string, string] {
    const match = yyyyWww.match(/^(\d{4})-W(\d{2})$/);
    if (!match) {
      throw new Error("Formato de semana inválido. Debe ser YYYY-Www (ej. 2026-W40)");
    }

    const year = parseInt(match[1], 10);
    const week = parseInt(match[2], 10);

    // El estándar ISO establece que el 4 de enero siempre está en la primera semana del año
    const jan4 = new Date(Date.UTC(year, 0, 4));
    let dayOfWeek = jan4.getUTCDay();
    if (dayOfWeek === 0) dayOfWeek = 7; // Ajustar domingo a 7 (Lunes=1, Domingo=7)

    // Encontrar el lunes de la primera semana del año
    const mondayWeek1 = new Date(jan4);
    mondayWeek1.setUTCDate(jan4.getUTCDate() - (dayOfWeek - 1));

    // Sumar las semanas correspondientes (week - 1) para llegar al lunes de la semana buscada
    const targetMonday = new Date(mondayWeek1);
    targetMonday.setUTCDate(mondayWeek1.getUTCDate() + (week - 1) * 7);

    // El domingo de esa misma semana es 6 días después del lunes
    const targetSunday = new Date(targetMonday);
    targetSunday.setUTCDate(targetMonday.getUTCDate() + 6);

    // Función auxiliar para formatear la fecha a YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, '0');
      const d = String(date.getUTCDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    return [formatDate(targetMonday), formatDate(targetSunday)];
  }

  obtenerRangoDia(yyyyMmDd: string): [string, string] {
    // Como es un solo día, el inicio y el fin son exactamente la misma fecha
    return [yyyyMmDd, yyyyMmDd];
  }

  async obtenerReporte() {
    const fechaInicio = this.inicio;
    const fechaFinal = this.final;
    // Validar fecha de inicio y final
    const formatoRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!formatoRegex.test(fechaInicio) || !formatoRegex.test(fechaFinal)) {
      console.warn('Las fechas no tienen el formato correcto (YYYY-MM-DD)');
      alert('Seleccione fecha valida')
      return;
    }

    // Obtener tareas con comunicacion
    this.generando = true;
    const tareas = await this.appService.tareasPorCobranzaRangoFecha(fechaInicio, fechaFinal);
    console.log(tareas);

    this.tareas = tareas;
    this.tituloDatos = `Vista general de los datos encontrados desde: ${fechaInicio} hasta ${fechaFinal}. Total ${tareas.length} registros.`;
    this.inicio = '';
    this.final = '';
    this.fcDia.reset();
    this.fcSemana.reset();
    this.fcMes.reset();
    this.fcTipoFecha.reset();

    this.generando = false;
  }

  descargarExcel() {
    let todo_Excel: Array<any> = [];
    const hoy = new Date().getTime().toString();

    this.tareas.forEach(tarea => {
      const fechaTmp = new Date(Number(tarea.fechaCreacion));
      const date = fechaTmp.toLocaleDateString();
      const time = fechaTmp.toLocaleTimeString();
      const fechaRegistro = `${date} - ${time}`;

      todo_Excel.push({
        "Fecha": tarea['fechaTarea'],
        "Expediente": tarea['numero'],
        // "Area": tarea['especialidad'],
        "Demandante": tarea['demandante'],
        "Demandado": tarea['demandado'],
        "Detalle comunicación": tarea['detalleTarea'],
        "Pendiente": tarea['pendienteTarea'],
        "Encargado": tarea['nombreUsuario'],
        "Fecha registro en el RDT": fechaRegistro,
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
    link.setAttribute('download', 'Reporte de Cobranzas ' + hoy + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
