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
      sexpediente: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-]+$/)
      ])),
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
          window.alert('Ya existe un expediente con ese numero')
        }

        obs.unsubscribe();
      });
  }

  saveExp() {
    let sexpediente = this.frmExpediente.value['sexpediente'];

    this.db
      .collection('expedientes')
      .doc(sexpediente)
      .set({
        sexpediente: sexpediente,
        sespecialidad: this.frmExpediente.controls['sespecialidad'].value,
        idmateria: this.frmExpediente.controls['idmateria'].value,
        smateria: this.frmExpediente.controls['smateria'].value,
        idtipodoc: this.frmExpediente.controls['idtipodoc'].value,
        sorganojuris: this.frmExpediente.controls['sorganojuris'].value.trim().toUpperCase(),
        sdemandante: this.frmExpediente.controls['sdemandante'].value.trim().toUpperCase(),
        sdemandado: this.frmExpediente.controls['sdemandado'].value.trim().toUpperCase(),
        sfechainicio: this.frmExpediente.controls['sfechainicio'].value.trim(),

        sfechacreacion: new Date().getTime().toString(),
        sfechamodificacion: new Date().getTime().toString(),
        salias: sexpediente.slice(0, 10),
        
        lactive: true,
        sobs: '',
        smatchexp: 'no-match',
        scodigo: 'XX-XXXX',
        lcontrato: false,
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
