import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AppService } from './../app.service';
import { Expediente } from '../_interfaces/expediente';
import { Tareo } from '../_interfaces/tareo';
import { Tarea } from '../_interfaces/tarea';

const URL_TAREAS = 'tareas';

@Component({
  selector: 'app-tareo-edit-new',
  templateUrl: './tareo-edit-new.component.html',
  styleUrl: './tareo-edit-new.component.scss'
})
export class TareoEditNewComponent {
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
    private db: AngularFirestore,
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
      detalleTarea: new FormControl(null, Validators.required),
      pendienteTarea: new FormControl(null, Validators.required),
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: new FormControl(null),
      nombreCheckpoint: new FormControl(null, Validators.required),
      tipoAtencion: new FormControl(null, Validators.required),
      delegadoPor: new FormControl(null, Validators.required),
      horasAtencion: new FormControl(null, Validators.required),
      minutosAtencion: new FormControl(null, Validators.required),
      montoPactado: new FormControl(null, Validators.required),
      abonoTotal: new FormControl(null, Validators.required),
      montoUltimoAbono: new FormControl(null, Validators.required),
      fechaUltimoAbono: new FormControl(null, Validators.required),
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
      montoPactado: new FormControl(null, Validators.required),
      abonoTotal: new FormControl(null, Validators.required),
      montoUltimoAbono: new FormControl(null, Validators.required),
      fechaUltimoAbono: new FormControl(null, Validators.required),
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
      this.expedientesCompletos = res;
    })
  }

  // Detalle del Tareo - ok
  recuperarTareo() {
    let query = this.db.collection('tareo', ref => {
      return ref.where('idTareo', '==', this.idTareo)
    }).get();

    firstValueFrom(query).then(snapshot => {
      let resultados: Tareo[] = [];
      snapshot.forEach((doc: any) => {
        resultados.push(doc.data());
      });

      if(resultados.length > 0) {
        this.tareo = resultados[0];
        this.recuperarTareas();
      } else {
        this.tareo = null;
        console.log('No se encontró Tareo')
      }
    })
    
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
  cambioTipoFormulario(val: any) {
    const tipoTarea = val.target.value;
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
          montoPactado: null,
          abonoTotal: null,
          montoUltimoAbono: null,
          fechaUltimoAbono: null,
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
          montoPactado: '-',
          abonoTotal: '-',
          montoUltimoAbono: '-',
          fechaUltimoAbono: '-',
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
          montoPactado: '-',
          abonoTotal: '-',
          montoUltimoAbono: '-',
          fechaUltimoAbono: '-',
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
  obtenerNivelIter(idExpediente: string) {
    this.encontrando = true;
    let query = this.db.collection('expedientes').doc(idExpediente).get();

    firstValueFrom(query).then((snapshot: any) => {
      let exp: Expediente = snapshot.data();

      this.frmNuevaTarea.patchValue({
        idCheckpoint: exp.idCheckpoint,
        nombreCheckpoint: exp.nombreCheckpoint,
      })
    }).catch(err => {
      console.log('ocurrio un error', err);
    }).finally(() => {
      this.encontrando = false;
    })
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
  concretarNuevaTarea() {
    this.registrando = true;
    // Validar formulario
    if (!this.frmNuevaTarea.valid) {
      console.log('Formulario invalido');
      return;
    }

    // Generar ID de la tarea
    const timestamp = (new Date()).getTime().toString();
    const letraAleatoria = this.generarLetraAleatoria();
    const idGenerado = `ID${timestamp}${letraAleatoria}`;

    // Armar la carga de datos
    let datosFormulario = this.frmNuevaTarea.value;

    let payload = {
      ...datosFormulario,
      idTareo: this.idTareo,
      idTarea: idGenerado,
      idUsuario: this.tareo?.idUsuario,
      nombreUsuario: this.tareo?.nombreUsuario,
      fechaTarea: this.tareo?.fecha,
      fechaCreacion: timestamp,
    }

    // Grabar los datos en la base de datos
    this.db.collection(`${URL_TAREAS}`).doc(idGenerado)
      .set(payload)
      .then(() => {
        this.modalService.dismissAll();
        this.frmNuevaTarea.reset();
        this.recuperarTareas();
      })
      .catch(err => {
        // err
        console.log('error al registrar la nueva tarea');
      })
      .finally(() => {
        this.registrando = false;
      });
  }

  // READ - ok ok
  recuperarTareas() {
    this.cargando = true;
    let query = this.db.collection(`${URL_TAREAS}`, ref => {
      return ref.where('idTareo', '==', this.idTareo);
    }).get();

    firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      let horas = 0;
      let minutos = 0;
      snapshot.forEach((doc: any) => {
        let datos: Tarea = doc.data();
        items.push(datos)
        horas += Number(datos.horasAtencion);
        minutos += Number(datos.minutosAtencion);
      })

      let totalMinutos = horas * 60 + minutos;
      let sHoras = '', sMinutos = '';

      sHoras = Math.floor(totalMinutos / 60).toString();
      sMinutos = (totalMinutos - Math.floor(totalMinutos / 60) * 60).toString();

      this.tareas = items;
      this.tiempoTotalTareas = sHoras + 'h ' + sMinutos + 'm';
    }).catch(err => {
      window.alert(err);
      throw (err);
    }).finally(() => {
      this.cargando = false;
    })

    // this.tareas = [
    //   {
    //     idTarea: '123456789',
    //     idTareo: '2025-10-15',
    //     idUsuario: 'jhufo',
    //     nombreUsuario: 'Jorge Hufo',
    //     idNaturaleza: 'con',
    //     idExpediente: 'E001452',
    //     numero: '20156-2025-0-0401-JR-LA-01',
    //     demandante: 'juan peres',
    //     demandado: 'empresita fulanitas',
    //     especialidad: 'laboral',
    //     tieneContrato: 'si',
    //     codigoTarea: '45',
    //     detalleTarea: 'lorem ipsum lorem ipsum lorem ipsum',
    //     pendienteTarea: 'pendiente lore ipsum',
    //     fechaTarea: '2025-10-15',
    //     idCheckpoint: '69',
    //     nombreCheckpoint: '3.69.- Audiencia de casacion',
    //     tipoAtencion: 'presencial',
    //     delegadoPor: 'Dra. Lizbet Silva',
    //     horasAtencion: '04',
    //     minutosAtencion: '10',
    //     montoPactado: 'tres mil soles',
    //     abonoTotal: 'dos mil',
    //     montoUltimoAbono: 'quinientos soles',
    //     fechaUltimoAbono: 'primero de julio',
    //     fechaCreacion: '147852369',
    //   },
    //   {
    //     idTarea: '123456790',
    //     idTareo: '2025-10-15',
    //     idUsuario: 'jhufo',
    //     nombreUsuario: 'Jorge Hufo',
    //     idNaturaleza: 'sin',
    //     idExpediente: '-',
    //     numero: '-',
    //     demandante: 'juan peres',
    //     demandado: 'empresita fulanitas',
    //     especialidad: '-',
    //     tieneContrato: 'no',
    //     codigoTarea: '27',
    //     detalleTarea: 'lorem ipsum lorem ipsum lorem ipsum',
    //     pendienteTarea: '-',
    //     fechaTarea: '2025-10-15',
    //     idCheckpoint: '01',
    //     nombreCheckpoint: '-',
    //     tipoAtencion: 'presencial',
    //     delegadoPor: 'Dra. Lizbet Silva',
    //     horasAtencion: '01',
    //     minutosAtencion: '30',
    //     montoPactado: '-',
    //     abonoTotal: '-',
    //     montoUltimoAbono: '-',
    //     fechaUltimoAbono: '-',
    //     fechaCreacion: '147852369',
    //   },
    //   {
    //     idTarea: '123456791',
    //     idTareo: '2025-10-15',
    //     idUsuario: 'jhufo',
    //     nombreUsuario: 'Jorge Hufo',
    //     idNaturaleza: 'nc',
    //     idExpediente: '-',
    //     numero: '-',
    //     demandante: '-',
    //     demandado: '-',
    //     especialidad: '-',
    //     tieneContrato: 'no',
    //     codigoTarea: '105',
    //     detalleTarea: 'lorem ipsum lorem ipsum lorem ipsum',
    //     pendienteTarea: '-',
    //     fechaTarea: '2025-10-15',
    //     idCheckpoint: '01',
    //     nombreCheckpoint: '-',
    //     tipoAtencion: 'presencial',
    //     delegadoPor: 'Dra. Lizbet Silva',
    //     horasAtencion: '05',
    //     minutosAtencion: '40',
    //     montoPactado: '-',
    //     abonoTotal: '-',
    //     montoUltimoAbono: '-',
    //     fechaUltimoAbono: '-',
    //     fechaCreacion: '147852369',
    //   },
    // ]
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
      montoPactado: tarea.montoPactado,
      abonoTotal: tarea.abonoTotal,
      montoUltimoAbono: tarea.montoUltimoAbono,
      fechaUltimoAbono: tarea.fechaUltimoAbono,
      // fechaCreacion: new FormControl(null),
    })
  }
  // ok ok
  concretarEdicionTarea() {
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
      demandante: this.frmEditarTarea.value['demandante'].trim(),
      demandado: this.frmEditarTarea.value['demandado'].trim(),
      especialidad: this.frmEditarTarea.value['especialidad'],
      // tieneContrato: tarea.tieneContrato,
      codigoTarea: this.frmEditarTarea.value['codigoTarea'],
      detalleTarea: this.frmEditarTarea.value['detalleTarea'].trim(),
      pendienteTarea: this.frmEditarTarea.value['pendienteTarea'].trim(),
      // fechaTarea: new FormControl(null, Validators.required),
      // idCheckpoint: tarea.idCheckpoint,
      // nombreCheckpoint: tarea.nombreCheckpoint,
      tipoAtencion: this.frmEditarTarea.value['tipoAtencion'],
      delegadoPor: this.frmEditarTarea.value['delegadoPor'],
      horasAtencion: this.frmEditarTarea.value['horasAtencion'],
      minutosAtencion: this.frmEditarTarea.value['minutosAtencion'],
      montoPactado: this.frmEditarTarea.value['montoPactado'].trim(),
      abonoTotal: this.frmEditarTarea.value['abonoTotal'].trim(),
      montoUltimoAbono: this.frmEditarTarea.value['montoUltimoAbono'].trim(),
      fechaUltimoAbono: this.frmEditarTarea.value['fechaUltimoAbono'].trim(),
      // fechaCreacion: new FormControl(null),
    }

    this.db.collection(`${URL_TAREAS}`).doc(idTarea).update(payload).then(() => {
      // correcto
      this.modalService.dismissAll();
      this.recuperarTareas();
    }).catch(err => {
      console.log(err);
      window.alert('ocurrio un error');
    }).finally(() => {
      this.actualizando = false;
    })
  }

  // DELETE - ok ok
  empezarEliminacionTarea(tarea: Tarea) {
    let confirmacion = window.confirm('¿Esta seguro de borrar?');

    if (confirmacion) {
      this.db.collection(`${URL_TAREAS}`).doc(tarea.idTarea)
        .delete()
        .then(() => {
          // correcto
          this.recuperarTareas();
        })
        .catch(err => {
          window.alert('ocurrio un error')
        });
    }
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
