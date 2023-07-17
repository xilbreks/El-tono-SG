import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

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
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent {
  sexpediente: string = '';
  objExpediente: ObjExpediente;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    route: ActivatedRoute
  ) {
    this.sexpediente = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle(this.sexpediente);
    this.objExpediente = new ObjExpediente();
    this.getExpediente();
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
        } else {
          window.alert('expediente no existe')
        }
        observando.unsubscribe();
      });
  }

}
