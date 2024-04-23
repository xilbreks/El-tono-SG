import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Tarea } from './../_interfaces/tarea';

@Component({
  selector: 'app-exp-item-tasks',
  templateUrl: './exp-item-tasks.component.html',
  styleUrls: ['./exp-item-tasks.component.scss']
})
export class ExpItemTasksComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  smatchexp: string = 'nomatch';
  lstTareas: Array<Tarea> = [];
  lhasmore: boolean = false;
  lLoading: boolean = true;
  lLoadingMore = false;

  constructor(private db: AngularFirestore) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMatchexp();
  }

  getMatchexp() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((e: any) => {
        if (e.smatchexp) {
          this.smatchexp = e.smatchexp;
        } else {
          this.smatchexp = 'nomatch';
        }
        this.getTareas();

        obs.unsubscribe();
      });
  }

  getTareas(): void {
    this.lLoading = true;
    this.lstTareas = [];

    let obs = this.db
      .collection('tareas', ref => {
        if (this.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.sexpediente).orderBy('sfecha', 'desc').limit(16);
        } else {
          return ref.where('sexpediente', 'in', [this.sexpediente, this.smatchexp]).orderBy('sfecha', 'desc').limit(16);
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
        if (this.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.sexpediente).orderBy('sfecha', 'desc');
        } else {
          return ref.where('sexpediente', 'in', [this.sexpediente, this.smatchexp]).orderBy('sfecha', 'desc');
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
