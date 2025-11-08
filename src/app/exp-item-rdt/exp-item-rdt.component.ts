import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Tarea } from './../_interfaces/tarea';

@Component({
  selector: 'app-exp-item-rdt',
  templateUrl: './exp-item-rdt.component.html',
  styleUrl: './exp-item-rdt.component.scss'
})
export class ExpItemRdtComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  
  lstTareas: Array<any> = [];
  lhasmore: boolean = false;
  lLoading: boolean = true;
  lLoadingMore = false;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getTareas();
    }
  }

  getTareas(): void {
    this.lLoading = true;
    this.lstTareas = [];
    let numeros = [];
    numeros.push(this.expediente?.numero);
    if (this.expediente?.numeroProvisional) {
      numeros.push(this.expediente?.numeroProvisional);
    }

    let obs = this.db
      .collection('tareas', ref => {
        return ref.where('sexpediente', 'in', numeros).orderBy('sfecha', 'desc').limit(16);
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
    let numeros = [];
    numeros.push(this.expediente?.numero);
    if (this.expediente?.numeroProvisional) {
      numeros.push(this.expediente?.numeroProvisional);
    }

    let obs = this.db
      .collection('tareas', ref => {
        return ref.where('sexpediente', 'in', numeros).orderBy('sfecha', 'desc').limit(50);
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
