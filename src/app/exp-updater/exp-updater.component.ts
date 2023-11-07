import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exp-updater',
  templateUrl: './exp-updater.component.html',
  styleUrls: ['./exp-updater.component.scss']
})
export class ExpUpdaterComponent {
  fcExp: FormControl = new FormControl([]);

  constructor(
    private db: AngularFirestore,
  ) {
  }

  getExpedientes() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad', '==', 'CONSTITUCIONAL')
        .where('lactive', '==', true)
    })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        let data = res.map(a => {
          return {
            sexpediente: a.sexpediente,
            sespecialidad: a.sespecialidad,
            smateria: a.smateria,
            sdemandante: a.sdemandante,
            sdemandado: a.sdemandado,
            sfechainicio: a.sfechainicio,
            niter: a.niter,
            lcontrato: a.lcontrato,
            nmontocontrato: a.nmontocontrato,
          }
        })

        let json = JSON.stringify(data);
        this.fcExp.setValue(json);

        obs.unsubscribe();
      });

  }
}
