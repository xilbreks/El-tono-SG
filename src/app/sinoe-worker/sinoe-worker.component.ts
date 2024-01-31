import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Tarea {
  idtarea: string;
  starea: string;
  idencargado: string;
  sexpediente: string;
  scliente: string;
  splazo: string;
  lcumplimiento: string;
  sobservaciones: string;
  sfcreacion: string;
  scolor: 'green' | 'gold' | 'red';
  splazol: string;
}

@Component({
  selector: 'app-sinoe-worker',
  templateUrl: './sinoe-worker.component.html',
  styleUrls: ['./sinoe-worker.component.scss']
})
export class SinoeWorkerComponent {
  idColaborador: any = '';
  lstTareas: Array<Tarea> = [];
  lLoading: boolean = false;

  constructor(
    private db: AngularFirestore,
  ) {
    this.idColaborador = localStorage.getItem('idusuario');
    this.getTareas();
  }

  getTareas() {
    this.lLoading = true;

    let obs = this.db.collection('tareasg', ref => {
      return ref.where('idencargado', '==', this.idColaborador)
    }).valueChanges()
      .subscribe((res: any) => {
        this.lstTareas = res.map((t: any) => {
          let year = Number(t.splazo.slice(0, 4));
          let month = Number(t.splazo.slice(5, 7));
          let day = Number(t.splazo.slice(8, 10));
          let dPlazo = new Date(year, month - 1, day + 1);
          let dToday = new Date();
          let diff = dPlazo.getTime() - dToday.getTime();
          let scolor = 'black';

          let syear = t.splazo.slice(0, 4);
          let smonth = t.splazo.slice(5, 7);
          let sday = t.splazo.slice(8, 10);

          if (t.lcumplimiento) {
            scolor = 'green'
          } else if (diff > 0) {
            scolor = 'gold'
          } else if (diff < 0) {
            scolor = 'red'
          }

          return {
            ...t,
            scolor: scolor,
            splazol: sday + '/' + smonth + '/' + syear
          }
        })

        this.lLoading = false;

        obs.unsubscribe();
      });
  }
}
