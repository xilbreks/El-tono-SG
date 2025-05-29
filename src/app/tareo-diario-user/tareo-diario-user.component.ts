import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Tareo } from '../_interfaces/tareo';

@Component({
  selector: 'app-tareo-diario-user',
  templateUrl: './tareo-diario-user.component.html',
  styleUrl: './tareo-diario-user.component.scss'
})
export class TareoDiarioUserComponent {
  idUsuario: string = 'null';
  tareos: Tareo[] = [];

  cargando = false;

  constructor(
    private db: AngularFirestore,
  ) {
    let idusuario: any = localStorage.getItem('idusuario');
    this.idUsuario = idusuario;

    this.obtenerTareos();
  }

  // acciones automaticas

  async obtenerTareos() {
    this.cargando = true;

    let idUsuario = this.idUsuario;
    let tareos = await this.recuperarTareos(idUsuario);
    this.tareos = tareos;

    this.cargando = false;
  }

  // Operaciones a la base de datos

  recuperarTareos(idUsuario: string): Promise<any[]> {
    const query = this.db.collection('tareo', ref => {
      return ref.where('idUsuario', '==', idUsuario).orderBy('fecha', 'desc').limit(25)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })
      console.log(items)
      return items;
    }).catch(err => {
      throw err;
    })
  }
}
