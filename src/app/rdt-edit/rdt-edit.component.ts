import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public dfecha: string = '';
  public shoraingreso: string = '';
  public shorasalida: string = '';
  public sminutoingreso: string = '';
  public sminutosalida: string = '';
  public leditable: boolean = true;
  public nsemana: number = 0;
  constructor() { }
}

class ObjTarea {
  idtarea: string = '';
  idrdt: string = '';
  ntipocliente: string = '';
  ntipoatencion: string = '';
  sdelegadopor: string = '';
  sexpediente: string = '';
  ntipoproceso: string = '';
  scliente: string = '';
  sdemandado: string = '';
  niter: string = '';
  navance: string = '';
  fculminacion: string = '';
  ncodeje: string = '';
  sdeseje: string = '';
  sacceje: string = '';
  nsemana: number = 0;
  nhorasatencion: string = '';
  nminutosatencion: string = '';
  constructor() { }
}

@Component({
  selector: 'app-rdt-edit',
  templateUrl: './rdt-edit.component.html',
  styleUrls: ['./rdt-edit.component.scss']
})
export class RdtEditComponent {
  idrdt: string;
  objRdt: ObjRdt = new ObjRdt();
  lstTareas: ObjTarea[] = [];
  frmNewTask: FormGroup;
  frmEditTask: FormGroup;
  lstIter: any[] = [];
  lCreating: boolean = false;
  lUpdating: boolean = false;
  lSearching: boolean = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
    route: ActivatedRoute
  ) {
    this.idrdt = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle('RDT ' + this.idrdt);
    this.getObjRdt();
    this.getTareas();

    /**********************
     * INIT FORM NEW TASK *
     **********************/
    this.frmNewTask = new FormGroup({
      ntipocliente: new FormControl(null, Validators.required),
      ntipoatencion: new FormControl(null, Validators.required),
      sdelegadopor: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      // sexpediente: new FormControl(null, 
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^\S*$/)
      //   ])
      // ),
      ntipoproceso: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      niter: new FormControl(null, Validators.required),
      navance: new FormControl(null, Validators.required),
      fculminacion: new FormControl(null, Validators.required),
      ncodeje: new FormControl(null, Validators.required),
      sdeseje: new FormControl(null, Validators.required),
      sacceje: new FormControl(null, Validators.required),
      nhorasatencion: new FormControl(null, Validators.required),
      nminutosatencion: new FormControl(null, Validators.required),
    });

    /***********************
     * INIT FORM EDIT TASK *
     ***********************/
    this.frmEditTask = new FormGroup({
      idtarea: new FormControl(null, Validators.required),
      ntipocliente: new FormControl(null, Validators.required),
      ntipoatencion: new FormControl(null, Validators.required),
      sdelegadopor: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      // sexpediente: new FormControl(null, 
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^\S*$/)
      //   ])
      // ),
      ntipoproceso: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      niter: new FormControl(null, Validators.required),
      navance: new FormControl(null, Validators.required),
      fculminacion: new FormControl(null, Validators.required),
      ncodeje: new FormControl(null, Validators.required),
      sdeseje: new FormControl(null, Validators.required),
      sacceje: new FormControl(null, Validators.required),
      nhorasatencion: new FormControl(null, Validators.required),
      nminutosatencion: new FormControl(null, Validators.required),
    });
  }

  get lstIterLaboral() {
    return [
      { id: 0, pick: false, desc: 'ETAPA I: POSTULATORIA' },
      { id: 1, pick: true, desc: '1.- Elaboración Demanda' },
      { id: 2, pick: true, desc: '2.- Presentación Demanda' },
      { id: 3, pick: true, desc: '3.- Auto Admisorio' },
      { id: 4, pick: true, desc: '4.- Contestación de demanda' },
      { id: 0, pick: false, desc: 'ETAPA II: PROBATORIA' },
      { id: 5, pick: true, desc: '5.- Audiencia conciliacion' },
      { id: 6, pick: true, desc: '6.- Audiencia juzgamiento' },
      { id: 0, pick: false, desc: 'ETAPA III: DECISORIA' },
      { id: 7, pick: true, desc: '7.- Sentencia 1ra instancia' },
      { id: 0, pick: false, desc: 'ETAPA IV: IMPUGNATORIA' },
      { id: 8, pick: true, desc: '8.- Recurso apelación' },
      { id: 9, pick: true, desc: '9.- Audiencia vista de la causa' },
      { id: 10, pick: true, desc: '10.- Sentencia de vista 2da instancia' },
      { id: 11, pick: true, desc: '11.- Recurso de casación' },
      { id: 0, pick: false, desc: 'ETAPA V: EJECUTORIA' },
      { id: 12, pick: true, desc: '12.- Resolución concentida y firme' },
      { id: 13, pick: true, desc: '13.- Costas y Costos' },
    ];
  }

  get lstIterPenal() {
    return [
      { id: 0, pick: false, desc: 'ETAPA I: DENUNCIA' },
      { id: 1, pick: true, desc: '1.- Denuncia' },
      { id: 0, pick: false, desc: 'ETAPA II: INVESTIGACIÓN PREPARATORIA PRELIMINAR' },
      { id: 2, pick: true, desc: '2.- Solicitar diligencias y/o presentar medios de prueba' },
      { id: 3, pick: true, desc: '3.- Solicitar el archivo de la investigación (INVESTIGADO) / Solicitar que se formalice la investigación (AGRAVIADO)' },
      { id: 4, pick: true, desc: '4.- Tutela de derechos/audiencia tutela de derechos' },
      { id: 5, pick: true, desc: '5.- Control de plazos/audiencia de control de plazos' },
      { id: 6, pick: true, desc: '6.- Elevación de actuados' },
      { id: 7, pick: true, desc: '7.- Oposición de Incoación de Proceso Inmediato/Audiencia de Incoación de Proceso Inmediato' },
      { id: 0, pick: false, desc: 'ETAPA III: INVESTIGACIÓN PREPARATORIA FORMALIZADA' },
      { id: 8, pick: true, desc: '8.- Solicitar diligencias y/o presentar medios de prueba' },
      { id: 9, pick: true, desc: '9.- Tutela de derechos/audiencia tutela de derechos' },
      { id: 10, pick: true, desc: '10.- Control de plazos/audiencia de control de plazos' },
      { id: 11, pick: true, desc: '11.- Solicitar Prisión Preventiva (AGRAVIADO) / Absolver requerimiento de prisión preventiva (IMPUTADO). AUDIENCIA' },
      { id: 12, pick: true, desc: '12.- Solicitar Prorroga de Prisión Preventiva (AGRAVIADO) / Solicitar Cesación de prisión preventiva (IMPUTADO). AUDIENCIA' },
      { id: 13, pick: true, desc: '13.- Solicitar Constitución en Actor Civil y/o Tercero Civil (AGRAVIADO) / Oponerse a solicitud de Actor Civil y/o Tercero Civil (IMPUTADO)' },
      { id: 0, pick: false, desc: 'ETAPA IV: ETAPA INTERMEDIA' },
      { id: 14, pick: true, desc: '14.- Absolución de la Acusación y/o Sobreseimiento / Audiencia de Control' },
      { id: 0, pick: false, desc: 'ETAPA V: ETAPA DE JUICIO ORAL' },
      { id: 15, pick: true, desc: '15.- Audiencia de Juicio' },
      { id: 16, pick: true, desc: '16.- Sentencia 1° Instancia' },
      { id: 0, pick: false, desc: 'ETAPA VI: IMPUGNATORIA' },
      { id: 17, pick: true, desc: '17.- Apelación Auto/Sentencia' },
      { id: 18, pick: true, desc: '18.- Recurso de Reposición' },
      { id: 19, pick: true, desc: '19.- Audiencia de Apelación' },
      { id: 20, pick: true, desc: '20.- Sentencia de Vista' },
      { id: 21, pick: true, desc: '21.- Casación' },
      { id: 0, pick: false, desc: 'ETAPA VII: ETAPA EJECUTORA' },
      { id: 22, pick: true, desc: '22.- Solicitar al PJ se ejecute la sentencia' },
      { id: 23, pick: true, desc: '23.- Solicitar al Ministerio Publico Revocatoria de pena' },
      { id: 24, pick: true, desc: '24.- Audiencia de Revocatoria de Pena Suspendida' },
    ]
  }

  get lstIterCivil() {
    return [
      { id: 0, pick: false, desc: 'PRIMERA INSTANCIA' },
      { id: 1, pick: true, desc: '1.- Subsanar de acuerdo al auto de inadmisibilidad de la demanda' },
      { id: 2, pick: true, desc: '2.- Emplazamiento de la demanda' },
      { id: 3, pick: true, desc: '3.- Interponer tachas u oposiciones a las pruebas' },
      { id: 4, pick: true, desc: '4.- Absolver tachas u oposiciones' },
      { id: 5, pick: true, desc: '5.- Interponer excepciones o defensas previas' },
      { id: 6, pick: true, desc: '6.- Absolver el traslado de las excepciones o defensas previas' },
      { id: 7, pick: true, desc: '7.- Contestar la demanda y reconvenir' },
      { id: 8, pick: true, desc: '8.- Ofrecimiento de medios probatorios si en la contestación se invoca hechos no expuestos en la demanda o en la reconvención' },
      { id: 9, pick: true, desc: '9.- Absolver el traslado de la reconvención' },
      { id: 10, pick: true, desc: '10.- Saneamiento' },
      { id: 11, pick: true, desc: '11.- Fijación de puntos controvertidos' },
      { id: 12, pick: true, desc: '12.- Realización de la audiencia de pruebas' },
      { id: 13, pick: true, desc: '13.- Audiencia especial y complementaria' },
      { id: 14, pick: true, desc: '14.- Alegados' },
      { id: 15, pick: true, desc: '15.- Sentencia' },
      { id: 0, pick: false, desc: 'SEGUNDA INSTANCIA' },
      { id: 16, pick: true, desc: '16.- Apelar sentencia' },
      { id: 17, pick: true, desc: '17.- Subsanar el recurso de apelación según el auto que declara la inadmisibilidad' },
      { id: 18, pick: true, desc: '18.- Elevar el expediente' },
      { id: 19, pick: true, desc: '19.- Traslado para absolver el escrito el escrito de apelación o adherirse al mismo' },
      { id: 20, pick: true, desc: '20.- Traslado al apelante para absolver la adhesión' },
      { id: 21, pick: true, desc: '21.- Audiencia de pruebas' },
      { id: 22, pick: true, desc: '22.- Vista de la causa' },
      { id: 23, pick: true, desc: '23.- Solicitar informe oral contado desde la notificación de la resolución que fija fecha para la vista de causa' },
      { id: 0, pick: false, desc: 'CASACION' },
      { id: 24, pick: true, desc: '24.- Interposición de casación' },
      { id: 25, pick: true, desc: '25.- Vista de la causa' },
      { id: 26, pick: true, desc: '26.- Solicitar informe oral por parte de las partes' },
      { id: 27, pick: true, desc: '27.- Sentencia de casación' },
    ];
  }

  get lstIterFamilia() {
    return [
      { id: 1, pick: true, desc: '1: Postulación del proceso' },
      { id: 2, pick: true, desc: '2: Calificación de la demanda' },
      { id: 3, pick: true, desc: '3: Traslado de la demanda' },
      { id: 4, pick: true, desc: '4: Contestación de la demanda' },
      { id: 5, pick: true, desc: '5: Audiencia' },
      { id: 6, pick: true, desc: '6: Sentencia' },
      { id: 7, pick: true, desc: '7: Apelación' },
      { id: 8, pick: true, desc: '8: Medidas cautelares' },
    ];
  }

  get lstIterOtros() {
    return [
      { id: 'nc', pick: true, desc: 'nc' },
      { id: 1, pick: true, desc: '1' },
      { id: 2, pick: true, desc: '2' },
      { id: 3, pick: true, desc: '3' },
      { id: 4, pick: true, desc: '4' },
      { id: 5, pick: true, desc: '5' },
      { id: 6, pick: true, desc: '6' },
      { id: 7, pick: true, desc: '7' },
      { id: 8, pick: true, desc: '8' },
      { id: 9, pick: true, desc: '9' },
      { id: 10, pick: true, desc: '10' },
      { id: 11, pick: true, desc: '11' },
      { id: 12, pick: true, desc: '12' },
      { id: 13, pick: true, desc: '13' },
      { id: 14, pick: true, desc: '14' },
      { id: 15, pick: true, desc: '15' },
    ]
  }

  get lstDiligencias() {
    return [
      { id: 1, pick: true, desc: '1.- INFORMES - INICIALES' },
      { id: 2, pick: true, desc: '2.- INFORMES - DE 1RA INSTANCIA' },
      { id: 3, pick: true, desc: '3.- INFORMES - DE 2DA INSTANCIA' },
      { id: 4, pick: true, desc: '4.- INFORMES - DE CASACIÓN (EJECUTORIAS SUPREMAS)' },
      { id: 5, pick: true, desc: '5.- INFORMES - FINALES' },
      { id: 6, pick: true, desc: '6.- REDACCIÓN DE ESCRITOS DE MERO TRÁMITE SEGÚN SINOE E IMPULSO DE PARTE' },
      { id: 7, pick: true, desc: '7.- IMPRIMIR ANEXOS RESOLUCIONES' },
      { id: 8, pick: true, desc: '8.- REDACCIÓN DE ACTAS DE ACUERDOS, TRANSACCIONES, CONCILIACIONES' },
      { id: 9, pick: true, desc: '9.- REDACCIÓN CONTRATOS PARA CLIENTES' },
      { id: 10, pick: true, desc: '10.- BORRADORES DE DEMANDAS, CONTESTACIONES, RECONVENCIONES, EXCEPCIONES, TACHAS Y OPOSICIONES' },
      { id: 11, pick: true, desc: '11.- PROPUESTAS ECONÓMICAS CLIENTES E INFORMES' },
      { id: 12, pick: true, desc: '12.- TRÁMITES - NOTARIALES Y REGISTRALES' },
      { id: 13, pick: true, desc: '13.- REDACCIÓN CARTAS, SOLICITUDES Y MINUTAS' },
      { id: 14, pick: true, desc: '14.- BORRADORES - MEDIDAS CAUTELARES' },
      { id: 15, pick: true, desc: '15.- ASISTIR CENTROS DE CONCILIACIÓN' },
      { id: 16, pick: true, desc: '16.- PREPARAR ALEGATOS, DIAPOSITIVAS, PLIEGOS INTERROGATORIOS' },
      { id: 17, pick: true, desc: '17.- ASISTIR A LOS CLIENTES EN AUDIENCIAS' },
      { id: 18, pick: true, desc: '18.- ASISTIR AL PJ Y/O MP PARA CONVERSAR CON JUECES, FISCALES, ESPECIALISTAS' },
      { id: 19, pick: true, desc: '19.- TRÁMITES ADMINISTRATIVOS PAGAR ARANCELES JUDICIALES, TASAS Y OTROS' },
      { id: 20, pick: true, desc: '20.- APOYAR EN COBRANZAS (HACERLAS EFECTIVAS)' },
      { id: 21, pick: true, desc: '21.- BÚSQUEDA DE EXPEDIENTE' },
      { id: 22, pick: true, desc: '22.- DESARCHIVAR EXPEDIENTES DEL ARCHIVO CENTRAL DEL PJ' },
      { id: 23, pick: true, desc: '23.- REVISAR, ORDENAR Y ACTUALIZACIÓN DE EXPEDIENTE' },
      { id: 24, pick: true, desc: '24.- COORDINAR AUDIENCIAS' },
      { id: 25, pick: true, desc: '25.- SIMULACIÓN DE AUDIENCIAS' },
      { id: 26, pick: true, desc: '26.- SEGUIMIENTO DEL PROCESO (CEJ Y SINOE)' },
      { id: 27, pick: true, desc: '27.- RECABAR MEDIOS PROBATORIOS' },
      { id: 28, pick: true, desc: '28.- RECEPCIÓN-REGISTRO Y/O ATENCIÓN DE CLIENTES VÍA CELULAR' },
      { id: 29, pick: true, desc: '29.- ASISTIR A MUNICIPALIDADES, MINISTERIOS U OTRAS INSTITUCIONES' },
      { id: 0, pick: false, desc: '------------------------------' },
      { id: 30, pick: true, desc: '30.- ATENDER CLIENTES ANTIGUOS, NUEVOS Y CAPTAR CLIENTES' },
      { id: 31, pick: true, desc: '31.- ANALIZAR Y REVISAR DOCUMENTOS (MEDIOS PROBATORIOS)' },
      { id: 32, pick: true, desc: '32.- ASIGNACIÓN Y SUPERVISIÓN DEL SINOE DE ESCRITOS DE MERO TRÁMITE Y COMPLEJOS REALIZADOS POR LOS ASISTENTES Y PRACTICANTES' },
      { id: 33, pick: true, desc: '33.- SUPERVISAR ESCRITO DE MERO TRÁMITE E IMPULSO DE PARTE' },
      { id: 34, pick: true, desc: '34.- SUPERVISAR ESCRITOS COMPLEJOS SEAN DEMANDAS, DENUNCIAS, APELACIONES, CASACIONES, ETC.' },
      { id: 35, pick: true, desc: '35.- DILIGENCIAS EXTERNAS, VISUALIZACIONES, DECLARACIONES, CÁMARAS GESSEL' },
      { id: 36, pick: true, desc: '36.- REVISAR Y ELABORAR INFORMES LEGALES DE LOS EXPEDIENTES' },
      { id: 37, pick: true, desc: '37.- REVISAR DEMANDAS QUE ESTÉN AL 100%' },
      { id: 38, pick: true, desc: '38.- REVISAR REDACCIÓN DE DENUNCIAS, QUERELLAS AL 100% Y OTROS' },
      { id: 39, pick: true, desc: '39.- REVISIÓN DE MEDIDAS CAUTELARES' },
      { id: 40, pick: true, desc: '40.- REVISIÓN DE CONTESTACIÓN DE DEMANDAS Y RECONVENCIONES' },
      { id: 41, pick: true, desc: '41.- REVISIÓN/MODIFICACIÓN DE ABSOLUCIÓN DE DENUNCIAS Y QUERELLAS' },
      { id: 42, pick: true, desc: '42.- REVISIÓN/MODIFICACIÓN DE RECURSO APELACIÓN' },
      { id: 43, pick: true, desc: '43.- REVISIÓN DE RECURSOS DE CASACIÓN' },
      { id: 44, pick: true, desc: '44.- REVISIÓN DE ALEGATOS, DISPOSITIVAS Y PLIEGOS INTERROGATORIOS' },
      { id: 45, pick: true, desc: '45.- REVISAR QUE LAS DEMANDAS, MC Y OTROS ESCRITOS SEAN PRESENTADOS CON ARANCELES JUDICIALES' },
      { id: 46, pick: true, desc: '46.- PREPARACIÓN DE CLIENTES, TESTIGOS PARA AUDIENCIAS' },
      { id: 47, pick: true, desc: '47.- ORALIZAR AUDIENCIAS DE CONCILIACIÓN Y JUZGAMIENTO' },
      { id: 48, pick: true, desc: '48.- ORALIZAR VISTAS DE CAUSA ANTE SALAS SUPERIORES' },
      { id: 49, pick: true, desc: '49.- ORALIZAR VISTAS DE LA CAUSA ANTE CORTE SUPREMA' },
      { id: 50, pick: true, desc: '50.- ENTREVISTAS CON JUECES, FISCALES, ESPECIALISTAS' },
      { id: 51, pick: true, desc: '51.- CONFERENCIAR CON LA CONTRA PARTE Y ABOGADOS' },
      { id: 52, pick: true, desc: '52.- ATENCIÓN CLIENTES VÍA CELULAR' },
      { id: 53, pick: true, desc: '53.- ORGANIZAR ASAMBLEAS, REUNIONES VIRTUALES' },
      { id: 54, pick: true, desc: '54.- COBRAR CLIENTES (HACERLAS EFECTIVAS)' },
      { id: 0, pick: false, desc: '------------------------------' },
      { id: 100, pick: true, desc: '100.- SESIONES SEMANALES' },
      { id: 101, pick: true, desc: '101.- ALMUERZO' },
      { id: 102, pick: true, desc: '102.- ORDEN Y LIMPIEZA' },
      { id: 103, pick: true, desc: '103.- ACTUALIZACION DEL PLANER' },
      { id: 104, pick: true, desc: '104.- SESIONES DE COMPARTIR(ANIVERSARIOS, CUMPLEAÑOS, FESTIVIDADES, ETC)' },
      { id: 110, pick: true, desc: '110.- OTRO' },
    ]
  }

  public getObjRdt(): void {
    this.db.collection('rdts')
      .doc(this.idrdt)
      .valueChanges()
      .subscribe((rdt: any) => {
        this.objRdt = rdt[0];
      });
  }

  public getTareas(): void {
    this.db
      .collection('tareas', (ref) => {
        return ref.where('idrdt', '==', this.idrdt);
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.lstTareas = val;
      });
  }

  public agregarTarea(): void {
    this.lCreating = true;
    var objTarea = this.frmNewTask.value;
    const id = new Date().getTime().toString();

    this.db
      .collection('tareas')
      .doc(id)
      .set({
        ...objTarea,
        idtarea: id,
        idrdt: this.idrdt,
        nsemana: this.objRdt.nsemana,
        sexpediente: objTarea['sexpediente'].trim().toUpperCase(),
        sdestarea: objTarea['sdeseje']
      })
      .then((x) => {
        this.modalService.dismissAll();
        this.frmNewTask.reset();
      })
      .catch(() => {
        window.alert('ERROR al crear tarea')
      })
      .finally(() => {
        this.lCreating = false;
      });
  }

  public editarTarea(): void {
    this.lUpdating = true;
    var objTarea = this.frmEditTask.value;
    const id = objTarea['idtarea'];

    this.db
      .collection('tareas')
      .doc(id)
      .update({
        ...objTarea,
        sexpediente: objTarea['sexpediente'].trim().toUpperCase()
      })
      .then((x) => {
        this.modalService.dismissAll();
        this.frmEditTask.reset();
      })
      .catch(() => {
        window.alert('ERROR al actualizar tarea')
      })
      .finally(() => {
        this.lUpdating = false;
      })
  }

  public duplicarTarea(tarea: ObjTarea): void {
    if (!window.confirm('¿Esta seguro de duplicar?')) return;

    const id = new Date().getTime().toString();
    this.db
      .collection('tareas')
      .doc(id)
      .set({
        ...tarea,
        idtarea: id,
      })
      .then((x) => {
        console.log('duplicado');
      })
      .catch(() => {
        window.alert('ERROR al duplicar')
      });
  }

  public eliminarTarea(idtarea: string): void {
    if (window.confirm('¿Esta seguro de borrar?')) {
      this.db.collection('tareas').doc(idtarea).delete();
    }
  }

  public openNewTaskModal(modal: any): void {
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }

  public openEditTaskModal(tarea: ObjTarea, modal: any): void {
    this.frmEditTask.setValue({
      idtarea: tarea.idtarea,
      ntipocliente: tarea.ntipocliente,
      ntipoatencion: tarea.ntipoatencion,
      sdelegadopor: tarea.sdelegadopor,
      sexpediente: tarea.sexpediente,
      ntipoproceso: tarea.ntipoproceso,
      scliente: tarea.scliente,
      sdemandado: tarea.sdemandado,
      niter: tarea.niter,
      navance: tarea.navance,
      fculminacion: tarea.fculminacion,
      ncodeje: tarea.ncodeje,
      sdeseje: tarea.sdeseje,
      sacceje: tarea.sacceje,
      nhorasatencion: tarea.nhorasatencion,
      nminutosatencion: tarea.nminutosatencion,
    });
    this.setLstIterEditTask(true);
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }

  ////////////////////////////////////////////////////

  public setLstIterNewTask(): void {
    let proceso = this.frmNewTask.value['ntipoproceso'];

    switch (proceso) {
      case 'laboral':
        this.lstIter = this.lstIterLaboral;
        break;
      case 'penal':
        this.lstIter = this.lstIterPenal;
        break;
      case 'civil':
        this.lstIter = this.lstIterCivil;
        break;
      case 'familia':
        this.lstIter = this.lstIterFamilia;
        break;
      default:
        this.lstIter = this.lstIterOtros;
    }

    this.frmNewTask.controls['niter'].reset();
  }

  public setLstIterEditTask(dontReset?: boolean): void {
    let proceso = this.frmEditTask.value['ntipoproceso'];

    switch (proceso) {
      case 'laboral':
        this.lstIter = this.lstIterLaboral;
        break;
      case 'penal':
        this.lstIter = this.lstIterPenal;
        break;
      case 'civil':
        this.lstIter = this.lstIterCivil;
        break;
      case 'familia':
        this.lstIter = this.lstIterFamilia;
        break;
      default:
        this.lstIter = this.lstIterOtros;
    }

    if (dontReset) return;
    this.frmEditTask.controls['niter'].reset();
  }

  ///////////////////////////////////////////////

  buscarExpedienteAlias() {
    let sTermino: string = this.frmNewTask.value.sexpediente;
    sTermino = sTermino.trim().toUpperCase();
    if (sTermino.length < 10) return;
    this.lSearching = true;
    let sAtributo = sTermino.length == 10 ? 'salias' : 'sexpediente';
    let obs = this.db.collection('expedientes', ref => {
      return ref.where(sAtributo, '==', sTermino)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        if (res.length == 1) {
          // completar datos al formulario
          console.log(res[0])
          this.frmNewTask.controls['sexpediente'].setValue(res[0].sexpediente);
          this.frmNewTask.controls['sdemandado'].setValue(res[0].sdemandado);
          this.frmNewTask.controls['scliente'].setValue(res[0].sdemandante);
          this.frmNewTask.controls['ntipoproceso'].setValue(res[0].sespecialidad.toLowerCase());

          this.setLstIterNewTask();
        } else if (res.length > 1) {
          window.alert('Hay mas de un cuaderno con ese numero. Escriba completo');
        }
        this.lSearching = false;
        obs.unsubscribe();
      })
  }

}
