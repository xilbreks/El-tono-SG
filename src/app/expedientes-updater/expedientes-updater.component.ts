import { Component } from '@angular/core';
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
    private storage: AngularFireStorage
  ) {

  }

  updateList() {
    this.lUpdating = true;
    this.lstExpedientes = [];

    let obs = this.db.collection('expedientes', ref => {
      return ref.where('lactive', '==', true).limit(10)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstExpedientes.push({
          date: (new Date()).getTime().toString()
        });
        res.forEach(exp => {
          this.lstExpedientes.push({
            sexpediente: exp.sexpediente,
            sespecialidad: exp.sespecialidad,
            smateria: exp.smateria,
            idmateria: exp.idmateria,
            sdemandante: exp.sdemandante,
            sdemandado: exp.sdemandado,
            sfechainicio: exp.sfechainicio,
          });
        });

        // Save list to JSON file
        let objJson = JSON.stringify(this.lstExpedientes);
        const blob = new Blob([objJson], { type: 'application/json' })

        let storageRef = this.storage.ref('expedientes/expedientes.json');
        storageRef.put(blob).then(res => {
          window.alert('Se actualizó correctamente');
        }).catch(err => {
          console.log('ERROR');
        }).finally(() => {
          this.lUpdating = false;
        });

        obs.unsubscribe();
      });
  }
}
