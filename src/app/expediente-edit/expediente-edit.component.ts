import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class ObjExpediente {
  sfechainicio: string = '';
  sexpediente: string = '';
  sdemandado: string = '';
  sdemandante: string = '';
  sespecialidad: string = '';
  sdistritojuris: string = '';
  sorganojuris: string = '';
  sespecialista: string = '';
  sjuez: string = '';
  smateria: string = '';
  ssumilla: string = '';
  sfechamodificacion: string = '';
  constructor() {}
}

@Component({
  selector: 'app-expediente-edit',
  templateUrl: './expediente-edit.component.html',
  styleUrls: ['./expediente-edit.component.scss']
})
export class ExpedienteEditComponent {
  sexpediente: string = '';
  objExpediente: ObjExpediente = new ObjExpediente();
  frmExpediente: FormGroup;

  lUpdating: boolean = false;
  lLoading: boolean = true;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.sexpediente = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle('Actualizar expediente '+this.sexpediente);
    this.getExpediente();

    this.frmExpediente = new FormGroup({
      sorganojuris: new FormControl(null, Validators.required),
      smateria: new FormControl(null, Validators.required),
      sespecialidad: new FormControl(null, Validators.required),
      sespecialista: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sfechainicio: new FormControl(null, Validators.required),
    });
  }

  public getExpediente(): void {
    let observando =  this.db
      .collection('expedientes', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.objExpediente = new ObjExpediente();
        console.log(val);
        if (val.length > 0) {
          this.objExpediente = val[0];

          this.frmExpediente.setValue({
            sorganojuris: this.objExpediente.sorganojuris,
            smateria: this.objExpediente.smateria,
            sespecialidad: this.objExpediente.sespecialidad,
            sespecialista: this.objExpediente.sespecialista,
            sdemandante: this.objExpediente.sdemandante,
            sdemandado: this.objExpediente.sdemandado,
            sfechainicio: this.objExpediente.sfechainicio,
          });
        } else {
          window.alert('expediente no existe')
        }
        this.lLoading = false;
        observando.unsubscribe();
      });
  }

  public updateExpediente(): void {
    this.lUpdating = true;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        ...this.frmExpediente.value,
        sfechamodificacion: new Date().getTime().toString()
      })
      .then(()=>{
        this.router.navigate(['/expediente/', this.sexpediente]);
      })
      .catch(()=>{
        window.alert('ERROR al guardar')
      })
      .finally(()=>{
        this.lUpdating = false;
      });
  }

}
