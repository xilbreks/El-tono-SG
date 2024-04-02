import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-expedientes-updater',
  templateUrl: './expedientes-updater.component.html',
  styleUrls: ['./expedientes-updater.component.scss']
})
export class ExpedientesUpdaterComponent {
  lstExpedientes: Array<any> = [];
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
  ) {

  }

  updateList() {
    let lConfirmed = window.confirm('¿Esta seguro de Actualizar la lista de expedientes?');

    if (!lConfirmed) {
      return;
    }

    this.lUpdating = true;
    this.lstExpedientes = [];

    let obs = this.db.collection('expedientes', ref => {
      return ref.where('lactive', '==', true)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        let dDate = new Date();
        let nDay = dDate.getDate();
        let nMonth = dDate.getMonth() + 1;
        let nYear = dDate.getFullYear();
        let sTime = dDate.toLocaleTimeString();

        let sDate = (nDay < 10 ? ('0' + nDay) : nDay) + '/' +
          (nMonth < 10 ? ('0' + nMonth) : nMonth) + '/' +
          nYear + ' - ' + sTime;

        this.lstExpedientes.push({
          sdate: sDate
        });
        res.forEach(exp => {
          this.lstExpedientes.push({
            sexpediente: exp.sexpediente,
            smatchexp: exp.smatchexp,
            sespecialidad: exp.sespecialidad,
            idtipodoc: exp.idtipodoc,
            smateria: exp.smateria,
            idmateria: exp.idmateria,
            sdemandante: exp.sdemandante,
            sdemandado: exp.sdemandado,
            sfechainicio: exp.sfechainicio,
            scodigo: exp.scodigo,
            niter: exp.niter,
          });
        });

        // Save list to JSON file
        let objJson = JSON.stringify(this.lstExpedientes);
        const blob = new Blob([objJson], { type: 'application/json' })

        let storageRef = this.storage.ref('expedientes/expedientes.json');
        storageRef.put(blob).then(res => {
          this.router.navigate(['/', 'expedientes-listing']);
        }).catch(err => {
          console.log('ERROR', err);
        }).finally(() => {
          this.lUpdating = false;
        });

        obs.unsubscribe();
      });
  }
}
