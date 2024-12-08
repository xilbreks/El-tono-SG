import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-expedientes-updater',
  templateUrl: './expedientes-updater.component.html',
  styleUrls: ['./expedientes-updater.component.scss']
})
export class ExpedientesUpdaterComponent implements OnInit {
  sexpediente: string = '';

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
      this.sexpediente = params['expediente'];

      this.actualizarLista();
    })
  }

  actualizarLista() {
    let lstExpsActivos: any[] = [];
    let lstExpsDepurados: any[] = [];

    let obs = this.db.collection('expedientes').get();
    firstValueFrom(obs).then(snapshot => {
      snapshot.forEach(doc => {
        let exp: any = doc.data();
        if (exp.lactive) {
          lstExpsActivos.push({
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
          lstExpsDepurados.push({
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
      let objJsonActivos = JSON.stringify(lstExpsActivos);
      let objJsonDepurados = JSON.stringify(lstExpsDepurados);

      const blobActivos = new Blob([objJsonActivos], { type: 'application/json' });
      const blobDepurados = new Blob([objJsonDepurados], { type: 'application/json' });

      let storageRefActivos = this.storage.ref('expedientes/expedientes.json');
      let storageRefDepurados = this.storage.ref('expedientes/expedientes-depurados.json');

      let savingActivos = storageRefActivos.put(blobActivos);
      let savingDepurados = storageRefDepurados.put(blobDepurados);

      Promise.all([savingActivos, savingDepurados])
        .then(res => {
          this.router.navigate(['/expediente/', this.sexpediente]).then(()=>{
            this.service.getExpsActivos();
            this.service.getExpsDepurados();
          })
        }).catch(err => {
          window.alert('ocurrio un error')
        })
    });
  }

}
