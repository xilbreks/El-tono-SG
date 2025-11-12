import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { Tareo } from '../_interfaces/tareo';
import { Tarea } from '../_interfaces/tarea';

const URL_TAREAS = 'tareas';

@Component({
  selector: 'app-tareo-view',
  templateUrl: './tareo-view.component.html',
  styleUrl: './tareo-view.component.scss'
})
export class TareoViewComponent {
  idTareo: string;
  tareo: Tareo | null = null;
  tareas: Tarea[] = [];
  nSumaTiempoTareas: string = '--:--';
  cargando = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    route: ActivatedRoute
  ) {
    this.idTareo = `${route.snapshot.paramMap.get('id')}`;

    this.titleService.setTitle('RDT ' + this.idTareo);
    this.recuperarDatosTareo();
    this.recuperarTareas();
  }

  recuperarDatosTareo() {
    const query = this.db.collection('tareo').doc(this.idTareo).get();
    firstValueFrom(query).then((snapshot: any) => {
      let tareo: Tareo = snapshot.data();

      this.tareo = tareo;
    })
  }

  recuperarTareas() {
    this.cargando = true;

    let query = this.db.collection(`${URL_TAREAS}`, ref => {
      return ref.where('idTareo', '==', `${this.idTareo}`)
    }).get();

    firstValueFrom(query).then(snapshot => {
      let tareas: Tarea[] = [];
      let horas = 0, minutos = 0;

      snapshot.forEach((doc: any) => {
        let tar: Tarea = doc.data();
        tareas.push(tar);

        horas += Number(tar.horasAtencion);
        minutos += Number(tar.minutosAtencion);
      })

      this.tareas = tareas;

      let nTotalMinutos = horas * 60 + minutos;
      let sHoras = '';
      let sMinutos = '';

      sHoras = Math.floor(nTotalMinutos / 60).toString();
      sMinutos = (nTotalMinutos - Math.floor(nTotalMinutos / 60) * 60).toString();

      this.nSumaTiempoTareas = `${sHoras}:${sMinutos}`;

      this.cargando = false;
    })
  }
}
