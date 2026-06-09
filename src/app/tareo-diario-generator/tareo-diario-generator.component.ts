import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Tareo } from '../_interfaces/tareo';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tareo-diario-generator',
  templateUrl: './tareo-diario-generator.component.html',
  styleUrl: './tareo-diario-generator.component.scss',
})
export class TareoDiarioGeneratorComponent {
  appService = inject(AppService);

  usuarios: any[] = [];
  fcFecha: FormControl = new FormControl(null);

  cargando = false;
  generando = false;

  constructor() {
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

    let usuarios = await this.appService.usuariosActivos();
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
      let idUsuario = u.nick;
      let nombreUsuario = u.nombre;

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

      await this.appService.registrarTareo(tareo.idTareo, tareo).finally(() => {
        contadorOks = contadorOks + 1;

        if (contadorOks == limiteContador) {
          this.generando = false;
        }
      })
    });
  }

}
