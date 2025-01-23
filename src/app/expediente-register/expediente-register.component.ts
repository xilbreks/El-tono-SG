import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { concatAll, firstValueFrom } from 'rxjs';

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

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.titleService.setTitle('Registrar Expediente');

    this.frmExpediente = new FormGroup({
      clase: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      especialidad: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      materia: new FormControl(null, Validators.required),
      juzgado: new FormControl(null, Validators.required),
      fechaInicio: new FormControl(null, Validators.required),
    });

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
    let sespecialidad = this.frmExpediente.controls['especialidad'].value;
    this.lstMaterias = this.lstMateriasTodos.filter(a => a.sespecialidad == sespecialidad);
  }

  /**
   * Establece el validator del input para el numero de expediente
   */
  setValidator() {
    let idtipodoc = this.frmExpediente.controls['clase'].value;
    let regexp: RegExp = /REGEX/;

    switch (idtipodoc) {
      case 'PRINCIPAL':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0][-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'PROVISIONAL':
        regexp = /^[a-zA-Z0-9-]{5,30}$/;
        break;
      case 'CAUTELAR':
        regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}$/;
        break;
      case 'CF':
        regexp = /^\d+(-\d+)*$/;
        break;
      default:
        window.alert('ERROR DE ELECCION')
    }

    this.frmExpediente.controls['numero'].setValidators([
      Validators.required,
      Validators.pattern(regexp)
    ]);
    this.frmExpediente.controls['numero'].updateValueAndValidity();
  }

  /**
   * Verifica si un expediente existe
   * @numero Numero del expediente
   * @returns True si existe, false si no existe
   */
  existeExpediente(numero: string): Promise<boolean> {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('numero', '==', numero);
    }).get();
    return firstValueFrom(obs).then(snapshot => {
      let contador = 0;
      snapshot.forEach(doc => {
        contador = contador + 1;
      })
      if (contador > 0) {
        return true;
      } else {
        return false;
      }
    })
  }

  /**
   * Generar el nuevo ID del expediente
   * @returns Un codigo con el formato E000001
   */
  generarNuevoIdExpediente(): Promise<string> {
    const obs = this.db.collection('expedientes', ref => {
      return ref.orderBy('idExpediente', 'desc').limit(1)
    }).get();

    return firstValueFrom(obs).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      })
      
      let contador = Number(lista[0].idExpediente.slice(1, 7));
      contador = contador + 1;
      let idExpediente = '';

      if (contador <= 9) {
        idExpediente = `E00000${contador}`;
      } else if (contador <= 99) {
        idExpediente = `E0000${contador}`;
      } else if (contador <= 999) {
        idExpediente = `E000${contador}`;
      } else if (contador <= 9999) {
        idExpediente = `E00${contador}`;
      } else if (contador <= 99999) {
        idExpediente = `E0${contador}`;
      } else if (contador <= 999999) {
        idExpediente = `E${contador}`;
      }

      return idExpediente;
    });
  }

  async guardarExpediente() {
    this.lCreating = true;
    let numeroExp = this.frmExpediente.controls['numero'].value.toUpperCase().trim();
    let existeExp = await this.existeExpediente(numeroExp);

    if (existeExp) {
      window.alert('Numero de expediente ya existe');
      this.lCreating = false;
      return;
    }

    let idExpediente = await this.generarNuevoIdExpediente();
    console.log(idExpediente);
    this.lCreating = false;

    this.guardarExpedienteDB(idExpediente).then(() => {
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: numeroExp,
        }
      })
      console.log('ok')
    }).catch((err) => {
      console.log('error', err)
      window.alert('ocurio un error al registrar expediente');
    }).finally(() => {
      this.lCreating = false;
    })
  }

  // OPERACIONES A LA BASE DE DATOS

  /**
   * Registra un nuevo Expediente
   * @idExpediente Identificador unico del expediente
   */
  async guardarExpedienteDB(idExpediente: string): Promise<void> {
    let timestamp: number = (new Date()).getTime();

    return this.db.collection('expedientes').doc(idExpediente).set({
      idExpediente: idExpediente,
      clase: this.frmExpediente.controls['clase'].value,
      numero: this.frmExpediente.controls['numero'].value.toUpperCase().trim(),
      especialidad: this.frmExpediente.controls['especialidad'].value,
      nivelIter: 0,
      demandante: this.frmExpediente.controls['demandante'].value.toUpperCase().trim(),
      demandado: this.frmExpediente.controls['demandado'].value.toUpperCase().trim(),
      materia: this.frmExpediente.controls['materia'].value.toUpperCase().trim(),
      juzgado: this.frmExpediente.controls['juzgado'].value.toUpperCase().trim(),
      prioridad: "MEDIA",
      tieneContrato: false,
      fechaInicio: this.frmExpediente.controls['fechaInicio'].value.trim(),
      codigo: null,
      observaciones: "",
      estado: "EN PROCESO",
      motivoFinalizacion: null,
      fechaCreacion: timestamp,
      numeroCasacion: null,
      numeroCautelar: null,
      carpetaFiscal: null,
      salaCasacion: null,
    });
  }

}
