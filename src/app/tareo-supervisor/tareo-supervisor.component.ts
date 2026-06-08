import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tareo } from '../_interfaces/tareo';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tareo-supervisor',
  templateUrl: './tareo-supervisor.component.html',
  styleUrl: './tareo-supervisor.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class TareoSupervisorComponent {
  appService = inject(AppService);

  tareos: Tareo[] = [];
  usuarios: any[] = [];

  fcFecha: FormControl = new FormControl(null);
  fcUsuario: FormControl = new FormControl(null);

  cargando = false;

  constructor(
    private db: AngularFirestore,
  ) {
    this.colocarFechaHoy();
    this.saberQuienSoy();
  }

  // Funciones internas

  colocarFechaHoy() {
    let d = new Date();
    var year = '' + d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    let s = [year, month, day].join('-');

    this.fcFecha.setValue(s);
  }

  async saberQuienSoy() {
    let nick: any = localStorage.getItem('nick');
    let rol: any = localStorage.getItem('rol');
    let area: any = localStorage.getItem('departamento');
    // console.log('soy: ', nick);

    if (rol != 'lider') return;

    // console.log('con rol de: ', rol, 'del area: ', area);
    this.usuarios = await this.appService.usuariosAsistentes(area)
    // console.log(this.usuarios)
  }

  // Acciones de usuario

  async obtenerTareos() {
    this.cargando = true;
    let fecha = this.fcFecha.value;
    let idUsuario = this.fcUsuario.value;
    let tareos = await this.recuperarTareo(fecha, idUsuario);
    this.tareos = tareos;

    this.cargando = false;
  }

  // Operaciones a la base de datos

  recuperarTareo(fecha: string, idUsuario: string): Promise<any[]> {
    const idTareo = `${fecha}-${idUsuario}`;
    const query = this.db.collection('tareo', ref => {
      return ref.where('idTareo', '==', idTareo)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })
      return items;
    }).catch(err => {
      throw err;
    })
  }
}
