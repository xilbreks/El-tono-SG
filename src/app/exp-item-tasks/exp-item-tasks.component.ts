import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Tarea } from './../_interfaces/tarea';

@Component({
  selector: 'app-exp-item-tasks',
  templateUrl: './exp-item-tasks.component.html',
  styleUrls: ['./exp-item-tasks.component.scss']
})
export class ExpItemTasksComponent implements OnInit {
  @Input('expediente') expediente: Expediente | null = null;
  lstTareas: Array<Tarea> = [];
  lhasmore: boolean = false;
  lLoading: boolean = true;
  lLoadingMore = false;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getTareas();
  }

  getTareas(): void {
    this.lLoading = true;
    this.lstTareas = [];

    let obs = this.db
      .collection('tareas', ref => {
        if (this.expediente?.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.expediente?.sexpediente).orderBy('sfecha', 'desc').limit(16);
        } else {
          return ref.where('sexpediente', 'in', [this.expediente?.sexpediente, this.expediente?.smatchexp]).orderBy('sfecha', 'desc').limit(16);
        }
      })
      .valueChanges()
      .subscribe((tareas: any[]) => {
        if (tareas.length > 15) {
          this.lhasmore = true;
        } else {
          this.lhasmore = false;
        }
        this.lstTareas = tareas.slice(0, 15);
        this.lstTareas = this.lstTareas.map(tar => {
          return {
            ...tar,
            sfecha: tar.sfecha.slice(8, 10) + '/' + tar.sfecha.slice(5, 7) + '/' + tar.sfecha.slice(0, 4)
          }
        });

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

  getTareasTodas() {
    this.lLoadingMore = true;

    let obs = this.db
      .collection('tareas', ref => {
        if (this.expediente?.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.expediente.sexpediente).orderBy('sfecha', 'desc').limit(50);
        } else {
          return ref.where('sexpediente', 'in', [this.expediente?.sexpediente, this.expediente?.smatchexp]).orderBy('sfecha', 'desc').limit(50);
        }
      })
      .valueChanges()
      .subscribe((tareas: any[]) => {
        this.lhasmore = false;

        this.lstTareas = tareas;
        this.lstTareas = this.lstTareas.map(tar => {
          return {
            ...tar,
            sfecha: tar.sfecha.slice(8, 10) + '/' + tar.sfecha.slice(5, 7) + '/' + tar.sfecha.slice(0, 4)
          }
        });

        this.lLoadingMore = false;
        obs.unsubscribe();
      });
  }
}
