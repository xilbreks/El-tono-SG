import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tareo-diario-admin',
  templateUrl: './tareo-diario-admin.component.html',
  styleUrl: './tareo-diario-admin.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class TareoDiarioAdminComponent {
  appService = inject(AppService);
  fcFecha: FormControl = new FormControl(null);
  tareos: any[] = [];

  frmEntrada: FormGroup;
  frmSalida: FormGroup;
  frmObserv: FormGroup;

  cargando = false;
  guardando = false;

  constructor(
    private modalService: NgbModal,
  ) {
    this.frmEntrada = new FormGroup({
      idTareo: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      minuto: new FormControl(null, Validators.required),
    });

    this.frmSalida = new FormGroup({
      idTareo: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      minuto: new FormControl(null, Validators.required),
    });

    this.frmObserv = new FormGroup({
      idTareo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
    });

    this.colocarFechaHoy();
    this.obtenerTareos();
  }

  // Funciones internas

  colocarFechaHoy() {
    let d = new Date();
    var year = '' + d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    let s = [year, month, day].join('-');

    this.fcFecha.setValue(s);
  }

  // Modals

  abrirModalEntrada(idTareo: string, modal: any) {
    this.frmEntrada.setValue({
      idTareo: idTareo,
      hora: null,
      minuto: null,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  abrirModalSalida(idTareo: string, modal: any) {
    this.frmSalida.setValue({
      idTareo: idTareo,
      hora: null,
      minuto: null,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  abrirModalObservacion(idTareo: string, observ: string, modal: any) {
    this.frmObserv.setValue({
      idTareo: idTareo,
      observaciones: observ,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  // Acciones de usuario

  async obtenerTareos() {
    this.cargando = true;

    let fecha = this.fcFecha.value;
    const tareos = await this.appService.tareosPorFecha(fecha);
    this.tareos = tareos;

    this.cargando = false;
  }

  async guardarEntrada() {
    this.guardando = true;

    let idTareo = this.frmEntrada.value['idTareo'];
    let hora = this.frmEntrada.value['hora'];
    let minuto = this.frmEntrada.value['minuto'];
    const payload = {
      entradaHora: hora,
      entradaMinuto: minuto,
    }

    const ok = await this.appService.actualizarTareo(idTareo, payload);

    let tareo = this.tareos.find(t => t.idTareo == idTareo);
    if (tareo) {
      tareo.entradaHora = hora;
      tareo.entradaMinuto = minuto;
    }

    this.guardando = false;
    this.modalService.dismissAll();
  }

  async guardarSalida() {
    this.guardando = true;

    let idTareo = this.frmSalida.value['idTareo'];
    let hora = this.frmSalida.value['hora'];
    let minuto = this.frmSalida.value['minuto'];
    const payload = {
      salidaHora: hora,
      salidaMinuto: minuto,
    }

    const ok = await this.appService.actualizarTareo(idTareo, payload);

    let tareo = this.tareos.find(t => t.idTareo == idTareo);
    if (tareo) {
      tareo.salidaHora = hora;
      tareo.salidaMinuto = minuto;
    }

    this.guardando = false;
    this.modalService.dismissAll();
  }

  async guardarObservacion() {
    this.guardando = true;

    let idTareo = this.frmObserv.value['idTareo'];
    let observacion = this.frmObserv.value['observaciones'];
    const payload = {
      observaciones: observacion,
    }

    const ok = await this.appService.actualizarTareo(idTareo, payload);

    let tareo = this.tareos.find(t => t.idTareo == idTareo);
    if (tareo) tareo.observaciones = observacion

    this.guardando = false;
    this.modalService.dismissAll();
  }

  /**
   * DESCARGAR CSV (NATIVO - SINOPSIS DE EXCEL)
   */
  async descargarExcel() {
    let todo_Excel: Array<any> = [];
    const fecha = this.fcFecha.value;

    let tareas = await this.appService.tareasPorFecha(fecha);

    tareas = tareas.sort((a, b) => {
      if (a.idUsuario > b.idUsuario) return 1;
      else return -1;
    });

    tareas.forEach(tarea => {
      console.log(tarea);
      const fechaTmp = new Date(Number(tarea.fechaCreacion));
      const date = fechaTmp.toLocaleDateString();
      const time = fechaTmp.toLocaleTimeString();
      const fechaRegistro = `${date} - ${time}`;

      // Aseguramos limpiar textos para que no rompan las columnas del CSV
      const limpiarTexto = (texto: any) => {
        if (!texto) return '';
        // Quitamos saltos de línea y escapamos comillas dobles
        return String(texto).replace(/[\r\n]+/g, ' ').replace(/"/g, '""');
      };

      todo_Excel.push({
        "Usuario": tarea['nombreUsuario'],
        "Tipo de Atencion": tarea['tipoAtencion'],
        "Delegado por": tarea['delegadoPor'],
        "Expediente": tarea['numero'],
        "Tipo de Proceso": tarea['especialidad'],
        "Demandante": tarea['demandante'],
        "Demandado": tarea['demandado'],
        "ITER": tarea['nombreCheckpoint'],
        "Contrato": tarea['tieneContrato'],
        "Tiempo de Atencion": tarea['horasAtencion'] + ':' + tarea['minutosAtencion'],
        "Codigo tarea": tarea['codigoTarea'],
        "Descripción de la tarea": limpiarTexto(tarea['detalleTarea']).slice(0, 2500),
        "Acciones por realizar": limpiarTexto(tarea['pendienteTarea']).slice(0, 2500),
        "Fecha y Hora de guardado": fechaRegistro,
        "Monto pactado": tarea['montoPactado'],
        "Pagos realizados": tarea['abonoTotal'],
        "Ultimo pago": tarea['montoUltimoAbono'],
        "Fecha Ultimo Pago": tarea['fechaUltimoAbono'],
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
    link.setAttribute('download', 'RDTs - fecha ' + fecha + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
