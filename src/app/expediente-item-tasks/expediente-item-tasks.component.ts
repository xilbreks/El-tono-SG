import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-expediente-item-tasks',
  templateUrl: './expediente-item-tasks.component.html',
  styleUrls: ['./expediente-item-tasks.component.scss']
})
export class ExpedienteItemTasksComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  lstHistorial: Array<any> = [];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.getHistorial();
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
