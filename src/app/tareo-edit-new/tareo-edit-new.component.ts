import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { AppService } from './../app.service';
import { Expediente } from '../_interfaces/expediente';
import { Tareo } from '../_interfaces/tareo';
import { Tarea } from '../_interfaces/tarea';

@Component({
  selector: 'app-tareo-edit-new',
  templateUrl: './tareo-edit-new.component.html',
  styleUrl: './tareo-edit-new.component.scss',
  imports: [
    ReactiveFormsModule,
  ]
})
export class TareoEditNewComponent {
  appService = inject(AppService);
  idTareo: string = '';
  tareo: Tareo | null = null;
  tareas: Tarea[] = [];
  tiempoTotalTareas: string = '--:--';
  cargando: boolean = false;

  fcTipoTarea: FormControl = new FormControl('con');
  fcQueryBox: FormControl = new FormControl('');

  frmNuevaTarea: FormGroup;         // Formulario para tareas nuevas
  frmEditarTarea: FormGroup;        // Formulario para tareas existentes

  registrando: boolean = false;
  actualizando: boolean = false;
  encontrando: boolean = false;

  expedientes: any[] = [];
  expedientesCompletos: any[] = [];

  constructor(
    private titleService: Title,
    private modalService: NgbModal,
    private service: AppService,
    route: ActivatedRoute
  ) {
    /*****************************
     * FORMULARIO DE NUEVA TAREA *
     *****************************/
    this.frmNuevaTarea = new FormGroup({
      // idTarea: new FormControl(null),
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: new FormControl('con', Validators.required),
      idExpediente: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      especialidad: new FormControl(null, Validators.required),
      tieneContrato: new FormControl(null, Validators.required),
      codigoTarea: new FormControl(null, Validators.required),
      detalleTarea: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(1500)])),
      pendienteTarea: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(1500)])),
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: new FormControl(null),
      nombreCheckpoint: new FormControl(null, Validators.required),
      tipoAtencion: new FormControl(null, Validators.required),
      delegadoPor: new FormControl(null, Validators.required),
      horasAtencion: new FormControl(null, Validators.required),
      minutosAtencion: new FormControl(null, Validators.required),
      // montoPactado: new FormControl(null, Validators.required),
      // abonoTotal: new FormControl(null, Validators.required),
      // montoUltimoAbono: new FormControl(null, Validators.required),
      // fechaUltimoAbono: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null),
    });

    /********************************
     * FORMULARIO PARA EDITAR TAREA *
     *******************************/
    this.frmEditarTarea = new FormGroup({
      idTarea: new FormControl(null, Validators.required),
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: new FormControl(null, Validators.required),
      idExpediente: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      especialidad: new FormControl(null, Validators.required),
      tieneContrato: new FormControl(null, Validators.required),
      codigoTarea: new FormControl(null, Validators.required),
      detalleTarea: new FormControl(null, Validators.required),
      pendienteTarea: new FormControl(null, Validators.required),
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: new FormControl(null),
      nombreCheckpoint: new FormControl(null, Validators.required),
      tipoAtencion: new FormControl(null, Validators.required),
      delegadoPor: new FormControl(null, Validators.required),
      horasAtencion: new FormControl(null, Validators.required),
      minutosAtencion: new FormControl(null, Validators.required),
      // montoPactado: new FormControl(null, Validators.required),
      // abonoTotal: new FormControl(null, Validators.required),
      // montoUltimoAbono: new FormControl(null, Validators.required),
      // fechaUltimoAbono: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null),
    });

    this.idTareo = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle(`RDT ${this.idTareo}`)
    this.recuperarTareo();
    this.cargarExpedientesCompletos();
  }

  // Cargar los expedientes completos
  cargarExpedientesCompletos() {
    this.service.expedientes.subscribe(res => {
      this.expedientesCompletos = res.filter((e: any) => e.estado == 'EN PROCESO');
    })
  }

  // Detalle del Tareo - ok
  async recuperarTareo() {
    const tareo = await this.appService.tareo(this.idTareo);
    this.tareo = tareo;
    this.recuperarTareas();
  }

  // CREATE - ok ok
  empezarNuevaTarea(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }
  // ok ok
  cambioTipoFormulario() {
    // const tipoTarea = val.target.value;
    const tipoTarea = this.fcTipoTarea.value;
    switch (tipoTarea) {
      case 'con':
        console.log('estamos con expediente en el rdt')
        this.frmNuevaTarea.patchValue({
          idNaturaleza: 'con',
          idExpediente: null,
          numero: null,
          demandante: null,
          demandado: null,
          especialidad: null,
          tieneContrato: null,
          codigoTarea: null,
          detalleTarea: null,
          pendienteTarea: null,
          idCheckpoint: null,
          nombreCheckpoint: null,
          tipoAtencion: null,
          delegadoPor: null,
          horasAtencion: null,
          minutosAtencion: null,
          // montoPactado: null,
          // abonoTotal: null,
          // montoUltimoAbono: null,
          // fechaUltimoAbono: null,
        });
        break;
      case 'sin':
        console.log('estamos sin expediente en el rdt')
        this.frmNuevaTarea.patchValue({
          idNaturaleza: 'sin',
          idExpediente: '-',
          numero: '-',
          demandante: null,
          demandado: null,
          especialidad: null,
          tieneContrato: '-',
          codigoTarea: null,
          detalleTarea: null,
          pendienteTarea: '-',
          idCheckpoint: '-',
          nombreCheckpoint: '-',
          tipoAtencion: null,
          delegadoPor: null,
          horasAtencion: null,
          minutosAtencion: null,
          // montoPactado: '-',
          // abonoTotal: '-',
          // montoUltimoAbono: '-',
          // fechaUltimoAbono: '-',
        });
        this.fcQueryBox.reset('');
        break;
      case 'nc':
        console.log('estamos con actividades varias')
        this.frmNuevaTarea.patchValue({
          idNaturaleza: 'nc',
          idExpediente: '-',
          numero: '-',
          demandante: '-',
          demandado: '-',
          especialidad: '-',
          tieneContrato: '-',
          codigoTarea: null,
          detalleTarea: null,
          pendienteTarea: '-',
          idCheckpoint: '-',
          nombreCheckpoint: '-',
          tipoAtencion: 'presencial',
          delegadoPor: null,
          horasAtencion: null,
          minutosAtencion: null,
          // montoPactado: '-',
          // abonoTotal: '-',
          // montoUltimoAbono: '-',
          // fechaUltimoAbono: '-',
        });
        this.fcQueryBox.reset('');
        break;
      default:
        console.log('estamos fatal')
    }
  }
  // ok ok
  mostrarAutocompletado() {
    let querySearch: string = this.fcQueryBox.value;
    let sterms = querySearch.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 2);

    if (sterms.length == 0) {
      this.expedientes = [];
      return;
    }

    this.expedientes = this.expedientesCompletos.filter(exp => {
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

      return lMatch;
    }).slice(0, 7);
  }
  // ok ok
  pickExpediente(exp: Expediente) {
    // Autocompletar datos del expediente seleccionado
    this.frmNuevaTarea.controls['idExpediente'].setValue(exp.idExpediente);
    this.frmNuevaTarea.controls['numero'].setValue(exp.numero);
    this.frmNuevaTarea.controls['demandante'].setValue(exp.demandante);
    this.frmNuevaTarea.controls['demandado'].setValue(exp.demandado);
    this.frmNuevaTarea.controls['especialidad'].setValue(exp.especialidad.toLowerCase());
    // this.frmNuevaTarea.controls['idCheckpoint'].setValue(exp.idCheckpoint);
    // this.frmNuevaTarea.controls['nombreCheckpoint'].setValue(exp.nombreCheckpoint);
    this.frmNuevaTarea.controls['tieneContrato'].setValue(exp.tieneContrato ? 'si' : 'no');

    // Autocompetar la caja de busquedas
    this.fcQueryBox.setValue(exp.numero);

    // Remove popover list
    this.expedientes = [];

    // Colocar ITER correspondiente
    this.obtenerNivelIter(exp.idExpediente);
  }
  // ok ok
  async obtenerNivelIter(idExpediente: string) {
    this.encontrando = true;

    const expedienteTemporal = await this.appService.expedientePorID(idExpediente);

    if (expedienteTemporal[0].nombreCheckpoint.length <= 5) {
      window.alert('Es necesario actualizar el ITER de dicho expediente')
    }

    this.frmNuevaTarea.patchValue({
      idCheckpoint: expedienteTemporal[0].idCheckpoint,
      nombreCheckpoint: expedienteTemporal[0].nombreCheckpoint,
    })

    this.encontrando = false;
  }
  // ok ok
  desfocusear() {
    // Remove popover list
    this.expedientes = [];
  }
  // ok ok
  prevenir(e: Event) {
    e.preventDefault()
  }
  // ok ok
  pressEnter() {
    if (this.expedientes.length == 1) {
      this.pickExpediente(this.expedientes[0]);
    }
  }
  // ok ok
  reiniciarExpediente() {
    // Reiniciar valores del expediente en el formulario
    this.frmNuevaTarea.patchValue({
      idExpediente: null,
      numero: null,
      demandante: null,
      demandado: null,
      especialidad: null,
      idCheckpoint: null,
      nombreCheckpoint: null,
      tieneContrato: null,
    });

    // Reiniciar la caja de busquedas
    this.fcQueryBox.reset('');
  }
  // ok ok
  async concretarNuevaTarea() {
    if (!this.tareo) return;

    this.registrando = true;
    // Validar formulario
    if (!this.frmNuevaTarea.valid) {
      console.log('Formulario invalido');
      return;
    }

    // Generar ID de la tarea
    const timestamp = Date.now();
    const letraAleatoria = this.generarLetraAleatoria();
    const idGenerado = `ID${timestamp}${letraAleatoria}`;

    // Armar la carga de datos
    const datosFormulario = {
      // idTarea: new FormControl(null),
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: this.frmNuevaTarea.controls['idNaturaleza'].value,
      idExpediente: this.frmNuevaTarea.controls['idExpediente'].value,
      numero: this.frmNuevaTarea.controls['numero'].value,
      demandante: this.frmNuevaTarea.controls['demandante'].value.trim().slice(0, 100),
      demandado: this.frmNuevaTarea.controls['demandado'].value.trim().slice(0, 100),
      especialidad: this.frmNuevaTarea.controls['especialidad'].value,
      tieneContrato: this.frmNuevaTarea.controls['tieneContrato'].value,
      codigoTarea: this.frmNuevaTarea.controls['codigoTarea'].value,
      detalleTarea: this.frmNuevaTarea.controls['detalleTarea'].value.trim().slice(0, 1500),
      pendienteTarea: this.frmNuevaTarea.controls['pendienteTarea'].value.trim().slice(0, 1500),
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: this.frmNuevaTarea.controls['idCheckpoint'].value,
      nombreCheckpoint: this.frmNuevaTarea.controls['nombreCheckpoint'].value,
      tipoAtencion: this.frmNuevaTarea.controls['tipoAtencion'].value,
      delegadoPor: this.frmNuevaTarea.controls['delegadoPor'].value.trim().slice(0, 100),
      horasAtencion: this.frmNuevaTarea.controls['horasAtencion'].value,
      minutosAtencion: this.frmNuevaTarea.controls['minutosAtencion'].value,
      // montoPactado: this.frmNuevaTarea.controls['montoPactado'].value.trim().slice(0, 100),
      // abonoTotal: this.frmNuevaTarea.controls['abonoTotal'].value.trim().slice(0, 100),
      // montoUltimoAbono: this.frmNuevaTarea.controls['montoUltimoAbono'].value.trim().slice(0, 100),
      // fechaUltimoAbono: this.frmNuevaTarea.controls['fechaUltimoAbono'].value.trim().slice(0, 100),
      // fechaCreacion: new FormControl(null),
    }

    let payload = {
      ...datosFormulario,
      idTareo: this.idTareo,
      idTarea: idGenerado,
      idUsuario: this.tareo.idUsuario,
      nombreUsuario: this.tareo.nombreUsuario,
      fechaTarea: this.tareo.fecha,
      fechaCreacion: timestamp,

      // Antiguos datos
      montoPactado: '',
      abonoTotal: '',
      montoUltimoAbono: '',
      fechaUltimoAbono: '',
    }

    const ok = await this.appService.registrarTarea(idGenerado, payload);

    this.modalService.dismissAll();
    this.frmNuevaTarea.reset();
    this.fcTipoTarea.setValue('con');
    this.cambioTipoFormulario();
    this.recuperarTareas();

    this.registrando = false;
  }

  // READ - ok ok
  async recuperarTareas() {
    this.cargando = true;

    const tareas = await this.appService.tareasPorTareo(this.idTareo);
    let horas = 0, minutos = 0;

    tareas.forEach(t => {
      horas += Number(t.horasAtencion);
      minutos += Number(t.minutosAtencion);
    })

    let totalMinutos = horas * 60 + minutos;
    let sHoras = '', sMinutos = '';

    sHoras = Math.floor(totalMinutos / 60).toString();
    sMinutos = (totalMinutos - Math.floor(totalMinutos / 60) * 60).toString();

    this.tareas = tareas;
    this.tiempoTotalTareas = sHoras + 'h ' + sMinutos + 'm';
    this.cargando = false;
  }

  // UPDATE - ok ok
  empezarEdicionTarea(tarea: Tarea, modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });

    this.frmEditarTarea.reset();
    this.frmEditarTarea.patchValue({
      idTarea: tarea.idTarea,
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: tarea.idNaturaleza,
      idExpediente: tarea.idExpediente,
      numero: tarea.numero,
      demandante: tarea.demandante,
      demandado: tarea.demandado,
      especialidad: tarea.especialidad,
      tieneContrato: tarea.tieneContrato,
      codigoTarea: tarea.codigoTarea,
      detalleTarea: tarea.detalleTarea,
      pendienteTarea: tarea.pendienteTarea,
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: tarea.idCheckpoint,
      nombreCheckpoint: tarea.nombreCheckpoint,
      tipoAtencion: tarea.tipoAtencion,
      delegadoPor: tarea.delegadoPor,
      horasAtencion: tarea.horasAtencion,
      minutosAtencion: tarea.minutosAtencion,
      // montoPactado: tarea.montoPactado,
      // abonoTotal: tarea.abonoTotal,
      // montoUltimoAbono: tarea.montoUltimoAbono,
      // fechaUltimoAbono: tarea.fechaUltimoAbono,
      // fechaCreacion: new FormControl(null),
    })
  }
  // ok ok
  async concretarEdicionTarea() {
    this.actualizando = true;

    let idTarea = this.frmEditarTarea.value['idTarea'];
    let payload = {
      // idTarea: this.frmEditarTarea.value['idTarea'],
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      // idNaturaleza: tarea.idNaturaleza,
      // idExpediente: new FormControl(null, Validators.required),
      // numero: tarea.numero,
      demandante: this.frmEditarTarea.value['demandante'].trim().slice(0, 100),
      demandado: this.frmEditarTarea.value['demandado'].trim().slice(0, 100),
      especialidad: this.frmEditarTarea.value['especialidad'],
      // tieneContrato: tarea.tieneContrato,
      codigoTarea: this.frmEditarTarea.value['codigoTarea'],
      detalleTarea: this.frmEditarTarea.value['detalleTarea'].trim().slice(0, 1500),
      pendienteTarea: this.frmEditarTarea.value['pendienteTarea'].trim().slice(0, 1500),
      // fechaTarea: new FormControl(null, Validators.required),
      // idCheckpoint: tarea.idCheckpoint,
      // nombreCheckpoint: tarea.nombreCheckpoint,
      tipoAtencion: this.frmEditarTarea.value['tipoAtencion'],
      delegadoPor: this.frmEditarTarea.value['delegadoPor'].trim().slice(0, 100),
      horasAtencion: this.frmEditarTarea.value['horasAtencion'],
      minutosAtencion: this.frmEditarTarea.value['minutosAtencion'],
      // montoPactado: this.frmEditarTarea.value['montoPactado'].trim().slice(0, 100),
      // abonoTotal: this.frmEditarTarea.value['abonoTotal'].trim().slice(0, 100),
      // montoUltimoAbono: this.frmEditarTarea.value['montoUltimoAbono'].trim().slice(0, 100),
      // fechaUltimoAbono: this.frmEditarTarea.value['fechaUltimoAbono'].trim().slice(0, 100),
      // fechaCreacion: new FormControl(null),
    }

    const ok = await this.appService.actualizarTarea(idTarea, payload);

    this.modalService.dismissAll();
    this.recuperarTareas();

    this.actualizando = false;
  }

  // DELETE - ok ok
  async empezarEliminacionTarea(tarea: Tarea) {
    let confirmacion = window.confirm('¿Esta seguro de borrar?');

    if (!confirmacion) return;
    const ok = await this.appService.eliminarTarea(tarea.idTarea);

    this.recuperarTareas();
  }

  // Codigo para generar letra random - ok ok
  generarLetraAleatoria() {
    const codigoASCII_A = 65;
    const codigoASCII_Z = 90;

    const codigoAleatorio = Math.floor(Math.random() * (codigoASCII_Z - codigoASCII_A + 1)) + codigoASCII_A;

    // Convierte el código ASCII a su carácter correspondiente
    const letraAleatoria = String.fromCharCode(codigoAleatorio);

    return letraAleatoria;
  }
}
