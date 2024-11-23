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
  lstExpsActivos: Array<any> = [];
  lstExpsDepurados: Array<any> = [];
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
    this.lstExpsActivos = [];
    this.lstExpsDepurados = [];
    /////////////////////////////////////////////////
    // Actualizar el listado de expedientes activos
    /////////////////////////////////////////////////

    let obs = this.db.collection('expedientes')
      .valueChanges()
      .subscribe((res: Array<any>) => {
        let dDate = new Date();
        let nDay = dDate.getDate();
        let nMonth = dDate.getMonth() + 1;
        let nYear = dDate.getFullYear();
        let sTime = dDate.toLocaleTimeString();

        let sDate = (nDay < 10 ? ('0' + nDay) : nDay) + '/' +
          (nMonth < 10 ? ('0' + nMonth) : nMonth) + '/' +
          nYear + ' - ' + sTime;

        this.lstExpsActivos.push({
          sdate: sDate
        });
        this.lstExpsDepurados.push({
          sdate: sDate
        });
        res.forEach(exp => {
          if (exp.lactive) {
            this.lstExpsActivos.push({
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
              lcontrato: exp.lcontrato,
            });
          } else {
            this.lstExpsDepurados.push({
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
              lcontrato: exp.lcontrato,
            });
          }

        });

        // Convertirlo en un archivo JSON
        let objJsonActivos = JSON.stringify(this.lstExpsActivos);
        let objJsonDepurados = JSON.stringify(this.lstExpsDepurados);

        const blobActivos = new Blob([objJsonActivos], { type: 'application/json' });
        const blobDepurados = new Blob([objJsonDepurados], { type: 'application/json' });

        let storageRefActivos = this.storage.ref('expedientes/expedientes.json');
        let storageRefDepurados = this.storage.ref('expedientes/expedientes-depurados.json');

        let savingActivos = storageRefActivos.put(blobActivos);
        let savingDepurados = storageRefDepurados.put(blobDepurados);

        Promise.all([savingActivos, savingDepurados]).then(res => {
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
