import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-expediente-new',
  templateUrl: './expediente-new.component.html',
  styleUrls: ['./expediente-new.component.scss']
})
export class ExpedienteNewComponent {
  frmExpediente: FormGroup;
  lCreating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle('Crear Expediente');

    this.frmExpediente = new FormGroup({
      sorganojuris: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^\S*$/)
      ])),
      smateria: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      sespecialista: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sfechainicio: new FormControl(null, Validators.required),
    });
  }

  crearExpediente(): void {
    this.lCreating = true;
    let sexpediente = this.frmExpediente.value['sexpediente'];
    
    this.db
      .collection('expedientes')
      .doc(sexpediente)
      .set({
        ...this.frmExpediente.value,
        sfechacreacion: new Date().getTime().toString(), 
        sfechamodificacion: new Date().getTime().toString(),
      })
      .then((x) => {
        this.router.navigate(['/expediente/',sexpediente]);
      })
      .catch(()=>{
        window.alert('ERROR al crear expediente');
      })
      .finally(()=>{
        this.lCreating = false;
      });
  }
}
