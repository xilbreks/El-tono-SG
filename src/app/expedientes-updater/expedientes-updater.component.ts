import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app.service';

import { Expediente } from '../_interfaces/expediente';

@Component({
  selector: 'app-expedientes-updater',
  templateUrl: './expedientes-updater.component.html',
  styleUrls: ['./expedientes-updater.component.scss']
})
export class ExpedientesUpdaterComponent implements OnInit {
  numeroExpediente: string = '';
  expedientes: Expediente[] = [];

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private service: AppService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numeroExpediente = params['expediente'];

      this.actualizarLista();
    })
  }

  actualizarLista() {
    this.expedientes = [];
    let obs = this.db.collection('expedientes').get();

    firstValueFrom(obs).then(snapshot => {
      snapshot.forEach(doc => {
        let exp: any = doc.data();
        this.expedientes.push(exp)
      });

      // Convertirlo en un archivo JSON
      let objJson = JSON.stringify(this.expedientes);
      const blob = new Blob([objJson], { type: 'application/json' });
      let storageRef = this.storage.ref('expedientes/expedientes.json');
      let savingExps = storageRef.put(blob);

      savingExps.then(res => {
        this.router.navigate(['/expediente/', this.numeroExpediente]).then(() => {
          this.service.getExpedientes();
        })
      }).catch(err => {
        window.alert('ocurrio un error')
      })
    });
  }

}
