import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Notificacion } from '../_interfaces/notificacion';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item-sinoe',
  templateUrl: './exp-item-sinoe.component.html',
  styleUrl: './exp-item-sinoe.component.scss'
})
export class ExpItemSinoeComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  notificaciones: Notificacion[] = [];
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

  formatTimestampToDate(timestamp: number): string {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  /**
   * OPERACIONES A LA BASE DE DATOS
   */

  recuperarNotificaciones(): Promise<any[]> {
    let query = this.db.collection('tareasg', ref => {
      return ref.where('sexpediente', '==', this.expediente?.numero).limit(10)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });

      let items2 = items.map(i => {
        let fecha = this.formatTimestampToDate(i.sfcreacion);
        return {
          ...i,
          fecha
        }
      })
      return items2;
    }).catch(err => {
      throw err;
    })
  }
}
