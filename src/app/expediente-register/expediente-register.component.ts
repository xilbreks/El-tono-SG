import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { firstValueFrom } from 'rxjs';

class ObjMateria {
  idmateria: string;
  smateria: string;
  sespecialidad: string;
  constructor(data: any) {
    this.idmateria = data.idmateria;
    this.smateria = data.smateria;
    this.sespecialidad = data.sespecialidad;
  }
}

@Component({
  selector: 'app-expediente-register',
  templateUrl: './expediente-register.component.html',
  styleUrls: ['./expediente-register.component.scss']
})
export class ExpedienteRegisterComponent {
  lstMateriasTodos: Array<ObjMateria> = [];
  lstMaterias: Array<ObjMateria> = [];
  frmExpediente: FormGroup;
  lCreating: boolean = false;

  // Variables del Modal
  ltienegrupo = true;
  ctrlGrupo: FormControl;
  lsearching = false;
  objGrupo: any = null;
  ltouched = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.titleService.setTitle('Registrar Expediente');

    this.frmExpediente = new FormGroup({
      sexpediente: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      smateria: new FormControl(null, Validators.required),
      idtipodoc: new FormControl(null, Validators.required),
      sorganojuris: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sfechainicio: new FormControl(null, Validators.required),
    });

    let regexp = /^SG-\d{5}$/i;
    this.ctrlGrupo = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(regexp)]))

    this.getMaterias();
  }

  getMaterias() {
    let obs = this.db.collection('materias').get();

    firstValueFrom(obs).then(snapshot => {
      snapshot.forEach(doc => {
        this.lstMateriasTodos.push(new ObjMateria(doc.data()));
      })
    })
  }

  setLstMaterias() {
    let sespecialidad = this.frmExpediente.controls['sespecialidad'].value;
    this.lstMaterias = this.lstMateriasTodos.filter(a => a.sespecialidad == sespecialidad);
  }

  // Establecer la validacion del codigo de expediente segun tipo de documento
  setValidator() {
    let idtipodoc = this.frmExpediente.controls['idtipodoc'].value;
    let regexp: RegExp = /REGEX/;

    switch (idtipodoc) {
      case 'EXPEDIENTE-ORIGEN':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0][-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'EXPEDIENTE-CAUTELAR':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'CASACION-2DA-SALA':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0][-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'CASACION-4TA-SALA':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0][-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'CARPETA-FISCAL':
        regexp = /^[0-9]{3,6}[-][0-9]{4}$/;
        break;
      case 'EXPEDIENTE-CURADURIA':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'EXPEDIENTE-PROVISIONAL':
        regexp = /^[A-Z0-9-]{3,25}$/;
        break;
      default:
        window.alert('ERROR DE ELECCION')
    }

    this.frmExpediente.controls['sexpediente'].setValidators([
      Validators.required,
      Validators.pattern(regexp)
    ]);
    this.frmExpediente.controls['sexpediente'].updateValueAndValidity();
  }

  /**
   * Verifica si un expediente existe
   * @sexpediente Numero del expediente
   * @returns True si existe, false si no existe
   */
  verificarExpediente(sexpediente: string): Promise<boolean> {
    let obs = this.db.collection('expedientes').doc(sexpediente).get();
    return firstValueFrom(obs).then(doc => {
      let exp = doc.data();
      if (exp) {
        return true;
      } else {
        return false;
      }
    })
  }

  /**
   * Generar el nuevo ID del proceso (grupo)
   * @returns Un codigo similar a SG-00000
   */
  generarNuevoIdProceso(): Promise<string> {
    const obsPJ = this.db.collection('procesosjudiciales', ref => {
      return ref.orderBy('idproceso', 'desc').limit(1)
    }).get();

    return firstValueFrom(obsPJ).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      })
      let idproceso = Number(lista[0].idproceso.slice(3, 8));
      idproceso = idproceso + 1;
      let sproceso = 'SG-';
      if (idproceso >= 10000) {
        sproceso = sproceso + idproceso;
      } else if (idproceso >= 1000) {
        sproceso = sproceso + '0' + idproceso;
      } else if (idproceso >= 100) {
        sproceso = sproceso + '00' + idproceso;
      } else if (idproceso >= 10) {
        sproceso = sproceso + '000' + idproceso;
      } else {
        sproceso = sproceso + '0000' + idproceso;
      }

      return sproceso;
    });
  }

  /**
   * Registra un nuevo Expediente
   * @idproceso ID del proceso judicial
   * @sexpediente Numero del expediente
   */
  guardarExpediente(idproceso: string, sexpediente: string): Promise<void> {
    let timestamp = (new Date()).getTime().toString();
    return this.db.collection('expedientes').doc(sexpediente).set({
      sexpediente: sexpediente,
      idproceso: idproceso,
      idtipodoc: this.frmExpediente.controls['idtipodoc'].value,
      sespecialidad: this.frmExpediente.controls['sespecialidad'].value,
      smateria: this.frmExpediente.controls['smateria'].value.trim().toUpperCase(),
      sorganojuris: this.frmExpediente.controls['sorganojuris'].value.trim().toUpperCase(),
      sdemandante: this.frmExpediente.controls['sdemandante'].value.trim().toUpperCase(),
      sdemandado: this.frmExpediente.controls['sdemandado'].value.trim().toUpperCase(),
      sfechainicio: this.frmExpediente.controls['sfechainicio'].value.trim(),

      sfechacreacion: timestamp,
      lactive: true,
      sobs: '',
      smatchexp: 'no-match',
      scodigo: 'XX-XXXX',
      lcontrato: false,
      niter: 0,
      urlcontrato: 'sin-url',
    });
  }

  /**
   * Registra un nuevo proceso judicial
   * @idproceso ID del proceso
   * @sexpediente Numero del expediente
   */
  guardarProceso(idproceso: string, sexpediente: string): Promise<void> {
    let timestamp = (new Date()).getTime();
    return this.db.collection('procesosjudiciales').doc(idproceso).set({
      idproceso: idproceso,
      fcreacion: timestamp,
      lactive: true,
      lstmiembros: sexpediente,
      sexpediente: sexpediente,
      niter: 0,
      sobservaciones: '-',
      urlcontrato: '-'
    });
  }

  /**
   * Guardar el expediente y nuevo proceso judical
   * @returns En caso de exito se redirecciona al expediente
   */
  async guardar() {
    this.lCreating = true;

    let sexpediente = this.frmExpediente.value['sexpediente'];
    const lexiste = await this.verificarExpediente(sexpediente);
    if (lexiste) {
      window.alert('Numero de expediente ya existe');
      this.lCreating = false;
      return;
    }

    let idProceso = await this.generarNuevoIdProceso();

    const tareas = Promise.all([
      this.guardarExpediente(idProceso, sexpediente),
      this.guardarProceso(idProceso, sexpediente)
    ]);

    tareas.then(() => {
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: sexpediente,
        }
      })
    }).catch((err) => {
      console.log('error', err)
      window.alert('ocurio un error');
    }).finally(() => {
      this.lCreating = false;
    })
  }



  // Sin uso /////////////////////////////////////////////////////
  // Evento de cambio de valor en el indicador de si tiene grupo
  onRadioChange(value: any) {
    if (value == 'true') this.ltienegrupo = true;
    else if (value == 'false') this.ltienegrupo = false;
  }

  // Sin uso
  // Abrir modal
  abrirModal(modal: any): void {
    if (this.frmExpediente.controls['idproceso'].value == null) {
      this.objGrupo = null;
      this.ctrlGrupo.reset();
      this.ltouched = false;
    } else {
      this.objGrupo = null;
      this.ltouched = false;
      this.ctrlGrupo.reset();
      this.ctrlGrupo.setValue(this.frmExpediente.controls['idproceso'].value);
    }

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });

    document.getElementById('idgrupoinput')?.focus();
  }

  // Sin uso
  // busca ID del Grupo
  async buscarIdProceso() {
    if (!this.ctrlGrupo.valid) return;

    this.lsearching = true;
    let idproceso = this.ctrlGrupo.value.toUpperCase();
    const obs = this.db.collection('procesosjudiciales').doc(idproceso).get();
    let grupo: any = await firstValueFrom(obs).then(snapshot => snapshot.data()).catch(error => {
      console.log('No existe grupo');
      throw error;
    });
    console.log(grupo);
    if (grupo) {
      this.objGrupo = {
        idproceso: grupo.idproceso,
        lstmiembros: grupo.lstmiembros.split(',')
      };
    } else {
      this.objGrupo = null;
    }
    this.ltouched = true;
    this.lsearching = false;
  }

  // Sin uso
  // Establece el ID del Grupo desde el modal
  establecerIdGrupo() {
    this.frmExpediente.patchValue({
      idproceso: this.objGrupo.idproceso
    })

    this.modalService.dismissAll();
  }

}
