import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Tareo } from '../_interfaces/tareo';

@Component({
  selector: 'app-tareo-diario-generator',
  templateUrl: './tareo-diario-generator.component.html',
  styleUrl: './tareo-diario-generator.component.scss'
})
export class TareoDiarioGeneratorComponent {
  usuarios: any[] = [];
  fcFecha: FormControl = new FormControl(null);

  cargando = false;
  generando = false;

  constructor(
    private db: AngularFirestore
  ) {
    this.obtenerUsuarios();
    this.colocarFechaHoy();
  }

  // acciones automaticas

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

  async obtenerUsuarios() {
    this.cargando = true;

    let usuarios = await this.recuperarUsuarios();
    this.usuarios = usuarios;

    this.cargando = false;
  }

  // Acciones de usuario

  generarTareo() {
    this.generando = true;

    const fecha = this.fcFecha.value;
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaUTC = new Date(Date.UTC(anio, mes - 1, dia));
    const numeroDia = fechaUTC.getUTCDay();
    const nombreDia = diasSemana[numeroDia];

    let contadorOks = 0;
    let limiteContador = this.usuarios.length;

    this.usuarios.forEach(async (u) => {
      let idUsuario = u.id;
      let nombreUsuario = u.snombre;

      const tareo: any = {
        idTareo: `${fecha}-${idUsuario}`,
        fecha: fecha,
        nombreDia: nombreDia,
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        entradaHora: '--',
        entradaMinuto: '--',
        salidaHora: '--',
        salidaMinuto: '--',
        observaciones: '',
      };

      await this.grabarNuevoTareo(tareo.idTareo, tareo).finally(()=>{
        contadorOks = contadorOks + 1;

        if (contadorOks == limiteContador) {
          this.generando = false;
        }
      })
    });
  }

  // Operaciones a la base de datos

  recuperarUsuarios(): Promise<any[]> {
    const query = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })

      return items;
    }).catch(err => {
      throw err;
    })
  }

  grabarNuevoTareo(idTareo: string, tareo: Tareo): Promise<void> {
    const query = this.db.collection('tareo').doc(idTareo).set(tareo);

    return query;
  }

}
