import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tareo } from '../_interfaces/tareo';
import { Tarea } from '../_interfaces/tarea';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tareo-view',
  templateUrl: './tareo-view.component.html',
  styleUrl: './tareo-view.component.scss',
})
export class TareoViewComponent {
  appService = inject(AppService);

  idTareo: string;
  tareo: Tareo | null = null;
  tareas: Tarea[] = [];
  nSumaTiempoTareas: string = '--:--';
  cargando = false;

  constructor(
    route: ActivatedRoute
  ) {
    this.idTareo = `${route.snapshot.paramMap.get('id')}`;

    this.recuperarDatosTareo();
  }

  async recuperarDatosTareo() {
    const tareo = await this.appService.tareo(this.idTareo);
    if (!tareo) return;
    this.tareo = tareo;
    this.recuperarTareas();
  }

  async recuperarTareas() {
    this.cargando = true;

    const tareas = await this.appService.tareas(this.idTareo);
    let horas = 0, minutos = 0;

    tareas.forEach(t => {
      horas += Number(t.horasAtencion);
      minutos += Number(t.minutosAtencion);
    });

    this.tareas = tareas.map(t => {
      let fechaCreacion = new Date(Number(t.fechaCreacion));
      let fechaCreacionString = fechaCreacion.toLocaleString();

      return {
        ...t,
        fechaCreacionString,
      }
    })

    let nTotalMinutos = horas * 60 + minutos;
    let sHoras = '';
    let sMinutos = '';

    sHoras = Math.floor(nTotalMinutos / 60).toString();
    sMinutos = (nTotalMinutos - Math.floor(nTotalMinutos / 60) * 60).toString();

    this.nSumaTiempoTareas = `${sHoras}h:${sMinutos}m`;

    this.cargando = false;
  }
}
