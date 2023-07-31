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
  constructor() {}
}

class ObjTarea {
  idtarea: string = '';
  idrdt: string = '';
  ntipocliente: string = '';
  ntipoatencion: string = '';
  sdelegadopor: string = '';
  sexpediente: string = '';
  ntipoproceso: string = '';
  sdestarea: string = '';
  scliente: string = '';
  sdemandado: string = '';
  niter: string = '';
  navance: string = '';
  fculminacion: string = '';
  stiempoatencion: string = ''; // deprecated
  ncodeje: string = '';
  sdeseje: string = '';
  sacceje: string = '';
  nsemana: number = 0;
  nhorasatencion: string = '';
  nminutosatencion: string = '';
  constructor() {}
}

@Component({
  selector: 'app-rdt-view-edit',
  templateUrl: './rdt-view-edit.component.html',
  styleUrls: ['./rdt-view-edit.component.scss'],
})
export class RdtViewEditComponent {
  idrdt: string;
  objRdt: ObjRdt = new ObjRdt();
  lstTareas: ObjTarea[] = [];
  frmNewTask: FormGroup;
  frmEditTask: FormGroup;
  lstIter: any[] = [];
  lCreating: boolean = false;
  lUpdating: boolean = false;

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
      sdestarea: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      niter: new FormControl(null, Validators.required),
      navance: new FormControl(null, Validators.required),
      fculminacion: new FormControl(null, Validators.required),
      stiempoatencion: new FormControl(null), // deprecated
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
      sdestarea: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      niter: new FormControl(null, Validators.required),
      navance: new FormControl(null, Validators.required),
      fculminacion: new FormControl(null, Validators.required),
      stiempoatencion: new FormControl(null), // deprecated
      ncodeje: new FormControl(null, Validators.required),
      sdeseje: new FormControl(null, Validators.required),
      sacceje: new FormControl(null, Validators.required),
      nhorasatencion: new FormControl(null, Validators.required),
      nminutosatencion: new FormControl(null, Validators.required),
    });
  }

  public getObjRdt(): void {
    this.db.collection('rdts', ref => {
      return ref.where('idrdt', '==', this.idrdt)
    }).valueChanges()
    .subscribe((rdt: any)=>{
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
      .set({ ...objTarea, 
        idtarea: id, 
        idrdt: this.idrdt,
        nsemana: this.objRdt.nsemana,
        sexpediente: objTarea['sexpediente'].trim().toUpperCase()
      })
      .then((x) => {
        this.modalService.dismissAll();
        this.frmNewTask.reset();
      })
      .catch(()=>{
        window.alert('ERROR al crear tarea')
      })
      .finally(()=>{
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
      .catch(()=>{
        window.alert('ERROR al actualizar tarea')
      })
      .finally(()=>{
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
      .catch(()=>{
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
      sdestarea: tarea.sdestarea,
      scliente: tarea.scliente,
      sdemandado: tarea.sdemandado,
      niter: tarea.niter,
      navance: tarea.navance,
      fculminacion: tarea.fculminacion,
      stiempoatencion: tarea.stiempoatencion,
      ncodeje: tarea.ncodeje,
      sdeseje: tarea.sdeseje,
      sacceje: tarea.sacceje,
      nhorasatencion: tarea.nhorasatencion,
      nminutosatencion: tarea.nminutosatencion,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }

  ////////////////////////////////////////////////////

  public asignarValoresIter(): void {
    this.lstIter = [
      {
        tipo: 'laboral',
        actividades: [
          '1:Elaboración Demanda',
          '2:Presentación Demanda',
          '3:Auto Admisorio',
          '4:Contestación de demanda',
          '5:Audiencia conciliacion',
          '6:Audiencia juzgamiento',
          '7:Sentencia 1ra instancia',
          '8:Recurso apelación',
          '9:Audiencia vista de la causa',
          '10: Sentencia de vista 2da instancia',
          '11:Recurso de casación',
        ],
      },
      {
        tipo: 'penal',
        actividades: [
          '1:Denuncia',
          '2:Solicitar diligencias y/o presentar medios de prueba',
          '3:Solicitar el archivo de la investigación(investigado)/solicitar que se formalice la investigación(agravado)',
          '4:Tutela de derechos/audiencia tutela de derechos',
          '5:Control de plazos/audiencia de control de plazos',
          '6:Evaluación de actuados',
          '7:Solicitar diligencias y/o presentar medios de prueba',
          '8:Tutela de derechos/audiencia tutela de derechos',
          '9:Control de plazos/audiencia de control de plazos',
          '10:Solicitar prisión preventiva(agraviado)/Absolver requerimiento de prisión preventiva(imputado). Audiencia',
          '11:Solicitar prórroga de prisión preventiva(agraviado)/solicitar cesación de prisión preventiva(imputado). Audiencia',
          '12:Tutela de derechos/Audiencia de tutela de derechos',
          '13:Control de plazos/Audiencia de control de plazos',
          '14:Solicitar constitución en actor civil(agraviado)/oponerse a solicitud de actor civil y/o tercero civil(imputado)',
          '15:Absolución de la acusación y/o sobreseimiento/Audiencia de control',
          '16:Audiencia de juicio',
        ],
      },
      {
        tipo: 'civil',
        actividades: [
          '1:Subsanar de acuerdo al auto de inadmisibilidad de la demanda',
          '2:Emplazamiento de la demanda',
          '3:Interponer tachas u oposiciones a las pruebas',
          '4:Absolver tachas u oposiciones',
          '5:Interponer excepciones o defensas previas',
          '6:Absolver el traslado de las excepciones o defensas previas',
          '7:Contestar la demanda y reconvenir',
          '8:Ofrecimiento de medios probatorios si en la contestación se invoca hechos no expuestos en la demanda o en la reconvención',
          '9:Absolver el traslado de la reconvención',
          '10:Saneamiento',
          '11:Fijación de puntos controvertidos',
          '12:Realización de la audiencia de pruebas',
          '13:Audiencia especial y complementaria',
          '14:Alegados',
          '15:Sentencia',
          '16:Apelar sentencia',
          '17:Subsanar el recurso de apelación según el auto que declara la inadmisibilidad',
          '18:Elevar el expediente',
          '19:Traslado para absolver el escrito el escrito de apelación o adherirse al mismo',
          '20:Traslado al apelante para absolver la adhesión',
          '21:Audiencia de pruebas',
          '22:Vista de la causa',
          '23:Solicitar informe oral contado desde la notificación de la resolución que fija fecha para la vista de causa',
          '24:Interposición de casación',
          '25:Vista de la causa',
          '26:Solicitar informe oral por parte de las partes',
          '27:Sentencia de casación',
        ],
      },
      {
        tipo: 'familia',
        actividades: [
          '1:Postulación del proceso',
          '2:Calificación de la demanda',
          '3:Traslado de la demanda',
          '4:Contestación de la demanda',
          '5:Audiencia',
          '6:Sentencia',
          '7:Apelación',
          '8:Medidas cautelares',
        ],
      },
    ];
  }
}
