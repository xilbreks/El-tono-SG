import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class Task {
  fech: string;
  desc: string;
  user: string;
  iter: number;
  pend: string;
  constructor(val: {
    desc: string,
    idrdt: string,
    iter: number,
    pend: string,
  }) {
    let year = Number(val.idrdt.slice(0, 4));
    let month = Number(val.idrdt.slice(5, 7)) - 1;
    let day = Number(val.idrdt.slice(8, 10));
    let fecha = new Date(year, month, day);

    this.fech = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(fecha)
    this.desc = val.desc;
    this.user = val.idrdt.slice(11).toUpperCase().replace('-', ' ');
    this.iter = val.iter;
    this.pend = val.pend;
  }
}

@Component({
  selector: 'app-expediente-item-tasks',
  templateUrl: './expediente-item-tasks.component.html',
  styleUrls: ['./expediente-item-tasks.component.scss']
})
export class ExpedienteItemTasksComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  lstHistorial: Array<Task> = [];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial(): void {
    let observando = this.db
      .collection('tareas', ref => {
        return ref.where('sexpediente', '==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((tareas: Array<any>) => {
        tareas.reverse().forEach((tarea) => {
          this.lstHistorial.push(
            new Task({
              idrdt: tarea.idrdt,
              iter: tarea.niter,
              desc: tarea.sdeseje,
              pend: tarea.sacceje,
            })
          );
        });


        console.log(tareas);

        observando.unsubscribe();
      });
  }

}
