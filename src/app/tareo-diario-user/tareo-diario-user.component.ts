import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Tareo } from '../_interfaces/tareo';

@Component({
  selector: 'app-tareo-diario-user',
  templateUrl: './tareo-diario-user.component.html',
  styleUrl: './tareo-diario-user.component.scss'
})
export class TareoDiarioUserComponent implements OnInit {
  nick: string = 'null';
  tareos: Tareo[] = [];

  cargando = false;

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    let nick: any = localStorage.getItem('nick');
    this.nick = nick;
    // console.log('User nick:', nick)
    this.obtenerTareos();
  }

  // acciones automaticas

  async obtenerTareos() {
    this.cargando = true;

    let idUsuario = this.nick;
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
      snapshot.forEach((doc: any) => {
        let obj = doc.data();
        items.push({
          ...obj,
          horaIngreso: obj.entradaHora,
          minutoIngreso: obj.entradaMinuto,
          horaSalida: obj.salidaHora,
          minutoSalida: obj.salidaMinuto,
        })
      })
      console.log(items)
      return items;
    }).catch(err => {
      throw err;
    })
  }
}
