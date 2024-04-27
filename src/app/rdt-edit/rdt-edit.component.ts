import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './../app.service';

import {
  lstIterLaboral,
  lstIterFamilia,
  lstIterCivil,
  lstIterPenal,
  lstIterConstitucional,
  lstIterOtros,
  lstDiligencias
} from './rdt-edit.clases';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public scolaborador: string = '';
  public sfecha: string = '';
  public sfecha2: string = '';
  public nfecha: number = 0;
  public nsemana: number = 0;
  public ndia: number = 0;

  constructor(
  ) { }
}

class ObjTarea {
  public idrdt: string = '';
  public idtarea: string = '';
  public stipocliente: string = '';
  public stipoatencion: string = '';
  public sdelegadopor: string = '';
  public sexpediente: string = '';
  public sespecialidad: string = '';
  public sdemandante: string = '';
  public sdemandado: string = '';
  public niter: number = 0;
  public navance: number = 0;
  public sfculminacion: string = '';
  public ncodeje: number = 0;
  public sdeseje: string = '';
  public sacceje: string = '';
  public shorasatencion: string = '';
  public sminutosatencion: string = '';
  public ncobrohonorario: number = 0;
  public ningresoarancel: number = 0;
  public nsalidaarancel: number = 0;
  public lcontrato: boolean = false;
  public nsaldo: number = 0;
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
  nSumaTiempoTareas: string = '--:--';
  lLoading: boolean = false;

  frmNewTask: FormGroup;
  frmEditTask: FormGroup;
  lstIter: any[] = [];
  lCreating: boolean = false;
  lUpdating: boolean = false;
  lSearching: boolean = false;

  // Quienes pueden delegar
  lstDelegadores: Array<{ id: string, name: string }> = [
    {
      id: 'dra-lizbet',
      name: 'Dra. Lizbet'
    },
    {
      id: 'dra-silvia',
      name: 'Dra. Silvia'
    },
    {
      id: 'dra-naldy',
      name: 'Dra. Naldy'
    },
    {
      id: 'dra-karla',
      name: 'Dra. Karla'
    },
    {
      id: 'dra-lizi',
      name: 'Dra. Lizi'
    },
    {
      id: 'dr-aparicio',
      name: 'Dr. Aparicio'
    },
    {
      id: 'bach-vianka',
      name: 'Bach. Vianka'
    },
  ];

  lstExpedientes: Array<any> = [];
  lstExpedientesFiltered: Array<any> = [];

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
    private service: AppService,
    route: ActivatedRoute
  ) {
    this.idrdt = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle('RDT ' + this.idrdt);
    this.getObjRdt();
    this.getTareas();
    this.getExpedientesList();

    /**********************
     * INIT FORM NEW TASK *
     **********************/
    this.frmNewTask = new FormGroup({
      stipocliente: new FormControl(null, Validators.required),
      stipoatencion: new FormControl(null, Validators.required),
      sdelegadopor: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      niter: new FormControl(null, Validators.required),
      navance: new FormControl(null, Validators.required),
      sfculminacion: new FormControl(null, Validators.required),
      ncodeje: new FormControl(null, Validators.required),
      sdeseje: new FormControl(null, Validators.required),
      sacceje: new FormControl(null, Validators.required),
      shorasatencion: new FormControl(null, Validators.required),
      sminutosatencion: new FormControl(null, Validators.required),
      ncobrohonorario: new FormControl(null, Validators.required),
      ningresoarancel: new FormControl(null, Validators.required),
      nsalidaarancel: new FormControl(null, Validators.required),
      lcontrato: new FormControl(null, Validators.required),
      nsaldo: new FormControl(null, Validators.required),
    });

    /***********************
     * INIT FORM EDIT TASK *
     ***********************/
    this.frmEditTask = new FormGroup({
      idtarea: new FormControl(null, Validators.required),
      stipocliente: new FormControl(null, Validators.required),
      stipoatencion: new FormControl(null, Validators.required),
      sdelegadopor: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      niter: new FormControl(null, Validators.required),
      navance: new FormControl(null, Validators.required),
      sfculminacion: new FormControl(null, Validators.required),
      ncodeje: new FormControl(null, Validators.required),
      sdeseje: new FormControl(null, Validators.required),
      sacceje: new FormControl(null, Validators.required),
      shorasatencion: new FormControl(null, Validators.required),
      sminutosatencion: new FormControl(null, Validators.required),
      ncobrohonorario: new FormControl(null, Validators.required),
      ningresoarancel: new FormControl(null, Validators.required),
      nsalidaarancel: new FormControl(null, Validators.required),
      lcontrato: new FormControl(null, Validators.required),
      nsaldo: new FormControl(null, Validators.required),
    });
  }

  get lstIterLaboral() { return lstIterLaboral; }

  get lstIterPenal() { return lstIterPenal; }

  get lstIterCivil() { return lstIterCivil; }

  get lstIterFamilia() { return lstIterFamilia; }

  get lstIterConstitucional() { return lstIterConstitucional }

  get lstIterOtros() { return lstIterOtros; }

  get lstDiligencias() { return lstDiligencias; }

  /**
   * Recupera el listado del expedientes
   */
  getExpedientesList() {
    this.service.lstExps.subscribe((res: any) => this.lstExpedientes = res);
  }

  /**
   * Obtiene los datos importantes del RDT
   */
  public getObjRdt(): void {
    this.db.collection('rdts')
      .doc(this.idrdt)
      .valueChanges()
      .subscribe((rdt: any) => {
        let dDate = new Date(rdt.nfecha);
        let syear = dDate.getFullYear();
        let smonth = (dDate.getMonth() + 1) < 10 ? '0' + (dDate.getMonth() + 1) : '' + (dDate.getMonth() + 1);
        let sday = (dDate.getDate()) < 10 ? '0' + (dDate.getDate()) : '' + (dDate.getDate());

        this.objRdt.idcolaborador = rdt.idcolaborador;
        this.objRdt.scolaborador = rdt.scolaborador;
        this.objRdt.sfecha = rdt.sfecha;
        this.objRdt.nsemana = rdt.nsemana;
        this.objRdt.ndia = rdt.ndia;
        this.objRdt.sfecha2 = sday + '/' + smonth + '/' + syear;
      });
  }

  /**
   * Obtiene las tareas correspondientes al RDT
   */
  public getTareas(): void {
    this.lLoading = true;
    this.db
      .collection('tareas', (ref) => {
        return ref.where('idrdt', '==', this.idrdt);
      })
      .valueChanges()
      .subscribe((val: Array<any>) => {
        this.lstTareas = [];
        let horas = 0;
        let minutos = 0;

        val.forEach((tarea: any) => {
          let objTarea = new ObjTarea();
          objTarea.idrdt = tarea.idrdt;
          objTarea.idtarea = tarea.idtarea;
          objTarea.stipocliente = tarea.stipocliente;
          objTarea.stipoatencion = tarea.stipoatencion;
          objTarea.sdelegadopor = tarea.sdelegadopor;
          objTarea.sexpediente = tarea.sexpediente;
          objTarea.sespecialidad = tarea.sespecialidad;
          objTarea.sdemandante = tarea.sdemandante;
          objTarea.sdemandado = tarea.sdemandado;
          objTarea.niter = tarea.niter;
          objTarea.navance = tarea.navance;
          objTarea.sfculminacion = tarea.sfculminacion;
          objTarea.ncodeje = tarea.ncodeje;
          objTarea.sdeseje = tarea.sdeseje;
          objTarea.sacceje = tarea.sacceje;
          objTarea.shorasatencion = tarea.shorasatencion;
          objTarea.sminutosatencion = tarea.sminutosatencion;
          objTarea.ncobrohonorario = tarea.ncobrohonorario;
          objTarea.ningresoarancel = tarea.ningresoarancel;
          objTarea.nsalidaarancel = tarea.nsalidaarancel;
          objTarea.lcontrato = tarea.lcontrato ? tarea.lcontrato : 'nc';
          objTarea.nsaldo = tarea.nsaldo ? tarea.nsaldo : '-';

          this.lstTareas.push(objTarea);

          horas = horas + Number(tarea.shorasatencion);
          minutos = minutos + Number(tarea.sminutosatencion);
        });

        let nTotalMinutos = horas * 60 + minutos;
        let sHoras = '';
        let sMinutos = '';

        sHoras = Math.floor(nTotalMinutos / 60).toString();
        sMinutos = (nTotalMinutos - Math.floor(nTotalMinutos / 60) * 60).toString();

        this.nSumaTiempoTareas = sHoras + 'h ' + sMinutos + 'm';

        this.lLoading = false;
      });
  }

  /**
   * Registra una tarea en un RDT
   */
  public agregarTarea(): void {
    this.lCreating = true;
    var objTarea = this.frmNewTask.value;
    const id = new Date().getTime().toString();
    const sexp = objTarea['sexpediente'].trim().toUpperCase();

    this.db
      .collection('tareas')
      .doc(id)
      .set({
        ...objTarea,
        idtarea: id,
        idrdt: this.idrdt,
        idcolaborador: this.objRdt.idcolaborador,
        scolaborador: this.objRdt.scolaborador,
        sfecha: this.objRdt.sfecha,
        nsemana: this.objRdt.nsemana,
        nday: this.objRdt.ndia,
        sexpediente: sexp,
      })
      .then((x) => {
        this.modalService.dismissAll();
        this.frmNewTask.reset();

        // Actualizar ITER
        this.db.collection('expedientes')
          .doc(sexp)
          .update({
            niter: Number(objTarea['niter'])
          })
          .then(() => { })
          .catch((e) => { console.log(e) });

        // Registrar Honorario
        if (objTarea['ncobrohonorario'] > 0) {
          this.registrarHonorario({
            id: Number(id),
            sexp: sexp,
            nmonto: objTarea['ncobrohonorario'],
            sfecha: this.objRdt.sfecha,
            idcolaborador: this.objRdt.idcolaborador,
            scolaborador: this.objRdt.scolaborador,
          })
        }
      })
      .catch(() => {
        window.alert('ERROR al crear tarea')
      })
      .finally(() => {
        this.lCreating = false;
      });
  }

  registrarHonorario(arg: {
    id: number,
    sexp: string,
    nmonto: number,
    sfecha: string,
    idcolaborador: string,
    scolaborador: string,
  }) {
    const id = (new Date(arg.id).getTime() + 10);
    const sid = id.toString();

    this.db
      .collection('pagos')
      .doc(sid)
      .set({
        idpago: sid,
        lactive: true,
        sexpediente: arg.sexp,
        nmonto: arg.nmonto,
        sfecha: arg.sfecha,
        sdescripcion: 'Pago por Honorarios - Cobrado por ' + arg.scolaborador + ' [vía RDT]',

        nfechacreacion: id,
        screador: arg.idcolaborador,
        nfechaedicion: 0,
        seditor: '-',
      })
      .then((x) => {
        // success
      })
      .catch(() => {
        // error
      })
      .finally(() => {
        // completed
      });
  }

  /**
   * Actualiza una tarea registrada en un RDT
   */
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

  /**
   * Quita una tarea registrada en un RDT
   */
  public eliminarTarea(idtarea: string): void {
    if (window.confirm('¿Esta seguro de borrar?')) {
      this.db.collection('tareas').doc(idtarea).delete();
    }
  }

  public openNewTaskModal(modal: any): void {
    this.frmNewTask.controls['sfculminacion'].setValue(this.objRdt.sfecha);
    this.frmNewTask.controls['ncobrohonorario'].setValue(0);
    this.frmNewTask.controls['ningresoarancel'].setValue(0);
    this.frmNewTask.controls['nsalidaarancel'].setValue(0);
    this.frmNewTask.controls['navance'].setValue('100%');

    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }

  public openEditTaskModal(tarea: ObjTarea, modal: any): void {
    this.frmEditTask.setValue({
      idtarea: tarea.idtarea,
      stipocliente: tarea.stipocliente,
      stipoatencion: tarea.stipoatencion,
      sdelegadopor: tarea.sdelegadopor,
      sexpediente: tarea.sexpediente,
      sespecialidad: tarea.sespecialidad,
      sdemandante: tarea.sdemandante,
      sdemandado: tarea.sdemandado,
      niter: tarea.niter,
      navance: tarea.navance,
      sfculminacion: tarea.sfculminacion,
      ncodeje: tarea.ncodeje,
      sdeseje: tarea.sdeseje,
      sacceje: tarea.sacceje,
      shorasatencion: tarea.shorasatencion,
      sminutosatencion: tarea.sminutosatencion,
      ncobrohonorario: tarea.ncobrohonorario,
      ningresoarancel: tarea.ningresoarancel,
      nsalidaarancel: tarea.nsalidaarancel,
      nsaldo: tarea.nsaldo,
      lcontrato: tarea.lcontrato,
    });
    this.setLstIterEditTask(true);
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }

  ////////////////////////////////////////////////////

  public setLstIterNewTask(): void {
    let proceso = this.frmNewTask.value['sespecialidad'];

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
      case 'constitucional':
        this.lstIter = this.lstIterConstitucional;
        break;
      default:
        this.lstIter = this.lstIterOtros;
    }

    this.frmNewTask.controls['niter'].reset();
  }

  public setLstIterEditTask(dontReset?: boolean): void {
    let proceso = this.frmEditTask.value['sespecialidad'];

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
      case 'constitucional':
        this.lstIter = this.lstIterConstitucional;
        break;
      default:
        this.lstIter = this.lstIterOtros;
    }

    if (dontReset) return;
    this.frmEditTask.controls['niter'].reset();
  }

  /**
   * Auto completado de expediente
   */
  filtrar(val: string) {
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 2);

    if (sterms.length == 0) {
      this.lstExpedientesFiltered = [];
      return;
    }

    this.lstExpedientesFiltered = this.lstExpedientes
      .filter(exp => {
        if (exp.idtipodoc == 'CASACION-2DA-SALA') {
          return false;
        } else if (exp.idtipodoc == 'CASACION-4TA-SALA') {
          return false;
        } else {
          return true;
        }
      })
      .filter(exp => {
        let lMatch = false;
        let nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.sdemandado.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.sdemandante.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.sexpediente.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.scodigo.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.smatchexp?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;

        return lMatch;
      })
      .slice(0, 7);
  }

  pickExpediente(exp: any) {
    // Set values
    this.frmNewTask.controls['sexpediente'].setValue(exp.sexpediente);
    this.frmNewTask.controls['sdemandante'].setValue(exp.sdemandante);
    this.frmNewTask.controls['sdemandado'].setValue(exp.sdemandado);
    this.frmNewTask.controls['sespecialidad'].setValue(exp.sespecialidad.toLowerCase());
    this.frmNewTask.controls['stipocliente'].setValue('antiguo');
    this.frmNewTask.controls['lcontrato'].setValue(exp.lcontrato ? 'si' : 'no');

    // Set ITER
    this.setLstIterNewTask();
    if (exp.niter == 0) {
      this.frmNewTask.controls['niter'].setValue(null);
    } else {
      this.frmNewTask.controls['niter'].setValue(exp.niter);
    }

    // Remove popover list
    this.lstExpedientesFiltered = [];
  }

  desfocusear() {
    // Remove popover list
    this.lstExpedientesFiltered = [];
  }

  prevenir(e: Event) {
    e.preventDefault()
  }

  pressEnter() {
    if (this.lstExpedientesFiltered.length == 1) {
      this.pickExpediente(this.lstExpedientesFiltered[0]);
    }
  }

}
