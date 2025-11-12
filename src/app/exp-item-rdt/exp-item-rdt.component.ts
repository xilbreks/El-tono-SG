import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Tarea } from './../_interfaces/tarea';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item-rdt',
  templateUrl: './exp-item-rdt.component.html',
  styleUrl: './exp-item-rdt.component.scss'
})
export class ExpItemRdtComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  lstTareas: Array<Tarea> = [];
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

    let query = this.db.collection('tareas', ref => {
      return ref.where('idExpediente', '==', this.expediente?.idExpediente).orderBy('fechaTarea', 'desc').limit(16);
    }).get();

    firstValueFrom(query).then(snapshot => {
      let items: Tarea[] = [];
      snapshot.forEach((doc: any) => {
        items.push(doc.data())
      });

      this.lstTareas = items;

      if (items.length > 15) {
        this.lhasmore = true;
      } else {
        this.lhasmore = false;
      }

      this.lLoading = false;
    })

  }

  getTareasTodas() {
    this.lLoadingMore = true;

    let query = this.db.collection('tareas', ref => {
      return ref.where('idExpediente', '==', this.expediente?.idExpediente).orderBy('fechaTarea', 'desc').limit(50);
    }).get();

    firstValueFrom(query).then(snapshot => {
      this.lhasmore = false;

      let items: Tarea[] = [];
      snapshot.forEach((doc: any) => {
        items.push(doc.data())
      });

      this.lstTareas = items;

      this.lLoadingMore = false;
    })
  }
}
