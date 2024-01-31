import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Colaborador } from './../__clases/colaborador';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as XLSX from 'xlsx';

interface Tarea {
  idtarea: string;
  starea: string;
  idencargado: string;
  sexpediente: string;
  scliente: string;
  splazo: string;
  lcumplimiento: string;
  sobservaciones: string;
  sfcreacion: string;
  scolor: 'green' | 'gold' | 'red';
}

@Component({
  selector: 'app-sinoe-admin',
  templateUrl: './sinoe-admin.component.html',
  styleUrls: ['./sinoe-admin.component.scss']
})
export class SinoeAdminComponent {
  lstTareas: Array<Tarea> = [];
  lstColaboradores: Array<Colaborador> = [];
  frmFiltros: FormGroup;
  frmEditTarea: FormGroup;
  frmNewTarea: FormGroup;
  lLoading: boolean = false;
  lUpdating: boolean = false;
  lCreating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
  ) {
    this.titleService.setTitle('Tareas y Diligencias');

    /********************
     * INIT FORM FILTER *
     ********************/
    this.frmFiltros = new FormGroup({
      lcumplimiento: new FormControl('all', Validators.required),
      idcolaborador: new FormControl('all', Validators.required),
    });

    /***********************
     * INIT FORM EDIT TASK *
     ***********************/
    this.frmEditTarea = new FormGroup({
      idtarea: new FormControl(null, Validators.required),
      starea: new FormControl(null, Validators.required),
      idencargado: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      splazo: new FormControl(null, Validators.required),
      lcumplimiento: new FormControl(null, Validators.required),
      sobservaciones: new FormControl(null, Validators.required),
    });

    /**********************
     * INIT FORM ADD TASK *
     **********************/
    this.frmNewTarea = new FormGroup({
      starea: new FormControl(null, Validators.required),
      idencargado: new FormControl(null, Validators.required),
      scliente: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      splazo: new FormControl(null, Validators.required),
    });

    this.getColaboradores();
    this.getTareas();
  }

  getColaboradores() {
    let obs = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    })
      .valueChanges()
      .subscribe((res: any) => {
        this.lstColaboradores = res;

        obs.unsubscribe();
      });
  }

  getTareas() {
    this.lLoading = true;
    let lcumplimiento = this.frmFiltros.controls['lcumplimiento'].value;
    let idcolaborador = this.frmFiltros.controls['idcolaborador'].value;
    let obs: any;

    // POSIBILIDADES DE SUCESOS EN EL FILTRO
    if (lcumplimiento == 'all' && idcolaborador == 'all') {
      obs = this.db.collection('tareasg', ref => {
        return ref.limit(50);
      });
    } else if (lcumplimiento == 'all' && idcolaborador != 'all') {
      obs = this.db.collection('tareasg', ref => {
        return ref.where('idencargado', '==', idcolaborador)
          .limit(50);
      });
    } else if (lcumplimiento != 'all' && idcolaborador == 'all') {
      obs = this.db.collection('tareasg', ref => {
        return ref.where('lcumplimiento', '==', /^true$/i.test(lcumplimiento))
          .limit(50);
      });
    } else if (lcumplimiento != 'all' && idcolaborador != 'all') {
      obs = this.db.collection('tareasg', ref => {
        return ref.where('lcumplimiento', '==', /^true$/i.test(lcumplimiento))
          .where('idencargado', '==', idcolaborador)
          .limit(50);
      });
    }

    let a = obs.valueChanges().subscribe((res: any) => {
      this.lstTareas = res.map((t: any) => {
        let year = Number(t.splazo.slice(0, 4));
        let month = Number(t.splazo.slice(5, 7));
        let day = Number(t.splazo.slice(8, 10));
        let dPlazo = new Date(year, month - 1, day + 1);
        let dToday = new Date();
        let diff = dPlazo.getTime() - dToday.getTime();
        let scolor = 'black';

        if (t.lcumplimiento) {
          scolor = 'green'
        } else if (diff > 0) {
          scolor = 'gold'
        } else if (diff < 0) {
          scolor = 'red'
        }

        return {
          ...t,
          scolor: scolor
        }
      })

      this.lLoading = false;
      a.unsubscribe();
    });
  }

  openModalEdit(modal: any, objtarea: Tarea) {
    this.frmEditTarea.reset();
    this.frmEditTarea.controls['idtarea'].setValue(objtarea.idtarea);
    this.frmEditTarea.controls['starea'].setValue(objtarea.starea);
    this.frmEditTarea.controls['idencargado'].setValue(objtarea.idencargado);
    this.frmEditTarea.controls['scliente'].setValue(objtarea.scliente);
    this.frmEditTarea.controls['sexpediente'].setValue(objtarea.sexpediente);
    this.frmEditTarea.controls['splazo'].setValue(objtarea.splazo);
    this.frmEditTarea.controls['lcumplimiento'].setValue(objtarea.lcumplimiento);
    this.frmEditTarea.controls['sobservaciones'].setValue(objtarea.sobservaciones);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  openModalNew(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  updateTarea() {
    this.lUpdating = true;
    let idtarea = this.frmEditTarea.controls['idtarea'].value;
    let starea = this.frmEditTarea.controls['starea'].value;
    let idencargado = this.frmEditTarea.controls['idencargado'].value;
    let scliente = this.frmEditTarea.controls['scliente'].value.trim().toUpperCase();
    let sexpediente = this.frmEditTarea.controls['sexpediente'].value.trim().toUpperCase();
    let splazo = this.frmEditTarea.controls['splazo'].value;
    let lcumplimiento = this.frmEditTarea.controls['lcumplimiento'].value;
    let sobservaciones = this.frmEditTarea.controls['sobservaciones'].value;

    this.db.collection('tareasg').doc(idtarea)
      .update({
        starea: starea,
        idencargado: idencargado,
        scliente: scliente,
        sexpediente: sexpediente,
        splazo: splazo,
        lcumplimiento: lcumplimiento,
        sobservaciones: sobservaciones
      })
      .then(() => {
        this.modalService.dismissAll();
        this.getTareas();
      })
      .catch(err => {
        window.alert('ERROR al actualizar')
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

  registerTarea() {
    this.lCreating = true;
    let nfecha = (new Date()).getTime();
    let idtarea = (5000000000000 - nfecha).toString();
    let starea = this.frmNewTarea.controls['starea'].value;
    let idencargado = this.frmNewTarea.controls['idencargado'].value;
    let scliente = this.frmNewTarea.controls['scliente'].value.trim().toUpperCase();
    let sexpediente = this.frmNewTarea.controls['sexpediente'].value.trim().toUpperCase();
    let splazo = this.frmNewTarea.controls['splazo'].value;
    let lcumplimiento = false;
    let sobservaciones = '-';

    this.db.collection('tareasg').doc(idtarea)
      .set({
        idtarea: idtarea,
        starea: starea,
        idencargado: idencargado,
        scliente: scliente,
        sexpediente: sexpediente,
        splazo: splazo,
        lcumplimiento: lcumplimiento,
        sobservaciones: sobservaciones,
        sfcreacion: nfecha
      })
      .then(() => {
        this.modalService.dismissAll();
        this.frmNewTarea.reset();
        this.getTareas();
      })
      .catch(err => {
        window.alert('ERROR al registrar')
      })
      .finally(() => {
        this.lCreating = false;
      })
  }

  // Download to EXCEL
  descargarExcel() {
    let lstJson: Array<any> = [];

    this.lstTareas.forEach(tar => {
      lstJson.push({
        'Cliente': tar.scliente,
        'Encargado': tar.idencargado,
        'Expediente': tar.sexpediente,
        'Tarea': tar.starea,
        'Vencimiento': tar.splazo,
        'CUMPLIDO': tar.lcumplimiento ? 'SI' : 'NO',
        'Observaciones': tar.sobservaciones
      })
    });

    const worksheet = XLSX.utils.json_to_sheet(lstJson);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");
    XLSX.writeFile(workbook, 'Tareas SINOE ' + ((new Date()).getTime().toString()) + '.xlsx', { compression: true });
  }
}
