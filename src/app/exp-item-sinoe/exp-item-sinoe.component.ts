import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Resolucion } from '../_interfaces/resolucion';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item-sinoe',
  templateUrl: './exp-item-sinoe.component.html',
  styleUrl: './exp-item-sinoe.component.scss'
})
export class ExpItemSinoeComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  notificaciones: Resolucion[] = [];
  cargando: boolean = false;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.obtenerNotificaciones();
    }
  }

  async obtenerNotificaciones() {
    this.cargando = true;

    this.notificaciones = await this.recuperarNotificaciones();

    this.cargando = false;
  }

  /**
   * OPERACIONES A LA BASE DE DATOS
   */

  recuperarNotificaciones(): Promise<any[]> {
    let query = this.db.collection('resoluciones', ref => {
      return ref.where('numeroExpediente', '==', this.expediente?.numero).limit(10)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });
      
      return items.map(r => {
        if (r.fechaNotificacion.length == 10) {
          let year = r.fechaNotificacion.slice(0, 4);
          let month = r.fechaNotificacion.slice(5, 7);
          let day = r.fechaNotificacion.slice(8, 10);
          let fecha = `${day}/${month}/${year}`
          return {...r, fechaNotificacion: fecha};
        }
        return r;
      })
    }).catch(err => {
      throw err;
    })
  }
}
