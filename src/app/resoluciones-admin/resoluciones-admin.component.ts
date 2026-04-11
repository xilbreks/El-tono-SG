import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Resolucion } from './../_interfaces/resolucion';
import { Expediente } from './../_interfaces/expediente';
import { Colaborador } from './../__clases/colaborador';

import { AppService } from './../app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-resoluciones-admin',
  templateUrl: './resoluciones-admin.component.html',
  styleUrl: './resoluciones-admin.component.scss'
})
export class ResolucionesAdminComponent {
  resoluciones: Resolucion[] = [];
  colaboradores: Array<Colaborador> = [];
  cargando = false;
  registrando = false;
  delegando = false;
  actualizando = false;
  dandoConformidad = false;
  eliminando = false;
  frmRegistroResolucion: FormGroup;
  frmDelegarResolucion: FormGroup;
  frmEditarResolucion: FormGroup;
  frmConformidadResolucion: FormGroup;
  frmEliminarResolucion: FormGroup;
  frmFiltros: FormGroup;

  // Atributos para el autocompletado de expediente
  expedientes: any[] = [];
  expedientesCompletos: any[] = [];

  // solo para testing
  idusuario: string;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
    private service: AppService,
  ) {
    this.titleService.setTitle('Tareas y Diligencias');
    this.idusuario = localStorage.getItem('idusuario') || '';

    /********************
     * INIT FORM FILTER *
     ********************/
    this.frmFiltros = new FormGroup({
      lcumplimiento: new FormControl('all', Validators.required),
      idcolaborador: new FormControl('all', Validators.required),
    });

    /******************************************
     * INICIAR FORMULARIO REGISTRO RESOLUCION *
     ******************************************/
    this.frmRegistroResolucion = new FormGroup({
      // idResolucion: new FormControl(null, Validators.required),
      numeroExpediente: new FormControl('', Validators.required),
      fechaNotificacion: new FormControl(null, Validators.required),
      cliente: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      contenido: new FormControl(null, Validators.required),
      // tarea: new FormControl(null, Validators.required),
      // plazo: new FormControl(null, Validators.required),
      // cumplimiento: new FormControl(null, Validators.required),
      // observaciones: new FormControl(null, Validators.required),
      // nombreCreador: new FormControl(null, Validators.required),
      idEncargado: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null, Validators.required),
    });

    /*****************************************
     * INICIAR FORMULARIO DELEGAR RESOLUCION *
     *****************************************/
    this.frmDelegarResolucion = new FormGroup({
      idResolucion: new FormControl(null, Validators.required),
      // numeroExpediente: new FormControl(null, Validators.required),
      // fechaNotificacion: new FormControl(null, Validators.required),
      // cliente: new FormControl(null, Validators.required),
      // titulo: new FormControl(null, Validators.required),
      // contenido: new FormControl(null, Validators.required),
      tarea: new FormControl(null, Validators.required),
      plazo: new FormControl(null, Validators.required),
      // cumplimiento: new FormControl(null, Validators.required),
      // observaciones: new FormControl(null, Validators.required),
      // nombreCreador: new FormControl(null, Validators.required),
      idEncargado: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null, Validators.required),
    });

    /*****************************************
     * INICIAR FORMULARIO EDITAR RESOLUCION *
     *****************************************/
    this.frmEditarResolucion = new FormGroup({
      idResolucion: new FormControl(null, Validators.required),
      numeroExpediente: new FormControl(null, Validators.required),
      fechaNotificacion: new FormControl(null, Validators.required),
      cliente: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      contenido: new FormControl(null, Validators.required),
      // tarea: new FormControl(null, Validators.required),
      // plazo: new FormControl(null, Validators.required),
      // cumplimiento: new FormControl(null, Validators.required),
      // observaciones: new FormControl(null, Validators.required),
      // nombreCreador: new FormControl(null, Validators.required),
      // idEncargado: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null, Validators.required),
    });

    /*****************************************
     * INICIAR FORMULARIO DAR CONFORMIDAD RESOLUCION *
     *****************************************/
    this.frmConformidadResolucion = new FormGroup({
      idResolucion: new FormControl(null, Validators.required),
      // numeroExpediente: new FormControl(null, Validators.required),
      // fechaNotificacion: new FormControl(null, Validators.required),
      // cliente: new FormControl(null, Validators.required),
      // titulo: new FormControl(null, Validators.required),
      // contenido: new FormControl(null, Validators.required),
      tarea: new FormControl(null, Validators.required),
      plazo: new FormControl(null, Validators.required),
      cumplimiento: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required),
      // nombreCreador: new FormControl(null, Validators.required),
      // idEncargado: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null, Validators.required),
    });

    /*****************************************
     * INICIAR FORMULARIO ELIMINAR RESOLUCION *
     *****************************************/
    this.frmEliminarResolucion = new FormGroup({
      idResolucion: new FormControl(null, Validators.required),
      // numeroExpediente: new FormControl(null, Validators.required),
      // fechaNotificacion: new FormControl(null, Validators.required),
      // cliente: new FormControl(null, Validators.required),
      // titulo: new FormControl(null, Validators.required),
      // contenido: new FormControl(null, Validators.required),
      // tarea: new FormControl(null, Validators.required),
      // plazo: new FormControl(null, Validators.required),
      // cumplimiento: new FormControl(null, Validators.required),
      // observaciones: new FormControl(null, Validators.required),
      // nombreCreador: new FormControl(null, Validators.required),
      // idEncargado: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null, Validators.required),
    });

    this.obtenerColaboradores();
    this.obtenerResoluciones();
    this.obtenerExpedientesCompletos();
  }

  obtenerColaboradores() {
    let query = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    }).get();
    firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })
      this.colaboradores = items;
    }).catch(err => {
      console.log('error al recuperar colaboradores')
      this.colaboradores = [];
    })
  }

  obtenerResoluciones() {
    this.cargando = true;
    let lcumplimiento = this.frmFiltros.controls['lcumplimiento'].value;
    let idcolaborador = this.frmFiltros.controls['idcolaborador'].value;
    let query: any;

    // POSIBILIDADES DE SUCESOS EN EL FILTRO
    if (lcumplimiento == 'all' && idcolaborador == 'all') {
      query = this.db.collection('resoluciones', ref => {
        return ref.orderBy('fechaCreacion', 'desc').limit(25);
      }).get();
    } else if (lcumplimiento == 'all' && idcolaborador != 'all') {
      query = this.db.collection('resoluciones', ref => {
        return ref.where('idEncargado', '==', idcolaborador)
          .orderBy('fechaCreacion', 'desc').limit(25);
      }).get();
    } else if (lcumplimiento != 'all' && idcolaborador == 'all') {
      query = this.db.collection('resoluciones', ref => {
        return ref.where('cumplimiento', '==', /^true$/i.test(lcumplimiento))
          .orderBy('fechaCreacion', 'desc').limit(25);
      }).get();
    } else if (lcumplimiento != 'all' && idcolaborador != 'all') {
      query = this.db.collection('resoluciones', ref => {
        return ref.where('cumplimiento', '==', /^true$/i.test(lcumplimiento))
          .where('idEncargado', '==', idcolaborador)
          .orderBy('fechaCreacion', 'desc').limit(25);
      }).get();
    } else {
      console.log('filtros incorrectos')
      this.cargando = false;
      return;
    }

    // SIN CONSIDERAR LAS POSIBILIDADES DE LOS FILTROS
    // query = this.db.collection('resoluciones', ref => {
    //   return ref.orderBy('fechaCreacion', 'desc').limit(25);
    // }).get();

    firstValueFrom(query).then((snapshot: any) => {
      let items: any[] = [];
      snapshot.forEach((doc: any) => {
        items.push(doc.data())
      })
      this.resoluciones = items.map((t: Resolucion) => {
        let scolor = 'black';
        if (t.plazo) {
          let year = Number(t.plazo.slice(0, 4));
          let month = Number(t.plazo.slice(5, 7));
          let day = Number(t.plazo.slice(8, 10));
          let dPlazo = new Date(year, month - 1, day + 1);
          let dToday = new Date();
          let diff = dPlazo.getTime() - dToday.getTime();

          if (t.cumplimiento) {
            scolor = 'green'
          } else if (diff > 0) {
            scolor = 'gold'
          } else if (diff < 0) {
            scolor = 'red'
          }
        }

        return {
          ...t,
          color: scolor
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      this.cargando = false;
    })
  }

  obtenerExpedientesCompletos() {
    this.service.expedientes.subscribe(res => {
      this.expedientesCompletos = res.filter((e: any) => e.estado == 'EN PROCESO');
    })
  }

  abrirModalRegistroResolucion(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  abrirModalDelegarResolucion(modal: any, resolucion: Resolucion) {
    this.frmDelegarResolucion.reset();
    this.frmDelegarResolucion.controls['idResolucion'].setValue(resolucion.idResolucion);
    // this.frmDelegarResolucion.controls['numeroExpediente'].setValue(resolucion.numeroExpediente);
    // this.frmDelegarResolucion.controls['fechaNotificacion'].setValue(resolucion.fechaNotificacion);
    // this.frmDelegarResolucion.controls['cliente'].setValue(resolucion.cliente);
    // this.frmDelegarResolucion.controls['titulo'].setValue(resolucion.titulo);
    // this.frmDelegarResolucion.controls['contenido'].setValue(resolucion.contenido);
    this.frmDelegarResolucion.controls['tarea'].setValue(resolucion.tarea);
    this.frmDelegarResolucion.controls['plazo'].setValue(resolucion.plazo);
    // this.frmDelegarResolucion.controls['cumplimiento'].setValue(resolucion.cumplimiento);
    // this.frmDelegarResolucion.controls['observaciones'].setValue(resolucion.observaciones);
    // this.frmDelegarResolucion.controls['nombreCreador'].setValue(resolucion.nombreCreador);
    this.frmDelegarResolucion.controls['idEncargado'].setValue(resolucion.idEncargado);
    // this.frmDelegarResolucion.controls['fechaCreacion'].setValue(resolucion.fechaCreacion);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  abrirModalEditarResolucion(modal: any, resolucion: Resolucion) {
    this.frmEditarResolucion.reset();
    this.frmEditarResolucion.controls['idResolucion'].setValue(resolucion.idResolucion);
    this.frmEditarResolucion.controls['numeroExpediente'].setValue(resolucion.numeroExpediente);
    this.frmEditarResolucion.controls['fechaNotificacion'].setValue(resolucion.fechaNotificacion);
    this.frmEditarResolucion.controls['cliente'].setValue(resolucion.cliente);
    this.frmEditarResolucion.controls['titulo'].setValue(resolucion.titulo);
    this.frmEditarResolucion.controls['contenido'].setValue(resolucion.contenido);
    // this.frmEditarResolucion.controls['tarea'].setValue(resolucion.tarea);
    // this.frmEditarResolucion.controls['plazo'].setValue(resolucion.plazo);
    // this.frmEditarResolucion.controls['cumplimiento'].setValue(resolucion.cumplimiento);
    // this.frmEditarResolucion.controls['observaciones'].setValue(resolucion.observaciones);
    // this.frmEditarResolucion.controls['nombreCreador'].setValue(resolucion.nombreCreador);
    // this.frmEditarResolucion.controls['idEncargado'].setValue(resolucion.idEncargado);
    // this.frmEditarResolucion.controls['fechaCreacion'].setValue(resolucion.fechaCreacion);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  abrirModalConformidadResolucion(modal: any, resolucion: Resolucion) {
    this.frmConformidadResolucion.reset();
    this.frmConformidadResolucion.controls['idResolucion'].setValue(resolucion.idResolucion);
    // this.frmConformidadResolucion.controls['numeroExpediente'].setValue(resolucion.numeroExpediente);
    // this.frmConformidadResolucion.controls['fechaNotificacion'].setValue(resolucion.fechaNotificacion);
    // this.frmConformidadResolucion.controls['cliente'].setValue(resolucion.cliente);
    // this.frmConformidadResolucion.controls['titulo'].setValue(resolucion.titulo);
    // this.frmConformidadResolucion.controls['contenido'].setValue(resolucion.contenido);
    this.frmConformidadResolucion.controls['tarea'].setValue(resolucion.tarea);
    this.frmConformidadResolucion.controls['plazo'].setValue(resolucion.plazo);
    this.frmConformidadResolucion.controls['cumplimiento'].setValue(resolucion.cumplimiento);
    this.frmConformidadResolucion.controls['observaciones'].setValue(resolucion.observaciones);
    // this.frmConformidadResolucion.controls['nombreCreador'].setValue(resolucion.nombreCreador);
    // this.frmConformidadResolucion.controls['idEncargado'].setValue(resolucion.idEncargado);
    // this.frmConformidadResolucion.controls['fechaCreacion'].setValue(resolucion.fechaCreacion);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  abrirModalEliminarResolucion(modal: any, resolucion: Resolucion) {
    this.frmEliminarResolucion.reset();
    this.frmEliminarResolucion.controls['idResolucion'].setValue(resolucion.idResolucion);
    // this.frmEliminarResolucion.controls['numeroExpediente'].setValue(resolucion.numeroExpediente);
    // this.frmEliminarResolucion.controls['fechaNotificacion'].setValue(resolucion.fechaNotificacion);
    // this.frmEliminarResolucion.controls['cliente'].setValue(resolucion.cliente);
    // this.frmEliminarResolucion.controls['titulo'].setValue(resolucion.titulo);
    // this.frmEliminarResolucion.controls['contenido'].setValue(resolucion.contenido);
    // this.frmEliminarResolucion.controls['tarea'].setValue(resolucion.tarea);
    // this.frmEliminarResolucion.controls['plazo'].setValue(resolucion.plazo);
    // this.frmEliminarResolucion.controls['cumplimiento'].setValue(resolucion.cumplimiento);
    // this.frmEliminarResolucion.controls['observaciones'].setValue(resolucion.observaciones);
    // this.frmEliminarResolucion.controls['nombreCreador'].setValue(resolucion.nombreCreador);
    // this.frmEliminarResolucion.controls['idEncargado'].setValue(resolucion.idEncargado);
    // this.frmEliminarResolucion.controls['fechaCreacion'].setValue(resolucion.fechaCreacion);

    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  registrarNuevaResolucion() {
    this.registrando = true;

    // let idResolucion = this.frmRegistroResolucion.controls['idResolucion'].value;
    let numeroExpediente = this.frmRegistroResolucion.controls['numeroExpediente'].value;
    let fechaNotificacion = this.frmRegistroResolucion.controls['fechaNotificacion'].value;
    let cliente = this.frmRegistroResolucion.controls['cliente'].value.trim().toUpperCase();
    let titulo = this.frmRegistroResolucion.controls['titulo'].value.trim();
    let contenido = this.frmRegistroResolucion.controls['contenido'].value.trim();
    // let tarea = this.frmRegistroResolucion.controls['tarea'].value;
    // let plazo = this.frmRegistroResolucion.controls['plazo'].value;
    // let cumplimiento = this.frmRegistroResolucion.controls['cumplimiento'].value;
    // let observaciones = this.frmRegistroResolucion.controls['observaciones'].value;
    // let nombreCreador = this.frmRegistroResolucion.controls['nombreCreador'].value;
    let idEncargado = this.frmRegistroResolucion.controls['idEncargado'].value;
    // let fechaCreacion = this.frmRegistroResolucion.controls['fechaCreacion'].value;

    let timestamp = (new Date()).getTime();
    // Generar ID de la tarea
    const letraAleatoria = this.generarLetraAleatoria();
    const idGenerado = `ID${timestamp.toString()}${letraAleatoria}`;
    // Recuperar usuario actual
    let usuario: string = localStorage.getItem('nombre') || 'nulo';

    this.db.collection('resoluciones').doc(idGenerado)
      .set({
        idResolucion: idGenerado,
        numeroExpediente: numeroExpediente,
        fechaNotificacion: fechaNotificacion,
        cliente: cliente,
        titulo: titulo,
        contenido: contenido,
        tarea: null,
        plazo: null,
        cumplimiento: false,
        observaciones: null,
        nombreCreador: usuario,
        idEncargado: idEncargado,
        fechaCreacion: timestamp,
      })
      .then(() => {
        this.modalService.dismissAll();
        this.frmRegistroResolucion.reset();
        this.frmRegistroResolucion.patchValue({numeroExpediente: ''})
        this.obtenerResoluciones();
      })
      .catch(err => {
        window.alert('ERROR al registrar')
      })
      .finally(() => {
        this.registrando = false;
      })
  }

  delegarResolucion() {
    this.delegando = true;

    let idResolucion = this.frmDelegarResolucion.controls['idResolucion'].value;
    // let numeroExpediente = this.frmDelegarResolucion.controls['numeroExpediente'].value;
    // let fechaNotificacion = this.frmDelegarResolucion.controls['fechaNotificacion'].value;
    // let cliente = this.frmDelegarResolucion.controls['cliente'].value.trim().toUpperCase();
    // let titulo = this.frmDelegarResolucion.controls['titulo'].value.trim();
    // let contenido = this.frmDelegarResolucion.controls['contenido'].value.trim();
    let tarea = this.frmDelegarResolucion.controls['tarea'].value.trim();
    let plazo = this.frmDelegarResolucion.controls['plazo'].value;
    // let cumplimiento = this.frmDelegarResolucion.controls['cumplimiento'].value;
    // let observaciones = this.frmDelegarResolucion.controls['observaciones'].value.trim();
    // let nombreCreador = this.frmDelegarResolucion.controls['nombreCreador'].value;
    let idEncargado = this.frmDelegarResolucion.controls['idEncargado'].value;
    // let fechaCreacion = this.frmDelegarResolucion.controls['fechaCreacion'].value;

    this.db.collection('resoluciones').doc(idResolucion)
      .update({
        // idResolucion,
        // numeroExpediente,
        // fechaNotificacion: fechaNotificacion,
        // cliente: cliente,
        // titulo: titulo,
        // contenido: contenido,
        tarea: tarea,
        plazo: plazo,
        // cumplimiento: cumplimiento,
        // observaciones: observaciones,
        // nombreCreador,
        idEncargado: idEncargado,
        // fechaCreacion,
      })
      .then(() => {
        this.modalService.dismissAll();
        this.obtenerResoluciones();
      })
      .catch(err => {
        window.alert('ERROR al delegar')
      })
      .finally(() => {
        this.delegando = false;
      });
  }

  editarResolucion() {
    this.actualizando = true;

    let idResolucion = this.frmEditarResolucion.controls['idResolucion'].value;
    let numeroExpediente = this.frmEditarResolucion.controls['numeroExpediente'].value.trim().toUpperCase();
    let fechaNotificacion = this.frmEditarResolucion.controls['fechaNotificacion'].value;
    let cliente = this.frmEditarResolucion.controls['cliente'].value.trim().toUpperCase();
    let titulo = this.frmEditarResolucion.controls['titulo'].value.trim();
    let contenido = this.frmEditarResolucion.controls['contenido'].value.trim();
    // let tarea = this.frmEditarResolucion.controls['tarea'].value.trim();
    // let plazo = this.frmEditarResolucion.controls['plazo'].value;
    // let cumplimiento = this.frmEditarResolucion.controls['cumplimiento'].value;
    // let observaciones = this.frmEditarResolucion.controls['observaciones'].value.trim();
    // let nombreCreador = this.frmEditarResolucion.controls['nombreCreador'].value;
    // let idEncargado = this.frmEditarResolucion.controls['idEncargado'].value;
    // let fechaCreacion = this.frmEditarResolucion.controls['fechaCreacion'].value;

    this.db.collection('resoluciones').doc(idResolucion)
      .update({
        // idResolucion,
        numeroExpediente: numeroExpediente,
        fechaNotificacion: fechaNotificacion,
        cliente: cliente,
        titulo: titulo,
        contenido: contenido,
        // tarea: tarea,
        // plazo: plazo,
        // cumplimiento: cumplimiento,
        // observaciones: observaciones,
        // nombreCreador,
        // idEncargado: idEncargado,
        // fechaCreacion,
      })
      .then(() => {
        this.modalService.dismissAll();
        this.obtenerResoluciones();
      })
      .catch(err => {
        window.alert('ERROR al actualizar')
      })
      .finally(() => {
        this.actualizando = false;
      });
  }

  darConformidadResolucion() {
    this.dandoConformidad = true;

    let idResolucion = this.frmConformidadResolucion.controls['idResolucion'].value;
    // let numeroExpediente = this.frmConformidadResolucion.controls['numeroExpediente'].value.trim().toUpperCase();
    // let fechaNotificacion = this.frmConformidadResolucion.controls['fechaNotificacion'].value;
    // let cliente = this.frmConformidadResolucion.controls['cliente'].value.trim().toUpperCase();
    // let titulo = this.frmConformidadResolucion.controls['titulo'].value.trim();
    // let contenido = this.frmConformidadResolucion.controls['contenido'].value.trim();
    // let tarea = this.frmConformidadResolucion.controls['tarea'].value.trim();
    // let plazo = this.frmConformidadResolucion.controls['plazo'].value;
    let cumplimiento = this.frmConformidadResolucion.controls['cumplimiento'].value;
    let observaciones = this.frmConformidadResolucion.controls['observaciones'].value.trim();
    // let nombreCreador = this.frmConformidadResolucion.controls['nombreCreador'].value;
    // let idEncargado = this.frmConformidadResolucion.controls['idEncargado'].value;
    // let fechaCreacion = this.frmConformidadResolucion.controls['fechaCreacion'].value;

    this.db.collection('resoluciones').doc(idResolucion)
      .update({
        // idResolucion,
        // numeroExpediente: numeroExpediente,
        // fechaNotificacion: fechaNotificacion,
        // cliente: cliente,
        // titulo: titulo,
        // contenido: contenido,
        // tarea: tarea,
        // plazo: plazo,
        cumplimiento: cumplimiento,
        observaciones: observaciones,
        // nombreCreador,
        // idEncargado: idEncargado,
        // fechaCreacion,
      })
      .then(() => {
        this.modalService.dismissAll();
        this.obtenerResoluciones();
      })
      .catch(err => {
        window.alert('ERROR al dar conformidad')
      })
      .finally(() => {
        this.dandoConformidad = false;
      })
  }

  eliminarResolucion() {
    this.eliminando = true;

    let idResolucion = this.frmEliminarResolucion.controls['idResolucion'].value;
    // let numeroExpediente = this.frmEliminarResolucion.controls['numeroExpediente'].value.trim().toUpperCase();
    // let fechaNotificacion = this.frmEliminarResolucion.controls['fechaNotificacion'].value;
    // let cliente = this.frmEliminarResolucion.controls['cliente'].value.trim().toUpperCase();
    // let titulo = this.frmEliminarResolucion.controls['titulo'].value.trim();
    // let contenido = this.frmEliminarResolucion.controls['contenido'].value.trim();
    // let tarea = this.frmEliminarResolucion.controls['tarea'].value.trim();
    // let plazo = this.frmEliminarResolucion.controls['plazo'].value;
    // let cumplimiento = this.frmEliminarResolucion.controls['cumplimiento'].value;
    // let observaciones = this.frmEliminarResolucion.controls['observaciones'].value.trim();
    // let nombreCreador = this.frmEliminarResolucion.controls['nombreCreador'].value;
    // let idEncargado = this.frmEliminarResolucion.controls['idEncargado'].value;
    // let fechaCreacion = this.frmEliminarResolucion.controls['fechaCreacion'].value;

    this.db.collection('resoluciones').doc(idResolucion)
      .delete()
      .then(() => {
        this.modalService.dismissAll();
        this.obtenerResoluciones();
      })
      .catch(err => {
        window.alert('ERROR al eliminar')
      })
      .finally(() => {
        this.eliminando = false;
      });
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

  // ok ok
  mostrarAutocompletado() {
    // let querySearch: string = this.fcQueryBox.value;
    let querySearch: string = this.frmRegistroResolucion.controls['numeroExpediente'].value;
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
    this.frmRegistroResolucion.controls['numeroExpediente'].setValue(exp.numero);
    this.frmRegistroResolucion.controls['cliente'].setValue(exp.demandante);

    // Autocompetar la caja de busquedas
    // this.fcQueryBox.setValue(exp.numero);

    // Remove popover list
    this.expedientes = [];
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

}
