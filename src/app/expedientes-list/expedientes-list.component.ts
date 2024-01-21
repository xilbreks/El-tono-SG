import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-expedientes-list',
  templateUrl: './expedientes-list.component.html',
  styleUrls: ['./expedientes-list.component.scss']
})
export class ExpedientesListComponent {
  lstExpedientes: Array<any> = [];
  sFecha: string = '';
  lLoading = false;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.obtenerExpedientes();
  }

  obtenerExpedientes() {
    this.lLoading = true;
    let obs = this.storage.ref('/expedientes/expedientes.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => res.json())
          .then(expedientes => {
            let objDate = JSON.parse(expedientes.shift());
            let dDate = new Date(objDate);
            this.sFecha = '' + dDate.getDate() + '/' + (dDate.getMonth() + 1) + '/' + dDate.getFullYear();

            this.lstExpedientes = expedientes;

            this.separarAreas();
          }).catch(err => {
            console.log('ERROR');
          }).finally(() => {
            this.lLoading = false;
          });

        obs.unsubscribe();
      })
  }

  separarAreas() {
    console.log(this.lstExpedientes);
  }

}
