import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  ) {
    this.titleService.setTitle('Registrar Expediente');

    this.frmExpediente = new FormGroup({
      sexpediente: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      idmateria: new FormControl(null, Validators.required),
      smateria: new FormControl(null, Validators.required),
      idtipodoc: new FormControl(null, Validators.required),
      sorganojuris: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sfechainicio: new FormControl(null, Validators.required),
    });

    this.getMaterias();
  }

  getMaterias() {
    let obs = this.db.collection('materias')
      .valueChanges()
      .subscribe((res: Array<any>) => {
        res.forEach(a => {
          this.lstMateriasTodos.push(
            new ObjMateria(a)
          )
        })

        obs.unsubscribe();
      });
  }

  setLstMaterias() {
    let sespecialidad = this.frmExpediente.controls['sespecialidad'].value;
    this.frmExpediente.controls['idmateria'].reset();

    this.lstMaterias = this.lstMateriasTodos.filter((a) => {
      if (a.sespecialidad == sespecialidad) {
        return true;
      } else {
        return false;
      }
    })
  }

  setSMateria() {
    let idmateria = this.frmExpediente.controls['idmateria'].value;
    let smateria = '--';
    this.lstMaterias.forEach((a) => {
      if (idmateria == a.idmateria) {
        smateria = a.smateria;
      }
    })
    this.frmExpediente.controls['smateria'].setValue(smateria);
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

  // Verificar si ya existe
  crearExpediente() {
    this.lCreating = true;
    let sexpediente = this.frmExpediente.value['sexpediente'];

    let obs = this.db
      .collection('expedientes')
      .doc(sexpediente)
      .valueChanges()
      .subscribe(exp => {
        if (exp == undefined) {
          this.saveExp();
        } else {
          this.lCreating = false;
          window.alert('Ya existe un expediente con ese código')
        }

        obs.unsubscribe();
      });
  }

  // Registrar expediente
  saveExp() {
    let sexpediente = this.frmExpediente.value['sexpediente'];
    let idtipodoc = this.frmExpediente.controls['idtipodoc'].value;
    let salias = '';

    switch (idtipodoc) {
      case 'EXPEDIENTE-ORIGEN':
        salias = sexpediente.slice(0, 10);
        break;
      case 'EXPEDIENTE-CAUTELAR':
        let lstParts: Array<string> = sexpediente.split('-');
        salias = lstParts[0] + '-' + lstParts[1] + '-' + lstParts[2];
        break;
      case 'CASACION-2DA-SALA':
        salias = sexpediente.slice(0, 10);
        break;
      case 'CASACION-4TA-SALA':
        salias = sexpediente.slice(0, 10);
        break;
      case 'CARPETA-FISCAL':
        salias = sexpediente;
        break;
      case 'EXPEDIENTE-PROVISIONAL':
        salias = sexpediente;
        break;
      default:
        salias = sexpediente;
    }

    this.db
      .collection('expedientes')
      .doc(sexpediente)
      .set({
        idtipodoc: idtipodoc,
        sexpediente: sexpediente,
        sespecialidad: this.frmExpediente.controls['sespecialidad'].value,
        idmateria: this.frmExpediente.controls['idmateria'].value,
        smateria: this.frmExpediente.controls['smateria'].value,
        sorganojuris: this.frmExpediente.controls['sorganojuris'].value.trim().toUpperCase(),
        sdemandante: this.frmExpediente.controls['sdemandante'].value.trim().toUpperCase(),
        sdemandado: this.frmExpediente.controls['sdemandado'].value.trim().toUpperCase(),
        sfechainicio: this.frmExpediente.controls['sfechainicio'].value.trim(),

        sfechacreacion: new Date().getTime().toString(),
        sfechamodificacion: new Date().getTime().toString(),
        salias: salias,

        lactive: true,
        sobs: '',
        smatchexp: 'no-match',
        scodigo: 'XX-XXXX',
        lcontrato: false,
        niter: 0,
        urlassets: 'sin-url',
      })
      .then((x) => {
        this.router.navigate(['/expediente/', sexpediente]);
      })
      .catch(() => {
        window.alert('ERROR al crear expediente');
      })
      .finally(() => {
        this.lCreating = false;
      });
  }
}
