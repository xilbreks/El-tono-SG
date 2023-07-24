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
  selector: 'app-expediente-view',
  templateUrl: './expediente-view.component.html',
  styleUrls: ['./expediente-view.component.scss']
})
export class ExpedienteViewComponent {
  sexpediente: string = '';
  objExpediente: ObjExpediente;
  lstHistorial: Array<any> = [];

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    route: ActivatedRoute
  ) {
    this.sexpediente = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle(this.sexpediente);
    this.objExpediente = new ObjExpediente();
    this.getExpediente();
    this.getHistorial();
  }

  getExpediente(): void {
    let observando =  this.db
      .collection('expedientes', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.objExpediente = new ObjExpediente();
        if (val.length > 0) {
          this.objExpediente = val[0];
        } else {
          window.alert('expediente no existe')
        }
        observando.unsubscribe();
      });
  }

  getHistorial(): void {
    let observando =  this.db
      .collection('tareas', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((tareas: Array<any>) => {
        tareas.reverse().forEach((tarea)=>{
          let fecha = new Date(Number(tarea.idtarea));
          this.lstHistorial.push({
            fech: new Intl.DateTimeFormat('es-ES', {day:'numeric',month: 'short'}).format(fecha),
            desc: tarea.sdeseje,
            user: tarea.idrdt.slice(11).toUpperCase().replace('-',' '),
            iter: tarea.niter,
            pend: tarea.sacceje,
            task: tarea.sdestarea
          });
        });

  
        console.log(tareas);
        
        observando.unsubscribe();
      });
  }
}
