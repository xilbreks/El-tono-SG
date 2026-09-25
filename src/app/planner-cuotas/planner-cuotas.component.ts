import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Cuota } from '../_interfaces/cuota';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-planner-cuotas',
  templateUrl: './planner-cuotas.component.html',
  styleUrl: './planner-cuotas.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIcon,
  ]
})
export class PlannerCuotasComponent implements OnInit {
  appService = inject(AppService);

  cuotas: Cuota[] = [];
  frmDate: FormGroup;
  cargando: boolean = true;

  today: string = '';

  constructor(
    private modalService: NgbModal,
  ) {
    this.frmDate = new FormGroup({
      inicio: new FormControl(null, Validators.required),
      final: new FormControl(null, Validators.required),
      mes: new FormControl(null, Validators.required),
      anio: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const time = dHoy.getTime() - 18000000;
    this.today = (new Date(time)).toISOString().slice(0, 10);
    const nYear = dHoy.getFullYear();
    let nMonth: any = dHoy.getMonth() + 1;

    if (nMonth < 10) {
      nMonth = '0' + nMonth;
    }

    this.frmDate.patchValue({
      mes: nMonth,
      anio: nYear
    });
  }

  cambiarFecha() {
    let anio = this.frmDate.value['anio'];
    let mes = this.frmDate.value['mes'];

    let nLastDay = (new Date(anio, mes, 0)).getDate();

    let primerDia = `${anio}-${mes}-01`;
    let ultimoDia = `${anio}-${mes}-${nLastDay}`;

    this.frmDate.patchValue({
      inicio: primerDia,
      final: ultimoDia,
    });

    this.obtenerCuotas();
  }

  async obtenerCuotas() {
    this.cargando = true;
    let inicio = this.frmDate.controls['inicio'].value;
    let final = this.frmDate.controls['final'].value;

    // console.log(`Desde ${inicio} hasta ${final}`);

    let cuotas = await this.appService.plannerVencimientos(inicio, final);

    // Verificar el estado de vencimiento de las cuotas
    cuotas = cuotas.map(cuota => {
      if (cuota.estado == 'PAGADA') {
        return cuota;
      }
      if (!cuota.vencimiento) {
        return cuota;
      }
      const estado = cuota.vencimiento < this.today ? 'VENCIDA' : 'EN-PLAZO';
      return {
        ...cuota,
        estado,
      }
      
    })

    this.cuotas = cuotas;

    this.cargando = false;
  }

  /**
   * DESCARGAR CSV (NATIVO - SINOPSIS DE EXCEL)
   */
  async descargarExcel() {
    let todo_Excel: Array<any> = [];
    

    this.cuotas.forEach(cuota => {
      

      todo_Excel.push({
        "Expediente": cuota['numeroExpediente'],
        "Area": cuota['especialidad'],
        "Demandante": cuota['demandante'],
        "Demandado": cuota['demandado'],
        "Materia": cuota['materia'],
        "Nro de cuota": cuota['numero'],
        "F.V.": cuota['vencimiento'],
        "Estado": cuota['estado'],
        "Monto": cuota['monto'],
        "Observaciones": ` ${cuota['observaciones']}`,
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
    link.setAttribute('download', 'Planner cobranzas ' + this.today + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}

