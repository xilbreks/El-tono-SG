import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Tarea } from './../__clases/tarea';

@Component({
  selector: 'app-exp-updater',
  templateUrl: './exp-updater.component.html',
  styleUrls: ['./exp-updater.component.scss']
})
export class ExpUpdaterComponent {
  fcExp: FormControl = new FormControl([]);
  lstTareas: Array<Tarea> = [];
  regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}/;

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
            niter: Number(a.niter),
            lcontrato: a.lcontrato,
            nmontocontrato: Number(a.nmontocontrato),
          }
        })

        let json = JSON.stringify(data);
        this.fcExp.setValue(json);

        obs.unsubscribe();
      });

  }

  getTareas() {
    let sinicio = '2023-11-01';
    let sfinal = '2023-11-01';

    let obs = this.db.collection('tareas', ref => {
      return ref.where('sfecha', '>=', sinicio)
        .where('sfecha', '<=', sfinal)
    })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstTareas = [];
        res.reverse().forEach(t => {
          this.lstTareas.push(t)
        })
        console.log(this.lstTareas);
        obs.unsubscribe();
      })
  }

  actualizarIters() {
    let lstExpedientes: Array<string> = [];
    let lstIters: Array<string> = [];
    this.lstTareas.forEach(t => {
      let sexpediente = t.sexpediente;
      if (!lstExpedientes.includes(sexpediente)) {
        if (sexpediente.match(this.regexp)) {
          lstExpedientes.push(sexpediente);
          lstIters.push(t.niter);
        }
      }
    });
    
    lstExpedientes.forEach((exp, index) => {
      this.db.collection('expedientes')
        .doc(exp)
        .update({
          niter: lstIters[index]
        })
        .then(()=>{
          console.log('ok')
        })
        .catch(err => {
          console.log('ERROR', err);
        })
    });
  }
}
