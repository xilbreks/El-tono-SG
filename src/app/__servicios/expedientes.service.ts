import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
  public lstExpedientes: Array<any> = [];

  constructor(
    private storage: AngularFireStorage
  ) {
    // this.obtenerExpedientes();
  }

  obtenerExpedientes() {
    console.log('trayendo desde la base de datos');
    let obs = this.storage.ref('/expedientes/expedientes.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(expedientes => {
            expedientes.shift();
            console.log('datos recuperados')

            this.lstExpedientes = expedientes;
          }).catch(err => {
            console.log('ERROR', err);
          }).finally(() => {
          });

        obs.unsubscribe();
      })
  }
}
